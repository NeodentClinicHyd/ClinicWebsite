import type { MediaKey } from "@/lib/miftah-treatment-evidence";

/* ------------------------------------------------------------------
   Treatment dossiers — Dr. Miftah profile, Section 03.

   Content only; presentation lives in components/doctors/
   TreatmentDossier.tsx (rendered in the treatment dialog and, hidden,
   in the server HTML of Section 03).

   Every block carries its provenance:
     education   general patient education, checked against NHS,
                 American Association of Endodontists and ADA /
                 MouthHealthy patient information. Never phrased as a
                 claim about Dr. Miftah.
     documented  facts about Dr. Miftah already published on this page
                 (credentials, posts, research, stated focus). Requires
                 his sign-off before any wording change.
     case        case-specific information (consented, verified).
     unverified  NOT rendered anywhere — the renderer skips it.

   Unpublished case material (e.g. the Australian implant case) lives
   in lib/drafts/ and is NOT imported here — only its id is referenced.
   ------------------------------------------------------------------ */

export type Provenance = "education" | "documented" | "case" | "unverified";

export type Block =
  | { kind: "p"; text: string; source: Provenance }
  | { kind: "list"; items: string[]; source: Provenance };

export type SectionKey =
  | "overview"
  | "why"
  | "involves"
  | "clinical"
  | "approach"
  | "know"
  | "before"
  | "after"
  | "longTerm"
  | "evidence";

export interface DossierStep {
  number: string;
  title: string;
  body: string;
}

export interface DossierSection {
  key: SectionKey;
  number: string;
  heading: string;
  blocks: Block[];
  steps?: DossierStep[];
}

export type DossierEvidence =
  | { kind: "rct" }
  | { kind: "pair"; before: MediaKey; after: MediaKey };

export interface TreatmentDossier {
  id: "root-canal" | "smile-design" | "dental-implants" | "full-mouth-rehabilitation";
  cardNumber: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Plain treatment name — used for labels and the evidence viewer. */
  name: string;
  intro: string;
  sections: DossierSection[];
  evidence: DossierEvidence;
  /** Reference to an unpublished case in lib/drafts — never rendered. */
  caseInsightId?: string;
  cta: { label: string; note: string };
}

export interface CaseInsight {
  id: string;
  dossierId: TreatmentDossier["id"];
  published: boolean;
  heading: string;
  facts: { text: string; verified: boolean }[];
  approvals: { doctor: boolean; patientConsent: boolean };
}

const p = (text: string, source: Provenance = "education"): Block => ({ kind: "p", text, source });
const list = (items: string[], source: Provenance = "education"): Block => ({ kind: "list", items, source });

const CTA_NOTE =
  "Every mouth is different. Whether this treatment is suitable — and which alternatives exist — can only be decided after an examination and an individual assessment.";

/* ================================================================== */
/* 01 — ROOT CANAL TREATMENT                                          */
/* ================================================================== */
const rootCanal: TreatmentDossier = {
  id: "root-canal",
  cardNumber: "01",
  eyebrow: "Specialist focus · 01",
  title: "Saving natural teeth",
  subtitle: "Root canal treatment",
  name: "Root canal treatment",
  intro:
    "Root canal treatment is used when the soft tissue inside a tooth becomes inflamed or infected. Treatment removes the affected tissue, cleans and disinfects the root canal system, and seals the tooth so it can be restored and retained where clinically appropriate.",
  evidence: { kind: "rct" },
  sections: [
    {
      key: "overview",
      number: "01",
      heading: "What root canal treatment does",
      blocks: [
        p(
          "Inside every tooth, beneath the hard enamel and dentine, is a soft core called the pulp. It contains nerves and blood vessels and runs from the crown of the tooth down through narrow channels in each root — the root canals. Once a tooth is fully formed, it can survive without its pulp, because the surrounding gum and bone keep nourishing it.",
        ),
        p(
          "Root canal treatment removes inflamed or infected pulp, cleans and disinfects the canals, and fills and seals them so bacteria cannot easily return. The aim is simple: keep the patient's own tooth, rather than remove it and then need to replace it.",
        ),
        p(
          "A natural tooth that can be predictably kept has advantages no replacement fully matches. It keeps its own root in the bone, its own feel when biting, and its place in the arch, so neighbouring teeth do not drift into a gap. That is why saving a tooth is usually considered first — and why the decision to save it should rest on whether it can be restored reliably, not on the wish to avoid an extraction at any cost.",
        ),
      ],
    },
    {
      key: "why",
      number: "02",
      heading: "Why it may be needed",
      blocks: [
        p("The pulp can become inflamed or infected when bacteria or injury reach it. Common causes include:"),
        list([
          "deep tooth decay that has reached the pulp",
          "a crack, chip or fracture in the tooth",
          "repeated dental work on the same tooth",
          "a knock or injury, sometimes years earlier",
          "gum disease or a dental abscess (a collection of pus) around the root",
        ]),
        p(
          "Signs can include lingering sensitivity to hot or cold, pain when biting, a dull ache, swelling of the gum, or a tooth that has darkened. Some infected teeth cause no symptoms at all and are found on an X-ray. If an infected tooth is left untreated, the infection can spread and the tooth may eventually need to be taken out.",
        ),
      ],
    },
    {
      key: "involves",
      number: "03",
      heading: "How it works — the five stages",
      blocks: [
        p(
          "Treatment is carried out under local anaesthetic, so the patient is awake but the tooth is numb. Depending on the tooth and the extent of infection, it is commonly completed over one or more appointments, sometimes with a temporary filling in between.",
        ),
        p(
          "A thin rubber sheet, called a dental dam, is often placed around the tooth during treatment. It keeps the tooth dry and clean, stops saliva and its bacteria from entering the canals, and prevents small instruments or rinsing solutions from reaching the mouth.",
        ),
      ],
      steps: [
        {
          number: "01",
          title: "Diagnosis",
          body: "Examination, symptoms and X-rays show whether the pulp is inflamed or infected, how many canals the tooth has, and — just as importantly — whether enough healthy tooth remains to restore it afterwards.",
        },
        {
          number: "02",
          title: "Access",
          body: "Once the tooth is numb, a small opening is made through the biting surface to reach the pulp chamber and the entrance to each canal.",
        },
        {
          number: "03",
          title: "Cleaning",
          body: "The affected pulp is removed. Each canal is cleaned, shaped and disinfected along its length, down towards the tip of the root.",
        },
        {
          number: "04",
          title: "Sealing",
          body: "The cleaned canals are filled with a sealing material, closing the space so that bacteria have less opportunity to re-enter.",
        },
        {
          number: "05",
          title: "Restoration",
          body: "The tooth is rebuilt with a filling and, where it has been weakened, often a crown — a cap that covers and protects the tooth for everyday biting.",
        },
      ],
    },
    {
      key: "clinical",
      number: "04",
      heading: "The clinical approach",
      blocks: [
        p(
          "The success of root canal treatment depends on decisions made before the first instrument is used. A tooth is only worth treating if it can be restored afterwards: if decay or a fracture has destroyed too much of it, or a crack runs down into the root, cleaning the canals will not make it a dependable tooth again.",
        ),
        p(
          "Careful planning therefore looks at the whole tooth — the shape and number of its canals on the X-ray, the health of the gum and bone around it, how the opposing teeth bite onto it, and how it will be rebuilt once the canals are sealed. Treating the canals and restoring the tooth are considered as one piece of work, because a well-sealed tooth that is not properly protected can still fracture.",
        ),
        p("Before recommending treatment, the questions that usually matter most are:"),
        list([
          "Is there enough sound tooth above the gum to hold a filling or crown securely?",
          "Is the root free of a crack or split that cleaning cannot repair?",
          "Is there enough healthy bone and gum around the root to support the tooth?",
          "Is the tooth important to the bite, or to a bridge or denture that depends on it?",
          "Has the tooth been root-treated before, and if so, can it be retreated predictably?",
        ]),
        p(
          "When the answers are favourable, keeping the tooth is often the more conservative choice. When they are not, an honest discussion of removal and replacement — with an implant, a bridge or a denture — may serve the patient better in the long run. Either way, the options are explained before treatment begins, so the patient can take part in the decision.",
        ),
      ],
    },
    {
      key: "approach",
      number: "05",
      heading: "Dr. Miftah's approach",
      blocks: [
        p(
          "Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist — prosthodontics being the branch of dentistry concerned with restoring and replacing teeth. His work centres on restoring what can be saved and rebuilding what cannot, and much of his day is spent on planning before treatment begins.",
          "documented", // source: DrMiftahProfile.tsx — Biography
        ),
        p(
          "Patients from across Hyderabad visit him at Neodent's Mehdipatnam and Nampally clinics, including with teeth other clinics have recommended for extraction. Root canal treatment, aimed at keeping the natural tooth where appropriate rather than removing it, is one of the four areas where his specialist training is most directly applied.",
          "documented", // source: DrMiftahProfile.tsx — Biography + SPECIALISATION_CARDS[0].copy
        ),
      ],
    },
    {
      key: "know",
      number: "06",
      heading: "Important to know",
      blocks: [
        list([
          "Not every tooth can be saved. When a tooth is too badly broken down, cracked into the root or unsupported by bone, removal and replacement may be the more reliable option — and that should be discussed openly.",
          "Mild soreness for a few days afterwards is common and usually settles; sudden swelling, severe pain or a filling that comes out should be reported to the clinic.",
          "A root-treated tooth can become brittle. A crown or other protective restoration is often advised, particularly for back teeth that take heavy biting forces.",
          "Like any treatment, it can occasionally fail. Infection can persist or return, sometimes years later, and may need retreatment or other options.",
          "The treated tooth no longer feels hot or cold, so new decay may not cause warning pain — regular check-ups matter.",
        ]),
      ],
    },
    {
      key: "before",
      number: "07",
      heading: "Before treatment",
      blocks: [
        p("It helps to come prepared to discuss:"),
        list([
          "your symptoms — when the pain started, what triggers it and whether it wakes you",
          "your medical history and any medicines you take, including blood thinners",
          "previous treatment on the tooth, such as earlier fillings, crowns or a past root canal",
          "how the tooth will be restored afterwards, and the alternatives if the tooth cannot be kept",
        ]),
        p(
          "If the tooth is very painful or swollen, the first appointment may focus on relieving the infection before the rest of the treatment is completed.",
        ),
      ],
    },
    {
      key: "after",
      number: "08",
      heading: "After treatment",
      blocks: [
        p(
          "Numbness wears off over a few hours. The tooth and gum may feel tender for some days while the surrounding tissue settles; over-the-counter pain relief is usually enough, if it is suitable for you.",
        ),
        list([
          "avoid chewing hard food on the tooth until the final filling or crown is in place",
          "keep brushing and flossing as normal, gently around the treated area",
          "attend the follow-up appointment for the permanent restoration — a temporary filling is not designed to last",
        ]),
      ],
    },
    {
      key: "longTerm",
      number: "09",
      heading: "Long-term care",
      blocks: [
        p(
          "A root-treated tooth that is well sealed and properly restored can continue to function like any other tooth for many years. It is cared for in the same way: twice-daily brushing with fluoride toothpaste, cleaning between the teeth, limiting sugary food and drink, and regular dental check-ups so the tooth and its restoration can be monitored on X-ray.",
        ),
        p(
          "Patients who clench or grind their teeth should mention it, as a protective night guard may be suggested to reduce the risk of fracture.",
        ),
      ],
    },
    {
      key: "evidence",
      number: "10",
      heading: "Clinical evidence",
      blocks: [
        p(
          "Radiographs from one root canal treatment at Neodent, taken before, during and after treatment, together with two clinical films. Images and films are shown for patient understanding; every tooth and every outcome is different.",
        ),
      ],
    },
  ],
  cta: { label: "Discuss your treatment", note: CTA_NOTE },
};

/* ================================================================== */
/* 02 — SMILE DESIGNING                                               */
/* ================================================================== */
const smileDesign: TreatmentDossier = {
  id: "smile-design",
  cardNumber: "02",
  eyebrow: "Specialist focus · 02",
  title: "Smile designing",
  subtitle: "Designing a smile that belongs to you",
  name: "Smile designing",
  intro:
    "Smile design is the planning of how the teeth should look within a particular face — their shape, proportion, colour and alignment, the amount of gum that shows, and how they meet when the patient bites. The treatment that follows is chosen to carry out that plan, rather than the plan being bent to fit a single procedure.",
  evidence: { kind: "pair", before: "smileBefore", after: "smileAfter" },
  sections: [
    {
      key: "overview",
      number: "01",
      heading: "What is smile design?",
      blocks: [
        p(
          "A smile is read as a whole. People rarely notice an individual tooth; they notice whether the front teeth suit the face, whether the smile looks balanced from side to side, whether the colour looks natural, and whether the edges of the upper teeth follow the curve of the lower lip.",
        ),
        p(
          "Smile design brings those observations into a written and visual plan before any tooth is changed. The plan may lead to very little treatment — whitening or reshaping — or to more involved restorative work such as veneers, crowns, gum contouring or replacing missing teeth, sometimes combined with orthodontic alignment. The method is decided by the plan, not the other way round.",
        ),
      ],
    },
    {
      key: "why",
      number: "02",
      heading: "Why it may be considered",
      blocks: [
        p("People usually seek smile design because something about their smile makes them hold back. Common concerns include:"),
        list([
          "teeth that are chipped, worn short or unevenly shaped",
          "discolouration that does not respond to whitening",
          "gaps, crowding or teeth that sit out of line",
          "old fillings, crowns or veneers that no longer match",
          "a smile that shows a lot of gum, or very little of the teeth",
          "missing front teeth",
        ]),
        p(
          "Appearance and function are linked. Worn or misaligned teeth can also affect the bite, so a concern that begins as cosmetic sometimes needs a wider assessment.",
        ),
        p(
          "Smile design is not only for people who want a dramatic change. Often the aim is the opposite: a smile that looks healthy, balanced and like the patient's own, so that other people notice the person rather than the teeth.",
        ),
      ],
    },
    {
      key: "involves",
      number: "03",
      heading: "What the process may involve",
      blocks: [
        p(
          "The stages below describe a typical planning sequence. Which treatments are actually used depends entirely on the individual assessment.",
        ),
      ],
      steps: [
        {
          number: "01",
          title: "Smile assessment",
          body: "A discussion of what the patient would like to change, followed by an examination of teeth, gums and bite, and photographs of the face and smile at rest and in motion.",
        },
        {
          number: "02",
          title: "Treatment planning",
          body: "Any underlying problems — decay, gum disease, worn or failing restorations — are identified first, because a new smile has to rest on healthy foundations.",
        },
        {
          number: "03",
          title: "Design",
          body: "Tooth length, width and shape, the midline, the incisal edge line and the shade are planned against the patient's face. Where appropriate, a mock-up lets the patient preview the proposed shape before committing.",
        },
        {
          number: "04",
          title: "Clinical treatment",
          body: "The agreed plan is carried out, using the most conservative combination of treatments that can achieve it — preserving natural tooth structure wherever the plan allows.",
        },
        {
          number: "05",
          title: "Refinement",
          body: "Shape, colour and bite are reviewed and fine-tuned so the result looks and feels right in everyday speech, eating and smiling.",
        },
      ],
    },
    {
      key: "clinical",
      number: "04",
      heading: "Why planning matters",
      blocks: [
        p(
          "The details that make a smile look natural are small: the slight difference in length between central and side teeth, the way the edges catch light, a shade that suits the skin and the whites of the eyes rather than simply being as white as possible. Gum display matters as much as the teeth — an uneven gum line can make well-shaped teeth look wrong.",
        ),
        p(
          "Function sits underneath every aesthetic decision. If new front teeth are made longer, they also change how the jaw guides itself when the patient bites and chews. A design that ignores the bite may look right on the day and chip or wear within months. Planning both together is what allows a result to remain stable.",
        ),
        p("A smile design plan usually considers, together:"),
        list([
          "tooth shape — rounded or squarer outlines, and how they suit the face",
          "proportion — the width of each tooth against its length, and against its neighbours",
          "colour — a shade that looks natural with the skin and the whites of the eyes, not simply the whitest available",
          "alignment — the midline, the angle of each tooth and the curve of the biting edges",
          "gum display — how much gum shows when smiling, and whether the gum line is even",
          "the face — the lips at rest and in a full smile, and the overall balance of the features",
          "the bite — how the teeth meet and guide the jaw, so the result is comfortable and durable",
        ]),
        p(
          "A mock-up — a temporary, removable model of the proposed shape placed over the existing teeth — can let the patient see and feel the design before any permanent change is made. It is also the moment to discuss expectations openly, so that the plan reflects what the patient actually wants.",
        ),
      ],
    },
    {
      key: "approach",
      number: "05",
      heading: "Dr. Miftah's approach",
      blocks: [
        p(
          "Smile designing is one of the four areas where Dr. Miftah's specialist training in Prosthodontics & Implantology is most directly applied: restorative work where appearance matters as much as function, with shape, shade and proportion planned around the patient's own face.",
          "documented", // source: DrMiftahProfile.tsx — SPECIALISATION_CARDS[1].copy
        ),
        p(
          "The case story further down this page shows one smile design case at Neodent in six clinical photographs, from the initial condition through the stages of treatment to the final result. It illustrates the step-by-step planning described here; it is not a promise of a particular outcome.",
        ),
        p(
          "His published clinical research includes a prospective study of patient-reported outcomes with metal-ceramic and all-ceramic fixed partial dentures (Cureus, 2026) — work concerned with how restorations perform from the patient's own point of view.",
          "documented", // source: DrMiftahProfile.tsx — PUBLICATIONS[0]
        ),
      ],
    },
    {
      key: "know",
      number: "06",
      heading: "Important considerations",
      blocks: [
        list([
          "Cosmetic treatment is not appropriate for everyone. Active decay, gum disease or a heavy grinding habit need to be addressed first, and sometimes the right advice is a simpler option or no treatment at all.",
          "Some treatments, such as veneers and crowns, may require the removal of a layer of natural tooth. That cannot be undone, so it should only follow a clear plan and an informed decision.",
          "Porcelain and composite restorations can chip, stain or wear and may need repair or replacement over time.",
          "A good result is one that suits the patient's face and bite — not an idealised template. Expectations should be discussed openly before treatment starts.",
        ]),
        p(
          "Where several options exist, the more conservative one — keeping more of the natural tooth — is generally considered first. Whitening, gentle reshaping or bonding may achieve much of what a patient wants; veneers or crowns are usually reserved for situations where simpler measures cannot meet the plan. Smoking, staining habits, gum health and the condition of existing fillings all influence which approach is sensible and how long the result is likely to last.",
        ),
      ],
    },
    {
      key: "before",
      number: "07",
      heading: "Before treatment",
      blocks: [
        p("It helps to think about and bring:"),
        list([
          "what you like and dislike about your smile, in your own words",
          "photographs of your smile from earlier years, if you have them",
          "any upcoming event you are planning around, so the timeline can be discussed realistically",
          "your medical history, and whether you clench or grind your teeth",
        ]),
        p(
          "The first appointment is usually about listening and examining rather than treating. Photographs, impressions or scans may be taken so the design can be planned away from the chair, and a second visit may be used to talk through the proposed plan, its alternatives, the number of appointments and the likely cost before any decision is made.",
        ),
      ],
    },
    {
      key: "after",
      number: "08",
      heading: "After treatment",
      blocks: [
        p(
          "Depending on the treatment used, the teeth may feel slightly different for a few days — new edges against the lips and tongue, mild sensitivity after preparation or whitening. Speech and bite usually adapt quickly; anything that still feels high or rough after the first days should be checked and adjusted.",
        ),
        p(
          "A review appointment is a normal part of finishing. It allows the shape, the shade and the way the teeth meet to be looked at again once the patient has lived with them, and small refinements to be made where needed.",
        ),
      ],
    },
    {
      key: "longTerm",
      number: "09",
      heading: "Long-term care",
      blocks: [
        list([
          "keep up twice-daily brushing and cleaning between the teeth — the gums frame the smile, and healthy gums keep the margins of restorations clean",
          "limit strongly staining food, drink and tobacco, which can discolour natural teeth and some materials",
          "avoid using front teeth to bite hard objects, open packets or bite nails",
          "wear a night guard if one is recommended for grinding",
          "attend regular reviews so restorations can be polished, checked and maintained",
        ]),
      ],
    },
    {
      key: "evidence",
      number: "10",
      heading: "Clinical evidence",
      blocks: [
        p(
          "Supplied before and after clinical photographs from smile design treatment at Neodent, and the six-step case story on this page. Photographs are shown for patient understanding; results depend on each patient's teeth, gums and treatment plan.",
        ),
      ],
    },
  ],
  cta: { label: "Discuss your treatment", note: CTA_NOTE },
};

/* ================================================================== */
/* 03 — DENTAL IMPLANTS                                               */
/* ================================================================== */
const implants: TreatmentDossier = {
  id: "dental-implants",
  cardNumber: "03",
  eyebrow: "Specialist focus · 03",
  title: "Dental implants",
  subtitle: "Replacing a missing tooth with a planned foundation",
  name: "Dental implants",
  intro:
    "A dental implant replaces the root of a missing tooth. A small post, usually made of titanium or a similar material, is placed in the jawbone; once the bone has healed around it, it supports a crown, bridge or denture. Because it stands on its own, the replacement does not need to lean on the teeth beside it.",
  evidence: { kind: "pair", before: "implantsBefore", after: "implantsAfter" },
  caseInsightId: "implants-case-01",
  sections: [
    {
      key: "overview",
      number: "01",
      heading: "What is a dental implant?",
      blocks: [
        p(
          "An implant restoration has three parts: the implant itself, which sits in the bone like a root; a connector called an abutment; and the visible tooth — a crown, or a bridge or denture when several teeth are missing.",
        ),
        p(
          "Over the weeks and months after placement, bone grows closely against the implant surface. This bond, called osseointegration, is what allows an implant to carry biting forces. It also means implant treatment is a process measured in months, not a single visit.",
        ),
      ],
    },
    {
      key: "why",
      number: "02",
      heading: "Why it may be recommended",
      blocks: [
        p("Implants may be considered when one or more teeth are missing or cannot be saved, for example:"),
        list([
          "a tooth lost to decay, gum disease or injury",
          "a tooth that has been assessed as not restorable",
          "a gap where a bridge would require cutting down healthy neighbouring teeth",
          "a loose or uncomfortable denture that could be stabilised",
        ]),
        p(
          "A gap left unreplaced can allow neighbouring and opposing teeth to drift, and the bone that once held the tooth gradually shrinks. Implants are one option among several; bridges and dentures remain appropriate for many patients.",
        ),
      ],
    },
    {
      key: "involves",
      number: "03",
      heading: "The treatment journey",
      blocks: [
        p(
          "Timelines vary widely with the amount of bone, the position of the tooth and general health. The stages below describe the usual sequence.",
        ),
      ],
      steps: [
        {
          number: "01",
          title: "Assessment",
          body: "Examination, X-rays and often 3D imaging show the height, width and quality of bone, the position of nerves and sinuses, and the health of the gums and remaining teeth.",
        },
        {
          number: "02",
          title: "Treatment planning",
          body: "The final tooth is planned first — its position, size and how it will bite — and the implant position is chosen to support it. Medical history is reviewed, and any need for bone grafting is identified.",
        },
        {
          number: "03",
          title: "Implant placement",
          body: "Under local anaesthetic, the implant is placed into the jawbone through the gum. In some cases a temporary tooth can be fitted; in others the implant is left to heal undisturbed.",
        },
        {
          number: "04",
          title: "Healing",
          body: "Over a period of months, bone integrates with the implant. A temporary replacement may be worn for appearance during this time.",
        },
        {
          number: "05",
          title: "Restoration",
          body: "Once the implant is stable, the abutment and final crown, bridge or denture are made and fitted, and the bite is adjusted.",
        },
      ],
    },
    {
      key: "clinical",
      number: "04",
      heading: "Why planning matters",
      blocks: [
        p(
          "An implant is only as good as the position it is placed in. Too close to a neighbouring root, at the wrong angle, or in bone that is too thin, and even a well-integrated implant can be difficult to restore or to keep clean. Planning from the final tooth backwards is how those problems are avoided.",
        ),
        p(
          "General health is part of that planning. Smoking, poorly controlled diabetes, a history of gum disease, some medicines and previous radiotherapy to the jaw can all affect healing and long-term implant health. These do not always rule implants out, but they change the plan, the timing and the level of follow-up needed — which is why a full medical history is taken before treatment.",
        ),
        p("Some situations call for particularly careful planning, for example:"),
        list([
          "a medical condition such as diabetes, where blood-sugar control can influence healing and gum health",
          "a history of cancer or its treatment, which may affect the bone, the healing response or the timing of surgery — usually discussed with the patient's doctor",
          "implants placed years earlier, sometimes elsewhere, that now have problems with the gum, the bone or the teeth they carry",
          "bone that has thinned since the tooth was lost, which may need grafting — adding bone or bone-substitute material — before or during placement",
          "several missing teeth, where the implants need to work together with the remaining teeth and the bite",
        ]),
        p(
          "In such cases the work is less about the implant itself and more about sequencing: stabilising general and gum health first, assessing what existing work can be kept, and deciding the timing of each stage. Not every complex case is suitable for implants, and sometimes a simpler or removable option is the safer recommendation.",
        ),
      ],
    },
    {
      key: "approach",
      number: "05",
      heading: "Dr. Miftah's approach",
      blocks: [
        p(
          "Dr. Miftah's work centres on restoring what can be saved and rebuilding what cannot — implants, full-mouth rehabilitation and the prosthodontic work that follows. Much of his day is spent on planning before treatment begins.",
          "documented", // source: DrMiftahProfile.tsx — Biography
        ),
        p(
          "Dr. Miftah holds an MDS in Prosthodontics & Implantology and a FICOI (U.S.A.) fellowship, and is Assistant Professor in the Department of Prosthodontics at SB Patil Dental College & Hospital, where he teaches and conducts seminars for dental students.",
          "documented", // source: DrMiftahProfile.tsx — Biography / Education
        ),
        p(
          "His published research includes a clinical evaluation of the relationship between peri-implantitis and implant material (Bioinformation, 2026) and a comparative study of materials used in the prosthetic parts of dental implants (Journal of Pharmacy and Bioallied Sciences, 2024).",
          "documented", // source: DrMiftahProfile.tsx — PUBLICATIONS[1], PUBLICATIONS[2]
        ),
      ],
    },
    {
      key: "know",
      number: "06",
      heading: "Important considerations",
      blocks: [
        list([
          "Implants are not suitable for everyone, and suitability can only be confirmed after examination and imaging.",
          "As with any surgical procedure, there are risks, including infection, bleeding, swelling, and, rarely, injury to nearby nerves, sinuses or teeth.",
          "An implant can fail to integrate, or can lose bone support later. Gum and bone inflammation around an implant — peri-implantitis — is the most important long-term risk, and is more likely in people who smoke, have poorly controlled diabetes or struggle with cleaning.",
          "Implant teeth cannot decay, but the gum and bone around them still need daily care.",
        ]),
      ],
    },
    {
      key: "before",
      number: "07",
      heading: "Before treatment",
      blocks: [
        list([
          "share your full medical history — including diabetes, heart conditions, osteoporosis treatment, cancer treatment and any medicines you take",
          "tell the clinic if you smoke; stopping before and after surgery supports healing",
          "ask about the expected timeline, the number of visits and what you will wear during healing",
          "discuss the alternatives — a bridge, a denture, or leaving the gap — and their trade-offs",
        ]),
        p(
          "It can also help to bring any previous X-rays or records, particularly if implants or other dental work were carried out elsewhere. Where a medical condition is being managed by another doctor, the clinic may suggest coordinating with them — for example on blood-sugar control or medicines — before surgery is scheduled. Planning appointments are usually separate from the surgery itself, so there is time to consider the plan.",
        ),
      ],
    },
    {
      key: "after",
      number: "08",
      heading: "After treatment",
      blocks: [
        p(
          "Some swelling, bruising and tenderness are common for a few days after placement. Patients are generally advised to follow the clinic's specific instructions on pain relief and mouth rinses, eat soft food on the other side, avoid smoking, and keep the area clean as directed. Persistent bleeding, increasing pain or swelling after the first few days, or a fever should be reported.",
        ),
        p(
          "During the healing months the implant should not be overloaded, so a temporary tooth, if one is fitted, may be shaped to avoid heavy biting. Once the final crown or bridge is fitted, it usually takes a short time to get used to; the bite is checked and fine-tuned so that the implant tooth shares the load with the natural teeth.",
        ),
      ],
    },
    {
      key: "longTerm",
      number: "09",
      heading: "Long-term care",
      blocks: [
        list([
          "brush twice daily and clean around the implant with floss, interdental brushes or a water flosser as shown",
          "attend regular reviews and professional cleaning, so the gum and bone around the implant can be checked",
          "report bleeding gums, swelling or any looseness around an implant tooth early",
          "wear a night guard if one is advised for clenching or grinding",
        ]),
        p(
          "With good daily care and regular reviews, implants can serve for many years, but they are not maintenance-free. The crown or bridge on top may eventually need repair or replacement, and the gum and bone around the implant are monitored at each check-up, often with an X-ray from time to time, so that early signs of inflammation can be treated before they threaten the implant.",
        ),
      ],
    },
    {
      key: "evidence",
      number: "10",
      heading: "Clinical evidence",
      blocks: [
        p(
          "Supplied before and after clinical photographs from implant treatment at Neodent. Photographs are shown for patient understanding; implant treatment and its outcome vary from patient to patient.",
        ),
      ],
    },
  ],
  cta: { label: "Discuss your treatment", note: CTA_NOTE },
};

/* ================================================================== */
/* 04 — FULL MOUTH REHABILITATION                                     */
/* ================================================================== */
const rehabilitation: TreatmentDossier = {
  id: "full-mouth-rehabilitation",
  cardNumber: "04",
  eyebrow: "Specialist focus · 04",
  title: "Full mouth rehabilitation",
  subtitle: "Rebuilding function, comfort and confidence",
  name: "Full mouth rehabilitation",
  intro:
    "Full mouth rehabilitation is the planned restoration of most or all of the teeth in both jaws when several problems affect the mouth at once. It is not a single procedure or a list of separate repairs; it is one coordinated treatment plan built around how the whole bite works.",
  evidence: { kind: "pair", before: "rehabBefore", after: "rehabAfter" },
  sections: [
    {
      key: "overview",
      number: "01",
      heading: "What is full mouth rehabilitation?",
      blocks: [
        p(
          "When only one tooth is damaged, it can be treated on its own. When many teeth are worn, broken, missing or heavily restored, treating them one at a time often means each new filling or crown is fitted to a bite that is itself the problem — and the cycle of repairs continues.",
        ),
        p(
          "Full mouth rehabilitation steps back and plans the mouth as a single system: the remaining teeth, the gaps, the gums and bone, the jaw joints and muscles, and the way the upper and lower teeth meet. Individual treatments — root canal treatment, crowns, bridges, implants, dentures, gum treatment — may all be part of it, but they are sequenced to serve one goal.",
        ),
      ],
    },
    {
      key: "why",
      number: "02",
      heading: "Why it may be needed",
      blocks: [
        p("A full mouth approach may be considered when several of these occur together:"),
        list([
          "many teeth that are worn down, chipped or broken — often from grinding or acid erosion",
          "a bite that has collapsed or no longer meets comfortably",
          "several missing teeth, with remaining teeth drifting into the gaps",
          "multiple failing crowns, bridges or large fillings",
          "difficulty chewing, jaw discomfort, or a face that looks shorter in the lower third",
        ]),
        p(
          "People who reach this point have often lived with the problem for years and had several separate repairs along the way. Many describe avoiding certain foods, hiding their smile in photographs, or feeling that each new filling only buys a little time. A coordinated plan aims to break that cycle — restoring comfortable chewing and a stable bite first, and with them, where appropriate, the confidence to smile and eat normally again.",
        ),
      ],
    },
    {
      key: "involves",
      number: "03",
      heading: "A typical treatment pathway",
      blocks: [
        p(
          "Rehabilitation is usually carried out in phases over several months. The sequence below is typical; the content of each phase depends entirely on the patient.",
        ),
      ],
      steps: [
        {
          number: "01",
          title: "Comprehensive assessment",
          body: "A detailed examination of teeth, gums, bone, jaw joints and muscles, with X-rays, photographs and records of how the teeth meet.",
        },
        {
          number: "02",
          title: "Diagnosis",
          body: "Identifying why the mouth has reached its current state — wear, decay, gum disease, tooth loss, grinding — so the causes are treated, not only the damage.",
        },
        {
          number: "03",
          title: "Treatment planning",
          body: "Deciding which teeth can be kept, which need to be replaced and how, and the bite the final restorations should create. Options and their trade-offs are discussed before anything begins.",
        },
        {
          number: "04",
          title: "Rehabilitation",
          body: "Foundations first — infection, decay and gum health — then the restorative work, often tested in temporary form so comfort, speech and appearance can be checked before permanent restorations are made.",
        },
        {
          number: "05",
          title: "Final refinement",
          body: "Permanent restorations are fitted and the bite is balanced across both jaws.",
        },
        {
          number: "06",
          title: "Maintenance",
          body: "Regular reviews, professional cleaning and, often, a night guard to protect the rebuilt mouth.",
        },
      ],
    },
    {
      key: "clinical",
      number: "04",
      heading: "Why complex cases require planning",
      blocks: [
        p(
          "In a mouth with many problems, every decision affects another. Changing the height of the back teeth changes how the front teeth meet; keeping a doubtful tooth may compromise the bridge that depends on it; an implant placed before the bite is decided may end up in the wrong position. The order of treatment is as important as the treatment itself.",
        ),
        p(
          "Testing the planned bite in temporary restorations is one of the safeguards: it lets the patient and the clinician see how the new bite feels in daily life before it is made permanent.",
        ),
        p("Planning a full mouth case typically means weighing, for each part of the mouth:"),
        list([
          "which teeth can be kept predictably — with root canal treatment, a crown or gum treatment — and which cannot",
          "how missing teeth should be replaced — implants, bridges, dentures, or a combination",
          "the bite — the height and position at which the upper and lower teeth should meet, so the jaw muscles and joints are comfortable",
          "appearance — the shape, length and colour of the front teeth, planned with the face as in smile design",
          "the order of work, so that each stage supports the next and nothing has to be redone",
          "the patient's priorities, health, time and budget, which may favour a phased or simpler plan",
        ]),
      ],
    },
    {
      key: "approach",
      number: "05",
      heading: "Dr. Miftah's approach",
      blocks: [
        p(
          "Dr. Miftah's work centres on restoring what can be saved and rebuilding what cannot — implants, full-mouth rehabilitation and the prosthodontic work that follows. Patients visit him with missing teeth, failing crowns and bridges, worn or collapsed bites, and teeth other clinics have recommended for extraction.",
          "documented", // source: DrMiftahProfile.tsx — Biography
        ),
        // SIGN-OFF REQUIRED: "more than fifteen years" — already published in
        // DrMiftahProfile.tsx (Biography) and ClinicalLeadership.tsx ("15+ years");
        // confirm with Dr. Miftah / Neodent before any change.
        p(
          "In his practice, full mouth rehabilitation means rebuilding an entire bite — function, alignment and appearance together — planned as one treatment rather than a series of separate repairs. Much of his day is spent on planning before treatment begins, and he brings more than fifteen years of clinical practice to Neodent.",
          "documented", // source: DrMiftahProfile.tsx — SPECIALISATION_CARDS[3].copy + Biography
        ),
      ],
    },
    {
      key: "know",
      number: "06",
      heading: "What patients should expect",
      blocks: [
        list([
          "Not every patient needs every treatment. A rehabilitation plan may be extensive or comparatively limited; the aim is the least treatment that reliably solves the problem.",
          "Treatment usually takes several months and many appointments, with a period in temporary restorations.",
          "It is a significant investment of time and cost; phased plans can sometimes spread treatment over a longer period.",
          "Restorations can chip, wear or need replacement in future, particularly if grinding continues untreated.",
        ]),
        p(
          "Because full mouth rehabilitation combines several kinds of treatment, it also combines their considerations: the risks of any surgery or extraction, the need for root canal treatment on some teeth, and the maintenance that crowns, bridges and implants require. These are explained stage by stage, and the plan can be reviewed if circumstances change along the way.",
        ),
      ],
    },
    {
      key: "before",
      number: "07",
      heading: "Before treatment",
      blocks: [
        list([
          "describe what bothers you most — chewing, comfort, appearance, or all three",
          "bring details of previous dental work and any old X-rays you have",
          "share your full medical history and medicines",
          "ask how the treatment will be phased, how long each stage takes and what you will wear in between",
        ]),
      ],
    },
    {
      key: "after",
      number: "08",
      heading: "After treatment",
      blocks: [
        p(
          "A rebuilt bite takes time to get used to. Speech, chewing and the feel of the teeth against the tongue and lips usually adapt over days to weeks. Follow-up visits allow small adjustments, which are a normal part of finishing complex treatment, not a sign that something has gone wrong.",
        ),
        p(
          "Because the work is spread over several stages, patients are usually given care instructions for each one — what to eat while temporary restorations are in place, how to clean around new crowns, bridges or implants, and when to return for review.",
        ),
      ],
    },
    {
      key: "longTerm",
      number: "09",
      heading: "Maintenance",
      blocks: [
        list([
          "daily cleaning around every crown, bridge and implant, including between teeth and under bridges",
          "regular reviews and professional cleaning at the interval advised",
          "a night guard where grinding or clenching contributed to the original damage",
          "early attention to any chip, looseness or change in the bite",
        ]),
        p(
          "A rebuilt mouth lasts longer when whatever caused the original damage is addressed — grinding, acid erosion, gum disease or decay. Keeping those causes under control, alongside regular professional care, is what allows the result to remain comfortable and functional over time.",
        ),
      ],
    },
    {
      key: "evidence",
      number: "10",
      heading: "Clinical evidence",
      blocks: [
        p(
          "Supplied before and after clinical photographs from full mouth rehabilitation at Neodent. Photographs are shown for patient understanding; each rehabilitation plan is individual.",
        ),
      ],
    },
  ],
  cta: { label: "Discuss your treatment", note: CTA_NOTE },
};

export const TREATMENT_DOSSIERS: TreatmentDossier[] = [rootCanal, smileDesign, implants, rehabilitation];

export function dossierForCard(cardNumber: string) {
  return TREATMENT_DOSSIERS.find((d) => d.cardNumber === cardNumber);
}
