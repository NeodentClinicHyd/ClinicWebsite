// One-command SEO content audit (home redesign reference, Parts 14.3 and 16).
//
//   node scripts/seo-audit-run.mjs              build both sides, audit, clean up
//   node scripts/seo-audit-run.mjs --keep-baseline
//                                               keep the baseline worktree and its
//                                               build for the next run (it never
//                                               changes: commit 0e62178)
//
// What it does (the same steps S0 did by hand):
//   1. Baseline: `git worktree add --detach <work>/baseline-wt 0e62178`
//      outside the repo, copies the app's .env* files (never printed),
//      `npm ci` + `next build` in its app subfolder, `next start -p 3100`.
//      With --keep-baseline an existing, built worktree is reused.
//   2. Current: copies the working tree's app folder (without node_modules,
//      .next, .audit, .git) to <work>/snapshot, `npm ci` + `next build`,
//      `next start -p 3101`. The snapshot time goes in the report.
//   3. Runs scripts/seo-content-audit.mjs from the real app folder, so
//      output lands in .audit/seo/ and decisions are read from
//      docs/home-redesign/.
//   4. Stops both servers, removes the snapshot, and removes the worktree
//      (unless --keep-baseline). This also happens when a step fails and on
//      Ctrl+C / SIGTERM.
//
// It never runs npm, next build or next start in the owner's working tree,
// and never uses ports 3000 / 3001. It never talks to a server it did not
// start: each port is checked free right before its server starts, and the
// server that answers must serve this run's build (its BUILD_ID).
//
// Environment (all optional):
//   BASELINE_PORT       default 3100 (another agent may be using it; pick a
//                       free port, for example BASELINE_PORT=3210)
//   CURRENT_PORT        default 3101
//   SEO_AUDIT_WORKDIR   parent folder for baseline-wt/ and snapshot/
//                       (default: a "neodent-seo-audit" folder next to the
//                       repo root, i.e. outside ClinicWebsite/)
//   BASELINE_COMMIT     default 0e62178 (owner-confirmed, reference 13.4)
//
// Exit code: the audit's exit code (0 ok, 1 undecided removed rows),
// or 2 if a step failed (including a busy port).

import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WIN = process.platform === "win32";
const KEEP_BASELINE = process.argv.includes("--keep-baseline");
const BASELINE_COMMIT = process.env.BASELINE_COMMIT ?? "0e62178";
const SNAPSHOT_EXCLUDE = new Set(["node_modules", ".next", ".audit", ".git"]);

const log = (...a) => console.log("[seo-audit-run]", ...a);
const fail = (msg) => {
  console.error(`[seo-audit-run] ${msg}`);
  process.exit(2);
};

function portFromEnv(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1024 || n > 65535) fail(`${name}=${raw} is not a valid port (1024 to 65535).`);
  return n;
}
const BASELINE_PORT = portFromEnv("BASELINE_PORT", 3100);
const CURRENT_PORT = portFromEnv("CURRENT_PORT", 3101);
const PORT_VAR = { [BASELINE_PORT]: "BASELINE_PORT", [CURRENT_PORT]: "CURRENT_PORT" };
if (BASELINE_PORT === CURRENT_PORT) fail(`BASELINE_PORT and CURRENT_PORT are both ${BASELINE_PORT}; they must differ.`);
for (const p of [BASELINE_PORT, CURRENT_PORT]) {
  if (p === 3000 || p === 3001) fail(`Port ${p} is reserved for the owner's dev server; change ${PORT_VAR[p]}.`);
}

function git(args, opts = {}) {
  const r = spawnSync("git", args, { cwd: APP_DIR, encoding: "utf8", ...opts });
  if (r.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${r.stderr || r.stdout}`);
  return r.stdout.trim();
}

const REPO_ROOT = path.resolve(git(["rev-parse", "--show-toplevel"]));
const APP_REL = path.relative(REPO_ROOT, APP_DIR); // "Neodent-dental-clinic-nextjs"
const WORK = path.resolve(process.env.SEO_AUDIT_WORKDIR ?? path.join(path.dirname(REPO_ROOT), "neodent-seo-audit"));
const BASE_WT = path.join(WORK, "baseline-wt");
const BASE_APP = path.join(BASE_WT, APP_REL);
const SNAP = path.join(WORK, "snapshot");
const SNAP_APP = path.join(SNAP, APP_REL);

if (WORK === REPO_ROOT || WORK.startsWith(REPO_ROOT + path.sep)) {
  console.error(`SEO_AUDIT_WORKDIR must be outside the repo (${REPO_ROOT}).`);
  process.exit(2);
}

/** Runs a command to completion; output goes to a log file, not the console. */
function run(cmd, args, cwd, logFile) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, shell: WIN, stdio: ["ignore", "pipe", "pipe"] });
    const chunks = [];
    child.stdout.on("data", (d) => chunks.push(d));
    child.stderr.on("data", (d) => chunks.push(d));
    child.on("close", (code) => {
      writeFileSync(logFile, Buffer.concat(chunks));
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited ${code} in ${cwd} (log: ${logFile})`));
    });
  });
}

/* A port is free only if nothing answers on it (IPv4 or IPv6 loopback) and
   it can be bound on both stacks. On Windows a server listening on [::]
   does not stop a bind on 0.0.0.0, so a bind test alone is not enough. */
function canConnect(port, host) {
  return new Promise((resolve) => {
    const s = net.connect({ port, host });
    s.setTimeout(1500);
    s.once("connect", () => { s.destroy(); resolve(true); });
    s.once("timeout", () => { s.destroy(); resolve(false); });
    s.once("error", () => resolve(false));
  });
}
function canListen(port, host) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once("error", (e) => resolve(e.code === "EAFNOSUPPORT" || e.code === "EADDRNOTAVAIL"));
    s.once("listening", () => s.close(() => resolve(true)));
    s.listen({ port, host, exclusive: true });
  });
}
async function portFree(port) {
  if ((await canConnect(port, "127.0.0.1")) || (await canConnect(port, "::1"))) return false;
  return (await canListen(port, "0.0.0.0")) && (await canListen(port, "::"));
}
async function assertPortFree(port) {
  if (!(await portFree(port))) {
    throw new PortBusyError(`Port ${port} is in use; set ${PORT_VAR[port]} to a free port and retry.`);
  }
}
class PortBusyError extends Error {}

/* Waits until the server this run started answers, and checks that it
   serves this run's build. Fails at once if our server process exits
   (for example because something else took the port). */
async function waitForOwn(server, ms = 120000) {
  const url = `http://localhost:${server.port}`;
  const buildId = readFileSync(path.join(server.appDir, ".next", "BUILD_ID"), "utf8").trim();
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (server.child.exitCode !== null) {
      throw new Error(`next start on port ${server.port} exited (code ${server.child.exitCode}); is the port taken? Change ${PORT_VAR[server.port]}.`);
    }
    try {
      const r = await fetch(`${url}/`);
      if (r.ok) {
        const html = await r.text();
        if (html.includes(buildId) || (await servesStaticOf(server, buildId))) return;
        throw new Error(`the server on port ${server.port} does not serve this run's build (BUILD_ID ${buildId}); refusing to use it. Change ${PORT_VAR[server.port]}.`);
      }
    } catch (e) {
      if (e.message.startsWith("the server on port")) throw e;
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`${url}/ did not respond within ${ms / 1000}s`);
}

/* Fallback identity check: a file from this build's .next/static/<BUILD_ID>/
   folder is served by the server on the port. */
async function servesStaticOf(server, buildId) {
  const dir = path.join(server.appDir, ".next", "static", buildId);
  if (!existsSync(dir)) return false;
  const file = readdirSync(dir).find((f) => f.endsWith(".js"));
  if (!file) return false;
  try {
    const r = await fetch(`http://localhost:${server.port}/_next/static/${buildId}/${file}`);
    return r.ok;
  } catch {
    return false;
  }
}

function startServer(appDir, port) {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: appDir,
    shell: WIN,
    stdio: "ignore",
    detached: !WIN,
  });
  const server = { child, port, appDir };
  servers.push(server);
  return server;
}

function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  if (WIN) spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
  }
}

/* Servers this run started. Only these are ever stopped. */
const servers = [];

function copyEnv(fromApp, toApp) {
  let n = 0;
  for (const f of readdirSync(fromApp)) {
    if (f.startsWith(".env")) {
      cpSync(path.join(fromApp, f), path.join(toApp, f));
      n += 1;
    }
  }
  return n;
}

function removeWorktree() {
  if (!existsSync(BASE_WT)) return;
  spawnSync("git", ["worktree", "remove", "--force", BASE_WT], { cwd: APP_DIR, stdio: "ignore" });
  if (existsSync(BASE_WT)) rmSync(BASE_WT, { recursive: true, force: true });
  spawnSync("git", ["worktree", "prune"], { cwd: APP_DIR, stdio: "ignore" });
}

async function prepareBaseline() {
  const built = existsSync(path.join(BASE_APP, ".next", "BUILD_ID"));
  if (KEEP_BASELINE && built) {
    const head = spawnSync("git", ["-C", BASE_WT, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
    const want = git(["rev-parse", BASELINE_COMMIT]);
    if (head === want) {
      log(`reusing baseline build in ${BASE_WT}`);
      return;
    }
  }
  removeWorktree();
  log(`baseline: worktree ${BASELINE_COMMIT} -> ${BASE_WT}`);
  git(["worktree", "add", "--detach", BASE_WT, BASELINE_COMMIT]);
  log(`baseline: copied ${copyEnv(APP_DIR, BASE_APP)} .env* file(s)`);
  log("baseline: npm ci + next build (several minutes)");
  await run("npm", ["ci", "--no-audit", "--no-fund"], BASE_APP, path.join(WORK, "baseline-install.log"));
  await run("npm", ["run", "build"], BASE_APP, path.join(WORK, "baseline-build.log"));
}

async function prepareSnapshot() {
  rmSync(SNAP, { recursive: true, force: true });
  const takenAt = new Date();
  log(`snapshot: copying ${APP_DIR} -> ${SNAP_APP}`);
  cpSync(APP_DIR, SNAP_APP, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(APP_DIR, src);
      return !rel || !SNAPSHOT_EXCLUDE.has(rel.split(path.sep)[0]);
    },
  });
  log("snapshot: npm ci + next build (several minutes)");
  await run("npm", ["ci", "--no-audit", "--no-fund"], SNAP_APP, path.join(WORK, "snapshot-install.log"));
  await run("npm", ["run", "build"], SNAP_APP, path.join(WORK, "snapshot-build.log"));
  return takenAt;
}

/* Stops the servers this run started and removes the snapshot and (unless
   --keep-baseline) the worktree. Synchronous and idempotent, so it can run
   from finally, from a signal handler and from an uncaught error. Only
   called once this run has started creating things. */
let armed = false;
let cleaned = false;
function cleanup() {
  if (!armed || cleaned) return;
  cleaned = true;
  servers.forEach((s) => stopServer(s.child));
  spawnSync(process.execPath, ["-e", "setTimeout(() => {}, 1500)"]); // let Windows release file locks
  try {
    rmSync(SNAP, { recursive: true, force: true });
  } catch (e) {
    console.error(`[seo-audit-run] could not remove ${SNAP}: ${e.message}`);
  }
  if (!KEEP_BASELINE) removeWorktree();
  log(`cleaned up (${servers.length} server(s) stopped; ${KEEP_BASELINE ? "baseline kept" : "baseline and snapshot removed"})`);
}
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP", "SIGBREAK"]) {
  process.on(sig, () => {
    console.error(`[seo-audit-run] ${sig} received; cleaning up`);
    cleanup();
    process.exit(130);
  });
}
process.on("uncaughtException", (e) => {
  console.error(`[seo-audit-run] ${e.stack ?? e.message}`);
  cleanup();
  process.exit(2);
});
process.on("unhandledRejection", (e) => {
  console.error(`[seo-audit-run] ${e?.stack ?? e}`);
  cleanup();
  process.exit(2);
});

async function main() {
  log(`ports: baseline ${BASELINE_PORT} (BASELINE_PORT), current ${CURRENT_PORT} (CURRENT_PORT)`);
  // Fail fast, before minutes of building, if either port is taken.
  for (const port of [BASELINE_PORT, CURRENT_PORT]) {
    try {
      await assertPortFree(port);
    } catch (e) {
      fail(e.message);
    }
  }
  mkdirSync(WORK, { recursive: true });

  let code = 2;
  let snapshotAt = null;
  armed = true;
  try {
    const [, takenAt] = await Promise.all([prepareBaseline(), prepareSnapshot()]);
    snapshotAt = takenAt;
    log(`snapshot taken at ${snapshotAt.toISOString()}`);

    // Check again right before each start: a port can be taken during the build.
    await assertPortFree(BASELINE_PORT);
    const base = startServer(BASE_APP, BASELINE_PORT);
    await assertPortFree(CURRENT_PORT);
    const cur = startServer(SNAP_APP, CURRENT_PORT);
    await Promise.all([waitForOwn(base), waitForOwn(cur)]);
    log(`both servers up (baseline :${BASELINE_PORT}, current :${CURRENT_PORT}); running scripts/seo-content-audit.mjs`);

    mkdirSync(path.join(APP_DIR, ".audit", "seo"), { recursive: true });
    writeFileSync(
      path.join(APP_DIR, ".audit", "seo", "run-info.json"),
      JSON.stringify(
        {
          baselineCommit: git(["rev-parse", BASELINE_COMMIT]),
          snapshotTakenAt: snapshotAt.toISOString(),
          baselineUrl: `http://localhost:${BASELINE_PORT}`,
          currentUrl: `http://localhost:${CURRENT_PORT}`,
        },
        null,
        1
      )
    );

    const audit = spawnSync(process.execPath, [path.join(APP_DIR, "scripts", "seo-content-audit.mjs")], {
      cwd: APP_DIR,
      stdio: "inherit",
      env: {
        ...process.env,
        BASELINE_URL: `http://localhost:${BASELINE_PORT}`,
        CURRENT_URL: `http://localhost:${CURRENT_PORT}`,
        SNAPSHOT_TIME: snapshotAt.toISOString(),
      },
    });
    code = audit.status ?? 2;
  } catch (e) {
    console.error(`[seo-audit-run] ${e.message}`);
    code = 2;
  } finally {
    cleanup();
  }
  log(`exit ${code} (ports used: baseline ${BASELINE_PORT}, current ${CURRENT_PORT})`);
  process.exit(code);
}

main();
