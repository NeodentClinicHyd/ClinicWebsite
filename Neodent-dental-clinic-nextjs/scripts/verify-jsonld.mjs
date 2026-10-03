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

// Regression guard: Search Console's strict validator rejects date-only
// values with "Invalid datetime value ... missing an important
// component, most often the time" -- schema.org accepts a bare Date,
// Google's rich-result validator does not. The doctor profile
// deliberately ships NO date property (see the comment in
// app/doctors/dr-miftah-ur-rahman/page.tsx); if one is ever added it
// must carry a time AND a timezone offset.
const ISO_DATETIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const DATE_PROPERTIES = ["dateModified", "dateCreated", "datePublished"];
const shippedDates = [];

for (const entry of Array.isArray(parsed) ? parsed : [parsed]) {
  for (const property of DATE_PROPERTIES) {
    if (!(property in entry)) continue;
    shippedDates.push(`${property}=${JSON.stringify(entry[property])}`);
    if (
      typeof entry[property] !== "string" ||
      !ISO_DATETIME.test(entry[property])
    ) {
      throw new Error(
        `${JSON.stringify(entry["@type"])}.${property} is ${JSON.stringify(entry[property])}, expected a full ISO 8601 datetime with a time and a timezone offset (e.g. "2026-09-21T23:09:33+05:30")`,
      );
    }
  }
}
console.log(
  "ASSERT: page date properties are full ISO 8601 datetimes or absent ->",
  shippedDates.length ? shippedDates.join(", ") : "none shipped",
);

const orgRefs = [...html.matchAll(/#organization/g)].length;
console.log("organization @id references:", orgRefs);
