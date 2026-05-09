import type { BodyMapView, StableBodyRegionId } from "./bodyMapRegions";

export type OverlayBaseImageKey =
  | "shoulder-front"
  | "shoulder-back"
  | "posterior-shoulder-back"
  | "scapula-back"
  | "low-back-back"
  | "hip-glute-back"
  | "hip-front"
  | "knee-front"
  | "foot-ankle-front"
  | "foot-bottom-plantar"
  | "arm-front"
  | "head-face-front"
  | "head-neck-back"
  | "head-side-jaw-tmj"
  | "sinus-face-front";

export type PadPlacementOverlayView = BodyMapView | "side" | "bottom";

export type PadPlacementAnchor = {
  id: string;
  label: string;
  technicalAnchor: string;
  regionId: StableBodyRegionId;
  view: PadPlacementOverlayView;
  imageKey: OverlayBaseImageKey;
  x: number;
  y: number;
};

/**
 * REUSABLE TECHNICAL PAD ANCHOR LIBRARY
 *
 * This is the technical placement source for pad visuals.
 * Define each anatomical anchor once, then reuse it across many rules.
 *
 * The plain-language text explains the placement.
 * The technical anchor controls where the pad appears visually.
 *
 * If a placement is visually wrong, tune the anchor here once,
 * not inside every individual rule.
 */
export const PAD_PLACEMENT_ANCHORS: Record<string, PadPlacementAnchor> = {
  // HEAD / FACE / JAW / NECK
  frontal_region_forehead: {
    id: "frontal_region_forehead",
    label: "Forehead",
    technicalAnchor: "Frontal region / forehead above eyebrows",
    regionId: "head",
    view: "front",
    imageKey: "head-face-front",
    x: 50,
    y: 26,
  },
  above_eyebrow_midline: {
    id: "above_eyebrow_midline",
    label: "Above Eyebrows",
    technicalAnchor: "Frontal region above eyebrows",
    regionId: "head",
    view: "front",
    imageKey: "head-face-front",
    x: 50,
    y: 38,
  },
  suboccipital_upper_cervical: {
    id: "suboccipital_upper_cervical",
    label: "Suboccipital",
    technicalAnchor: "Suboccipital / upper cervical region",
    regionId: "head",
    view: "back",
    imageKey: "head-neck-back",
    x: 50,
    y: 39,
  },
  upper_cervical_midline: {
    id: "upper_cervical_midline",
    label: "Upper Cervical",
    technicalAnchor: "Upper cervical region",
    regionId: "neck",
    view: "back",
    imageKey: "head-neck-back",
    x: 50,
    y: 52,
  },
  temple_temporalis: {
    id: "temple_temporalis",
    label: "Temple",
    technicalAnchor: "Temporalis / temple region",
    regionId: "head",
    view: "side",
    imageKey: "head-side-jaw-tmj",
    x: 45,
    y: 30,
  },
  tmj_masseter: {
    id: "tmj_masseter",
    label: "TMJ / Masseter",
    technicalAnchor: "TMJ / masseter region",
    regionId: "head",
    view: "side",
    imageKey: "head-side-jaw-tmj",
    x: 49,
    y: 52,
  },
  ear_area_support: {
    id: "ear_area_support",
    label: "Ear Area",
    technicalAnchor: "Preauricular / ear-area support region",
    regionId: "head",
    view: "side",
    imageKey: "head-side-jaw-tmj",
    x: 62,
    y: 38,
  },
  frontal_sinus_area: {
    id: "frontal_sinus_area",
    label: "Frontal Sinus",
    technicalAnchor: "Frontal sinus region",
    regionId: "head",
    view: "front",
    imageKey: "sinus-face-front",
    x: 50,
    y: 30,
  },
  maxillary_sinus_cheek: {
    id: "maxillary_sinus_cheek",
    label: "Maxillary Sinus",
    technicalAnchor: "Maxillary sinus / cheek region",
    regionId: "head",
    view: "front",
    imageKey: "sinus-face-front",
    x: 50,
    y: 49,
  },

  // SHOULDER / SCAPULA / ROTATOR CUFF
  anterior_shoulder_coracoid: {
    id: "anterior_shoulder_coracoid",
    label: "Anterior Shoulder",
    technicalAnchor: "Anterior shoulder / Coracoid Process region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 38,
    y: 39,
  },
  ac_joint_superior_shoulder: {
    id: "ac_joint_superior_shoulder",
    label: "AC Joint",
    technicalAnchor: "AC Joint / superior shoulder region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 42,
    y: 28,
  },
  upper_trapezius_back: {
    id: "upper_trapezius_back",
    label: "Upper Trap",
    technicalAnchor: "Upper trapezius region",
    regionId: "shoulder",
    view: "back",
    imageKey: "shoulder-back",
    x: 54,
    y: 28,
  },
  levator_scapulae_superior_scapula: {
    id: "levator_scapulae_superior_scapula",
    label: "Levator / Superior Scapula",
    technicalAnchor: "Levator scapulae / superior scapular region",
    regionId: "shoulder",
    view: "back",
    imageKey: "shoulder-back",
    x: 45,
    y: 40,
  },
  posterior_rotator_cuff_back: {
    id: "posterior_rotator_cuff_back",
    label: "Posterior Rotator Cuff",
    technicalAnchor: "Posterior rotator cuff / Infraspinatus-Teres region",
    regionId: "shoulder",
    view: "back",
    imageKey: "posterior-shoulder-back",
    x: 49,
    y: 43,
  },
  posterior_deltoid_back: {
    id: "posterior_deltoid_back",
    label: "Posterior Deltoid",
    technicalAnchor: "Posterior deltoid region",
    regionId: "shoulder",
    view: "back",
    imageKey: "posterior-shoulder-back",
    x: 66,
    y: 47,
  },
  lateral_shoulder_back_support: {
    id: "lateral_shoulder_back_support",
    label: "Lateral Shoulder",
    technicalAnchor: "Lateral / posterior shoulder support region",
    regionId: "shoulder",
    view: "back",
    imageKey: "posterior-shoulder-back",
    x: 69,
    y: 42,
  },
  scapular_medial_border: {
    id: "scapular_medial_border",
    label: "Scapular Border",
    technicalAnchor: "Medial scapular border / rhomboid region",
    regionId: "shoulder",
    view: "back",
    imageKey: "scapula-back",
    x: 45,
    y: 48,
  },
  infraspinatus_scapula: {
    id: "infraspinatus_scapula",
    label: "Infraspinatus",
    technicalAnchor: "Scapular / infraspinatus region",
    regionId: "shoulder",
    view: "back",
    imageKey: "scapula-back",
    x: 56,
    y: 43,
  },
  scapular_support_area: {
    id: "scapular_support_area",
    label: "Scapular Support",
    technicalAnchor: "Scapular stabilizer support region",
    regionId: "shoulder",
    view: "back",
    imageKey: "scapula-back",
    x: 53,
    y: 55,
  },

  // LOW BACK / SI
  lumbar_center: {
    id: "lumbar_center",
    label: "Lumbar Center",
    technicalAnchor: "Central lumbar region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 50,
    y: 45,
  },
  lumbar_paraspinal_left: {
    id: "lumbar_paraspinal_left",
    label: "Left Lumbar",
    technicalAnchor: "Left lumbar paraspinal region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 44,
    y: 46,
  },
  lumbar_paraspinal_right: {
    id: "lumbar_paraspinal_right",
    label: "Right Lumbar",
    technicalAnchor: "Right lumbar paraspinal region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 56,
    y: 46,
  },
  sacroiliac_joint_left: {
    id: "sacroiliac_joint_left",
    label: "SI Joint",
    technicalAnchor: "Sacroiliac / SI Joint region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 49,
    y: 57,
  },
  sacrum_center: {
    id: "sacrum_center",
    label: "Sacrum",
    technicalAnchor: "Sacral region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 50,
    y: 61,
  },
  lumbosacral_support: {
    id: "lumbosacral_support",
    label: "Lumbosacral Support",
    technicalAnchor: "Lumbosacral / SI-adjacent support region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 56,
    y: 52,
  },

  // HIP / GLUTE / PELVIS
  deep_glute_piriformis: {
    id: "deep_glute_piriformis",
    label: "Deep Glute",
    technicalAnchor: "Glute / Piriformis region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 53,
    y: 58,
  },
  greater_trochanter_lateral_hip: {
    id: "greater_trochanter_lateral_hip",
    label: "Greater Trochanter",
    technicalAnchor: "Greater Trochanter / Lateral hip region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 70,
    y: 55,
  },
  asis_front_hip_bone: {
    id: "asis_front_hip_bone",
    label: "ASIS / Front Hip",
    technicalAnchor: "ASIS / Front hip bone support region",
    regionId: "hip_glute",
    view: "front",
    imageKey: "hip-front",
    x: 62,
    y: 50,
  },
  hip_flexor_front: {
    id: "hip_flexor_front",
    label: "Hip Flexor",
    technicalAnchor: "Anterior hip / hip flexor region",
    regionId: "hip_glute",
    view: "front",
    imageKey: "hip-front",
    x: 52,
    y: 58,
  },

  // KNEE
  quadriceps_tendon_suprapatellar: {
    id: "quadriceps_tendon_suprapatellar",
    label: "Quad Tendon",
    technicalAnchor: "Quadriceps Tendon / Suprapatellar region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 53,
    y: 45,
  },
  patellar_tendon_tibial_tuberosity: {
    id: "patellar_tendon_tibial_tuberosity",
    label: "Patellar Tendon",
    technicalAnchor: "Patellar Tendon / Tibial Tuberosity region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 53,
    y: 60,
  },

  // FOOT / ANKLE
  forefoot_metatarsal_ball: {
    id: "forefoot_metatarsal_ball",
    label: "Ball of Foot",
    technicalAnchor: "Forefoot / Metatarsal region",
    regionId: "foot_ankle",
    view: "bottom",
    imageKey: "foot-bottom-plantar",
    x: 53,
    y: 30,
  },
  plantar_arch_bottom: {
    id: "plantar_arch_bottom",
    label: "Plantar Arch",
    technicalAnchor: "Plantar arch region",
    regionId: "foot_ankle",
    view: "bottom",
    imageKey: "foot-bottom-plantar",
    x: 49,
    y: 58,
  },
  heel_calcaneal_bottom: {
    id: "heel_calcaneal_bottom",
    label: "Heel",
    technicalAnchor: "Heel / calcaneal region",
    regionId: "foot_ankle",
    view: "bottom",
    imageKey: "foot-bottom-plantar",
    x: 49,
    y: 84,
  },
  toes_forefoot_distal: {
    id: "toes_forefoot_distal",
    label: "Toes",
    technicalAnchor: "Distal toe / forefoot region",
    regionId: "foot_ankle",
    view: "bottom",
    imageKey: "foot-bottom-plantar",
    x: 54,
    y: 16,
  },
  dorsal_foot_support: {
    id: "dorsal_foot_support",
    label: "Top Foot Support",
    technicalAnchor: "Dorsal foot support pathway",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 54,
    y: 61,
  },
  ankle_front_support: {
    id: "ankle_front_support",
    label: "Ankle Support",
    technicalAnchor: "Anterior ankle support region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 50,
    y: 42,
  },

  // ARM / HAND
  forearm_mid_pathway: {
    id: "forearm_mid_pathway",
    label: "Forearm",
    technicalAnchor: "Forearm flexor or extensor muscle-tendon pathway",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 45,
    y: 62,
  },
  forearm_upper_pathway: {
    id: "forearm_upper_pathway",
    label: "Upper Forearm",
    technicalAnchor: "Proximal forearm flexor or extensor pathway",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 45,
    y: 48,
  },
  elbow_support: {
    id: "elbow_support",
    label: "Elbow",
    technicalAnchor: "Elbow support region",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 45,
    y: 44,
  },
  wrist_hand_support: {
    id: "wrist_hand_support",
    label: "Wrist / Hand",
    technicalAnchor: "Wrist and hand support region",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 45,
    y: 78,
  },
};

export function getPadPlacementAnchor(
  anchorId?: string | null
): PadPlacementAnchor | null {
  if (!anchorId) {
    return null;
  }

  return PAD_PLACEMENT_ANCHORS[anchorId] ?? null;
}
