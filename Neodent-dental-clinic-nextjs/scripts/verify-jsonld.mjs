import { readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../.next/server/app/doctors/dr-miftah-ur-rahman.html", import.meta.url),
  "utf8",
);

const blocks = [
  ...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
];

for (const block of blocks) {
  const json = JSON.parse(block[1]); // throws if malformed
  const entries = Array.isArray(json) ? json : [json];
  for (const entry of entries) {
    console.log(
      "OK:",
      JSON.stringify(entry["@type"]),
      entry.mainEntity?.["@type"] ?? "",
      entry.itemListElement?.map((i) => i.name).join(" > ") ?? "",
      entry.mainEntity?.worksFor ? `worksFor=${JSON.stringify(entry.mainEntity.worksFor)}` : "",
    );
  }
}

// Regression guard: the Person must stay a Physician with a
// medicalSpecialty — fail loudly if a future edit drops either.
const page = blocks.at(-1);
const parsed = JSON.parse(page[1]);
const profileEntry = (Array.isArray(parsed) ? parsed : [parsed]).find(
  (e) => e["@type"] === "ProfilePage",
);
if (!profileEntry) {
  throw new Error("ProfilePage entry missing");
}
const types = [].concat(profileEntry.mainEntity["@type"]);
if (!types.includes("Physician")) {
  throw new Error("Person @type no longer includes Physician");
}
if (profileEntry.mainEntity.medicalSpecialty !== "Dentistry") {
  throw new Error(
    `medicalSpecialty is ${JSON.stringify(profileEntry.mainEntity.medicalSpecialty)}, expected "Dentistry"`,
  );
}
console.log(
  "ASSERT: Person types =", types, "| medicalSpecialty =",
  profileEntry.mainEntity.medicalSpecialty,
);

const orgRefs = [...html.matchAll(/#organization/g)].length;
console.log("organization @id references:", orgRefs);
