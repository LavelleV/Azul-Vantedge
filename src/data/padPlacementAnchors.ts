import type { BodyMapView, StableBodyRegionId } from "./bodyMapRegions";

export type OverlayBaseImageKey =
  | "shoulder-front"
  | "low-back-back"
  | "hip-glute-back"
  | "hip-front"
  | "knee-front"
  | "foot-ankle-front"
  | "arm-front";

export type PadPlacementAnchor = {
  id: string;
  label: string;
  technicalAnchor: string;
  regionId: StableBodyRegionId;
  view: BodyMapView | "side";
  imageKey: OverlayBaseImageKey;
  x: number;
  y: number;
};

/**
 * REUSABLE TECHNICAL PAD ANCHOR LIBRARY
 *
 * Define each anatomical anchor once.
 * Visual rules should reference these anchor IDs instead of repeating raw x/y.
 *
 * If a pad looks visually off, adjust the anchor here once and all rules
 * using it improve automatically.
 */
export const PAD_PLACEMENT_ANCHORS: Record<string, PadPlacementAnchor> = {
  // =========================
  // SHOULDER
  // =========================
  anterior_shoulder_coracoid: {
    id: "anterior_shoulder_coracoid",
    label: "Anterior Shoulder / Coracoid",
    technicalAnchor: "Anterior shoulder / Coracoid Process region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 39,
    y: 34,
  },
  ac_joint_top: {
    id: "ac_joint_top",
    label: "AC Joint",
    technicalAnchor: "Acromioclavicular / AC Joint region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 47,
    y: 23,
  },
  lateral_shoulder_support: {
    id: "lateral_shoulder_support",
    label: "Lateral Shoulder",
    technicalAnchor: "Lateral shoulder / Deltoid support region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 29,
    y: 36,
  },
  posterior_rotator_cuff: {
    id: "posterior_rotator_cuff",
    label: "Posterior Rotator Cuff",
    technicalAnchor: "Posterior rotator cuff / Infraspinatus-Teres region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 31,
    y: 41,
  },
  rear_shoulder_posterior: {
    id: "rear_shoulder_posterior",
    label: "Rear Shoulder",
    technicalAnchor: "Posterior shoulder region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 34,
    y: 38,
  },
  scapula_medial: {
    id: "scapula_medial",
    label: "Scapula",
    technicalAnchor: "Shoulder Blade / Scapular region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 57,
    y: 41,
  },
  upper_trapezius: {
    id: "upper_trapezius",
    label: "Upper Trap",
    technicalAnchor: "Upper trapezius region",
    regionId: "shoulder",
    view: "front",
    imageKey: "shoulder-front",
    x: 71,
    y: 17,
  },

  // =========================
  // LOW BACK / SI
  // =========================
  lumbar_center: {
    id: "lumbar_center",
    label: "Lumbar Center",
    technicalAnchor: "Central lumbar region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 50,
    y: 43,
  },
  lumbar_left: {
    id: "lumbar_left",
    label: "Left Lumbar",
    technicalAnchor: "Left lumbar paraspinal region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 45,
    y: 44,
  },
  lumbar_right: {
    id: "lumbar_right",
    label: "Right Lumbar",
    technicalAnchor: "Right lumbar paraspinal region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 55,
    y: 44,
  },
  sacrum_center: {
    id: "sacrum_center",
    label: "Sacrum",
    technicalAnchor: "Sacral region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 50,
    y: 59,
  },
  si_joint_left: {
    id: "si_joint_left",
    label: "Left SI Joint",
    technicalAnchor: "Left Sacroiliac / SI Joint region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 46,
    y: 56,
  },
  si_joint_right: {
    id: "si_joint_right",
    label: "Right SI Joint",
    technicalAnchor: "Right Sacroiliac / SI Joint region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 54,
    y: 56,
  },
  lumbosacral_support_left: {
    id: "lumbosacral_support_left",
    label: "Left Lumbosacral Support",
    technicalAnchor: "Left lumbosacral support region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 43,
    y: 49,
  },
  lumbosacral_support_right: {
    id: "lumbosacral_support_right",
    label: "Right Lumbosacral Support",
    technicalAnchor: "Right lumbosacral support region",
    regionId: "low_back",
    view: "back",
    imageKey: "low-back-back",
    x: 57,
    y: 49,
  },

  // =========================
  // HIP / GLUTE
  // =========================
  glute_center: {
    id: "glute_center",
    label: "Glute Center",
    technicalAnchor: "Central gluteal region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 44,
    y: 60,
  },
  deep_glute_piriformis: {
    id: "deep_glute_piriformis",
    label: "Piriformis / Deep Glute",
    technicalAnchor: "Piriformis / deep glute region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 48,
    y: 58,
  },
  lateral_hip_greater_trochanter: {
    id: "lateral_hip_greater_trochanter",
    label: "Lateral Hip / Greater Trochanter",
    technicalAnchor: "Greater Trochanter / lateral hip region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 30,
    y: 55,
  },
  posterior_hip_support: {
    id: "posterior_hip_support",
    label: "Posterior Hip Support",
    technicalAnchor: "Posterolateral hip support region",
    regionId: "hip_glute",
    view: "back",
    imageKey: "hip-glute-back",
    x: 35,
    y: 48,
  },
  asis_front_hip_bone: {
    id: "asis_front_hip_bone",
    label: "ASIS / Front Hip Bone",
    technicalAnchor: "ASIS / Front hip bone support region",
    regionId: "hip_glute",
    view: "front",
    imageKey: "hip-front",
    x: 63,
    y: 50,
  },
  hip_flexor_front: {
    id: "hip_flexor_front",
    label: "Hip Flexor",
    technicalAnchor: "Anterior hip / Hip flexor region",
    regionId: "hip_glute",
    view: "front",
    imageKey: "hip-front",
    x: 60,
    y: 58,
  },
  front_lateral_hip_support: {
    id: "front_lateral_hip_support",
    label: "Front Lateral Hip",
    technicalAnchor: "Anterolateral hip support region",
    regionId: "hip_glute",
    view: "front",
    imageKey: "hip-front",
    x: 69,
    y: 54,
  },

  // =========================
  // KNEE
  // =========================
  quadriceps_tendon_suprapatellar: {
    id: "quadriceps_tendon_suprapatellar",
    label: "Quadriceps Tendon",
    technicalAnchor: "Quadriceps Tendon / Suprapatellar region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 53,
    y: 38,
  },
  patella_center: {
    id: "patella_center",
    label: "Patella",
    technicalAnchor: "Patellar / kneecap region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 53,
    y: 49,
  },
  patellar_tendon_tibial_tuberosity: {
    id: "patellar_tendon_tibial_tuberosity",
    label: "Patellar Tendon",
    technicalAnchor: "Patellar Tendon / Tibial Tuberosity region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 53,
    y: 61,
  },
  medial_knee: {
    id: "medial_knee",
    label: "Medial Knee",
    technicalAnchor: "Medial knee region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 45,
    y: 50,
  },
  lateral_knee: {
    id: "lateral_knee",
    label: "Lateral Knee",
    technicalAnchor: "Lateral knee region",
    regionId: "knee",
    view: "front",
    imageKey: "knee-front",
    x: 61,
    y: 50,
  },

  // =========================
  // FOOT / ANKLE
  // =========================
  heel_center: {
    id: "heel_center",
    label: "Heel",
    technicalAnchor: "Heel / calcaneal region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 22,
    y: 58,
  },
  plantar_arch: {
    id: "plantar_arch",
    label: "Arch",
    technicalAnchor: "Plantar arch region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 47,
    y: 66,
  },
  forefoot_metatarsal_ball: {
    id: "forefoot_metatarsal_ball",
    label: "Ball of Foot",
    technicalAnchor: "Forefoot / Metatarsal region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 63,
    y: 75,
  },
  toes_distal: {
    id: "toes_distal",
    label: "Toes",
    technicalAnchor: "Toe / distal forefoot region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 80,
    y: 84,
  },
  inner_ankle_medial: {
    id: "inner_ankle_medial",
    label: "Inner Ankle",
    technicalAnchor: "Medial ankle region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 35,
    y: 37,
  },
  outer_ankle_lateral: {
    id: "outer_ankle_lateral",
    label: "Outer Ankle",
    technicalAnchor: "Lateral ankle region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 26,
    y: 45,
  },
  achilles_tendon: {
    id: "achilles_tendon",
    label: "Achilles",
    technicalAnchor: "Achilles tendon region",
    regionId: "foot_ankle",
    view: "front",
    imageKey: "foot-ankle-front",
    x: 19,
    y: 31,
  },

  // =========================
  // ARM / HAND
  // =========================
  upper_arm_deltoid: {
    id: "upper_arm_deltoid",
    label: "Upper Arm",
    technicalAnchor: "Upper arm / Deltoid region",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 43,
    y: 22,
  },
  elbow_joint: {
    id: "elbow_joint",
    label: "Elbow",
    technicalAnchor: "Elbow region",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 43,
    y: 44,
  },
  forearm_upper_pathway: {
    id: "forearm_upper_pathway",
    label: "Upper Forearm",
    technicalAnchor: "Proximal forearm muscle-tendon pathway",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 44,
    y: 54,
  },
  forearm_mid_pathway: {
    id: "forearm_mid_pathway",
    label: "Forearm",
    technicalAnchor: "Forearm flexor / extensor pathway",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 44,
    y: 65,
  },
  wrist_hand: {
    id: "wrist_hand",
    label: "Wrist / Hand",
    technicalAnchor: "Wrist / hand region",
    regionId: "arm",
    view: "front",
    imageKey: "arm-front",
    x: 44,
    y: 85,
  },
};

export function getPadPlacementAnchor(anchorId?: string | null): PadPlacementAnchor | null {
  if (!anchorId) {
    return null;
  }

  return PAD_PLACEMENT_ANCHORS[anchorId] ?? null;
}
