import type { StableBodyRegionId } from "./bodyMapRegions";
import {
  getPadPlacementAnchor,
  type OverlayBaseImageKey,
  type PadPlacementOverlayView,
} from "./padPlacementAnchors";

export type PadOverlayPoint = {
  id: "pad1" | "pad2";
  x: number;
  y: number;
  label?: string;
  anchorId?: string;
  technicalAnchor?: string;
};

export type PadOverlayView = {
  id: string;
  title?: string;
  view: PadPlacementOverlayView;
  regionId: StableBodyRegionId;
  imageKey: OverlayBaseImageKey;
  pads: PadOverlayPoint[];
};

export type PadPlacementVisualDefinition = {
  id: string;
  regionId: StableBodyRegionId;
  chipLabel: string;
  technicalArea?: string;
  views: PadOverlayView[];
};

type PadAnchorReference = {
  padId: "pad1" | "pad2";
  anchorId: string;
  label?: string;
};

type PadPlacementVisualSource = {
  id: string;
  regionId: StableBodyRegionId;
  chipLabel: string;
  technicalArea?: string;
  padAnchors: PadAnchorReference[];
};

/**
 * RULE-LEVEL VISUALS BUILT FROM REUSABLE TECHNICAL ANCHORS
 *
 * Do not place raw x/y coordinates here.
 * Each visual references named anchors from padPlacementAnchors.ts.
 *
 * Technical anchor data controls the visual.
 * Plain-language wording remains user-facing explanation.
 */
const PAD_PLACEMENT_VISUAL_SOURCES: PadPlacementVisualSource[] = [
  // HEAD / FACE / JAW
  {
    id: "head-forehead-head-neck",
    regionId: "head",
    chipLabel: "Forehead",
    technicalArea: "Frontal region to Suboccipital / Upper Cervical region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "above_eyebrow_midline",
        label: "Pad 1 — Forehead",
      },
      {
        padId: "pad2",
        anchorId: "suboccipital_upper_cervical",
        label: "Pad 2 — Back Neck",
      },
    ],
  },
  {
    id: "head-temple-head-neck",
    regionId: "head",
    chipLabel: "Temple",
    technicalArea: "Temporalis / temple region to Suboccipital / Upper Cervical region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "temple_temporalis",
        label: "Pad 1 — Temple",
      },
      {
        padId: "pad2",
        anchorId: "suboccipital_upper_cervical",
        label: "Pad 2 — Back Neck",
      },
    ],
  },
  {
    id: "head-jaw-tmj",
    regionId: "head",
    chipLabel: "Jaw / TMJ",
    technicalArea: "TMJ / Masseter region to Temporalis / temple support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "tmj_masseter",
        label: "Pad 1 — TMJ / Jaw",
      },
      {
        padId: "pad2",
        anchorId: "temple_temporalis",
        label: "Pad 2 — Temple",
      },
    ],
  },
  {
    id: "head-cheek-sinus",
    regionId: "head",
    chipLabel: "Cheek",
    technicalArea: "Maxillary sinus / cheek region to Frontal sinus support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "maxillary_sinus_cheek",
        label: "Pad 1 — Cheek",
      },
      {
        padId: "pad2",
        anchorId: "frontal_sinus_area",
        label: "Pad 2 — Forehead",
      },
    ],
  },
  {
    id: "head-sinus",
    regionId: "head",
    chipLabel: "Sinus",
    technicalArea: "Frontal sinus region to Maxillary sinus / cheek region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "frontal_sinus_area",
        label: "Pad 1 — Frontal Sinus",
      },
      {
        padId: "pad2",
        anchorId: "maxillary_sinus_cheek",
        label: "Pad 2 — Cheek Sinus",
      },
    ],
  },
  {
    id: "head-ear-area",
    regionId: "head",
    chipLabel: "Ear Area",
    technicalArea: "Preauricular / ear-area support region to Upper Cervical region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "ear_area_support",
        label: "Pad 1 — Ear Area",
      },
      {
        padId: "pad2",
        anchorId: "upper_cervical_midline",
        label: "Pad 2 — Upper Cervical",
      },
    ],
  },

  // ABDOMEN / GUT
  {
    id: "abdomen-gut-general-support",
    regionId: "abdomen",
    chipLabel: "General Gut Support",
    technicalArea: "Upper abdomen to lower abdomen support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "upper_abdomen_support",
        label: "Pad 1 — Upper Abdomen",
      },
      {
        padId: "pad2",
        anchorId: "lower_abdomen_support",
        label: "Pad 2 — Lower Abdomen",
      },
    ],
  },
  {
    id: "abdomen-side-support",
    regionId: "abdomen",
    chipLabel: "Side Abdomen",
    technicalArea: "Left abdomen to right abdomen support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "left_abdomen_support",
        label: "Pad 1 — Left Abdomen",
      },
      {
        padId: "pad2",
        anchorId: "right_abdomen_support",
        label: "Pad 2 — Right Abdomen",
      },
    ],
  },

  // NECK
  {
    id: "neck-base-of-skull",
    regionId: "neck",
    chipLabel: "Base of Skull",
    technicalArea: "Suboccipital / Upper Cervical region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "suboccipital_upper_cervical",
        label: "Pad 1 — Base of Skull",
      },
      {
        padId: "pad2",
        anchorId: "upper_cervical_midline",
        label: "Pad 2 — Upper Cervical",
      },
    ],
  },
  {
    id: "neck-upper-cervical",
    regionId: "neck",
    chipLabel: "Upper Cervical",
    technicalArea: "Upper Cervical region to Suboccipital region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "upper_cervical_midline",
        label: "Pad 1 — Upper Cervical",
      },
      {
        padId: "pad2",
        anchorId: "suboccipital_upper_cervical",
        label: "Pad 2 — Suboccipital",
      },
    ],
  },

  {
    id: "neck-front-general-support",
    regionId: "neck",
    chipLabel: "Front Neck",
    technicalArea:
      "Anterior-lateral cervical support region. Avoid direct front-throat or carotid placement unless guided by a qualified professional.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "front_neck_upper_lateral",
        label: "Pad 1 — Upper Front Neck",
      },
      {
        padId: "pad2",
        anchorId: "front_neck_lower_lateral",
        label: "Pad 2 — Lower Front Neck",
      },
    ],
  },

  // SHOULDER
  {
    id: "shoulder-front-coracoid",
    regionId: "shoulder",
    chipLabel: "Front Shoulder / Coracoid Area",
    technicalArea:
      "Anterior shoulder / Coracoid Process region to Posterior rotator cuff / Infraspinatus-Teres region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "anterior_shoulder_coracoid",
        label: "Pad 1 — Front Shoulder",
      },
      {
        padId: "pad2",
        anchorId: "posterior_rotator_cuff_back",
        label: "Pad 2 — Rotator Cuff",
      },
    ],
  },
  {
    id: "shoulder-ac-joint",
    regionId: "shoulder",
    chipLabel: "Top Shoulder / AC Joint",
    technicalArea:
      "AC Joint / superior shoulder region to Levator scapulae / superior scapular region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "ac_joint_superior_shoulder",
        label: "Pad 1 — AC Joint",
      },
      {
        padId: "pad2",
        anchorId: "levator_scapulae_superior_scapula",
        label: "Pad 2 — Scapular Support",
      },
    ],
  },
  {
    id: "shoulder-rotator-cuff",
    regionId: "shoulder",
    chipLabel: "Rotator Cuff",
    technicalArea:
      "Posterior Rotator Cuff / Infraspinatus-Teres region to Lateral shoulder region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "posterior_rotator_cuff_back",
        label: "Pad 1 — Rotator Cuff",
      },
      {
        padId: "pad2",
        anchorId: "lateral_shoulder_back_support",
        label: "Pad 2 — Lateral Shoulder",
      },
    ],
  },
  {
    id: "shoulder-rear-shoulder",
    regionId: "shoulder",
    chipLabel: "Rear Shoulder",
    technicalArea: "Posterior deltoid region to Scapular stabilizer region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "posterior_deltoid_back",
        label: "Pad 1 — Rear Shoulder",
      },
      {
        padId: "pad2",
        anchorId: "scapular_support_area",
        label: "Pad 2 — Scapular Support",
      },
    ],
  },
  {
    id: "shoulder-scapula",
    regionId: "shoulder",
    chipLabel: "Shoulder Blade / Scapula",
    technicalArea: "Scapular / Rhomboid / Infraspinatus region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "scapular_medial_border",
        label: "Pad 1 — Scapula",
      },
      {
        padId: "pad2",
        anchorId: "infraspinatus_scapula",
        label: "Pad 2 — Infraspinatus",
      },
    ],
  },
  {
    id: "shoulder-upper-trap",
    regionId: "shoulder",
    chipLabel: "Upper Trap",
    technicalArea: "Upper Trapezius to Levator Scapulae / Superior scapular region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "upper_trapezius_back",
        label: "Pad 1 — Upper Trap",
      },
      {
        padId: "pad2",
        anchorId: "levator_scapulae_superior_scapula",
        label: "Pad 2 — Scapular Support",
      },
    ],
  },

  // LOW BACK / SI
  {
    id: "low-back-lumbar-center",
    regionId: "low_back",
    chipLabel: "Lumbar Center",
    technicalArea: "Lumbar paraspinal region to Lumbosacral / Sacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_center",
        label: "Pad 1 — Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "sacrum_center",
        label: "Pad 2 — Sacrum",
      },
    ],
  },
  {
    id: "low-back-left",
    regionId: "low_back",
    chipLabel: "Left Low Back",
    technicalArea: "Left lumbar paraspinal region to Sacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_paraspinal_left",
        label: "Pad 1 — Left Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "sacrum_center",
        label: "Pad 2 — Sacrum",
      },
    ],
  },
  {
    id: "low-back-right",
    regionId: "low_back",
    chipLabel: "Right Low Back",
    technicalArea: "Right lumbar paraspinal region to Sacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_paraspinal_right",
        label: "Pad 1 — Right Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "sacrum_center",
        label: "Pad 2 — Sacrum",
      },
    ],
  },
  {
    id: "low-back-si-joint",
    regionId: "low_back",
    chipLabel: "SI Joint",
    technicalArea:
      "Sacroiliac / SI Joint region to Greater Trochanter or ASIS support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "sacroiliac_joint_left",
        label: "Pad 1 — SI Joint",
      },
      {
        padId: "pad2",
        anchorId: "asis_front_hip_bone",
        label: "Pad 2 — ASIS / Hip",
      },
    ],
  },
  {
    id: "low-back-sacrum",
    regionId: "low_back",
    chipLabel: "Sacrum",
    technicalArea: "Sacral region to Lumbosacral / SI-adjacent support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "sacrum_center",
        label: "Pad 1 — Sacrum",
      },
      {
        padId: "pad2",
        anchorId: "lumbosacral_support",
        label: "Pad 2 — Support",
      },
    ],
  },

  // HIP / GLUTE
  {
    id: "hip-front-hip-flexor",
    regionId: "hip_glute",
    chipLabel: "Front Hip / Hip Flexor",
    technicalArea: "Anterior hip / hip flexor region to ASIS support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "hip_flexor_front",
        label: "Pad 1 — Hip Flexor",
      },
      {
        padId: "pad2",
        anchorId: "asis_front_hip_bone",
        label: "Pad 2 — ASIS",
      },
    ],
  },
  {
    id: "hip-outer-hip",
    regionId: "hip_glute",
    chipLabel: "Outer Hip",
    technicalArea: "Greater Trochanter / Lateral hip region to Glute support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "greater_trochanter_lateral_hip",
        label: "Pad 1 — Outer Hip",
      },
      {
        padId: "pad2",
        anchorId: "deep_glute_piriformis",
        label: "Pad 2 — Glute",
      },
    ],
  },
  {
    id: "hip-glute-glute",
    regionId: "hip_glute",
    chipLabel: "Glute",
    technicalArea: "Glute / Piriformis region to Greater Trochanter / Lateral hip region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "deep_glute_piriformis",
        label: "Pad 1 — Glute",
      },
      {
        padId: "pad2",
        anchorId: "greater_trochanter_lateral_hip",
        label: "Pad 2 — Lateral Hip",
      },
    ],
  },
  {
    id: "hip-piriformis",
    regionId: "hip_glute",
    chipLabel: "Piriformis / Deep Glute",
    technicalArea: "Deep Glute / Piriformis region to Greater Trochanter region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "deep_glute_piriformis",
        label: "Pad 1 — Deep Glute",
      },
      {
        padId: "pad2",
        anchorId: "greater_trochanter_lateral_hip",
        label: "Pad 2 — Outer Hip",
      },
    ],
  },

  // KNEE
  {
    id: "knee-patella",
    regionId: "knee",
    chipLabel: "Kneecap / Patella",
    technicalArea:
      "Quadriceps Tendon / Suprapatellar region to Patellar Tendon / Tibial Tuberosity region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "quadriceps_tendon_suprapatellar",
        label: "Pad 1 — Quad Tendon",
      },
      {
        padId: "pad2",
        anchorId: "patellar_tendon_tibial_tuberosity",
        label: "Pad 2 — Patellar Tendon",
      },
    ],
  },

  // FOOT / ANKLE
  {
    id: "foot-heel",
    regionId: "foot_ankle",
    chipLabel: "Heel",
    technicalArea: "Heel / Calcaneal region to Plantar arch region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "heel_calcaneal_bottom",
        label: "Pad 1 — Heel",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch_bottom",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-arch",
    regionId: "foot_ankle",
    chipLabel: "Arch",
    technicalArea: "Plantar arch region to Heel or Forefoot support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "plantar_arch_bottom",
        label: "Pad 1 — Arch",
      },
      {
        padId: "pad2",
        anchorId: "heel_calcaneal_bottom",
        label: "Pad 2 — Heel",
      },
    ],
  },
  {
    id: "foot-ball-of-foot",
    regionId: "foot_ankle",
    chipLabel: "Ball of Foot",
    technicalArea: "Forefoot / Metatarsal region to Plantar arch pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "forefoot_metatarsal_ball",
        label: "Pad 1 — Ball of Foot",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch_bottom",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-toes",
    regionId: "foot_ankle",
    chipLabel: "Toes",
    technicalArea: "Distal toe / forefoot region to Plantar arch pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "toes_forefoot_distal",
        label: "Pad 1 — Toes",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch_bottom",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-ankle-support",
    regionId: "foot_ankle",
    chipLabel: "Inner Ankle",
    technicalArea: "Ankle support region to Dorsal foot support pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "ankle_front_support",
        label: "Pad 1 — Ankle",
      },
      {
        padId: "pad2",
        anchorId: "dorsal_foot_support",
        label: "Pad 2 — Foot Support",
      },
    ],
  },
  {
    id: "foot-outer-ankle",
    regionId: "foot_ankle",
    chipLabel: "Outer Ankle",
    technicalArea: "Ankle support region to Dorsal foot support pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "ankle_front_support",
        label: "Pad 1 — Ankle",
      },
      {
        padId: "pad2",
        anchorId: "dorsal_foot_support",
        label: "Pad 2 — Foot Support",
      },
    ],
  },

  // ARM / HAND
  {
    id: "arm-forearm",
    regionId: "arm",
    chipLabel: "Forearm",
    technicalArea: "Forearm flexor or extensor muscle-tendon pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "forearm_mid_pathway",
        label: "Pad 1 — Forearm",
      },
      {
        padId: "pad2",
        anchorId: "forearm_upper_pathway",
        label: "Pad 2 — Upper Forearm",
      },
    ],
  },
  {
    id: "arm-elbow",
    regionId: "arm",
    chipLabel: "Elbow",
    technicalArea: "Elbow support region to Forearm pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "elbow_support",
        label: "Pad 1 — Elbow",
      },
      {
        padId: "pad2",
        anchorId: "forearm_mid_pathway",
        label: "Pad 2 — Forearm",
      },
    ],
  },
  {
    id: "arm-wrist-hand",
    regionId: "arm",
    chipLabel: "Wrist",
    technicalArea: "Wrist / hand region to Forearm pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "wrist_hand_support",
        label: "Pad 1 — Wrist",
      },
      {
        padId: "pad2",
        anchorId: "forearm_mid_pathway",
        label: "Pad 2 — Forearm",
      },
    ],
  },
  {
    id: "arm-hand-palm",
    regionId: "arm",
    chipLabel: "Hand / Palm",
    technicalArea: "Hand / palm region to Wrist / forearm pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "wrist_hand_support",
        label: "Pad 1 — Hand",
      },
      {
        padId: "pad2",
        anchorId: "forearm_mid_pathway",
        label: "Pad 2 — Forearm",
      },
    ],
  },
];

function normalize(value?: string | null): string {
  return String(value ?? "").trim().toLowerCase();
}

function getViewTitle(imageKey: OverlayBaseImageKey): string {
  const titles: Record<OverlayBaseImageKey, string> = {
    "abdomen-front": "Abdomen / Gut View",
    "shoulder-front": "Front Shoulder View",
    "shoulder-back": "Back Shoulder View",
    "posterior-shoulder-back": "Posterior Shoulder View",
    "scapula-back": "Scapula / Shoulder Blade View",
    "low-back-back": "Back View",
    "hip-glute-back": "Back Hip / Glute View",
    "hip-front": "Front Hip View",
    "knee-front": "Front Knee View",
    "foot-ankle-front": "Foot / Ankle View",
    "foot-bottom-plantar": "Bottom Foot / Plantar View",
    "arm-front": "Arm View",
    "head-face-front": "Head / Face Front View",
    "head-neck-back": "Head / Neck Back View",
    "neck-front": "Front Neck View",
    "head-side-jaw-tmj": "Jaw / TMJ Side View",
    "sinus-face-front": "Sinus / Face View",
  };

  return titles[imageKey];
}

function buildVisualFromAnchors(
  source: PadPlacementVisualSource
): PadPlacementVisualDefinition {
  const groupedViews = new Map<string, PadOverlayView>();

  source.padAnchors.forEach((padReference) => {
    const anchor = getPadPlacementAnchor(padReference.anchorId);

    if (!anchor) {
      return;
    }

    const viewKey = `${anchor.imageKey}-${anchor.view}-${anchor.regionId}`;

    if (!groupedViews.has(viewKey)) {
      groupedViews.set(viewKey, {
        id: `${source.id}-${viewKey}`,
        title: getViewTitle(anchor.imageKey),
        view: anchor.view,
        regionId: anchor.regionId,
        imageKey: anchor.imageKey,
        pads: [],
      });
    }

    groupedViews.get(viewKey)?.pads.push({
      id: padReference.padId,
      x: anchor.x,
      y: anchor.y,
      label: padReference.label ?? `${padReference.padId.toUpperCase()} — ${anchor.label}`,
      anchorId: anchor.id,
      technicalAnchor: anchor.technicalAnchor,
    });
  });

  return {
    id: source.id,
    regionId: source.regionId,
    chipLabel: source.chipLabel,
    technicalArea: source.technicalArea,
    views: Array.from(groupedViews.values()),
  };
}

export const PAD_PLACEMENT_VISUALS: PadPlacementVisualDefinition[] =
  PAD_PLACEMENT_VISUAL_SOURCES.map(buildVisualFromAnchors);

export function getPadPlacementVisual(
  regionId?: StableBodyRegionId | null,
  chipLabel?: string | null
): PadPlacementVisualDefinition | null {
  const normalizedChip = normalize(chipLabel);

  if (!regionId || !normalizedChip) {
    return null;
  }

  return (
    PAD_PLACEMENT_VISUALS.find(
      (item) =>
        item.regionId === regionId &&
        normalize(item.chipLabel) === normalizedChip
    ) ?? null
  );
}


export function getPadPlacementVisualById(
  visualDefinitionId?: string | null
): PadPlacementVisualDefinition | null {
  if (!visualDefinitionId) {
    return null;
  }

  return (
    PAD_PLACEMENT_VISUALS.find((item) => item.id === visualDefinitionId) ??
    null
  );
}
