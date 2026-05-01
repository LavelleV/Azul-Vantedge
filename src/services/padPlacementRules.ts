export type PadPlacementContext = {
  question?: string;
  userQuestion?: string;
  selectedBodyArea?: string | null;
  bodyArea?: string | null;
  taggedArea?: string | null;
};

type PadPlacementSet = {
  pad1: {
    plain: string;
    technical: string;
  };
  pad2: {
    plain: string;
    technical: string;
  };
  optional?: string[];
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

function getQuestion(context: PadPlacementContext): string {
  return clean(context.question || context.userQuestion);
}

function getArea(context: PadPlacementContext): string {
  return clean(context.selectedBodyArea || context.bodyArea || context.taggedArea);
}

function getPatternText(context: PadPlacementContext): string {
  return `${normalize(getQuestion(context))} ${normalize(getArea(context))}`;
}

function formatPlacement(set: PadPlacementSet): string[] {
  const lines = [
    `Pad 1: ${set.pad1.plain}`,
    `Technical area: ${set.pad1.technical}`,
    `Pad 2: ${set.pad2.plain}`,
    `Technical area: ${set.pad2.technical}`,
  ];

  if (set.optional?.length) {
    lines.push(...set.optional);
  }

  return lines;
}

function buildShoulderPlacement(context: PadPlacementContext): string[] {
  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the front of the sore shoulder, just below the collarbone where the shoulder starts to round forward.",
      technical: "Anterior shoulder / Coracoid Process region.",
    },
    pad2: {
      plain:
        "Place the second pad on the back of the same shoulder, over the soft muscle area on the shoulder blade.",
      technical: "Posterior rotator cuff / Infraspinatus-Scapular region.",
    },
    optional: [
      "Optional adjustment: If the pain is mostly on top of the shoulder, move Pad 2 slightly higher toward the top of the shoulder blade.",
      "Avoid placing both pads directly on the sharpest pain point. The goal is to create a field through the shoulder, not crowd one spot.",
    ],
  });
}

function buildArmHandPlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["wrist", "hand", "finger", "thumb", "palm", "grip"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad on the sore side of the wrist or hand where the discomfort feels most active.",
        technical: "Wrist / Hand soft-tissue region.",
      },
      pad2: {
        plain:
          "Place the second pad a few inches up the forearm on the same side, following the tight or sore line toward the elbow.",
        technical: "Forearm flexor or extensor muscle-tendon pathway.",
      },
      optional: [
        "Optional adjustment: For thumb-side discomfort, keep the pads along the thumb-side wrist and forearm line.",
        "Optional adjustment: For palm or finger tension, keep the first pad closer to the palm or base of the fingers, then place Pad 2 up the forearm.",
      ],
    });
  }

  if (includesAny(pattern, ["elbow"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad just above or beside the sore elbow area, not directly on the sharpest bone point.",
        technical: "Medial or lateral elbow soft-tissue region.",
      },
      pad2: {
        plain:
          "Place the second pad a few inches down the forearm along the same tight or sore line.",
        technical: "Forearm flexor/extensor tendon pathway.",
      },
      optional: [
        "Optional adjustment: If the pain is on the outside of the elbow, use the outside forearm line.",
        "Optional adjustment: If the pain is on the inside of the elbow, use the inside forearm line.",
      ],
    });
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the sore part of the upper arm or forearm where the discomfort feels most centered.",
      technical: "Arm soft-tissue region.",
    },
    pad2: {
      plain:
        "Place the second pad several inches away along the same muscle line, either above or below the sore area.",
      technical: "Biceps, triceps, forearm flexor, or forearm extensor pathway.",
    },
    optional: [
      "Optional adjustment: Keep both pads on the same general tissue line so the current crosses through the irritated area.",
    ],
  });
}

function buildChestRibPlacement(context: PadPlacementContext): string[] {
  return formatPlacement({
    pad1: {
      plain:
        "Place one pad near the mild sore rib or chest-wall area, staying off sharp pain and away from emergency-type chest symptoms.",
      technical: "Pectoral / Rib / Intercostal region.",
    },
    pad2: {
      plain:
        "Place the second pad a few inches to the side or slightly below the first pad so the signal crosses the sore chest-wall or rib area.",
      technical: "Adjacent intercostal or pectoral tissue line.",
    },
    optional: [
      "Important: Chest pressure, shortness of breath, radiating pain, dizziness, or unexplained chest symptoms require medical evaluation immediately.",
    ],
  });
}

function buildAbdomenPlacement(context: PadPlacementContext): string[] {
  return formatPlacement({
    pad1: {
      plain:
        "Place one pad gently on the upper abdomen where the area feels tense or unsettled, avoiding sharp or highly tender points.",
      technical: "Upper abdominal wall region.",
    },
    pad2: {
      plain:
        "Place the second pad lower on the abdomen with enough space between the pads to create a broad, calm field.",
      technical: "Lower abdominal wall / pelvic bowl region.",
    },
    optional: [
      "Use a conservative setting and stop if symptoms worsen or feel unusual.",
      "Severe, sharp, fever-related, persistent, or unexplained abdominal pain should be evaluated by a licensed medical professional.",
    ],
  });
}

function buildLowBackPlacement(context: PadPlacementContext): string[] {
  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the sore low-back dimple area, just to the side of the spine where the pain feels centered.",
      technical: "SI Joint / Sacroiliac region.",
    },
    pad2: {
      plain:
        "Place the second pad on the front of the same-side hip near the front hip bone.",
      technical: "ASIS / Anterior hip region.",
    },
    optional: [
      "Optional adjustment: If the pain feels more centered in the low back instead of the dimple, place Pad 1 on the sore low-back muscle area and Pad 2 on the same-side outer hip.",
      "Avoid aggressive twisting or deep pressure immediately after the session.",
    ],
  });
}

function buildHipGlutePlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["front hip", "hip flexor", "groin"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad on the front of the hip where the crease or hip-flexor tightness feels most active.",
        technical: "Anterior hip / Hip flexor / Iliopsoas region.",
      },
      pad2: {
        plain:
          "Place the second pad on the side of the same hip near the outer hip bone.",
        technical: "Greater Trochanter / Lateral hip region.",
      },
      optional: [
        "Optional adjustment: If the discomfort feels deeper in the glute instead, use the glute placement instead of the front-hip placement.",
      ],
    });
  }

  if (includesAny(pattern, ["si joint", "sacroiliac", "low back dimple"])) {
    return buildLowBackPlacement(context);
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the sore butt-cheek area where the pain feels deepest or most centered.",
      technical: "Glute / Piriformis region.",
    },
    pad2: {
      plain:
        "Place the second pad on the side of the same hip near the outer hip bone.",
      technical: "Greater Trochanter / Lateral hip region.",
    },
    optional: [
      "Optional adjustment: If pain travels down the back of the leg, move Pad 2 lower onto the back of the upper thigh.",
      "Technical area for that adjustment: Hamstring / Sciatic pathway.",
    ],
  });
}

function buildThighPlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["hamstring", "back of thigh"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad at the lower butt-cheek crease where the pulling or soreness begins.",
        technical: "Ischial Tuberosity / Upper hamstring origin.",
      },
      pad2: {
        plain:
          "Place the second pad several inches down the back of the thigh along the same tight or sore line.",
        technical: "Hamstring muscle pathway.",
      },
      optional: [
        "Avoid aggressive stretching right after the session if the area feels strained or reactive.",
      ],
    });
  }

  if (includesAny(pattern, ["inner thigh", "adductor"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad on the sore inner-thigh area where the tightness or pulling feels strongest.",
        technical: "Adductor muscle group.",
      },
      pad2: {
        plain:
          "Place the second pad a few inches above or below along the same inner-thigh line.",
        technical: "Adductor fascial pathway.",
      },
    });
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the sore part of the thigh where the discomfort feels most centered.",
      technical: "Quadriceps / Thigh soft-tissue region.",
    },
    pad2: {
      plain:
        "Place the second pad several inches away along the same thigh muscle line.",
      technical: "Quadriceps, hamstring, adductor, or IT band pathway.",
    },
    optional: [
      "Optional adjustment: If the pain is on the outside of the thigh, place the pads along the outer thigh line.",
      "Technical area for that adjustment: IT Band / Lateral thigh region.",
    ],
  });
}

function buildKneePlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["inner knee", "inside knee", "medial"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad on the inside/front of the knee, about two inches below the kneecap where the tenderness feels strongest.",
        technical: "Pes Anserine / Medial knee region.",
      },
      pad2: {
        plain:
          "Place the second pad on the inside/back side of the knee near the soft crease.",
        technical: "Medial hamstring / Popliteal region.",
      },
      optional: [
        "Keep the pressure gentle and do not press hard into a swollen or highly tender inside-knee pocket.",
      ],
    });
  }

  if (includesAny(pattern, ["back of knee", "behind knee", "posterior"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad gently behind the knee crease where the fullness or discomfort feels centered.",
        technical: "Popliteal Fossa.",
      },
      pad2: {
        plain:
          "Place the second pad just above or below the back of the knee along the same tissue line.",
        technical: "Distal hamstring or upper calf pathway.",
      },
      optional: [
        "Avoid deep pressure behind the knee. If swelling is sudden, painful, hot, or one-sided, seek medical evaluation.",
      ],
    });
  }

  return formatPlacement({
    pad1: {
      plain: "Place one pad just above the kneecap on the lower thigh.",
      technical: "Quadriceps Tendon / Suprapatellar region.",
    },
    pad2: {
      plain:
        "Place the second pad about two inches below the kneecap near the small bump on the shin.",
      technical: "Patellar Tendon / Tibial Tuberosity region.",
    },
    optional: [
      "Optional adjustment: If the knee feels puffy behind the joint too, place one pad in front near the kneecap and the second gently behind the knee crease.",
      "Technical area for that adjustment: Patellar region to Popliteal Fossa.",
    ],
  });
}

function buildLowerLegPlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["shin"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad beside the sore shin area, not directly on the sharp front edge of the shin bone.",
        technical: "Anterior tibialis / Shin soft-tissue region.",
      },
      pad2: {
        plain:
          "Place the second pad several inches above or below along the same shin line.",
        technical: "Anterior lower-leg fascial pathway.",
      },
    });
  }

  if (includesAny(pattern, ["achilles"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad just above the heel where the Achilles feels tight or sore.",
        technical: "Achilles tendon region.",
      },
      pad2: {
        plain:
          "Place the second pad higher on the calf along the same back-of-leg line.",
        technical: "Gastrocnemius / Soleus pathway.",
      },
      optional: [
        "Avoid aggressive stretching if the Achilles feels sharp, hot, swollen, or highly reactive.",
      ],
    });
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the tight or sore calf area where the discomfort feels most centered.",
      technical: "Gastrocnemius / Soleus region.",
    },
    pad2: {
      plain:
        "Place the second pad several inches above or below along the same calf line.",
      technical: "Posterior lower-leg muscle pathway.",
    },
    optional: [
      "Important: Sudden one-sided calf pain with heat, redness, swelling, or shortness of breath should be treated as a medical concern.",
    ],
  });
}

function buildFootAnklePlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["heel"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad near the sore heel area where the pressure or pain feels strongest.",
        technical: "Calcaneal / Heel region.",
      },
      pad2: {
        plain:
          "Place the second pad along the arch or just above the heel toward the ankle.",
        technical: "Plantar fascia or Achilles-calcaneal pathway.",
      },
    });
  }

  if (includesAny(pattern, ["arch", "plantar"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad along the sore arch area on the bottom or inner side of the foot.",
        technical: "Plantar fascia / Medial arch region.",
      },
      pad2: {
        plain:
          "Place the second pad closer to the heel or ball of the foot along the same arch line.",
        technical: "Plantar fascial pathway.",
      },
    });
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad near the sore ankle area, using the side that feels most involved.",
      technical: "Medial or Lateral Malleolus region.",
    },
    pad2: {
      plain:
        "Place the second pad on the foot or lower leg so the signal crosses through the sore ankle/foot area.",
      technical: "Foot-ankle joint pathway.",
    },
    optional: [
      "Optional adjustment: If the pain is more in the toes or ball of the foot, move Pad 1 closer to that area and keep Pad 2 along the arch or top of the foot.",
      "Technical area for that adjustment: Forefoot / Metatarsal region.",
    ],
  });
}

function buildNeckPlacement(context: PadPlacementContext): string[] {
  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the tight side of the neck or just below the base of the skull where the tension feels strongest.",
      technical: "Cervical paraspinal / Suboccipital region.",
    },
    pad2: {
      plain:
        "Place the second pad lower on the same side near the top of the shoulder.",
      technical: "Upper Trapezius / Levator Scapulae region.",
    },
    optional: [
      "Avoid placing pads on the front of the throat or directly over the carotid pulse area.",
    ],
  });
}

function buildHeadPlacement(context: PadPlacementContext): string[] {
  const pattern = getPatternText(context);

  if (includesAny(pattern, ["jaw", "tmj"])) {
    return formatPlacement({
      pad1: {
        plain:
          "Place one pad near the jaw muscle area in front of the ear, staying comfortable and gentle.",
        technical: "TMJ / Masseter region.",
      },
      pad2: {
        plain:
          "Place the second pad lower along the jaw or upper neck on the same side.",
        technical: "Mandibular / Upper cervical support region.",
      },
      optional: ["Avoid placing pads near the eye or inside the mouth."],
    });
  }

  return formatPlacement({
    pad1: {
      plain:
        "Place one pad on the forehead above the eyebrows where it feels comfortable.",
      technical: "Frontal region.",
    },
    pad2: {
      plain: "Place the second pad at the back of the neck near the hairline.",
      technical: "Cervical-Brainstem / Suboccipital region.",
    },
    optional: [
      "Use conservative settings for head/face work and stop if symptoms feel unusual or worsen.",
    ],
  });
}

function buildDefaultPlacement(context: PadPlacementContext): string[] {
  const area = getArea(context) || "the main area";

  return formatPlacement({
    pad1: {
      plain: `Place one pad just above or before the main ${area} complaint area.`,
      technical: "Proximal support point near the selected region.",
    },
    pad2: {
      plain: `Place the second pad just below or beyond the ${area} complaint area so the signal crosses the tissue instead of sitting on one hotspot.`,
      technical: "Distal support point across the selected region.",
    },
    optional: [
      "Keep the setup comfortable and avoid placing both pads directly on the sharpest pain point.",
    ],
  });
}

export function buildPlainLanguagePadPlacement(context: PadPlacementContext): string[] {
  const area = normalize(getArea(context));

  if (includesAny(area, ["shoulder", "rotator", "scapula", "upper trap"])) {
    return buildShoulderPlacement(context);
  }

  if (includesAny(area, ["wrist", "hand", "forearm", "elbow", "arm"])) {
    return buildArmHandPlacement(context);
  }

  if (includesAny(area, ["chest", "rib", "sternum", "intercostal", "pectoral"])) {
    return buildChestRibPlacement(context);
  }

  if (includesAny(area, ["abdomen", "gut", "stomach"])) {
    return buildAbdomenPlacement(context);
  }

  if (includesAny(area, ["low back", "lumbar", "sacrum", "sacroiliac", "si joint"])) {
    return buildLowBackPlacement(context);
  }

  if (includesAny(area, ["hip", "glute", "pelvis", "piriformis"])) {
    return buildHipGlutePlacement(context);
  }

  if (includesAny(area, ["thigh", "quad", "hamstring", "adductor", "it band"])) {
    return buildThighPlacement(context);
  }

  if (includesAny(area, ["knee", "patella", "kneecap"])) {
    return buildKneePlacement(context);
  }

  if (includesAny(area, ["lower leg", "calf", "shin", "achilles"])) {
    return buildLowerLegPlacement(context);
  }

  if (includesAny(area, ["foot", "ankle", "heel", "arch", "toes"])) {
    return buildFootAnklePlacement(context);
  }

  if (includesAny(area, ["neck", "cervical", "base of skull"])) {
    return buildNeckPlacement(context);
  }

  if (includesAny(area, ["head", "face", "jaw", "tmj", "temple", "sinus", "ear"])) {
    return buildHeadPlacement(context);
  }

  return buildDefaultPlacement(context);
}
