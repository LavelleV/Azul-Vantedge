import {
  HOME_DEVICE_NAME,
  HOME_PROTOCOL_DISCLAIMER,
  getHomeProtocolByLine,
  type HomeProgramProtocol,
} from './homeProgramProtocols';

export type ProtocolPlanContext = {
  question?: string;
  userQuestion?: string;
  selectedBodyArea?: string | null;
  bodyArea?: string | null;
  taggedArea?: string | null;
  activeDeviceModel?: string | null;
  deviceModel?: string | null;
  activeDevice?: string | null;
};

type ProgramKey = "home" | "pro";

type KnownProtocol = {
  number: number;
  code: string;
  name: string;
  time?: string;
  deviceType?: 'home' | 'pro';
  category?: string;
};

type ProtocolPurpose =
  | "fascia"
  | "muscle"
  | "jointGeneralPain"
  | "painNerve"
  | "jointSwelling"
  | "siFacet"
  | "tendon"
  | "sprainJoint"
  | "cartilageMeniscus"
  | "calmRest"
  | "stressNerveReset"
  | "anxiety"
  | "attentionFocus"
  | "nervousSystemReset"
  | "lymphSwell"
  | "generalInflammation"
  | "systemicInflammation"
  | "neckPain"
  | "spineAlign"
  | "bonePain"
  | "boneBruise"
  | "bruise"
  | "skinWound"
  | "skinSun"
  | "stiffJoint"
  | "stiffMuscleTissue"
  | "circulationVascular";

type ProtocolSet = Record<ProtocolPurpose, KnownProtocol>;

/**
 * Source: user-provided HoweRT / Micro-Sport protocol sheets.
 *
 * Important:
 * Home and PRO line numbers are different.
 * Do not treat protocol numbers as universal across device models.
 */
function homeProtocol(line: number): KnownProtocol {
  const protocol = getHomeProtocolByLine(line) as HomeProgramProtocol | undefined;
  if (!protocol) {
    throw new Error(`Missing ${HOME_DEVICE_NAME} protocol line ${line}`);
  }

  return {
    number: protocol.line,
    code: protocol.code,
    name: protocol.name,
    time: protocol.time,
    deviceType: protocol.deviceType,
    category: protocol.category,
  };
}

const HOME_PROTOCOLS: ProtocolSet = {
  fascia: homeProtocol(21),
  muscle: homeProtocol(20),
  jointGeneralPain: homeProtocol(23),
  painNerve: homeProtocol(24),
  jointSwelling: homeProtocol(19),
  siFacet: homeProtocol(16),
  tendon: homeProtocol(26),
  sprainJoint: homeProtocol(18),
  cartilageMeniscus: homeProtocol(25),
  calmRest: homeProtocol(50),
  stressNerveReset: homeProtocol(46),
  anxiety: homeProtocol(47),
  attentionFocus: homeProtocol(45),
  nervousSystemReset: homeProtocol(58),
  lymphSwell: homeProtocol(60),
  generalInflammation: homeProtocol(70),
  systemicInflammation: homeProtocol(84),
  neckPain: homeProtocol(7),
  spineAlign: homeProtocol(15),
  bonePain: homeProtocol(30),
  boneBruise: homeProtocol(29),
  bruise: homeProtocol(22),
  skinWound: homeProtocol(33),
  skinSun: homeProtocol(34),
  stiffJoint: homeProtocol(38),
  stiffMuscleTissue: homeProtocol(42),
  circulationVascular: homeProtocol(85),
};

const PRO_PROTOCOLS: ProtocolSet = {
  fascia: { number: 23, code: "M2", name: 'Fascia "Heal"', time: "35m x 4" },
  muscle: { number: 22, code: "M1", name: "Musc Strain/Inj", time: "44m" },
  jointGeneralPain: { number: 4, code: "Inj4", name: "Quick Jnt/Gen Pn", time: "15m" },
  painNerve: { number: 5, code: "Inj5", name: "Quick Pn/Nrv", time: "21m" },
  jointSwelling: { number: 2, code: "Inj2", name: "Joint Swelling", time: "50m" },
  siFacet: { number: 40, code: "SPn13", name: "SI & Facet Pn", time: "39m" },
  tendon: { number: 10, code: "JB3", name: "Tendon", time: "27m" },
  sprainJoint: { number: 8, code: "JB1", name: "Sprains & Jnt", time: "41m" },
  cartilageMeniscus: { number: 9, code: "JB2", name: "Joint/Cart/Menis", time: "30m" },
  calmRest: { number: 42, code: "WO2", name: "Calm Down/Rest", time: "45m" },
  stressNerveReset: { number: 47, code: "PO3", name: "Ner Sys Reset", time: "50m" },
  anxiety: { number: 45, code: "PO1", name: "Jnt Run First", time: "34m" },
  attentionFocus: { number: 44, code: "WO1", name: "DOMS/After Ex", time: "25m" },
  nervousSystemReset: { number: 47, code: "PO3", name: "Ner Sys Reset", time: "50m" },
  lymphSwell: { number: 48, code: "PO5", name: "Gen Swell & Lymph", time: "38m" },
  generalInflammation: { number: 87, code: "PRO16", name: "Gen Inflam", time: "43m" },
  systemicInflammation: { number: 56, code: "Well5", name: "GI Distress", time: "1hr, 24m" },
  neckPain: { number: 32, code: "SPn5", name: "Neck Pain", time: "50m" },
  spineAlign: { number: 34, code: "SPn7", name: "Spine Align", time: "42m" },
  bonePain: { number: 19, code: "JB12", name: "Bone Pain", time: "25m" },
  boneBruise: { number: 18, code: "JB11", name: "Bone Bruise", time: "32m" },
  bruise: { number: 3, code: "Inj3", name: "Bruise", time: "28m" },
  skinWound: { number: 6, code: "Inj6", name: "Skin/Wnd/Abrasion", time: "37m" },
  skinSun: { number: 55, code: "Well4", name: "Gen Reset & Rebal", time: "44m" },
  stiffJoint: { number: 45, code: "PO1", name: "Jnt Run First", time: "34m" },
  stiffMuscleTissue: { number: 43, code: "WO3", name: "Quick Jnt&M/Gen Pn", time: "15m" },
  circulationVascular: { number: 52, code: "Well1", name: "Stomach Para Virus", time: "1hr, 1m" },
};

function clean(value?: string | null): string {
  return String(value ?? "").trim();
}

function normalize(value?: string | null): string {
  return clean(value).toLowerCase();
}

function includesAny(source: string, terms: string[]): boolean {
  return terms.some((term) => source.includes(term));
}

function getQuestion(context: ProtocolPlanContext): string {
  return clean(context.question || context.userQuestion);
}

function getArea(context: ProtocolPlanContext): string {
  return clean(context.selectedBodyArea || context.bodyArea || context.taggedArea);
}

function getPatternText(context: ProtocolPlanContext): string {
  return `${normalize(getQuestion(context))} ${normalize(getArea(context))}`;
}

function getProgramKey(context: ProtocolPlanContext): ProgramKey {
  const deviceText = normalize(
    context.activeDeviceModel || context.deviceModel || context.activeDevice
  );

  if (deviceText.includes("pro") || deviceText.includes("professional") || deviceText.includes("clinical")) {
    return "pro";
  }

  return "home";
}

function getProtocols(context: ProtocolPlanContext): ProtocolSet {
  return getProgramKey(context) === "pro" ? PRO_PROTOCOLS : HOME_PROTOCOLS;
}

function protocolLabel(protocol: KnownProtocol): string {
  const base = `#${protocol.number} ${protocol.code} ${protocol.name}`;
  const meta = [protocol.time, protocol.category].filter(Boolean).join(' • ');
  return meta ? `${base} (${meta})` : base;
}

function decorateHomePlan(context: ProtocolPlanContext, lines: string[]): string[] {
  if (getProgramKey(context) !== 'home') {
    return lines;
  }

  return [
    `Home Device Program: ${HOME_DEVICE_NAME}`,
    ...lines,
    `Disclaimer: ${HOME_PROTOCOL_DISCLAIMER}`,
  ];
}

function isSwellingPattern(patternText: string): boolean {
  return includesAny(patternText, [
    "swelling",
    "swollen",
    "inflamed",
    "inflammation",
    "hot",
    "heat",
    "puffy",
  ]);
}

function isNervePattern(patternText: string): boolean {
  return includesAny(patternText, [
    "sharp",
    "burn",
    "burning",
    "tingle",
    "tingling",
    "numb",
    "numbness",
    "sciatic",
    "sciatica",
    "travels",
    "shoots",
    "radiating",
    "nerve",
  ]);
}

function isTightOrStiffPattern(patternText: string): boolean {
  return includesAny(patternText, [
    "tight",
    "tightness",
    "stiff",
    "stiffness",
    "restricted",
    "restriction",
    "stuck",
    "locked",
    "guarded",
  ]);
}

function isMusclePattern(patternText: string): boolean {
  return includesAny(patternText, [
    "strain",
    "strained",
    "pulled",
    "pull",
    "sore",
    "soreness",
    "overuse",
    "cramp",
    "spasm",
    "muscle",
  ]);
}

function buildHipGlutePlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);

  return [
    `Primary: ${protocolLabel(p.fascia)} — use this first when the hip, glute, or pelvis feels stiff, stuck, guarded, or restricted. The goal is to support smoother glide through the tissue instead of chasing pain too aggressively.`,
    `Add-on: ${protocolLabel(p.muscle)} — consider this only if the pain feels more muscular, like a pull, ache, soreness, or strain in the glute, deep buttock, or upper thigh area.`,
    `Optional sequence: Run #${p.fascia.number} first, then #${p.muscle.number} only if stiffness improves but soreness or muscle guarding remains.`,
    `Nerve option: ${protocolLabel(p.painNerve)} — consider this if the discomfort feels sharp, burning, tingling, numb, or travels down the leg.`,
    `SI option: ${protocolLabel(p.siFacet)} — consider this if the pain feels like it starts near the low-back dimple, sacroiliac area, or if the hip feels like it locks up.`,
    isNervePattern(patternText)
      ? `Professional option: Because nerve-like wording is present, escalate if numbness, weakness, loss of function, or worsening pain appears.`
      : `Professional option: If symptoms are complex, worsening, not improving, or outside supportive wellness guidance, request Clinical Assessment with Lavelle.`,
  ];
}

function buildShoulderPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = isSwellingPattern(patternText) ? p.jointSwelling : p.fascia;

  return [
    `Primary: ${protocolLabel(primary)} — use this first when the shoulder feels irritated, guarded, stiff, inflamed, or restricted.`,
    `Add-on: ${protocolLabel(p.fascia)} — add this if the shoulder still feels stuck, bound, restricted, or like the tissues are not gliding smoothly.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if the area feels calmer but stiffness or restricted glide remains.`,
    `Tendon/rotator option: ${protocolLabel(p.tendon)} — consider this if the issue feels like rotator cuff, tendon, pulling, overuse, or shoulder-blade irritation.`,
    `Professional option: If pain increases, range keeps dropping, weakness appears, numbness spreads, or the shoulder feels unstable, request Clinical Assessment with Lavelle or medical evaluation.`,
  ];
}

function buildWristHandPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = isSwellingPattern(patternText) ? p.jointSwelling : p.painNerve;

  return [
    `Primary: ${protocolLabel(primary)} — use this first for wrist or hand discomfort when the exact tissue pattern is unclear.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this only if the wrist, palm, fingers, or forearm feels stiff, tight, restricted, or like movement does not glide smoothly.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if pain settles but stiffness, tightness, or restricted motion remains.`,
    `Tendon option: ${protocolLabel(p.tendon)} — consider this if the issue feels like tendon soreness, gripping strain, repetitive-use irritation, or forearm-to-hand tension.`,
    `Professional option: If numbness, weakness, loss of grip, severe swelling, heat, redness, or worsening symptoms appear, request Clinical Assessment with Lavelle or medical evaluation.`,
  ];
}

function buildKneePlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = isSwellingPattern(patternText) ? p.jointSwelling : p.jointGeneralPain;

  return [
    `Primary: ${protocolLabel(primary)} — use this first for knee discomfort when the exact structure is unclear.`,
    `Add-on: ${protocolLabel(p.fascia)} — add this only if the knee feels stiff, restricted, tight around the joint line, or like the tissues above or below the knee are not gliding well.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if pain settles but stiffness, pressure, or guarded motion remains.`,
    `Cartilage/meniscus option: ${protocolLabel(p.cartilageMeniscus)} — consider this only if the issue feels like joint-line irritation, catching, old meniscus pattern, or cartilage-type knee discomfort.`,
    `Tendon option: ${protocolLabel(p.tendon)} — consider this if the discomfort feels concentrated around the patellar tendon, quad tendon, or tendon-like pulling around the knee.`,
    `Professional option: If there is major swelling, heat, redness, instability, locking, inability to bear weight, or worsening pain, request Clinical Assessment with Lavelle or medical evaluation.`,
  ];
}

function buildLowerLegPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary =
    isMusclePattern(patternText) || includesAny(patternText, ["calf", "shin"])
      ? p.muscle
      : p.painNerve;

  return [
    `Primary: ${protocolLabel(primary)} — use this first when the calf, shin, or lower leg feels tight, sore, strained, or overworked.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the lower leg feels bound, stiff, restricted, or like the calf/shin tissue is not sliding smoothly.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if soreness settles but tightness or restricted glide remains.`,
    `Swelling option: ${protocolLabel(p.lymphSwell)} — consider this only for mild supportive swelling patterns, not sudden red/hot/severe calf symptoms.`,
    `Professional option: If calf pain is severe, sudden, hot, red, swollen, one-sided, or associated with shortness of breath, stop and seek medical care immediately.`,
  ];
}

function buildFootAnklePlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = includesAny(patternText, ["sprain", "rolled", "twist", "twisted"])
    ? p.sprainJoint
    : isSwellingPattern(patternText)
      ? p.jointSwelling
      : p.jointGeneralPain;

  return [
    `Primary: ${protocolLabel(primary)} — use this first for foot or ankle discomfort when the exact pattern is unclear.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the arch, heel, ankle, or toes feel stiff, tight, restricted, or like the foot is not moving smoothly.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if pain settles but stiffness or restricted foot/ankle glide remains.`,
    `Tendon/Achilles option: ${protocolLabel(p.tendon)} — consider this if the issue feels like Achilles, calf-to-heel, arch strain, or overuse soreness.`,
    `Professional option: If there is severe swelling, bruising, inability to bear weight, numbness, deformity, heat, redness, or worsening pain, request Clinical Assessment with Lavelle or medical evaluation.`,
  ];
}

function buildLowBackPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.siFacet)} — use this first when the issue feels centered around the low back, SI joint, sacrum, or facet-style irritation.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the low back feels stiff, guarded, locked, or restricted through the fascia and tissue glide.`,
    `Optional sequence: Run #${p.siFacet.number} first, then #${p.fascia.number} only if the area feels calmer but stiffness or restricted motion remains.`,
    `Muscle option: ${protocolLabel(p.muscle)} — consider this if the pattern feels more like muscle strain, soreness, or overuse around the low back or hip bridge area.`,
    `Professional option: If pain travels down the leg, numbness or weakness appears, bowel/bladder changes occur, or symptoms worsen, request medical evaluation immediately or Clinical Assessment with Lavelle when appropriate.`,
  ];
}

function buildNeckPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = isTightOrStiffPattern(patternText) ? p.neckPain : p.painNerve;

  return [
    `Primary: ${protocolLabel(primary)} — use this first when the neck feels irritated, tense, guarded, or difficult to move comfortably.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the neck feels stuck, bound, restricted, or like the tissue is not gliding smoothly.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if the area feels calmer but stiffness or restricted motion remains.`,
    `Nervous-system option: ${protocolLabel(p.stressNerveReset)} — consider this if the neck issue appears stress-linked, guarded, or connected to nervous-system tension.`,
    `Professional option: If there is severe headache, dizziness, vision change, numbness, weakness, trauma, or worsening symptoms, request medical evaluation or Clinical Assessment with Lavelle.`,
  ];
}

function buildChestPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.jointGeneralPain)} — use this only for mild, non-emergency chest, rib, or intercostal discomfort when the pattern feels musculoskeletal and not cardiac or breathing-related.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the rib or chest-wall area feels restricted, tight, or like movement and breathing expansion are guarded.`,
    `Optional sequence: Run #${p.jointGeneralPain.number} first, then #${p.fascia.number} only if discomfort settles but rib/chest-wall restriction remains.`,
    `Muscle option: ${protocolLabel(p.muscle)} — consider this if the issue clearly behaves like pec, intercostal, or upper-rib muscle strain.`,
    `Professional option: Chest pain, pressure, shortness of breath, radiating pain, dizziness, or unexplained symptoms require medical evaluation immediately.`,
  ];
}

function buildAbdomenPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.nervousSystemReset)} — use this as a conservative supportive option when the abdomen/gut area feels stress-related, tense, or unsettled.`,
    `Add-on: ${protocolLabel(p.jointGeneralPain)} — consider this only for mild general discomfort when medical red flags are not present and the pattern is not severe or unexplained.`,
    `Optional sequence: Run #${p.nervousSystemReset.number} first, then reassess before adding anything else.`,
    `Hold-off option: Hold off on additional protocols if pain is sharp, severe, worsening, feverish, one-sided, or unexplained.`,
    `Professional option: Abdominal pain can be medical. Severe, worsening, fever-related, persistent, or unexplained abdominal symptoms should be evaluated by a licensed medical professional.`,
  ];
}

function buildThighPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const patternText = getPatternText(context);
  const primary = isMusclePattern(patternText) ? p.muscle : p.jointGeneralPain;

  return [
    `Primary: ${protocolLabel(primary)} — use this first when the thigh feels sore, strained, tight, overworked, or generally uncomfortable.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this if the quad, hamstring, inner thigh, or outer thigh feels bound, restricted, or like it is not gliding well.`,
    `Optional sequence: Run #${primary.number} first, then #${p.fascia.number} only if soreness settles but stiffness or restricted movement remains.`,
    `Nerve option: ${protocolLabel(p.painNerve)} — consider this if discomfort is sharp, burning, tingling, or traveling.`,
    `Professional option: If there is severe swelling, bruising, sudden weakness, heat, redness, or worsening pain, request Clinical Assessment with Lavelle or medical evaluation.`,
  ];
}

function buildHeadPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.nervousSystemReset)} — use this as a conservative nervous-system reset option when head, face, jaw, or temple tension feels stress-linked or overstimulated.`,
    `Add-on: ${protocolLabel(p.painNerve)} — consider this only if the discomfort is mild and general, without red-flag neurological symptoms.`,
    `Optional sequence: Run #${p.nervousSystemReset.number} first, then reassess before adding a second protocol.`,
    `Hold-off option: Hold off on additional protocols if symptoms are severe, sudden, unusual, neurological, or worsening.`,
    `Professional option: Sudden severe headache, facial droop, confusion, vision change, weakness, dizziness, trauma, or neurological symptoms require medical evaluation immediately.`,
  ];
}

function buildAnxietyPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.calmRest)} — start here when the body feels anxious, wired, overstimulated, or unable to settle.`,
    `Add-on: ${protocolLabel(p.nervousSystemReset)} — use this next if the stress pattern feels deeper, whole-body, or neurologically loaded.`,
    `Optional sequence: Run #${p.calmRest.number} first for the immediate anxious pattern, then #${p.nervousSystemReset.number} when the system needs a steadier recovery lane.`,
    `Stress option: ${protocolLabel(p.stressNerveReset)} — consider this if the pattern feels more like stress load, nervous tension, or a reset need.`,
    `Professional option: Request Clinical Assessment with Lavelle if the nervous system remains highly activated, panic symptoms escalate, or the pattern feels too layered for self-guided support.`,
  ];
}

function buildFocusBrainPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.attentionFocus)} — start here when brain fog, focus, attention, or motivation is the main complaint.`,
    `Add-on: ${protocolLabel(p.nervousSystemReset)} — use this next if the pattern feels stress-driven, overstimulated, or neurologically overloaded.`,
    `Optional sequence: Run #${p.attentionFocus.number} first, then #${p.nervousSystemReset.number} if the system feels overloaded rather than simply unfocused.`,
    `Systemic option: ${protocolLabel(p.systemicInflammation)} — consider this when the issue feels more whole-body heavy or fatigued than purely cognitive.`,
    `Professional option: Use medical oversight for diagnosed neurological conditions and request Clinical Assessment with Lavelle for layered supportive sequencing.`,
  ];
}

function buildSystemicPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);

  return [
    `Primary: ${protocolLabel(p.systemicInflammation)} — use this when the person describes fatigue, heaviness, or whole-body inflammatory load.`,
    `Add-on: ${protocolLabel(p.nervousSystemReset)} — use this next if stress overload is clearly part of the systemic picture.`,
    `Optional sequence: Run #${p.systemicInflammation.number} first, then #${p.nervousSystemReset.number} only if the body feels calmer but still overloaded.`,
    `Lymph option: ${protocolLabel(p.lymphSwell)} — consider this if puffiness, swelling, or fluid-load language is present.`,
    `Professional option: Request Clinical Assessment with Lavelle if the whole-body picture is complex, not improving, or feels too layered for self-guided support.`,
  ];
}

function buildDefaultAreaPlan(context: ProtocolPlanContext): string[] {
  const p = getProtocols(context);
  const area = getArea(context) || "the selected area";
  const patternText = getPatternText(context);

  let primary = p.jointGeneralPain;

  if (isSwellingPattern(patternText)) {
    primary = p.jointSwelling;
  } else if (isNervePattern(patternText)) {
    primary = p.painNerve;
  } else if (isTightOrStiffPattern(patternText)) {
    primary = p.fascia;
  } else if (isMusclePattern(patternText)) {
    primary = p.muscle;
  }

  return [
    `Primary: ${protocolLabel(primary)} — use this as the safest starting point for ${area} when the exact tissue pattern is not fully clear.`,
    `Add-on: ${protocolLabel(p.fascia)} — consider this only if the area feels stiff, restricted, guarded, or like the tissue is not gliding smoothly after the first response is reassessed.`,
    `Optional sequence: Run #${primary.number} first, then add #${p.fascia.number} only if symptoms settle but stiffness, tightness, or restricted movement remains.`,
    `Muscle option: ${protocolLabel(p.muscle)} — consider this if the issue feels like strain, soreness, pulling, or overuse.`,
    `Professional option: If symptoms are complex, worsening, not improving, or outside supportive wellness guidance, request Clinical Assessment with Lavelle.`,
  ];
}

export function buildNumberedProtocolPlan(context: ProtocolPlanContext): string[] {
  const area = normalize(getArea(context));
  const patternText = getPatternText(context);
  let plan: string[];

  if (includesAny(area, ["hip", "glute", "pelvis", "piriformis", "si joint"])) {
    plan = buildHipGlutePlan(context);
  } else if (includesAny(area, ["low back", "lumbar", "sacrum", "sacroiliac"])) {
    plan = buildLowBackPlan(context);
  } else if (includesAny(area, ["shoulder", "rotator", "scapula", "upper trap"])) {
    plan = buildShoulderPlan(context);
  } else if (includesAny(area, ["wrist", "hand", "forearm", "elbow", "arm"])) {
    plan = buildWristHandPlan(context);
  } else if (includesAny(area, ["knee", "patella", "kneecap"])) {
    plan = buildKneePlan(context);
  } else if (includesAny(area, ["lower leg", "calf", "shin", "achilles"])) {
    plan = buildLowerLegPlan(context);
  } else if (includesAny(area, ["foot", "ankle", "heel", "arch", "toes"])) {
    plan = buildFootAnklePlan(context);
  } else if (includesAny(area, ["neck", "cervical", "base of skull"])) {
    plan = buildNeckPlan(context);
  } else if (includesAny(area, ["chest", "rib", "sternum", "intercostal", "pectoral"])) {
    plan = buildChestPlan(context);
  } else if (includesAny(area, ["abdomen", "gut", "stomach"])) {
    plan = buildAbdomenPlan(context);
  } else if (includesAny(area, ["thigh", "quad", "hamstring", "adductor", "it band"])) {
    plan = buildThighPlan(context);
  } else if (includesAny(area, ["head", "face", "jaw", "tmj", "temple", "sinus", "ear"])) {
    plan = buildHeadPlan(context);
  } else if (includesAny(area, ["full body", "systemic", "whole body"]) || includesAny(patternText, ["full body", "systemic", "whole body"])) {
    plan = buildSystemicPlan(context);
  } else if (includesAny(patternText, ["anxiety", "anxious", "panic", "stress", "overwhelmed", "racing thoughts"])) {
    plan = buildAnxietyPlan(context);
  } else if (includesAny(patternText, ["focus", "brain fog", "motivation", "memory", "brain health"])) {
    plan = buildFocusBrainPlan(context);
  } else {
    plan = buildDefaultAreaPlan(context);
  }

  return decorateHomePlan(context, plan);
}

function sectionHasProtocolNumber(section: string[]): boolean {
  return section.some((line) => /#\d{1,3}\b/.test(line));
}

export function ensureNumberedProtocolArray(
  existingPlan: string[] | undefined,
  context: ProtocolPlanContext
): string[] {
  const safeExistingPlan = Array.isArray(existingPlan) ? existingPlan : [];

  if (sectionHasProtocolNumber(safeExistingPlan)) {
    return decorateHomePlan(context, safeExistingPlan);
  }

  return buildNumberedProtocolPlan(context);
}
