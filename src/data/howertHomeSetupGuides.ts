export type HowertHomeSetupGuideRiskLevel =
  | "info"
  | "caution"
  | "professional-review"
  | "medical-referral";

export type HowertHomeSetupGuide = {
  id: string;
  title: string;
  category:
    | "disclaimer"
    | "getting-started"
    | "hydration"
    | "electrode-care"
    | "lead-wires"
    | "placement-setup"
    | "tub"
    | "detox"
    | "batching"
    | "magnetic-converter"
    | "device-navigation";
  summary: string;
  rules: string[];
  riskLevel: HowertHomeSetupGuideRiskLevel;
  tags: string[];
  sourcePages?: number[];
};

export const HOWERT_HOME_SETUP_GUIDES: HowertHomeSetupGuide[] = [
  {
    id: "manual-disclaimer",
    title: "Manual Use Disclaimer",
    category: "disclaimer",
    summary:
      "The manual is a support reference and does not replace diagnosis, treatment, or professional judgment.",
    rules: [
      "Do not present Vantedge guidance as a medical diagnosis.",
      "Use the manual as support context, not as a replacement for medical or qualified professional care.",
      "For serious, worsening, unusual, neurological, respiratory, infection-related, or injury-related symptoms, recommend professional review or medical care.",
      "Healthcare practitioners are responsible for evaluating each person and determining suitable, safe use.",
    ],
    riskLevel: "medical-referral",
    tags: ["disclaimer", "medical", "professional review", "safety"],
    sourcePages: [2, 3, 4],
  },
  {
    id: "home-intensity-basics",
    title: "Home Device Intensity Basics",
    category: "getting-started",
    summary:
      "Current intensity should be comfortable and does not need to be felt strongly to be useful.",
    rules: [
      "Average adult reference range: 80-200 uA.",
      "Athlete adult reference range: 100-300 uA.",
      "Infant reference range: 20-40 uA.",
      "Toddler/child reference range: 40-80 uA.",
      "Detox-risk or fragile individual reference range: 40-80 uA.",
      "Current can be adjusted during the session using the plus/minus controls.",
      "The manual notes that current does not need to be felt to be effective.",
    ],
    riskLevel: "caution",
    tags: ["intensity", "current", "uA", "home model", "getting started"],
    sourcePages: [5],
  },
  {
    id: "hydration-basics",
    title: "Hydration Guidance",
    category: "hydration",
    summary:
      "Hydration is treated as a basic support rule, especially before treatment and during longer sessions.",
    rules: [
      "Hydration is described as essential to treatment efficacy.",
      "The manual recommends at least two glasses of water prior to first treatment.",
      "For longer periods, add water about every 90 minutes or less.",
      "Coffee, black tea, and alcohol can work against hydration and may require additional water intake.",
    ],
    riskLevel: "caution",
    tags: ["hydration", "water", "detox", "long session"],
    sourcePages: [5],
  },
  {
    id: "pregnancy-pacemaker-warning",
    title: "Pregnancy and Pacemaker Warning",
    category: "getting-started",
    summary:
      "The Home manual includes clear warnings around pregnancy and pacemakers.",
    rules: [
      "Do not use the device with individuals who are or may be pregnant.",
      "Use with pacemakers is not advised unless specific qualified medical training has been given.",
      "Vantedge should treat pregnancy or pacemaker language as a stop condition for self-guided guidance.",
    ],
    riskLevel: "medical-referral",
    tags: ["pregnancy", "pacemaker", "contraindication", "red flag"],
    sourcePages: [5],
  },
  {
    id: "electrode-care-basics",
    title: "Electrode Care Basics",
    category: "electrode-care",
    summary:
      "Electrode quality, skin cleanliness, and careful handling matter for safe and consistent conduction.",
    rules: [
      "Electrodes are meant to be used by one person.",
      "Expected use varies, but the manual references roughly 10-30 uses depending on pad quality and care.",
      "Do not apply electrodes to skin with oils, residue, or natural oils that reduce stickiness.",
      "Do not apply electrodes to irritated or injured skin.",
      "Hair can affect conduction; shaving may help the treatment area.",
      "Handle electrodes by the pad tips. Do not pull by the wires.",
      "Rewetting with clean water before storage can improve stickiness for future use.",
    ],
    riskLevel: "caution",
    tags: ["electrodes", "pads", "skin", "conduction", "care"],
    sourcePages: [49],
  },
  {
    id: "lead-wire-recommended-setup",
    title: "Lead Wire Recommended Setup",
    category: "lead-wires",
    summary:
      "The manual recommends a combined/piggyback pin setup for standard Micro-Sport use.",
    rules: [
      "Recommended setup: red pin connected to yellow pin.",
      "Recommended setup: blue pin connected to green pin.",
      "This combined setup is recommended for standard Micro-Sport use.",
      "Using all pins separately is not suggested except for magnetic converter setups.",
    ],
    riskLevel: "caution",
    tags: ["lead wires", "red yellow", "blue green", "piggyback", "setup"],
    sourcePages: [15],
  },
  {
    id: "lead-wire-avoid-damage",
    title: "Lead Wire Damage Prevention",
    category: "lead-wires",
    summary:
      "Lead wires should be handled gently to avoid damaging pins, wires, or the device port.",
    rules: [
      "Do not separate wires at the pins because it can damage the pins and reduce current.",
      "Do not pull wires apart from one another.",
      "Do not repeatedly unplug and plug wires while changing wires because this may damage the port.",
      "Keep an extra set of wires available in case of breakage or failure.",
    ],
    riskLevel: "caution",
    tags: ["lead wires", "damage", "pins", "port", "avoid"],
    sourcePages: [15],
  },
  {
    id: "towel-electrode-interchange",
    title: "Towels and Electrodes Can Be Interchanged",
    category: "placement-setup",
    summary:
      "The manual allows electrode patches and wet towels to be interchanged according to user preference and skin needs.",
    rules: [
      "Electrode patches and wet towels can be interchanged according to user preference.",
      "The manual recommends towels for facial programs, prostate program, sensitive skin, or fragile skin.",
      "Towels may help when electrodes are uncomfortable, when better coverage is needed, or when skin needs protection.",
    ],
    riskLevel: "caution",
    tags: ["towels", "electrodes", "sensitive skin", "face", "prostate"],
    sourcePages: [6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    id: "spine-nerve-setup-summary",
    title: "Spine and Nerve Setup Summary",
    category: "placement-setup",
    summary:
      "The manual includes separate setup concepts for spine, neck, nerve, and low-back patterns.",
    rules: [
      "Spine and nerve setups may use towels or electrodes depending on the issue and user tolerance.",
      "For neck or nerve issues, avoid treating a broad area without considering whether symptoms travel into the arm or other nerve pathways.",
      "For low-back issues with nerve symptoms into the hips or legs, placement may extend toward the hip or leg below the pain area.",
      "Vantedge should not mix front hip, deep glute, SI, low back, and nerve patterns unless the user wording supports that connection.",
    ],
    riskLevel: "professional-review",
    tags: ["spine", "nerve", "neck", "low back", "radiating pain"],
    sourcePages: [6, 7, 8],
  },
  {
    id: "gut-stress-wellness-setup-summary",
    title: "Gut, Stress, and Wellness Setup Summary",
    category: "placement-setup",
    summary:
      "The manual shows gut/stress/wellness patterns as their own setup category, separate from local joint or injury setups.",
    rules: [
      "Gut and stress support patterns may use neck/chest, abdominal, or towel-based placements depending on the program.",
      "Do not automatically convert local orthopedic pain into gut/stress/wellness guidance.",
      "Use gut/stress/wellness setup context when user wording mentions gut, nausea, stress, wellness, respiratory, histamine, or systemic illness patterns.",
    ],
    riskLevel: "professional-review",
    tags: ["gut", "stress", "wellness", "abdomen", "systemic"],
    sourcePages: [9],
  },
  {
    id: "site-specific-joint-setup-summary",
    title: "Site-Specific Joint Setup Summary",
    category: "placement-setup",
    summary:
      "The manual provides site-specific setup concepts for knees, elbows, hands, shoulders, hips, ankles, and other joints.",
    rules: [
      "For joints, the general setup is often above/below or side-to-side around the joint.",
      "For knees, do not place side-to-side current directly through the shoulder joint. This shoulder note is separate from knee placement.",
      "For hip/SI patterns, the second pad can move toward the outer hip or front hip depending on the pain pattern.",
      "For ankles, red/yellow above and blue/green below is commonly referenced; spacing and comfort matter.",
    ],
    riskLevel: "caution",
    tags: ["joint", "knee", "shoulder", "hip", "ankle", "site specific"],
    sourcePages: [10, 11],
  },
  {
    id: "face-jaw-setup-summary",
    title: "Face and Jaw Setup Summary",
    category: "placement-setup",
    summary:
      "Face, jaw, sinus, and skin facial programs require extra caution due to sensitivity and seizure-related warnings.",
    rules: [
      "For head or sinus-specific programs, the manual notes red/yellow to the back of the neck and blue/green to the forehead.",
      "Do not use this setup for people with seizure disorder.",
      "Do not exceed 100 uA when using face-related setups; recommended range is roughly 40-80 uA due to facial sensitivity.",
      "Do not allow two towels to touch in face/jaw setups.",
      "Jaw/tooth and skin/acne/wrinkle programs should be handled conservatively.",
    ],
    riskLevel: "medical-referral",
    tags: ["face", "jaw", "sinus", "seizure", "forehead", "sensitive"],
    sourcePages: [12],
  },
  {
    id: "tub-water-setup",
    title: "Tub and Water Setup",
    category: "tub",
    summary:
      "The manual includes water-based setup suggestions and device protection cautions.",
    rules: [
      "Bare lead tips may be dropped into the water for tub setups.",
      "Additives such as Epsom salts may damage leads.",
      "Take care to keep the device dry.",
      "Direct water exposure to the unit can cause damage.",
      "Tub suggestions may be useful for whole-body treatment or foot problems when both feet are treated at the same time.",
    ],
    riskLevel: "caution",
    tags: ["tub", "water", "foot", "whole body", "leads", "device care"],
    sourcePages: [14],
  },
  {
    id: "detox-support",
    title: "Detox Support",
    category: "detox",
    summary:
      "The manual describes detox reaction patterns and practical support steps.",
    rules: [
      "Detox reactions may include headache, nausea, increased pain, brain fog/fuzzy thinking, vomiting in extreme cases, or other discomfort.",
      "Detox is described as uncommon when treatment time is under 3 hours.",
      "Hydration is emphasized after treatment.",
      "Vitamin C, Epsom salt bath, ionic foot bath, infrared sauna, and detox pads are listed as possible support options, but medical contraindications must be respected.",
      "If symptoms become significant, concerning, or prolonged, contact a personal practitioner or medical professional.",
    ],
    riskLevel: "professional-review",
    tags: ["detox", "headache", "nausea", "brain fog", "hydration", "support"],
    sourcePages: [46],
  },
  {
    id: "post-op-injury-protocol-overview",
    title: "Post-Operative and Injury Protocol Overview",
    category: "placement-setup",
    summary:
      "The manual includes a staged post-op and injury support overview.",
    rules: [
      "Post-op and injury protocols are staged by timing after injury or surgery.",
      "Immediate post-injury or surgery support may include trauma, concussion/relaxation, joint/sprain, muscle, wound healing, fracture, swelling, detox, sleep, lymph, quick pain, and nerve options depending on the case.",
      "Vantedge should treat post-op, concussion, fracture, wound, swelling, infection, and severe injury language as professional-review or medical-referral categories.",
    ],
    riskLevel: "medical-referral",
    tags: ["post op", "injury", "surgery", "trauma", "fracture", "wound"],
    sourcePages: [47],
  },
  {
    id: "batching-option",
    title: "Batching Option",
    category: "batching",
    summary:
      "Batching allows multiple programs to run in sequence without resetting between each one.",
    rules: [
      "Batching can place a series of programs into slots so they run one after another.",
      "The manual describes up to 9 batch slots.",
      "Start with slot 1 and fill slots in order.",
      "Programs can be repeated in multiple slots.",
      "While running a batch, STOP can skip a program or stop the batch depending on how long it is held.",
    ],
    riskLevel: "info",
    tags: ["batching", "program sequence", "slots", "device operation"],
    sourcePages: [48],
  },
  {
    id: "magnetic-converter",
    title: "Magnetic Converter",
    category: "magnetic-converter",
    summary:
      "The magnetic converter changes the signal into magnetic fields and has strict placement cautions.",
    rules: [
      "The converter should be matched with the correct colored pins.",
      "All cords must be disconnected from the Micro-Sport before inserting the converter.",
      "Do not use pulsed electromagnetic/magnetic converter setups near pregnant individuals or anyone with pacemakers or other indwelling pumps.",
      "The discs generate a magnetic field and should be positioned so the smooth side faces the body.",
      "This is useful as context only; Vantedge should not recommend magnetic converter use without explicit device support and safety review.",
    ],
    riskLevel: "medical-referral",
    tags: ["magnetic converter", "pemf", "pacemaker", "pregnancy", "device setup"],
    sourcePages: [45],
  },
  {
    id: "device-navigation",
    title: "Micro-Sport Device Navigation",
    category: "device-navigation",
    summary:
      "The manual identifies the main device controls and navigation areas.",
    rules: [
      "The device includes controls for increasing and decreasing current intensity.",
      "The device includes output ports for channels CH1/CH2.",
      "The manual notes not to unplug leads from each channel while connected.",
      "The device includes power/stop, start, pause, back, all/history/recent/program menu, and navigation arrows.",
      "A current conduction indicator may show light when conduction issues are present.",
    ],
    riskLevel: "info",
    tags: ["device navigation", "buttons", "current", "channels", "controls"],
    sourcePages: [50],
  },
];

export function getHowertHomeSetupGuideById(
  id: string
): HowertHomeSetupGuide | undefined {
  return HOWERT_HOME_SETUP_GUIDES.find((guide) => guide.id === id);
}

export function searchHowertHomeSetupGuides(query: string): HowertHomeSetupGuide[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return HOWERT_HOME_SETUP_GUIDES.filter((guide) => {
    const searchableText = [
      guide.id,
      guide.title,
      guide.category,
      guide.summary,
      guide.rules.join(" "),
      guide.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getHowertHomeSetupGuidesByTags(
  tags: string[]
): HowertHomeSetupGuide[] {
  const normalizedTags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);

  if (!normalizedTags.length) {
    return [];
  }

  return HOWERT_HOME_SETUP_GUIDES.filter((guide) =>
    normalizedTags.some((tag) =>
      guide.tags.some((guideTag) => guideTag.toLowerCase().includes(tag))
    )
  );
}
