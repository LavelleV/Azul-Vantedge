import type { StableBodyRegionId } from "./bodyMapRegions";

export type ProtocolPlacementMode =
  | "local"
  | "pathway"
  | "front_back"
  | "head_neck"
  | "systemic"
  | "caution";

export type ProtocolPlacementStrategy = {
  id: string;
  label: string;
  mode: ProtocolPlacementMode;
  regionIds?: StableBodyRegionId[];
  issueKeywords: string[];
  padPlacementKeywords: string[];
  technicalKeywords: string[];
  visualDefinitionId: string;
  plainLanguagePlacement: string;
  technicalPlacement: string;
  safetyNotes?: string[];
};

/**
 * ISSUE-BASED PROTOCOL PLACEMENT STRATEGIES
 *
 * These are not meant to force users into exact words.
 * They give the matcher many ways to understand natural language and
 * connect Azul's generated protocol card to the correct visual placement.
 */
export const PROTOCOL_PLACEMENT_STRATEGIES: ProtocolPlacementStrategy[] = [
  {
    id: "brain_fog_head_neck",
    label: "Brain Fog / Focus / Head-Neck Support",
    mode: "head_neck",
    regionIds: ["head", "neck"],
    issueKeywords: [
      "brain fog",
      "foggy",
      "fog",
      "cloudy",
      "mental fog",
      "focus",
      "clarity",
      "concentration",
      "mental fatigue",
      "can't think",
      "cant think",
      "thinking slow",
      "head feels heavy",
      "attention",
    ],
    padPlacementKeywords: [
      "forehead",
      "above the eyebrows",
      "back of the neck",
      "hairline",
      "head to neck",
    ],
    technicalKeywords: [
      "frontal",
      "frontal region",
      "suboccipital",
      "upper cervical",
      "cervical",
    ],
    visualDefinitionId: "head-forehead-head-neck",
    plainLanguagePlacement:
      "Place one pad comfortably on the forehead above the eyebrows, and place the second near the back of the neck at the hairline.",
    technicalPlacement:
      "Frontal region to Suboccipital / Upper Cervical region.",
    safetyNotes: [
      "Use conservative settings around the head, face, and neck.",
      "If symptoms are sudden, severe, neurological, worsening, or unusual, seek medical evaluation.",
    ],
  },
  {
    id: "stress_nervous_system_head_neck",
    label: "Stress / Nervous-System Reset",
    mode: "head_neck",
    regionIds: ["head", "neck"],
    issueKeywords: [
      "stress",
      "anxiety",
      "overwhelmed",
      "nervous system",
      "calm",
      "tension",
      "wired",
      "overstimulated",
      "can't relax",
      "cant relax",
      "sleep",
      "restless",
    ],
    padPlacementKeywords: [
      "forehead",
      "back of the neck",
      "hairline",
      "head",
      "neck",
    ],
    technicalKeywords: [
      "frontal",
      "suboccipital",
      "upper cervical",
      "parasympathetic",
      "regulation",
    ],
    visualDefinitionId: "head-forehead-head-neck",
    plainLanguagePlacement:
      "Place one pad on the forehead area and the second near the back of the neck at the hairline, using conservative settings.",
    technicalPlacement:
      "Frontal region to Suboccipital / Upper Cervical region.",
    safetyNotes: [
      "Use a conservative first session, especially for sensitive or easily overstimulated users.",
    ],
  },
  {
    id: "sinus_head_face",
    label: "Sinus / Face Pressure Support",
    mode: "head_neck",
    regionIds: ["head"],
    issueKeywords: [
      "sinus",
      "congestion",
      "pressure",
      "face pressure",
      "stuffy",
      "nose",
      "forehead pressure",
      "cheek pressure",
    ],
    padPlacementKeywords: [
      "sinus",
      "forehead",
      "cheek",
      "face",
      "temple",
      "under eye",
    ],
    technicalKeywords: [
      "frontal sinus",
      "maxillary sinus",
      "sinus region",
      "frontal",
      "maxillary",
    ],
    visualDefinitionId: "head-sinus",
    plainLanguagePlacement:
      "Place one pad near the forehead or sinus pressure area, and place the second near the cheek, temple, or nearby support area as appropriate.",
    technicalPlacement:
      "Frontal / Maxillary sinus region to nearby facial support region.",
    safetyNotes: [
      "Use conservative settings around the face.",
      "Avoid placing pads directly over the eyes.",
    ],
  },
  {
    id: "jaw_tmj_face",
    label: "Jaw / TMJ Support",
    mode: "head_neck",
    regionIds: ["head"],
    issueKeywords: [
      "jaw",
      "tmj",
      "clenching",
      "clench",
      "grinding",
      "teeth grinding",
      "jaw tight",
      "jaw pain",
      "temple pain",
      "ear area",
    ],
    padPlacementKeywords: [
      "jaw",
      "tmj",
      "cheek",
      "temple",
      "ear area",
      "masseter",
    ],
    technicalKeywords: [
      "temporomandibular",
      "tmj",
      "masseter",
      "temporalis",
      "mandibular",
    ],
    visualDefinitionId: "head-jaw-tmj",
    plainLanguagePlacement:
      "Place one pad near the jaw/TMJ area where the tension is felt, and place the second near the temple, cheek, or nearby jaw-support pathway.",
    technicalPlacement:
      "TMJ / Masseter region to Temporalis or adjacent mandibular support region.",
    safetyNotes: [
      "Use conservative settings around the face and jaw.",
      "Avoid placing pads directly over the eyes.",
    ],
  },
  {
    id: "headache_head_neck",
    label: "Head Tension / Headache Pattern",
    mode: "head_neck",
    regionIds: ["head", "neck"],
    issueKeywords: [
      "headache",
      "head pain",
      "head tension",
      "pressure headache",
      "temple headache",
      "neck headache",
      "migraine",
    ],
    padPlacementKeywords: [
      "forehead",
      "temple",
      "back of neck",
      "hairline",
      "base of skull",
    ],
    technicalKeywords: [
      "frontal",
      "temporal",
      "suboccipital",
      "upper cervical",
    ],
    visualDefinitionId: "head-forehead-head-neck",
    plainLanguagePlacement:
      "Place one pad near the main head tension area and the second near the back of the neck at the hairline or base-of-skull support area.",
    technicalPlacement:
      "Frontal or Temporal region to Suboccipital / Upper Cervical region.",
    safetyNotes: [
      "Sudden, severe, unusual, or worsening headache symptoms require medical evaluation.",
      "Use conservative settings around the head and neck.",
    ],
  },
  {
    id: "upper_trap_tightness_pain",
    label: "Upper Trap Tightness / Pain",
    mode: "pathway",
    regionIds: ["shoulder", "neck"],
    issueKeywords: [
      "upper trap",
      "trap",
      "trapezius",
      "neck and shoulder",
      "shoulder tension",
      "tight shoulder",
      "tight neck",
      "knot",
      "stiff",
      "sore",
      "pain",
      "tightness",
    ],
    padPlacementKeywords: [
      "top of the shoulder",
      "neck and shoulder meet",
      "shoulder blade",
      "behind",
      "below",
    ],
    technicalKeywords: [
      "upper trapezius",
      "levator scapulae",
      "superior scapular",
      "scapular",
    ],
    visualDefinitionId: "shoulder-upper-trap",
    plainLanguagePlacement:
      "Place one pad on the top of the shoulder where the neck and shoulder meet, and place the second slightly behind or below it toward the shoulder blade.",
    technicalPlacement:
      "Upper Trapezius to Levator Scapulae / Superior scapular region.",
    safetyNotes: [
      "If pain travels with numbness, weakness, or worsening symptoms, request professional evaluation.",
    ],
  },
  {
    id: "neck_to_shoulder_tension",
    label: "Neck-to-Shoulder Tension",
    mode: "pathway",
    regionIds: ["neck", "shoulder"],
    issueKeywords: [
      "neck tension",
      "neck pain",
      "neck stiffness",
      "neck to shoulder",
      "shoulder from neck",
      "turning neck",
      "stiff neck",
    ],
    padPlacementKeywords: [
      "neck",
      "shoulder",
      "top of shoulder",
      "hairline",
      "upper trap",
    ],
    technicalKeywords: [
      "upper cervical",
      "levator scapulae",
      "upper trapezius",
      "cervical",
    ],
    visualDefinitionId: "neck-base-of-skull",
    plainLanguagePlacement:
      "Place one pad near the neck-to-shoulder tension area and place the second along the upper neck or shoulder pathway where the tightness travels.",
    technicalPlacement:
      "Upper Cervical / Levator Scapulae pathway to Upper Trapezius region.",
    safetyNotes: [
      "If symptoms travel into the arm with numbness, weakness, or loss of control, request medical evaluation.",
    ],
  },
  {
    id: "shoulder_blade_tension",
    label: "Shoulder Blade / Scapular Tension",
    mode: "pathway",
    regionIds: ["shoulder"],
    issueKeywords: [
      "shoulder blade",
      "scapula",
      "rhomboid",
      "between shoulder blades",
      "back of shoulder",
      "upper back tension",
    ],
    padPlacementKeywords: [
      "shoulder blade",
      "spine",
      "rear shoulder",
      "nearby",
      "behind shoulder",
    ],
    technicalKeywords: [
      "scapular",
      "rhomboid",
      "infraspinatus",
      "posterior shoulder",
    ],
    visualDefinitionId: "shoulder-scapula",
    plainLanguagePlacement:
      "Place one pad on the sore shoulder-blade area and place the second nearby along the same muscle pathway toward the spine or rear shoulder.",
    technicalPlacement:
      "Scapular / Rhomboid / Infraspinatus region.",
    safetyNotes: [
      "If pain feels chest-related, severe, or unusual, seek medical evaluation.",
    ],
  },
  {
    id: "rotator_cuff_irritation",
    label: "Rotator Cuff / Shoulder Overuse",
    mode: "pathway",
    regionIds: ["shoulder"],
    issueKeywords: [
      "rotator cuff",
      "shoulder pain",
      "shoulder overuse",
      "lifting pain",
      "arm raise",
      "reaching pain",
      "pulling shoulder",
      "tendon",
    ],
    padPlacementKeywords: [
      "back of the shoulder",
      "side of the shoulder",
      "rotator cuff",
      "same shoulder",
    ],
    technicalKeywords: [
      "posterior rotator cuff",
      "infraspinatus",
      "teres",
      "lateral shoulder",
    ],
    visualDefinitionId: "shoulder-rotator-cuff",
    plainLanguagePlacement:
      "Place one pad on the back of the shoulder where the soft muscle area feels sore, and place the second slightly to the side or front of the same shoulder.",
    technicalPlacement:
      "Posterior Rotator Cuff / Infraspinatus-Teres region to Lateral shoulder region.",
    safetyNotes: [
      "If range of motion drops, weakness appears, or the shoulder feels unstable, request professional evaluation.",
    ],
  },
  {
    id: "si_joint_local_or_hip_referral",
    label: "SI Joint / Low-Back-to-Hip Pattern",
    mode: "front_back",
    regionIds: ["low_back", "hip_glute"],
    issueKeywords: [
      "si joint",
      "sacroiliac",
      "low back",
      "back dimple",
      "pelvis",
      "hip pain",
      "one sided low back",
      "low back to hip",
    ],
    padPlacementKeywords: [
      "side of the spine",
      "outer hip",
      "front hip",
      "hip bone",
      "low-back dimple",
    ],
    technicalKeywords: [
      "sacroiliac",
      "si joint",
      "greater trochanter",
      "asis",
      "lumbosacral",
    ],
    visualDefinitionId: "low-back-si-joint",
    plainLanguagePlacement:
      "Place one pad on the sore low-back dimple area just to the side of the spine, and place the second on the same-side outer hip or front hip bone area.",
    technicalPlacement:
      "Sacroiliac / SI Joint region to Greater Trochanter or ASIS support region.",
    safetyNotes: [
      "If symptoms travel strongly down the leg with numbness, weakness, or loss of control, request medical evaluation.",
    ],
  },
  {
    id: "low_back_general_ache",
    label: "General Low-Back Ache / Lumbar Support",
    mode: "local",
    regionIds: ["low_back"],
    issueKeywords: [
      "low back",
      "lower back",
      "lumbar",
      "back ache",
      "back tight",
      "back stiff",
      "sore back",
    ],
    padPlacementKeywords: [
      "low back",
      "lumbar",
      "sacrum",
      "same side",
      "center low back",
    ],
    technicalKeywords: [
      "lumbar",
      "paraspinal",
      "lumbosacral",
      "sacral",
    ],
    visualDefinitionId: "low-back-lumbar-center",
    plainLanguagePlacement:
      "Place one pad over the main low-back tight area and the second slightly lower or nearby along the same low-back support pathway.",
    technicalPlacement:
      "Lumbar paraspinal region to Lumbosacral / Sacral support region.",
    safetyNotes: [
      "If pain is severe, traumatic, worsening, or nerve-like, request professional evaluation.",
    ],
  },
  {
    id: "hip_flexor_anterior_hip",
    label: "Front Hip / Hip Flexor Pattern",
    mode: "local",
    regionIds: ["hip_glute"],
    issueKeywords: [
      "front hip",
      "hip flexor",
      "anterior hip",
      "hip crease",
      "front of hip",
      "hip tightness",
    ],
    padPlacementKeywords: [
      "front of the hip",
      "hip crease",
      "hip flexor",
      "side of the same hip",
      "outer hip bone",
    ],
    technicalKeywords: [
      "anterior hip",
      "iliopsoas",
      "hip flexor",
      "greater trochanter",
      "lateral hip",
    ],
    visualDefinitionId: "hip-front-hip-flexor",
    plainLanguagePlacement:
      "Place one pad on the front of the hip where the crease or hip-flexor tightness feels most active, and place the second on the side of the same hip near the outer hip bone.",
    technicalPlacement:
      "Anterior hip / iliopsoas region to Greater Trochanter / lateral hip support region.",
    safetyNotes: [
      "Avoid forcing deep hip stretching before the area settles.",
    ],
  },
  {
    id: "low_back_sciatic_nerve_pathway",
    label: "Low-Back / Sciatic Nerve Pathway",
    mode: "pathway",
    regionIds: ["low_back", "hip_glute"],
    issueKeywords: [
      "sciatica",
      "sciatic",
      "sciatic nerve",
      "nerve",
      "nerve pain",
      "shooting",
      "shoots",
      "radiating",
      "travels down",
      "traveling down",
      "down my leg",
      "down the leg",
      "down leg",
      "leg pain from back",
      "back to leg",
      "low back to leg",
      "lower back to leg",
      "tingling",
      "numbness",
      "burning",
      "electric",
      "pins and needles",
    ],
    padPlacementKeywords: [
      "low back",
      "upper butt",
      "butt cheek",
      "same-side leg",
      "posterior thigh",
      "back of thigh",
      "sciatic pathway",
      "pain travels",
      "down the leg",
    ],
    technicalKeywords: [
      "lumbar",
      "si-glute",
      "nerve root",
      "sciatic pathway",
      "posterior thigh",
      "lumbar / si-glute",
      "lumbar nerve",
    ],
    visualDefinitionId: "hip-piriformis",
    plainLanguagePlacement:
      "Place one pad near the low back or upper butt-cheek area where the nerve pain seems to start, and place the second pad farther down the same-side leg along the path where the pain travels.",
    technicalPlacement:
      "Lumbar / SI-glute nerve root region to posterior thigh or sciatic pathway region.",
    safetyNotes: [
      "If numbness, weakness, foot drop, bowel/bladder changes, severe back pain, or rapidly worsening symptoms appear, seek medical evaluation immediately.",
    ],
  },
  {
    id: "hip_glute_deep_tension",
    label: "Deep Glute / Piriformis Pattern",
    mode: "pathway",
    regionIds: ["hip_glute"],
    issueKeywords: [
      "glute",
      "butt",
      "butt cheek",
      "piriformis",
      "deep hip",
      "deep glute",
      "sciatic",
      "hip to leg",
    ],
    padPlacementKeywords: [
      "sore butt",
      "deepest",
      "outer hip",
      "back of hip",
      "lateral hip",
    ],
    technicalKeywords: [
      "piriformis",
      "deep glute",
      "greater trochanter",
      "posterolateral hip",
    ],
    visualDefinitionId: "hip-piriformis",
    plainLanguagePlacement:
      "Place one pad on the sore butt-cheek area where the discomfort feels deepest, and place the second toward the outer hip or nearby support pathway.",
    technicalPlacement:
      "Piriformis / Deep Glute region to Greater Trochanter / Posterolateral hip support region.",
    safetyNotes: [
      "If symptoms include strong numbness, weakness, or spreading leg symptoms, request medical evaluation.",
    ],
  },
  {
    id: "knee_front_patella_tendon",
    label: "Front Knee / Patella-Tendon Pattern",
    mode: "local",
    regionIds: ["knee"],
    issueKeywords: [
      "knee",
      "front knee",
      "kneecap",
      "patella",
      "below knee",
      "above knee",
      "patellar tendon",
      "quad tendon",
    ],
    padPlacementKeywords: [
      "kneecap",
      "above the knee",
      "below the knee",
      "front of knee",
      "patellar",
    ],
    technicalKeywords: [
      "patella",
      "patellar tendon",
      "quadriceps tendon",
      "tibial tuberosity",
      "suprapatellar",
    ],
    visualDefinitionId: "knee-patella",
    plainLanguagePlacement:
      "Place one pad near the main front-knee discomfort area and the second above or below the kneecap along the tendon support pathway.",
    technicalPlacement:
      "Patellar region to Quadriceps Tendon or Patellar Tendon / Tibial Tuberosity region.",
    safetyNotes: [
      "If the knee is unstable, significantly swollen, locked, or injured, request professional evaluation.",
    ],
  },
  {
    id: "foot_arch_heel_forefoot",
    label: "Foot / Arch / Heel / Forefoot Pattern",
    mode: "pathway",
    regionIds: ["foot_ankle"],
    issueKeywords: [
      "foot",
      "heel",
      "arch",
      "plantar",
      "ball of foot",
      "forefoot",
      "toe",
      "ankle",
      "achilles",
    ],
    padPlacementKeywords: [
      "heel",
      "arch",
      "ball of foot",
      "forefoot",
      "ankle",
      "achilles",
      "toe",
    ],
    technicalKeywords: [
      "calcaneal",
      "plantar",
      "metatarsal",
      "achilles",
      "medial ankle",
      "lateral ankle",
    ],
    visualDefinitionId: "foot-ankle-support",
    plainLanguagePlacement:
      "Place one pad near the main foot or ankle discomfort area and the second along the related arch, heel, forefoot, or ankle support pathway.",
    technicalPlacement:
      "Foot / ankle local region to related plantar, metatarsal, heel, or ankle support region.",
    safetyNotes: [
      "If there is major swelling, inability to bear weight, or injury concern, request professional evaluation.",
    ],
  },
  {
    id: "arm_elbow_wrist_overuse",
    label: "Arm / Elbow / Wrist Overuse Pattern",
    mode: "pathway",
    regionIds: ["arm"],
    issueKeywords: [
      "arm",
      "elbow",
      "forearm",
      "wrist",
      "hand",
      "grip",
      "typing",
      "tennis elbow",
      "golfer elbow",
      "tendon",
      "overuse",
    ],
    padPlacementKeywords: [
      "forearm",
      "elbow",
      "wrist",
      "hand",
      "upper forearm",
    ],
    technicalKeywords: [
      "forearm",
      "flexor",
      "extensor",
      "wrist",
      "elbow",
      "tendon",
    ],
    visualDefinitionId: "arm-forearm",
    plainLanguagePlacement:
      "Place one pad near the main arm, elbow, wrist, or hand discomfort area and the second along the same forearm muscle-tendon pathway.",
    technicalPlacement:
      "Forearm flexor/extensor pathway to elbow, wrist, or hand support region.",
    safetyNotes: [
      "If numbness, weakness, loss of grip, or spreading symptoms occur, request professional evaluation.",
    ],
  },
  {
    id: "swelling_bruising_injury_local",
    label: "Swelling / Bruising / Injury Support",
    mode: "local",
    regionIds: [
      "shoulder",
      "arm",
      "chest",
      "abdomen",
      "low_back",
      "hip_glute",
      "thigh",
      "knee",
      "lower_leg",
      "foot_ankle",
    ],
    issueKeywords: [
      "swelling",
      "swollen",
      "bruise",
      "bruising",
      "injury",
      "trauma",
      "sprain",
      "strain",
      "impact",
      "fall",
      "hit",
    ],
    padPlacementKeywords: [
      "around the area",
      "near the area",
      "above and below",
      "local area",
    ],
    technicalKeywords: [
      "local tissue",
      "injury",
      "trauma",
      "edema",
      "bruising",
    ],
    visualDefinitionId: "knee-patella",
    plainLanguagePlacement:
      "Place the pads around the affected area rather than directly stacking both pads on the most sensitive spot, using a conservative first session.",
    technicalPlacement:
      "Local injury / trauma support field around the affected tissue region.",
    safetyNotes: [
      "If there is severe pain, deformity, major swelling, suspected fracture, or worsening symptoms, request medical evaluation.",
    ],
  },
  {
    id: "chest_respiratory_support",
    label: "Chest / Respiratory Support",
    mode: "systemic",
    regionIds: ["chest"],
    issueKeywords: [
      "chest",
      "respiratory",
      "breathing",
      "lung",
      "lungs",
      "asthma",
      "cough",
      "cold",
      "virus",
      "upper respiratory",
      "pneumonia",
      "congestion",
      "immune",
    ],
    padPlacementKeywords: [
      "chest",
      "respiratory",
      "upper chest",
      "sternum",
      "lung support",
    ],
    technicalKeywords: [
      "anterior chest",
      "sternum",
      "respiratory",
      "thoracic",
      "lung",
    ],
    visualDefinitionId: "chest-respiratory-general-support",
    plainLanguagePlacement:
      "Use a conservative upper-chest support placement for chest or respiratory support patterns when symptoms are mild and not medically concerning.",
    technicalPlacement:
      "Upper anterior chest / respiratory support field.",
    safetyNotes: [
      "Chest pain, trouble breathing, high fever, severe illness, worsening respiratory symptoms, or medically concerning symptoms require medical evaluation.",
      "Do not place pads over implanted electronic devices such as pacemakers.",
    ],
  },
  {
    id: "systemic_general_wellness",
    label: "Systemic / General Wellness Support",
    mode: "systemic",
    regionIds: [],
    issueKeywords: [
      "wellness",
      "energy",
      "fatigue",
      "tired",
      "immune",
      "stomach",
      "digestion",
      "skin",
      "acne",
      "general support",
      "recovery",
      "virus",
      "sinus",
    ],
    padPlacementKeywords: [
      "systemic",
      "general",
      "support",
      "appropriate placement",
      "body system",
    ],
    technicalKeywords: [
      "systemic",
      "metabolic",
      "general wellness",
      "regulation",
      "support",
    ],
    visualDefinitionId: "abdomen-gut-general-support",
    plainLanguagePlacement:
      "Use the protocol-specific pad placement from the guidance card. When the issue is systemic, the placement may follow a body-system support pattern rather than a local pain point.",
    technicalPlacement:
      "Protocol-specific systemic support placement.",
    safetyNotes: [
      "If symptoms are severe, worsening, unusual, or medically concerning, seek professional evaluation.",
    ],
  },
];

export function getProtocolPlacementStrategyById(
  strategyId?: string | null
): ProtocolPlacementStrategy | null {
  if (!strategyId) {
    return null;
  }

  return (
    PROTOCOL_PLACEMENT_STRATEGIES.find((strategy) => strategy.id === strategyId) ??
    null
  );
}
