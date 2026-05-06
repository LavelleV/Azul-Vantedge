export type BodyMapView = "front" | "back";

export type StableBodyRegionId =
  | "head"
  | "neck"
  | "shoulder"
  | "arm"
  | "chest"
  | "abdomen"
  | "low_back"
  | "hip_glute"
  | "thigh"
  | "knee"
  | "lower_leg"
  | "foot_ankle";

export type RegionImageFile =
  | "head-face-front.png"
  | "neck-front.png"
  | "neck-back.png"
  | "shoulder-front.png"
  | "shoulder-back.png"
  | "arm-front.png"
  | "chest-front.png"
  | "abdomen-front.png"
  | "low-back-back.png"
  | "hip-front.png"
  | "hip-glute-back.png"
  | "thigh-front.png"
  | "knee-front.png"
  | "lower-leg-front.png"
  | "foot-ankle-front.png";

export type PadPlacementImageFile =
  | "head-face-front-placement.png"
  | "neck-front-placement.png"
  | "neck-back-placement.png"
  | "shoulder-front-placement.png"
  | "shoulder-back-placement.png"
  | "arm-front-placement.png"
  | "chest-front-placement.png"
  | "abdomen-front-placement.png"
  | "low-back-back-placement.png"
  | "hip-front-placement.png"
  | "hip-glute-back-placement.png"
  | "thigh-front-placement.png"
  | "knee-front-placement.png"
  | "lower-leg-front-placement.png"
  | "foot-ankle-front-placement.png";

export type BodyMapManifestRegion = {
  id: StableBodyRegionId;
  label: string;
  frontImageFile: RegionImageFile | null;
  backImageFile: RegionImageFile | null;
  placementFrontImageFile: PadPlacementImageFile | null;
  placementBackImageFile: PadPlacementImageFile | null;
  chips: string[];
  detailSupported: boolean;
};

export type BodyMapRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type FullBodyHotspot = {
  id: string;
  regionId: StableBodyRegionId;
  view: BodyMapView;
  tapRect: BodyMapRect;
  priority: number;
};

/**
 * LOCKED BODY-MAP CONTRACT
 *
 * Full-body click -> stable region id -> approved detail image -> chips.
 *
 * This is the locked body-image contract.
 * Stable IDs must remain consistent.
 * Do not substitute unrelated body images.
 * Missing images must show fallback, not blank.
 * Detail images are reference images only; chips are the precise selector.
 */
export const BODY_MAP_MANIFEST: Record<StableBodyRegionId, BodyMapManifestRegion> = {
  head: {
    id: "head",
    label: "Head / Face / Jaw",
    frontImageFile: "head-face-front.png",
    backImageFile: null,
    placementFrontImageFile: "head-face-front-placement.png",
    placementBackImageFile: null,
    chips: ["Forehead", "Temple", "Jaw / TMJ", "Cheek", "Sinus", "Ear Area"],
    detailSupported: true,
  },
  neck: {
    id: "neck",
    label: "Neck",
    frontImageFile: "neck-front.png",
    backImageFile: "neck-back.png",
    placementFrontImageFile: "neck-front-placement.png",
    placementBackImageFile: "neck-back-placement.png",
    chips: ["Front Neck", "Side Neck", "Base of Skull", "Upper Trap", "Cervical Spine"],
    detailSupported: true,
  },
  shoulder: {
    id: "shoulder",
    label: "Shoulder",
    frontImageFile: "shoulder-front.png",
    backImageFile: "shoulder-back.png",
    placementFrontImageFile: "shoulder-front-placement.png",
    placementBackImageFile: "shoulder-back-placement.png",
    chips: [
      "Front Shoulder / Coracoid Area",
      "Top Shoulder / AC Joint",
      "Rotator Cuff",
      "Rear Shoulder",
      "Shoulder Blade / Scapula",
      "Upper Trap",
    ],
    detailSupported: true,
  },
  arm: {
    id: "arm",
    label: "Arm / Hand",
    frontImageFile: "arm-front.png",
    backImageFile: "arm-front.png",
    placementFrontImageFile: "arm-front-placement.png",
    placementBackImageFile: "arm-front-placement.png",
    chips: ["Upper Arm", "Elbow", "Forearm", "Wrist / Hand"],
    detailSupported: true,
  },
  chest: {
    id: "chest",
    label: "Chest / Ribs",
    frontImageFile: "chest-front.png",
    backImageFile: null,
    placementFrontImageFile: "chest-front-placement.png",
    placementBackImageFile: null,
    chips: ["Sternum", "Pectoral Area", "Upper Rib", "Side Rib", "Intercostal Area"],
    detailSupported: true,
  },
  abdomen: {
    id: "abdomen",
    label: "Abdomen / Gut",
    frontImageFile: "abdomen-front.png",
    backImageFile: null,
    placementFrontImageFile: "abdomen-front-placement.png",
    placementBackImageFile: null,
    chips: [
      "Upper Abdomen",
      "Lower Abdomen",
      "Left Abdomen",
      "Right Abdomen",
      "Center Abdomen / Gut",
    ],
    detailSupported: true,
  },
  low_back: {
    id: "low_back",
    label: "Low Back / SI",
    frontImageFile: null,
    backImageFile: "low-back-back.png",
    placementFrontImageFile: null,
    placementBackImageFile: "low-back-back-placement.png",
    chips: ["Lumbar Center", "Left Low Back", "Right Low Back", "Sacrum", "SI Joint"],
    detailSupported: true,
  },
  hip_glute: {
    id: "hip_glute",
    label: "Hip / Glute / Pelvis",
    frontImageFile: "hip-front.png",
    backImageFile: "hip-glute-back.png",
    placementFrontImageFile: "hip-front-placement.png",
    placementBackImageFile: "hip-glute-back-placement.png",
    chips: [
      "Glute",
      "Piriformis / Deep Glute",
      "SI Joint",
      "Lateral Hip / Greater Trochanter",
      "Front Hip / Hip Flexor",
      "Upper Hamstring Origin",
    ],
    detailSupported: true,
  },
  thigh: {
    id: "thigh",
    label: "Thigh",
    frontImageFile: "thigh-front.png",
    backImageFile: "thigh-front.png",
    placementFrontImageFile: "thigh-front-placement.png",
    placementBackImageFile: "thigh-front-placement.png",
    chips: [
      "Quad",
      "Inner Thigh / Adductor",
      "Outer Thigh / IT Band",
      "Hamstring",
      "Upper Thigh",
    ],
    detailSupported: true,
  },
  knee: {
    id: "knee",
    label: "Knee",
    frontImageFile: "knee-front.png",
    backImageFile: "knee-front.png",
    placementFrontImageFile: "knee-front-placement.png",
    placementBackImageFile: "knee-front-placement.png",
    chips: [
      "Kneecap / Patella",
      "Inner Knee",
      "Outer Knee",
      "Back of Knee",
      "Patellar Tendon",
      "Quad Tendon",
    ],
    detailSupported: true,
  },
  lower_leg: {
    id: "lower_leg",
    label: "Lower Leg",
    frontImageFile: "lower-leg-front.png",
    backImageFile: "lower-leg-front.png",
    placementFrontImageFile: "lower-leg-front-placement.png",
    placementBackImageFile: "lower-leg-front-placement.png",
    chips: ["Shin", "Calf", "Outer Lower Leg", "Achilles Area"],
    detailSupported: true,
  },
  foot_ankle: {
    id: "foot_ankle",
    label: "Foot / Ankle",
    frontImageFile: "foot-ankle-front.png",
    backImageFile: "foot-ankle-front.png",
    placementFrontImageFile: "foot-ankle-front-placement.png",
    placementBackImageFile: "foot-ankle-front-placement.png",
    chips: ["Heel", "Arch", "Ball of Foot", "Toes", "Inner Ankle", "Outer Ankle", "Achilles"],
    detailSupported: true,
  },
};

export const STABLE_BODY_REGION_IDS: StableBodyRegionId[] = [
  "head",
  "neck",
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
];

export const BODY_MAP_REGION_LIST = STABLE_BODY_REGION_IDS.map((id) => BODY_MAP_MANIFEST[id]);

/**
 * Broad full-body tap zones.
 *
 * Lower body has been tuned upward because the visual knee/calf anatomy
 * sits higher in the full-body PNG than the previous tap boxes.
 */
export const FULL_BODY_HOTSPOTS: FullBodyHotspot[] = [
  // FRONT
  {
    id: "front-head",
    regionId: "head",
    view: "front",
    priority: 90,
    tapRect: { left: 42, top: 3, width: 16, height: 12 },
  },
  {
    id: "front-neck",
    regionId: "neck",
    view: "front",
    priority: 95,
    tapRect: { left: 42, top: 12, width: 16, height: 9 },
  },
  {
    id: "front-shoulder",
    regionId: "shoulder",
    view: "front",
    priority: 100,
    tapRect: { left: 28, top: 18, width: 44, height: 10 },
  },
  {
    id: "front-left-arm",
    regionId: "arm",
    view: "front",
    priority: 70,
    tapRect: { left: 21, top: 25, width: 17, height: 36 },
  },
  {
    id: "front-right-arm",
    regionId: "arm",
    view: "front",
    priority: 70,
    tapRect: { left: 62, top: 25, width: 17, height: 36 },
  },
  {
    id: "front-chest",
    regionId: "chest",
    view: "front",
    priority: 60,
    tapRect: { left: 34, top: 25, width: 32, height: 16 },
  },
  {
    id: "front-abdomen",
    regionId: "abdomen",
    view: "front",
    priority: 65,
    tapRect: { left: 35, top: 39, width: 30, height: 17 },
  },
  {
    id: "front-hip-glute",
    regionId: "hip_glute",
    view: "front",
    priority: 80,
    tapRect: { left: 31, top: 52, width: 38, height: 11 },
  },
  {
    id: "front-thigh",
    regionId: "thigh",
    view: "front",
    priority: 60,
    tapRect: { left: 31, top: 61, width: 38, height: 8 },
  },
  {
    id: "front-knee",
    regionId: "knee",
    view: "front",
    priority: 120,
    tapRect: { left: 31, top: 68, width: 38, height: 8 },
  },
  {
    id: "front-lower-leg",
    regionId: "lower_leg",
    view: "front",
    priority: 115,
    tapRect: { left: 31, top: 75, width: 38, height: 17 },
  },
  {
    id: "front-foot-ankle",
    regionId: "foot_ankle",
    view: "front",
    priority: 125,
    tapRect: { left: 27, top: 90, width: 46, height: 10 },
  },

  // BACK
  {
    id: "back-head",
    regionId: "head",
    view: "back",
    priority: 90,
    tapRect: { left: 42, top: 3, width: 16, height: 12 },
  },
  {
    id: "back-neck",
    regionId: "neck",
    view: "back",
    priority: 95,
    tapRect: { left: 42, top: 12, width: 16, height: 9 },
  },
  {
    id: "back-shoulder",
    regionId: "shoulder",
    view: "back",
    priority: 100,
    tapRect: { left: 27, top: 18, width: 46, height: 13 },
  },
  {
    id: "back-left-arm",
    regionId: "arm",
    view: "back",
    priority: 70,
    tapRect: { left: 21, top: 27, width: 17, height: 35 },
  },
  {
    id: "back-right-arm",
    regionId: "arm",
    view: "back",
    priority: 70,
    tapRect: { left: 62, top: 27, width: 17, height: 35 },
  },
  {
    id: "back-chest-ribs",
    regionId: "chest",
    view: "back",
    priority: 45,
    tapRect: { left: 34, top: 29, width: 32, height: 12 },
  },
  {
    id: "back-low-back",
    regionId: "low_back",
    view: "back",
    priority: 90,
    tapRect: { left: 34, top: 39, width: 32, height: 16 },
  },
  {
    id: "back-hip-glute",
    regionId: "hip_glute",
    view: "back",
    priority: 85,
    tapRect: { left: 30, top: 53, width: 40, height: 11 },
  },
  {
    id: "back-thigh",
    regionId: "thigh",
    view: "back",
    priority: 60,
    tapRect: { left: 31, top: 62, width: 38, height: 8 },
  },
  {
    id: "back-knee",
    regionId: "knee",
    view: "back",
    priority: 120,
    tapRect: { left: 31, top: 69, width: 38, height: 8 },
  },
  {
    id: "back-lower-leg",
    regionId: "lower_leg",
    view: "back",
    priority: 115,
    tapRect: { left: 31, top: 76, width: 38, height: 16 },
  },
  {
    id: "back-foot-ankle",
    regionId: "foot_ankle",
    view: "back",
    priority: 125,
    tapRect: { left: 27, top: 90, width: 46, height: 10 },
  },
];

// Compatibility exports in case old code imports these names.
export const bodyMapManifest = BODY_MAP_MANIFEST;
export const bodyMapRegions = BODY_MAP_REGION_LIST;
export const fullBodyHotspots = FULL_BODY_HOTSPOTS;
