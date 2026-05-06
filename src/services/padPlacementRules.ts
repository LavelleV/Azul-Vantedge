import type { BodyMapView, StableBodyRegionId } from "../data/bodyMapRegions";

export type PadPlacementContext = {
  question?: string;
  userQuestion?: string;
  selectedBodyArea?: string | null;
  bodyArea?: string | null;
  taggedArea?: string | null;
  regionId?: StableBodyRegionId | null;
  chipLabel?: string | null;
};

export type PadPlacementRule = {
  id: string;
  regionId: StableBodyRegionId;
  chipLabel: string;
  plainLanguage: string;
  technicalArea: string;
  padCount: number;
  placementImageRegionId: StableBodyRegionId;
  preferredView?: BodyMapView;
  optionalNotes?: string[];
};

/**
 * LOCKED PAD-PLACEMENT CONTRACT
 *
 * Pad placement text is descriptive support only.
 * Do not claim treatment, diagnosis, cure, or medical efficacy.
 * Plain-language placement comes first.
 * Technical anatomical wording comes second.
 * Chips are the precise selector.
 * Placement images must come from explicit asset maps only.
 */
export const PAD_PLACEMENT_RULES: PadPlacementRule[] = [
  // HEAD / FACE / JAW
  {
    id: "head-forehead",
    regionId: "head",
    chipLabel: "Forehead",
    plainLanguage:
      "Place one pad comfortably on the forehead above the eyebrows, and place the second near the back of the neck at the hairline.",
    technicalArea: "Technical area: Frontal region to Suboccipital / Upper Cervical region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Use conservative settings around the head and face."],
  },
  {
    id: "head-temple",
    regionId: "head",
    chipLabel: "Temple",
    plainLanguage:
      "Place one pad near the side of the head where the temple area feels tense, staying away from the eye, and place the second near the upper neck on the same side.",
    technicalArea: "Technical area: Temporal region to Upper Cervical / Suboccipital region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Avoid placing pads near the eye."],
  },
  {
    id: "head-jaw-tmj",
    regionId: "head",
    chipLabel: "Jaw / TMJ",
    plainLanguage:
      "Place one pad near the jaw muscle area in front of the ear, staying comfortable and gentle, and place the second lower along the jaw or upper neck on the same side.",
    technicalArea: "Technical area: TMJ / Masseter region to Mandibular / Upper Cervical support region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Avoid placing pads near the eye or inside the mouth."],
  },
  {
    id: "head-cheek",
    regionId: "head",
    chipLabel: "Cheek",
    plainLanguage:
      "Place one pad gently on the cheek area where tension feels centered, and place the second lower along the jaw or upper neck on the same side.",
    technicalArea: "Technical area: Zygomatic / Facial soft-tissue region to Upper Cervical support region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Avoid the eye area and use conservative settings."],
  },
  {
    id: "head-sinus",
    regionId: "head",
    chipLabel: "Sinus",
    plainLanguage:
      "Place one pad gently near the cheek or side of the nose area where pressure feels most noticeable, and place the second near the upper neck on the same side.",
    technicalArea: "Technical area: Maxillary / Facial sinus-adjacent region to Upper Cervical support region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Do not place pads over the eyes or inside the nose."],
  },
  {
    id: "head-ear-area",
    regionId: "head",
    chipLabel: "Ear Area",
    plainLanguage:
      "Place one pad around the comfortable soft area near the ear, not inside the ear, and place the second lower on the same-side upper neck.",
    technicalArea: "Technical area: Periauricular region to Upper Cervical / SCM-adjacent support region.",
    padCount: 2,
    placementImageRegionId: "head",
    preferredView: "front",
    optionalNotes: ["Do not place pads inside the ear canal."],
  },

  // NECK
  {
    id: "neck-front-neck",
    regionId: "neck",
    chipLabel: "Front Neck",
    plainLanguage:
      "Avoid the front throat area. Instead, place one pad on the side of the neck where tension feels active, and place the second lower near the top of the shoulder.",
    technicalArea: "Technical area: Lateral Cervical region to Upper Trapezius / Levator Scapulae region.",
    padCount: 2,
    placementImageRegionId: "neck",
    preferredView: "front",
    optionalNotes: ["Do not place pads directly over the throat or carotid pulse area."],
  },
  {
    id: "neck-side-neck",
    regionId: "neck",
    chipLabel: "Side Neck",
    plainLanguage:
      "Place one pad on the tight side of the neck, and place the second lower on the same side near the top of the shoulder.",
    technicalArea: "Technical area: Cervical paraspinal / SCM-adjacent region to Upper Trapezius region.",
    padCount: 2,
    placementImageRegionId: "neck",
    preferredView: "front",
  },
  {
    id: "neck-base-of-skull",
    regionId: "neck",
    chipLabel: "Base of Skull",
    plainLanguage:
      "Place one pad just below the base of the skull where the tension feels strongest, and place the second lower on the same side near the upper neck or top of the shoulder.",
    technicalArea: "Technical area: Suboccipital region to Upper Cervical / Upper Trapezius region.",
    padCount: 2,
    placementImageRegionId: "neck",
    preferredView: "back",
  },
  {
    id: "neck-upper-trap",
    regionId: "neck",
    chipLabel: "Upper Trap",
    plainLanguage:
      "Place one pad on the top of the shoulder where the neck and shoulder meet, and place the second slightly higher on the same-side neck.",
    technicalArea: "Technical area: Upper Trapezius to Cervical paraspinal region.",
    padCount: 2,
    placementImageRegionId: "neck",
    preferredView: "back",
  },
  {
    id: "neck-cervical-spine",
    regionId: "neck",
    chipLabel: "Cervical Spine",
    plainLanguage:
      "Place one pad beside the neck spine on the sore side, not directly on the bony spine, and place the second lower along the same neck-to-shoulder line.",
    technicalArea: "Technical area: Cervical paraspinal region to Upper Trapezius / Levator Scapulae region.",
    padCount: 2,
    placementImageRegionId: "neck",
    preferredView: "back",
  },

  // SHOULDER
  {
    id: "shoulder-front-coracoid",
    regionId: "shoulder",
    chipLabel: "Front Shoulder / Coracoid Area",
    plainLanguage:
      "Place one pad on the front of the sore shoulder just below the collarbone where the shoulder starts to round forward, and place the second on the back of the same shoulder over the soft muscle area.",
    technicalArea: "Technical area: Anterior shoulder / Coracoid Process region to Posterior rotator cuff / Infraspinatus region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "front",
  },
  {
    id: "shoulder-top-ac",
    regionId: "shoulder",
    chipLabel: "Top Shoulder / AC Joint",
    plainLanguage:
      "Place one pad near the top of the shoulder where the soreness feels centered, and place the second slightly behind it on the upper shoulder blade area.",
    technicalArea: "Technical area: AC Joint / Superior shoulder region to Upper scapular / Supraspinatus region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "front",
  },
  {
    id: "shoulder-rotator-cuff",
    regionId: "shoulder",
    chipLabel: "Rotator Cuff",
    plainLanguage:
      "Place one pad on the back of the shoulder where the soft muscle area feels sore, and place the second slightly to the side or front of the same shoulder.",
    technicalArea: "Technical area: Posterior rotator cuff / Infraspinatus-Teres region to Lateral shoulder region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "back",
  },
  {
    id: "shoulder-rear-shoulder",
    regionId: "shoulder",
    chipLabel: "Rear Shoulder",
    plainLanguage:
      "Place one pad on the rear shoulder where the discomfort feels deepest, and place the second a few inches away toward the shoulder blade.",
    technicalArea: "Technical area: Posterior deltoid region to Scapular stabilizer region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "back",
  },
  {
    id: "shoulder-scapula",
    regionId: "shoulder",
    chipLabel: "Shoulder Blade / Scapula",
    plainLanguage:
      "Place one pad on the sore shoulder blade area, and place the second nearby along the same muscle line toward the spine or rear shoulder.",
    technicalArea: "Technical area: Scapular / Rhomboid / Infraspinatus region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "back",
  },
  {
    id: "shoulder-upper-trap",
    regionId: "shoulder",
    chipLabel: "Upper Trap",
    plainLanguage:
      "Place one pad on the top of the shoulder where the neck and shoulder meet, and place the second slightly behind or below it toward the shoulder blade.",
    technicalArea: "Technical area: Upper Trapezius to Levator Scapulae / Superior scapular region.",
    padCount: 2,
    placementImageRegionId: "shoulder",
    preferredView: "back",
  },

  // ARM / HAND
  {
    id: "arm-upper-arm",
    regionId: "arm",
    chipLabel: "Upper Arm",
    plainLanguage:
      "Place one pad on the sore part of the upper arm where the discomfort feels centered, and place the second several inches away along the same muscle line.",
    technicalArea: "Technical area: Biceps / Triceps / Upper arm soft-tissue pathway.",
    padCount: 2,
    placementImageRegionId: "arm",
    preferredView: "front",
  },
  {
    id: "arm-elbow",
    regionId: "arm",
    chipLabel: "Elbow",
    plainLanguage:
      "Place one pad just above or beside the sore elbow area, not directly on the sharpest bone point, and place the second a few inches down the forearm along the same tight or sore line.",
    technicalArea: "Technical area: Medial or Lateral elbow soft-tissue region to Forearm flexor/extensor tendon pathway.",
    padCount: 2,
    placementImageRegionId: "arm",
    preferredView: "front",
  },
  {
    id: "arm-forearm",
    regionId: "arm",
    chipLabel: "Forearm",
    plainLanguage:
      "Place one pad on the sore forearm area, and place the second several inches above or below along the same forearm muscle line.",
    technicalArea: "Technical area: Forearm flexor or extensor muscle-tendon pathway.",
    padCount: 2,
    placementImageRegionId: "arm",
    preferredView: "front",
  },
  {
    id: "arm-wrist-hand",
    regionId: "arm",
    chipLabel: "Wrist / Hand",
    plainLanguage:
      "Place one pad on the sore side of the wrist or hand where the discomfort feels most active, and place the second a few inches up the forearm on the same side.",
    technicalArea: "Technical area: Wrist / Hand soft-tissue region to Forearm flexor or extensor pathway.",
    padCount: 2,
    placementImageRegionId: "arm",
    preferredView: "front",
  },

  // CHEST / RIBS
  {
    id: "chest-sternum",
    regionId: "chest",
    chipLabel: "Sternum",
    plainLanguage:
      "Place one pad near the mild sore chest-wall area beside the breastbone, staying off emergency-type chest symptoms, and place the second a few inches to the side.",
    technicalArea: "Technical area: Sternal-adjacent / Pectoral region to Intercostal tissue line.",
    padCount: 2,
    placementImageRegionId: "chest",
    preferredView: "front",
    optionalNotes: [
      "Chest pressure, shortness of breath, radiating pain, dizziness, or unexplained chest symptoms require medical evaluation immediately.",
    ],
  },
  {
    id: "chest-pectoral",
    regionId: "chest",
    chipLabel: "Pectoral Area",
    plainLanguage:
      "Place one pad on the sore pectoral area, and place the second a few inches away across the same chest-wall muscle line.",
    technicalArea: "Technical area: Pectoralis region to Adjacent pectoral / intercostal pathway.",
    padCount: 2,
    placementImageRegionId: "chest",
    preferredView: "front",
  },
  {
    id: "chest-upper-rib",
    regionId: "chest",
    chipLabel: "Upper Rib",
    plainLanguage:
      "Place one pad near the mild sore upper-rib area, and place the second a few inches along the same rib line.",
    technicalArea: "Technical area: Upper rib / Intercostal region.",
    padCount: 2,
    placementImageRegionId: "chest",
    preferredView: "front",
  },
  {
    id: "chest-side-rib",
    regionId: "chest",
    chipLabel: "Side Rib",
    plainLanguage:
      "Place one pad near the sore side-rib area, and place the second a few inches forward or backward along the same rib line.",
    technicalArea: "Technical area: Lateral rib / Intercostal region.",
    padCount: 2,
    placementImageRegionId: "chest",
    preferredView: "front",
  },
  {
    id: "chest-intercostal",
    regionId: "chest",
    chipLabel: "Intercostal Area",
    plainLanguage:
      "Place one pad near the sore space between the ribs, and place the second a few inches away along the same rib space.",
    technicalArea: "Technical area: Intercostal soft-tissue pathway.",
    padCount: 2,
    placementImageRegionId: "chest",
    preferredView: "front",
  },

  // ABDOMEN
  {
    id: "abdomen-upper",
    regionId: "abdomen",
    chipLabel: "Upper Abdomen",
    plainLanguage:
      "Place one pad gently on the upper abdomen where the area feels tense or unsettled, and place the second lower on the abdomen with comfortable spacing.",
    technicalArea: "Technical area: Upper abdominal wall to Lower abdominal wall support region.",
    padCount: 2,
    placementImageRegionId: "abdomen",
    preferredView: "front",
  },
  {
    id: "abdomen-lower",
    regionId: "abdomen",
    chipLabel: "Lower Abdomen",
    plainLanguage:
      "Place one pad gently on the lower abdomen where the area feels tense, and place the second several inches away across the lower abdominal area.",
    technicalArea: "Technical area: Lower abdominal wall / Pelvic bowl region.",
    padCount: 2,
    placementImageRegionId: "abdomen",
    preferredView: "front",
  },
  {
    id: "abdomen-left",
    regionId: "abdomen",
    chipLabel: "Left Abdomen",
    plainLanguage:
      "Place one pad gently on the left abdomen where the area feels most noticeable, and place the second toward the center or lower abdomen with comfortable spacing.",
    technicalArea: "Technical area: Left abdominal wall to Central / Lower abdominal wall region.",
    padCount: 2,
    placementImageRegionId: "abdomen",
    preferredView: "front",
  },
  {
    id: "abdomen-right",
    regionId: "abdomen",
    chipLabel: "Right Abdomen",
    plainLanguage:
      "Place one pad gently on the right abdomen where the area feels most noticeable, and place the second toward the center or lower abdomen with comfortable spacing.",
    technicalArea: "Technical area: Right abdominal wall to Central / Lower abdominal wall region.",
    padCount: 2,
    placementImageRegionId: "abdomen",
    preferredView: "front",
  },
  {
    id: "abdomen-center-gut",
    regionId: "abdomen",
    chipLabel: "Center Abdomen / Gut",
    plainLanguage:
      "Place one pad gently near the center abdomen where the area feels unsettled, and place the second lower on the abdomen to create a broad comfortable field.",
    technicalArea: "Technical area: Central abdominal wall to Lower abdominal wall / Pelvic bowl region.",
    padCount: 2,
    placementImageRegionId: "abdomen",
    preferredView: "front",
    optionalNotes: [
      "Severe, sharp, fever-related, persistent, or unexplained abdominal pain should be evaluated by a licensed medical professional.",
    ],
  },

  // LOW BACK / SI
  {
    id: "low-back-lumbar-center",
    regionId: "low_back",
    chipLabel: "Lumbar Center",
    plainLanguage:
      "Place one pad on the sore low-back muscle area just to one side of the spine, and place the second on the other side or slightly lower so the field crosses the low back.",
    technicalArea: "Technical area: Lumbar paraspinal region to Contralateral / lower lumbar support region.",
    padCount: 2,
    placementImageRegionId: "low_back",
    preferredView: "back",
  },
  {
    id: "low-back-left",
    regionId: "low_back",
    chipLabel: "Left Low Back",
    plainLanguage:
      "Place one pad on the left low-back area where the discomfort feels centered, and place the second on the left outer hip or slightly across the low back.",
    technicalArea: "Technical area: Left lumbar paraspinal / Quadratus Lumborum region to Lateral hip or opposite lumbar support region.",
    padCount: 2,
    placementImageRegionId: "low_back",
    preferredView: "back",
  },
  {
    id: "low-back-right",
    regionId: "low_back",
    chipLabel: "Right Low Back",
    plainLanguage:
      "Place one pad on the right low-back area where the discomfort feels centered, and place the second on the right outer hip or slightly across the low back.",
    technicalArea: "Technical area: Right lumbar paraspinal / Quadratus Lumborum region to Lateral hip or opposite lumbar support region.",
    padCount: 2,
    placementImageRegionId: "low_back",
    preferredView: "back",
  },
  {
    id: "low-back-sacrum",
    regionId: "low_back",
    chipLabel: "Sacrum",
    plainLanguage:
      "Place one pad near the center of the sacrum where the low-back and pelvis meet, and place the second slightly above or to the side of that area.",
    technicalArea: "Technical area: Sacral region to Lumbosacral / SI-adjacent support region.",
    padCount: 2,
    placementImageRegionId: "low_back",
    preferredView: "back",
  },
  {
    id: "low-back-si-joint",
    regionId: "low_back",
    chipLabel: "SI Joint",
    plainLanguage:
      "Place one pad on the sore low-back dimple area just to the side of the spine, and place the second on the same-side outer hip or front hip bone area.",
    technicalArea: "Technical area: Sacroiliac / SI Joint region to Greater Trochanter or ASIS support region.",
    padCount: 2,
    placementImageRegionId: "low_back",
    preferredView: "back",
  },

  // HIP / GLUTE / PELVIS
  {
    id: "hip-glute-glute",
    regionId: "hip_glute",
    chipLabel: "Glute",
    plainLanguage:
      "Place one pad on the sore butt-cheek area where the pain feels deepest or most centered, and place the second on the side of the same hip near the outer hip bone.",
    technicalArea: "Technical area: Glute / Piriformis region to Greater Trochanter / Lateral hip region.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "back",
  },
  {
    id: "hip-glute-piriformis",
    regionId: "hip_glute",
    chipLabel: "Piriformis / Deep Glute",
    plainLanguage:
      "Place one pad on the deep sore butt-cheek area where the discomfort feels most centered, and place the second slightly outward toward the side hip.",
    technicalArea: "Technical area: Piriformis / Deep Gluteal region to Greater Trochanter / Lateral hip region.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "back",
  },
  {
    id: "hip-glute-si-joint",
    regionId: "hip_glute",
    chipLabel: "SI Joint",
    plainLanguage:
      "Place one pad on the sore low-back dimple area, and place the second on the same-side outer hip or upper glute.",
    technicalArea: "Technical area: Sacroiliac / SI Joint region to Lateral hip / Glute medius region.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "back",
  },
  {
    id: "hip-glute-lateral-hip",
    regionId: "hip_glute",
    chipLabel: "Lateral Hip / Greater Trochanter",
    plainLanguage:
      "Place one pad on the side of the hip where the soreness feels centered, and place the second slightly above or behind it into the upper glute.",
    technicalArea: "Technical area: Greater Trochanter / Lateral hip region to Glute medius / Upper glute region.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "front",
  },
  {
    id: "hip-glute-front-hip-flexor",
    regionId: "hip_glute",
    chipLabel: "Front Hip / Hip Flexor",
    plainLanguage:
      "Place one pad on the front of the hip where the crease or hip-flexor tightness feels most active, and place the second on the side of the same hip near the outer hip bone.",
    technicalArea: "Technical area: Anterior hip / Iliopsoas region to Greater Trochanter / Lateral hip region.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "front",
  },
  {
    id: "hip-glute-upper-hamstring-origin",
    regionId: "hip_glute",
    chipLabel: "Upper Hamstring Origin",
    plainLanguage:
      "Place one pad at the lower butt-cheek crease where the pulling or soreness begins, and place the second several inches down the back of the thigh.",
    technicalArea: "Technical area: Ischial Tuberosity / Upper Hamstring Origin to Hamstring muscle pathway.",
    padCount: 2,
    placementImageRegionId: "hip_glute",
    preferredView: "back",
  },

  // THIGH
  {
    id: "thigh-quad",
    regionId: "thigh",
    chipLabel: "Quad",
    plainLanguage:
      "Place one pad on the sore front-thigh area where the discomfort feels centered, and place the second several inches above or below along the same thigh line.",
    technicalArea: "Technical area: Quadriceps muscle pathway.",
    padCount: 2,
    placementImageRegionId: "thigh",
    preferredView: "front",
  },
  {
    id: "thigh-inner-adductor",
    regionId: "thigh",
    chipLabel: "Inner Thigh / Adductor",
    plainLanguage:
      "Place one pad on the sore inner-thigh area where the tightness or pulling feels strongest, and place the second a few inches above or below along the same inner-thigh line.",
    technicalArea: "Technical area: Adductor muscle group / Adductor fascial pathway.",
    padCount: 2,
    placementImageRegionId: "thigh",
    preferredView: "front",
  },
  {
    id: "thigh-outer-it-band",
    regionId: "thigh",
    chipLabel: "Outer Thigh / IT Band",
    plainLanguage:
      "Place one pad on the sore outer-thigh area, and place the second several inches above or below along the same outside-thigh line.",
    technicalArea: "Technical area: IT Band / Lateral thigh region.",
    padCount: 2,
    placementImageRegionId: "thigh",
    preferredView: "front",
  },
  {
    id: "thigh-hamstring",
    regionId: "thigh",
    chipLabel: "Hamstring",
    plainLanguage:
      "Place one pad at or near the sore back-of-thigh area, and place the second several inches above or below along the same hamstring line.",
    technicalArea: "Technical area: Hamstring muscle pathway.",
    padCount: 2,
    placementImageRegionId: "thigh",
    preferredView: "back",
  },
  {
    id: "thigh-upper-thigh",
    regionId: "thigh",
    chipLabel: "Upper Thigh",
    plainLanguage:
      "Place one pad on the sore upper-thigh area where discomfort feels centered, and place the second several inches away along the same muscle line.",
    technicalArea: "Technical area: Proximal quadriceps, adductor, hamstring, or IT band pathway.",
    padCount: 2,
    placementImageRegionId: "thigh",
    preferredView: "front",
  },

  // KNEE
  {
    id: "knee-patella",
    regionId: "knee",
    chipLabel: "Kneecap / Patella",
    plainLanguage:
      "Place one pad just above the kneecap on the lower thigh, and place the second about two inches below the kneecap near the small bump on the shin.",
    technicalArea: "Technical area: Quadriceps Tendon / Suprapatellar region to Patellar Tendon / Tibial Tuberosity region.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "front",
  },
  {
    id: "knee-inner",
    regionId: "knee",
    chipLabel: "Inner Knee",
    plainLanguage:
      "Place one pad on the inside/front of the knee, about two inches below the kneecap where tenderness feels strongest, and place the second on the inside/back side near the soft crease.",
    technicalArea: "Technical area: Pes Anserine / Medial knee region to Medial hamstring / Popliteal region.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "front",
  },
  {
    id: "knee-outer",
    regionId: "knee",
    chipLabel: "Outer Knee",
    plainLanguage:
      "Place one pad on the outside of the knee where soreness feels centered, and place the second slightly above or below along the outer thigh-to-lower-leg line.",
    technicalArea: "Technical area: Lateral knee / IT Band insertion region to Lateral thigh or Peroneal pathway.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "front",
  },
  {
    id: "knee-back",
    regionId: "knee",
    chipLabel: "Back of Knee",
    plainLanguage:
      "Place one pad gently behind the knee crease where discomfort feels centered, and place the second just above or below the back of the knee along the same tissue line.",
    technicalArea: "Technical area: Popliteal Fossa to Distal hamstring or Upper calf pathway.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "back",
    optionalNotes: [
      "Avoid deep pressure behind the knee. Sudden swelling, heat, severe pain, or one-sided calf symptoms should be medically evaluated.",
    ],
  },
  {
    id: "knee-patellar-tendon",
    regionId: "knee",
    chipLabel: "Patellar Tendon",
    plainLanguage:
      "Place one pad just below the kneecap near the patellar tendon, and place the second slightly lower near the small bump on the shin.",
    technicalArea: "Technical area: Patellar Tendon to Tibial Tuberosity region.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "front",
  },
  {
    id: "knee-quad-tendon",
    regionId: "knee",
    chipLabel: "Quad Tendon",
    plainLanguage:
      "Place one pad just above the kneecap where the lower thigh meets the knee, and place the second several inches higher on the front thigh.",
    technicalArea: "Technical area: Quadriceps Tendon / Suprapatellar region to Distal Quadriceps pathway.",
    padCount: 2,
    placementImageRegionId: "knee",
    preferredView: "front",
  },

  // LOWER LEG
  {
    id: "lower-leg-shin",
    regionId: "lower_leg",
    chipLabel: "Shin",
    plainLanguage:
      "Place one pad beside the sore shin area, not directly on the sharp front edge of the shin bone, and place the second several inches above or below along the same shin line.",
    technicalArea: "Technical area: Anterior tibialis / Shin soft-tissue region to Anterior lower-leg fascial pathway.",
    padCount: 2,
    placementImageRegionId: "lower_leg",
    preferredView: "front",
  },
  {
    id: "lower-leg-calf",
    regionId: "lower_leg",
    chipLabel: "Calf",
    plainLanguage:
      "Place one pad on the tight or sore calf area where discomfort feels centered, and place the second several inches above or below along the same calf line.",
    technicalArea: "Technical area: Gastrocnemius / Soleus region to Posterior lower-leg muscle pathway.",
    padCount: 2,
    placementImageRegionId: "lower_leg",
    preferredView: "back",
    optionalNotes: [
      "Sudden one-sided calf pain with heat, redness, swelling, or shortness of breath should be treated as a medical concern.",
    ],
  },
  {
    id: "lower-leg-outer",
    regionId: "lower_leg",
    chipLabel: "Outer Lower Leg",
    plainLanguage:
      "Place one pad on the sore outer lower-leg area, and place the second several inches above or below along the same outside lower-leg line.",
    technicalArea: "Technical area: Peroneal / Lateral lower-leg pathway.",
    padCount: 2,
    placementImageRegionId: "lower_leg",
    preferredView: "front",
  },
  {
    id: "lower-leg-achilles",
    regionId: "lower_leg",
    chipLabel: "Achilles Area",
    plainLanguage:
      "Place one pad just above the heel where the Achilles feels tight or sore, and place the second higher on the calf along the same back-of-leg line.",
    technicalArea: "Technical area: Achilles tendon region to Gastrocnemius / Soleus pathway.",
    padCount: 2,
    placementImageRegionId: "lower_leg",
    preferredView: "back",
  },

  // FOOT / ANKLE
  {
    id: "foot-ankle-heel",
    regionId: "foot_ankle",
    chipLabel: "Heel",
    plainLanguage:
      "Place one pad near the sore heel area where pressure feels strongest, and place the second along the arch or just above the heel toward the ankle.",
    technicalArea: "Technical area: Calcaneal / Heel region to Plantar fascia or Achilles-calcaneal pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-arch",
    regionId: "foot_ankle",
    chipLabel: "Arch",
    plainLanguage:
      "Place one pad along the sore arch area on the bottom or inner side of the foot, and place the second closer to the heel or ball of the foot along the same arch line.",
    technicalArea: "Technical area: Plantar fascia / Medial arch region to Plantar fascial pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-ball",
    regionId: "foot_ankle",
    chipLabel: "Ball of Foot",
    plainLanguage:
      "Place one pad near the ball of the foot where pressure feels strongest, and place the second along the arch or top of the foot.",
    technicalArea: "Technical area: Forefoot / Metatarsal region to Plantar or Dorsal foot pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-toes",
    regionId: "foot_ankle",
    chipLabel: "Toes",
    plainLanguage:
      "Place one pad near the base of the toes or forefoot where discomfort feels active, and place the second along the arch or top of the foot.",
    technicalArea: "Technical area: Toe / Metatarsophalangeal region to Forefoot / Arch pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-inner",
    regionId: "foot_ankle",
    chipLabel: "Inner Ankle",
    plainLanguage:
      "Place one pad near the sore inner ankle area, and place the second on the arch or lower leg so the signal crosses through the ankle area.",
    technicalArea: "Technical area: Medial Malleolus region to Medial arch or Posterior tibial pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-outer",
    regionId: "foot_ankle",
    chipLabel: "Outer Ankle",
    plainLanguage:
      "Place one pad near the sore outer ankle area, and place the second on the foot or lower leg so the signal crosses through the ankle area.",
    technicalArea: "Technical area: Lateral Malleolus region to Peroneal / Foot-ankle joint pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "front",
  },
  {
    id: "foot-ankle-achilles",
    regionId: "foot_ankle",
    chipLabel: "Achilles",
    plainLanguage:
      "Place one pad just above the heel where the Achilles feels tight or sore, and place the second higher on the calf along the same back-of-leg line.",
    technicalArea: "Technical area: Achilles tendon region to Gastrocnemius / Soleus pathway.",
    padCount: 2,
    placementImageRegionId: "foot_ankle",
    preferredView: "back",
  },
];

function clean(value?: string | null): string {
  return String(value ?? "").trim();
}

function normalize(value?: string | null): string {
  return clean(value)
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ");
}

function includesAny(source: string, terms: string[]): boolean {
  return terms.some((term) => source.includes(term));
}

function getQuestion(context: PadPlacementContext): string {
  return clean(context.question || context.userQuestion);
}

function getArea(context: PadPlacementContext): string {
  return clean(
    context.chipLabel ||
      context.selectedBodyArea ||
      context.bodyArea ||
      context.taggedArea
  );
}

function getPatternText(context: PadPlacementContext): string {
  return `${normalize(getQuestion(context))} ${normalize(getArea(context))}`;
}

function ruleToLines(rule: PadPlacementRule): string[] {
  const lines = [
    `Pad placement: ${rule.plainLanguage}`,
    rule.technicalArea,
    `Pad count: ${rule.padCount}`,
  ];

  if (rule.optionalNotes?.length) {
    lines.push(...rule.optionalNotes);
  }

  return lines;
}

function buildDefaultPlacement(context: PadPlacementContext): string[] {
  const area = getArea(context) || "the selected area";

  return [
    `Pad placement: Place one pad just above or before ${area}, and place the second pad just below or beyond it so the signal crosses the area instead of crowding one spot.`,
    "Technical area: Proximal support point to distal support point near the selected region.",
    "Pad count: 2",
    "Keep the setup comfortable and avoid placing both pads directly on the sharpest pain point.",
  ];
}

const REGION_TEXT_MATCHERS: Array<{ regionId: StableBodyRegionId; terms: string[] }> = [
  {
    regionId: "head",
    terms: ["head", "face", "jaw", "tmj", "temple", "sinus", "ear", "forehead", "cheek"],
  },
  {
    regionId: "neck",
    terms: ["neck", "cervical", "base of skull", "suboccipital"],
  },
  {
    regionId: "shoulder",
    terms: ["shoulder", "rotator", "scapula", "shoulder blade", "upper trap", "ac joint"],
  },
  {
    regionId: "arm",
    terms: ["arm", "upper arm", "elbow", "forearm", "wrist", "hand"],
  },
  {
    regionId: "chest",
    terms: ["chest", "rib", "sternum", "intercostal", "pectoral"],
  },
  {
    regionId: "abdomen",
    terms: ["abdomen", "gut", "stomach", "belly"],
  },
  {
    regionId: "low_back",
    terms: ["low back", "lower back", "lumbar", "sacrum", "sacroiliac", "si joint"],
  },
  {
    regionId: "hip_glute",
    terms: ["hip", "glute", "pelvis", "piriformis", "front hip", "hip flexor"],
  },
  {
    regionId: "thigh",
    terms: ["thigh", "quad", "hamstring", "adductor", "it band"],
  },
  {
    regionId: "knee",
    terms: ["knee", "patella", "kneecap", "patellar", "quad tendon"],
  },
  {
    regionId: "lower_leg",
    terms: ["lower leg", "calf", "shin", "achilles area", "outer lower leg"],
  },
  {
    regionId: "foot_ankle",
    terms: ["foot", "ankle", "heel", "arch", "toes", "ball of foot", "achilles"],
  },
];

export function getPadPlacementRulesForRegion(
  regionId: StableBodyRegionId
): PadPlacementRule[] {
  return PAD_PLACEMENT_RULES.filter((rule) => rule.regionId === regionId);
}

export function getPadPlacementRule(
  regionId?: StableBodyRegionId | null,
  chipLabel?: string | null
): PadPlacementRule | null {
  const normalizedChip = normalize(chipLabel);

  if (!normalizedChip && !regionId) {
    return null;
  }

  if (regionId && normalizedChip) {
    const exactRegionChipMatch = PAD_PLACEMENT_RULES.find(
      (rule) =>
        rule.regionId === regionId && normalize(rule.chipLabel) === normalizedChip
    );

    if (exactRegionChipMatch) {
      return exactRegionChipMatch;
    }
  }

  if (normalizedChip) {
    const exactChipMatch = PAD_PLACEMENT_RULES.find(
      (rule) => normalize(rule.chipLabel) === normalizedChip
    );

    if (exactChipMatch) {
      return exactChipMatch;
    }
  }

  if (regionId) {
    return PAD_PLACEMENT_RULES.find((rule) => rule.regionId === regionId) ?? null;
  }

  return null;
}

export function getStableRegionIdForPadPlacementText(
  value?: string | null
): StableBodyRegionId | null {
  const normalizedValue = normalize(value);

  if (!normalizedValue) {
    return null;
  }

  const matcher = REGION_TEXT_MATCHERS.find(({ terms }) =>
    includesAny(normalizedValue, terms)
  );

  return matcher?.regionId ?? null;
}

export function getPadPlacementRuleFromContext(
  context: PadPlacementContext
): PadPlacementRule | null {
  const area = getArea(context);
  const regionId =
    context.regionId ?? getStableRegionIdForPadPlacementText(`${area} ${getQuestion(context)}`);

  return getPadPlacementRule(regionId, area);
}

export function buildPlainLanguagePadPlacement(context: PadPlacementContext): string[] {
  const rule = getPadPlacementRuleFromContext(context);

  if (rule) {
    return ruleToLines(rule);
  }

  const pattern = getPatternText(context);
  const matchedRegionId = getStableRegionIdForPadPlacementText(pattern);

  if (matchedRegionId) {
    const defaultRegionRule = getPadPlacementRule(matchedRegionId, null);

    if (defaultRegionRule) {
      return ruleToLines(defaultRegionRule);
    }
  }

  return buildDefaultPlacement(context);
}
