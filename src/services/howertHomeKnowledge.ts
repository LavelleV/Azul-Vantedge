import {
  HOWERT_HOME_PROGRAMS,
  type HowertHomeProgram,
  type HowertHomeProgramRiskLevel,
} from "../data/howertHomeProgramLibrary";
import {
  HOWERT_HOME_SETUP_GUIDES,
  type HowertHomeSetupGuide,
  type HowertHomeSetupGuideRiskLevel,
} from "../data/howertHomeSetupGuides";

export type HowertHomeKnowledgeInput = {
  issueText?: string | null;
  selectedBodyArea?: string | null;
  maxPrograms?: number;
  maxGuides?: number;
};

export type HowertHomeKnowledgeProgramMatch = {
  program: HowertHomeProgram;
  score: number;
  matchedTerms: string[];
};

export type HowertHomeKnowledgeGuideMatch = {
  guide: HowertHomeSetupGuide;
  score: number;
  matchedTerms: string[];
};

export type HowertHomeKnowledgeResult = {
  queryText: string;
  programs: HowertHomeKnowledgeProgramMatch[];
  guides: HowertHomeKnowledgeGuideMatch[];
  highestRiskLevel: HowertHomeProgramRiskLevel | HowertHomeSetupGuideRiskLevel | null;
  hasMedicalReferral: boolean;
  hasProfessionalReview: boolean;
  safetyNotes: string[];
};

const BODY_AREA_EXPANSIONS: Record<string, string[]> = {
  head: ["head", "forehead", "migraine", "headache", "concussion", "sinus"],
  neck: ["neck", "cervical", "whiplash", "nerve root", "base of skull"],
  shoulder: ["shoulder", "rotator", "scapula", "joint", "tendon"],
  arm: ["arm", "elbow", "forearm", "hand", "wrist", "nerve"],
  chest: ["chest", "respiratory", "lung", "asthma", "upper respiratory"],
  abdomen: ["abdomen", "stomach", "gut", "nausea", "digestive", "histamine"],
  back: ["back", "spine", "disc", "lumbar", "low back", "stenosis"],
  low_back: ["low back", "lumbar", "si joint", "facet", "disc", "spine"],
  hip: ["hip", "si joint", "pelvis", "glute", "outer hip"],
  pelvis: ["pelvis", "hip", "si joint", "glute", "facet"],
  knee: ["knee", "joint", "patella", "meniscus", "cartilage", "tendon"],
  ankle: ["ankle", "foot", "joint", "sprain", "tendon"],
  foot: ["foot", "ankle", "plantar", "bone spur", "nerve"],
  skin: ["skin", "wound", "burn", "rash", "cellulitis", "histamine"],
};

const ISSUE_EXPANSIONS: Record<string, string[]> = {
  numb: ["numbness", "nerve", "pins and needles", "radiating pain"],
  tingling: ["tingling", "nerve", "pins and needles", "radiating pain"],
  shooting: ["shooting", "nerve", "sharp", "radiating pain"],
  swelling: ["swelling", "joint swelling", "trauma", "inflammation"],
  stiff: ["stiffness", "joint stiffness", "capsule tightness", "range of motion"],
  strain: ["strain", "muscle strain", "injury", "muscle pain"],
  sprain: ["sprain", "joint", "injury", "ligament"],
  fracture: ["fracture", "bone", "x-ray", "medical referral"],
  bruise: ["bruise", "contusion", "bone bruise"],
  wound: ["wound", "skin", "abrasion", "cut", "infection"],
  burn: ["burn", "sunburn", "skin"],
  infection: ["infection", "medical referral", "detox"],
  fever: ["fever", "hydration", "medical referral"],
  asthma: ["asthma", "lung", "respiratory", "medical referral"],
  sinus: ["sinus", "forehead", "infection", "head"],
  migraine: ["migraine", "headache", "neck", "stress", "sinus"],
  headache: ["headache", "migraine", "neck", "stress", "sinus"],
  arthritis: ["arthritis", "joint pain", "stiffness", "bone spur"],
  gout: ["gout", "joint pain", "medical referral"],
  disc: ["disc", "spine", "low back", "herniation", "annular tear"],
  si: ["si joint", "low back", "hip", "pelvis", "facet"],
};

const RISK_WEIGHT: Record<string, number> = {
  info: 0,
  standard: 1,
  caution: 2,
  "professional-review": 3,
  "medical-referral": 4,
};

function normalize(value?: string | number | null): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map(normalize).filter(Boolean)));
}

function buildSearchTerms(input: HowertHomeKnowledgeInput): string[] {
  const baseText = normalize(
    [input.issueText, input.selectedBodyArea].filter(Boolean).join(" ")
  );

  const rawTerms = baseText.split(" ").filter((term) => term.length >= 2);
  const expanded: string[] = [...rawTerms];

  Object.entries(BODY_AREA_EXPANSIONS).forEach(([key, terms]) => {
    if (baseText.includes(key.replace("_", " "))) {
      expanded.push(...terms);
    }
  });

  Object.entries(ISSUE_EXPANSIONS).forEach(([key, terms]) => {
    if (baseText.includes(key)) {
      expanded.push(...terms);
    }
  });

  return unique(expanded);
}

function programSearchText(program: HowertHomeProgram): string {
  return normalize(
    [
      program.programNumber,
      program.protocolCode,
      program.moduleName,
      program.programName,
      program.time,
      program.usesFor,
      program.suggestedFrequency,
      program.precautions,
      program.setups.join(" "),
      program.riskLevel,
      program.tags.join(" "),
      program.notes?.join(" ") ?? "",
    ].join(" ")
  );
}

function guideSearchText(guide: HowertHomeSetupGuide): string {
  return normalize(
    [
      guide.id,
      guide.title,
      guide.category,
      guide.summary,
      guide.rules.join(" "),
      guide.riskLevel,
      guide.tags.join(" "),
    ].join(" ")
  );
}

function scoreText(searchText: string, terms: string[]): { score: number; matchedTerms: string[] } {
  let score = 0;
  const matchedTerms: string[] = [];

  terms.forEach((term) => {
    if (!term) {
      return;
    }

    if (searchText.includes(term)) {
      matchedTerms.push(term);
      score += term.includes(" ") ? 4 : 2;
    }
  });

  return { score, matchedTerms: unique(matchedTerms) };
}

function getHighestRiskLevel(
  programs: HowertHomeKnowledgeProgramMatch[],
  guides: HowertHomeKnowledgeGuideMatch[]
): HowertHomeProgramRiskLevel | HowertHomeSetupGuideRiskLevel | null {
  const riskLevels = [
    ...programs.map((match) => match.program.riskLevel),
    ...guides.map((match) => match.guide.riskLevel),
  ];

  if (!riskLevels.length) {
    return null;
  }

  return riskLevels.sort((a, b) => RISK_WEIGHT[b] - RISK_WEIGHT[a])[0];
}

function buildSafetyNotes(
  programs: HowertHomeKnowledgeProgramMatch[],
  guides: HowertHomeKnowledgeGuideMatch[]
): string[] {
  const notes: string[] = [];

  const referralMatches = programs.filter(
    (match) => match.program.riskLevel === "medical-referral"
  );

  const professionalMatches = programs.filter(
    (match) => match.program.riskLevel === "professional-review"
  );

  const referralGuides = guides.filter(
    (match) => match.guide.riskLevel === "medical-referral"
  );

  if (referralMatches.length || referralGuides.length) {
    notes.push(
      "Manual context includes medical-referral level cautions. Keep guidance conservative and recommend professional or medical review when symptoms are serious, worsening, unusual, neurological, respiratory, infection-related, or injury-related."
    );
  }

  if (professionalMatches.length) {
    notes.push(
      "Manual context includes professional-review level cautions. Suggest clinical assessment when symptoms are complex, persistent, unclear, or not improving."
    );
  }

  if (
    programs.some((match) =>
      normalize(match.program.precautions).includes("hydration")
    ) ||
    guides.some((match) => match.guide.tags.includes("hydration"))
  ) {
    notes.push("Hydration appears in the matched manual context.");
  }

  if (
    programs.some((match) =>
      normalize(match.program.precautions).includes("detox")
    ) ||
    guides.some((match) => match.guide.tags.includes("detox"))
  ) {
    notes.push("Detox support appears in the matched manual context.");
  }

  return unique(notes);
}

export function getHowertHomeKnowledgeForIssue(
  input: HowertHomeKnowledgeInput
): HowertHomeKnowledgeResult {
  const maxPrograms = input.maxPrograms ?? 6;
  const maxGuides = input.maxGuides ?? 4;
  const queryText = normalize(
    [input.issueText, input.selectedBodyArea].filter(Boolean).join(" ")
  );
  const terms = buildSearchTerms(input);

  const programs = HOWERT_HOME_PROGRAMS.map((program) => {
    const { score, matchedTerms } = scoreText(programSearchText(program), terms);

    return {
      program,
      score: score + RISK_WEIGHT[program.riskLevel],
      matchedTerms,
    };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPrograms);

  const guides = HOWERT_HOME_SETUP_GUIDES.map((guide) => {
    const { score, matchedTerms } = scoreText(guideSearchText(guide), terms);

    return {
      guide,
      score: score + RISK_WEIGHT[guide.riskLevel],
      matchedTerms,
    };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxGuides);

  const highestRiskLevel = getHighestRiskLevel(programs, guides);

  return {
    queryText,
    programs,
    guides,
    highestRiskLevel,
    hasMedicalReferral: highestRiskLevel === "medical-referral",
    hasProfessionalReview:
      highestRiskLevel === "professional-review" ||
      highestRiskLevel === "medical-referral",
    safetyNotes: buildSafetyNotes(programs, guides),
  };
}

export function getHowertHomeProgramContextSummary(
  result: HowertHomeKnowledgeResult
): string[] {
  return result.programs.map(({ program }) => {
    return `${program.protocolCode} ${program.programName} (${program.time}) — ${program.usesFor}`;
  });
}

export function getHowertHomeSetupContextSummary(
  result: HowertHomeKnowledgeResult
): string[] {
  return result.guides.map(({ guide }) => {
    return `${guide.title}: ${guide.summary}`;
  });
}
