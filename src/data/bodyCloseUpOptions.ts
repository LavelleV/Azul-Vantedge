import type { StableBodyRegionId } from './bodyMapRegions';

export type PlacementTemplateType =
  | 'local_area'
  | 'above_below_joint'
  | 'front_back_bridge'
  | 'nerve_pathway'
  | 'muscle_belly'
  | 'tendon_area'
  | 'swelling_drainage'
  | 'general_support';

export type BodyCloseUpOption = {
  id: string;
  bodyArea: StableBodyRegionId;
  title: string;
  plainLanguageDescription: string;
  technicalArea: string;
  keywords: string[];
  placementTemplateType: PlacementTemplateType;
  safetyNotes: string[];
};

export const BODY_CLOSE_UP_OPTIONS: BodyCloseUpOption[] = [
  { id: 'head-forehead', bodyArea: 'head', title: 'Forehead', plainLanguageDescription: 'Pressure, tension, or support around the forehead.', technicalArea: 'Frontal region', keywords: ['forehead', 'front head', 'frontal'], placementTemplateType: 'local_area', safetyNotes: ['Use conservative settings around the head and face.'] },
  { id: 'head-temple', bodyArea: 'head', title: 'Temple', plainLanguageDescription: 'Side-of-head tension or temple pressure.', technicalArea: 'Temporal region', keywords: ['temple', 'side head'], placementTemplateType: 'local_area', safetyNotes: ['Avoid the eye area.'] },
  { id: 'head-jaw-tmj', bodyArea: 'head', title: 'Jaw / TMJ', plainLanguageDescription: 'Jaw tension, clenching, or TMJ-area discomfort.', technicalArea: 'TMJ / Masseter region', keywords: ['jaw', 'tmj', 'clench', 'masseter'], placementTemplateType: 'local_area', safetyNotes: ['Avoid placing pads inside the mouth or near the eyes.'] },
  { id: 'head-cheek', bodyArea: 'head', title: 'Cheek', plainLanguageDescription: 'Cheek or facial soft-tissue area.', technicalArea: 'Zygomatic / facial soft-tissue region', keywords: ['cheek', 'face'], placementTemplateType: 'local_area', safetyNotes: ['Use conservative settings around the face.'] },
  { id: 'head-sinus', bodyArea: 'head', title: 'Sinus', plainLanguageDescription: 'Sinus-area pressure or facial congestion support.', technicalArea: 'Frontal / maxillary sinus-adjacent region', keywords: ['sinus', 'congestion', 'face pressure'], placementTemplateType: 'local_area', safetyNotes: ['Do not place pads over the eyes.'] },
  { id: 'head-ear-area', bodyArea: 'head', title: 'Ear Area', plainLanguageDescription: 'Support around the soft tissue near the ear.', technicalArea: 'Periauricular region', keywords: ['ear', 'near ear'], placementTemplateType: 'local_area', safetyNotes: ['Do not place pads inside the ear.'] },

  { id: 'neck-front-neck', bodyArea: 'neck', title: 'Front Neck', plainLanguageDescription: 'Front or throat-side neck concern. Use caution.', technicalArea: 'Anterior cervical region', keywords: ['front neck', 'throat'], placementTemplateType: 'general_support', safetyNotes: ['Avoid direct placement over the throat or carotid pulse area.'] },
  { id: 'neck-side-neck', bodyArea: 'neck', title: 'Side Neck', plainLanguageDescription: 'Side neck tightness or tension.', technicalArea: 'Lateral cervical region', keywords: ['side neck', 'neck tension'], placementTemplateType: 'local_area', safetyNotes: ['Use comfortable settings around the neck.'] },
  { id: 'neck-base-skull', bodyArea: 'neck', title: 'Base of Skull', plainLanguageDescription: 'Tension where the skull meets the neck.', technicalArea: 'Suboccipital region', keywords: ['base of skull', 'suboccipital'], placementTemplateType: 'local_area', safetyNotes: ['Avoid high intensity near the head and neck.'] },
  { id: 'neck-upper-trap', bodyArea: 'neck', title: 'Upper Trap', plainLanguageDescription: 'Top-of-shoulder neck tension.', technicalArea: 'Upper trapezius region', keywords: ['upper trap', 'trapezius'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'neck-cervical-spine', bodyArea: 'neck', title: 'Cervical Spine', plainLanguageDescription: 'Neck spine or neck stiffness area.', technicalArea: 'Cervical paraspinal region', keywords: ['cervical', 'neck stiffness'], placementTemplateType: 'local_area', safetyNotes: ['Do not place pads directly on the bony spine.'] },

  { id: 'shoulder-front', bodyArea: 'shoulder', title: 'Front of Shoulder', plainLanguageDescription: 'Pain or tightness at the front of the shoulder.', technicalArea: 'Anterior shoulder / Coracoid area', keywords: ['front shoulder', 'coracoid'], placementTemplateType: 'front_back_bridge', safetyNotes: [] },
  { id: 'shoulder-back', bodyArea: 'shoulder', title: 'Back of Shoulder', plainLanguageDescription: 'Rear shoulder or posterior cuff area.', technicalArea: 'Posterior shoulder / rotator cuff area', keywords: ['back shoulder', 'rear shoulder'], placementTemplateType: 'front_back_bridge', safetyNotes: [] },
  { id: 'shoulder-arm-pain', bodyArea: 'shoulder', title: 'Pain Down the Arm', plainLanguageDescription: 'Shoulder discomfort that travels toward the arm.', technicalArea: 'Shoulder-to-arm referral pathway', keywords: ['pain down arm', 'travels arm'], placementTemplateType: 'nerve_pathway', safetyNotes: ['Escalate if numbness, weakness, or loss of function appears.'] },
  { id: 'shoulder-stuck', bodyArea: 'shoulder', title: 'Shoulder Feels Stuck', plainLanguageDescription: 'Restricted shoulder motion or guarded movement.', technicalArea: 'Shoulder capsule / fascial glide pattern', keywords: ['stuck shoulder', 'limited range', 'stiff shoulder'], placementTemplateType: 'front_back_bridge', safetyNotes: ['Do not force overhead range.'] },
  { id: 'shoulder-general', bodyArea: 'shoulder', title: 'General Shoulder Support', plainLanguageDescription: 'Broad shoulder support when the exact spot is unclear.', technicalArea: 'Shoulder complex', keywords: ['shoulder'], placementTemplateType: 'general_support', safetyNotes: [] },
  { id: 'shoulder-rotator-cuff', bodyArea: 'shoulder', title: 'Rotator Cuff', plainLanguageDescription: 'Rotator cuff or shoulder stabilizer concern.', technicalArea: 'Rotator cuff region', keywords: ['rotator cuff'], placementTemplateType: 'tendon_area', safetyNotes: [] },

  { id: 'arm-upper-arm', bodyArea: 'arm', title: 'Upper Arm', plainLanguageDescription: 'Upper arm soreness or tightness.', technicalArea: 'Biceps / triceps region', keywords: ['upper arm', 'bicep', 'tricep'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'arm-elbow', bodyArea: 'arm', title: 'Elbow', plainLanguageDescription: 'Elbow-area discomfort.', technicalArea: 'Medial or lateral elbow soft-tissue region', keywords: ['elbow'], placementTemplateType: 'tendon_area', safetyNotes: [] },
  { id: 'arm-forearm', bodyArea: 'arm', title: 'Forearm', plainLanguageDescription: 'Forearm tightness or overuse.', technicalArea: 'Forearm flexor/extensor region', keywords: ['forearm'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'arm-wrist-hand', bodyArea: 'arm', title: 'Wrist / Hand', plainLanguageDescription: 'Wrist, hand, palm, or finger concern.', technicalArea: 'Wrist / hand soft-tissue region', keywords: ['wrist', 'hand', 'finger', 'palm'], placementTemplateType: 'local_area', safetyNotes: [] },

  { id: 'chest-sternum', bodyArea: 'chest', title: 'Sternum', plainLanguageDescription: 'Center chest-wall area. Use caution.', technicalArea: 'Sternal region', keywords: ['sternum', 'center chest'], placementTemplateType: 'local_area', safetyNotes: ['Chest pressure, shortness of breath, radiating pain, or dizziness require medical evaluation.'] },
  { id: 'chest-pectoral', bodyArea: 'chest', title: 'Pectoral Area', plainLanguageDescription: 'Front chest muscle area.', technicalArea: 'Pectoral region', keywords: ['pec', 'pectoral'], placementTemplateType: 'muscle_belly', safetyNotes: ['Do not use for unexplained chest symptoms.'] },
  { id: 'chest-upper-rib', bodyArea: 'chest', title: 'Upper Rib', plainLanguageDescription: 'Upper rib or chest-wall tightness.', technicalArea: 'Upper rib / costal region', keywords: ['upper rib', 'rib'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'chest-side-rib', bodyArea: 'chest', title: 'Side Rib', plainLanguageDescription: 'Side rib or flank-side rib area.', technicalArea: 'Lateral rib region', keywords: ['side rib'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'chest-intercostal', bodyArea: 'chest', title: 'Intercostal Area', plainLanguageDescription: 'Between-the-ribs tension.', technicalArea: 'Intercostal soft-tissue region', keywords: ['intercostal'], placementTemplateType: 'local_area', safetyNotes: [] },

  { id: 'abdomen-upper', bodyArea: 'abdomen', title: 'Upper Abdomen', plainLanguageDescription: 'Upper abdominal area.', technicalArea: 'Upper abdominal wall region', keywords: ['upper abdomen'], placementTemplateType: 'general_support', safetyNotes: ['Severe or unexplained abdominal pain should be medically evaluated.'] },
  { id: 'abdomen-lower', bodyArea: 'abdomen', title: 'Lower Abdomen', plainLanguageDescription: 'Lower abdominal area.', technicalArea: 'Lower abdominal wall / pelvic bowl region', keywords: ['lower abdomen'], placementTemplateType: 'general_support', safetyNotes: ['Use conservative settings.'] },
  { id: 'abdomen-left', bodyArea: 'abdomen', title: 'Left Abdomen', plainLanguageDescription: 'Left-side abdominal area.', technicalArea: 'Left abdominal wall region', keywords: ['left abdomen'], placementTemplateType: 'general_support', safetyNotes: [] },
  { id: 'abdomen-right', bodyArea: 'abdomen', title: 'Right Abdomen', plainLanguageDescription: 'Right-side abdominal area.', technicalArea: 'Right abdominal wall region', keywords: ['right abdomen'], placementTemplateType: 'general_support', safetyNotes: [] },
  { id: 'abdomen-center-gut', bodyArea: 'abdomen', title: 'Center Abdomen / Gut', plainLanguageDescription: 'Central gut or digestive-area support.', technicalArea: 'Central abdominal wall / enteric support region', keywords: ['gut', 'stomach', 'center abdomen'], placementTemplateType: 'general_support', safetyNotes: [] },

  { id: 'low-back-lumbar-center', bodyArea: 'low_back', title: 'Lumbar Center', plainLanguageDescription: 'Center low-back area.', technicalArea: 'Lumbar paraspinal region', keywords: ['lumbar', 'center low back'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'low-back-left', bodyArea: 'low_back', title: 'Left Low Back', plainLanguageDescription: 'Left low-back area.', technicalArea: 'Left lumbar region', keywords: ['left low back'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'low-back-right', bodyArea: 'low_back', title: 'Right Low Back', plainLanguageDescription: 'Right low-back area.', technicalArea: 'Right lumbar region', keywords: ['right low back'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'low-back-sacrum', bodyArea: 'low_back', title: 'Sacrum', plainLanguageDescription: 'Center sacral base area.', technicalArea: 'Sacral region', keywords: ['sacrum'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'low-back-si-joint', bodyArea: 'low_back', title: 'SI Joint', plainLanguageDescription: 'Low-back dimple or sacroiliac area.', technicalArea: 'Sacroiliac joint region', keywords: ['si joint', 'sacroiliac', 'dimple'], placementTemplateType: 'front_back_bridge', safetyNotes: [] },

  { id: 'hip-front-hip-flexor', bodyArea: 'hip_glute', title: 'Front Hip / Hip Flexor', plainLanguageDescription: 'Front hip crease or hip-flexor tightness.', technicalArea: 'Anterior hip / iliopsoas region', keywords: ['front hip', 'hip flexor', 'hip crease'], placementTemplateType: 'front_back_bridge', safetyNotes: ['Do not force deep stretching before the area settles.'] },
  { id: 'hip-glute', bodyArea: 'hip_glute', title: 'Glute', plainLanguageDescription: 'Butt-cheek or glute muscle area.', technicalArea: 'Gluteal region', keywords: ['glute', 'butt cheek'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'hip-piriformis', bodyArea: 'hip_glute', title: 'Piriformis / Deep Glute', plainLanguageDescription: 'Deep glute or piriformis area.', technicalArea: 'Piriformis / deep external rotator region', keywords: ['piriformis', 'deep glute'], placementTemplateType: 'nerve_pathway', safetyNotes: ['Escalate if numbness or weakness increases.'] },
  { id: 'hip-si-joint', bodyArea: 'hip_glute', title: 'SI Joint', plainLanguageDescription: 'Low-back dimple or SI area related to the hip.', technicalArea: 'Sacroiliac region', keywords: ['si joint'], placementTemplateType: 'front_back_bridge', safetyNotes: [] },
  { id: 'hip-lateral', bodyArea: 'hip_glute', title: 'Lateral Hip / Greater Trochanter', plainLanguageDescription: 'Outer hip bone area.', technicalArea: 'Greater trochanter / lateral hip region', keywords: ['outer hip', 'lateral hip'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'hip-hamstring-origin', bodyArea: 'hip_glute', title: 'Upper Hamstring Origin', plainLanguageDescription: 'Sit-bone / upper hamstring attachment area.', technicalArea: 'Ischial tuberosity / proximal hamstring origin', keywords: ['sit bone', 'hamstring origin'], placementTemplateType: 'tendon_area', safetyNotes: [] },

  { id: 'thigh-quad', bodyArea: 'thigh', title: 'Quad', plainLanguageDescription: 'Front thigh muscle area.', technicalArea: 'Quadriceps region', keywords: ['quad', 'front thigh'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'thigh-inner-adductor', bodyArea: 'thigh', title: 'Inner Thigh / Adductor', plainLanguageDescription: 'Inner thigh or adductor area.', technicalArea: 'Adductor region', keywords: ['inner thigh', 'adductor'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'thigh-outer-it-band', bodyArea: 'thigh', title: 'Outer Thigh / IT Band', plainLanguageDescription: 'Outer thigh line.', technicalArea: 'Lateral thigh / IT band region', keywords: ['outer thigh', 'it band'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'thigh-hamstring', bodyArea: 'thigh', title: 'Hamstring', plainLanguageDescription: 'Back thigh or hamstring area.', technicalArea: 'Hamstring muscle region', keywords: ['hamstring'], placementTemplateType: 'muscle_belly', safetyNotes: [] },
  { id: 'thigh-upper', bodyArea: 'thigh', title: 'Upper Thigh', plainLanguageDescription: 'Upper thigh area.', technicalArea: 'Proximal thigh region', keywords: ['upper thigh'], placementTemplateType: 'muscle_belly', safetyNotes: [] },

  { id: 'knee-patella', bodyArea: 'knee', title: 'Kneecap / Patella', plainLanguageDescription: 'Front kneecap area.', technicalArea: 'Patellar region', keywords: ['kneecap', 'patella'], placementTemplateType: 'above_below_joint', safetyNotes: [] },
  { id: 'knee-inner', bodyArea: 'knee', title: 'Inner Knee', plainLanguageDescription: 'Inside knee area.', technicalArea: 'Medial knee region', keywords: ['inner knee', 'medial knee'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'knee-outer', bodyArea: 'knee', title: 'Outer Knee', plainLanguageDescription: 'Outside knee area.', technicalArea: 'Lateral knee region', keywords: ['outer knee', 'lateral knee'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'knee-back', bodyArea: 'knee', title: 'Back of Knee', plainLanguageDescription: 'Soft crease behind the knee.', technicalArea: 'Popliteal fossa region', keywords: ['back of knee'], placementTemplateType: 'front_back_bridge', safetyNotes: [] },
  { id: 'knee-patellar-tendon', bodyArea: 'knee', title: 'Patellar Tendon', plainLanguageDescription: 'Below-kneecap tendon area.', technicalArea: 'Patellar tendon / tibial tuberosity region', keywords: ['patellar tendon', 'below knee'], placementTemplateType: 'tendon_area', safetyNotes: [] },
  { id: 'knee-quad-tendon', bodyArea: 'knee', title: 'Quad Tendon', plainLanguageDescription: 'Above-kneecap tendon area.', technicalArea: 'Quadriceps tendon region', keywords: ['quad tendon', 'above knee'], placementTemplateType: 'tendon_area', safetyNotes: [] },

  { id: 'lower-leg-shin', bodyArea: 'lower_leg', title: 'Shin', plainLanguageDescription: 'Front lower-leg area.', technicalArea: 'Anterior tibial region', keywords: ['shin'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'lower-leg-calf', bodyArea: 'lower_leg', title: 'Calf', plainLanguageDescription: 'Back lower-leg muscle area.', technicalArea: 'Gastrocnemius / soleus region', keywords: ['calf'], placementTemplateType: 'muscle_belly', safetyNotes: ['Severe one-sided calf pain, heat, redness, or swelling needs medical evaluation.'] },
  { id: 'lower-leg-outer', bodyArea: 'lower_leg', title: 'Outer Lower Leg', plainLanguageDescription: 'Outer lower-leg area.', technicalArea: 'Lateral lower-leg compartment', keywords: ['outer lower leg'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'lower-leg-achilles-area', bodyArea: 'lower_leg', title: 'Achilles Area', plainLanguageDescription: 'Back ankle / heel-cord area.', technicalArea: 'Achilles tendon pathway', keywords: ['achilles'], placementTemplateType: 'tendon_area', safetyNotes: [] },

  { id: 'foot-heel', bodyArea: 'foot_ankle', title: 'Heel', plainLanguageDescription: 'Heel or back-bottom foot area.', technicalArea: 'Calcaneal / heel region', keywords: ['heel'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'foot-arch', bodyArea: 'foot_ankle', title: 'Arch', plainLanguageDescription: 'Foot arch area.', technicalArea: 'Medial arch / plantar fascia region', keywords: ['arch'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'foot-ball', bodyArea: 'foot_ankle', title: 'Ball of Foot', plainLanguageDescription: 'Forefoot / ball of foot area.', technicalArea: 'Metatarsal head region', keywords: ['ball of foot', 'forefoot'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'foot-toes', bodyArea: 'foot_ankle', title: 'Toes', plainLanguageDescription: 'Toe area.', technicalArea: 'Digital / toe region', keywords: ['toes'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'foot-inner-ankle', bodyArea: 'foot_ankle', title: 'Inner Ankle', plainLanguageDescription: 'Inside ankle bone area.', technicalArea: 'Medial malleolus region', keywords: ['inner ankle'], placementTemplateType: 'swelling_drainage', safetyNotes: [] },
  { id: 'foot-outer-ankle', bodyArea: 'foot_ankle', title: 'Outer Ankle', plainLanguageDescription: 'Outside ankle bone area.', technicalArea: 'Lateral malleolus region', keywords: ['outer ankle'], placementTemplateType: 'local_area', safetyNotes: [] },
  { id: 'foot-achilles', bodyArea: 'foot_ankle', title: 'Achilles', plainLanguageDescription: 'Back of ankle / heel cord.', technicalArea: 'Achilles tendon region', keywords: ['achilles', 'heel cord'], placementTemplateType: 'tendon_area', safetyNotes: [] },
];

export function getCloseUpOptionsForBodyArea(bodyArea: StableBodyRegionId) {
  return BODY_CLOSE_UP_OPTIONS.filter((option) => option.bodyArea === bodyArea);
}

export function getCloseUpOptionByTitle(bodyArea: StableBodyRegionId, title: string) {
  return BODY_CLOSE_UP_OPTIONS.find(
    (option) => option.bodyArea === bodyArea && option.title === title
  );
}
