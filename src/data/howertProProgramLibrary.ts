export type HoweRTProProgram = {
  number: number;
  code: string;
  name: string;
  module: string;
  time: string;
  usesFor: string;
  suggestedFrequency: string;
  precautions: string;
  setupNotes: string;
  tags: string[];
};

export const howertProProgramLibrary: HoweRTProProgram[] = [
  {
    number: 1,
    code: "Inj1",
    name: "Trauma Basics",
    module: "Module 1: Injury",
    time: "1 hr 13 min",
    usesFor:
      "For immediate intervention after injuries, especially for stopping and limiting inflammation, pain, and healing time after injury. Helpful for pain control and speedy recovery after injury.",
    suggestedFrequency:
      "As soon as possible after injury. Run daily for 3 days with most injuries. May be used more often during the first week for sprains, strains, or intense pain when appropriate.",
    precautions:
      "Standard precautions apply. Do not apply electrodes on or directly around open wounds.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "injury",
      "trauma",
      "acute injury",
      "inflammation",
      "pain",
      "sprain",
      "strain",
      "swelling",
      "recovery",
    ],
  },
  {
    number: 2,
    code: "Inj2",
    name: "Joint Swelling",
    module: "Module 1: Injury",
    time: "50 min",
    usesFor:
      "To assist with swelling related to extremity injuries, surgeries, or trauma.",
    suggestedFrequency: "Run as needed for joint swelling.",
    precautions:
      "Do not use for extremity swelling that is not injury related. Do not use for swollen muscles, especially hand or hot swelling in the extremity. This may indicate a blood clot concern and can require immediate medical attention.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "joint swelling",
      "swelling",
      "edema",
      "injury swelling",
      "post surgery swelling",
      "trauma swelling",
      "extremity swelling",
    ],
  },
  {
    number: 3,
    code: "Inj3",
    name: "Bruise",
    module: "Module 1: Injury",
    time: "15 min",
    usesFor: "To assist with pain and speed recovery of bruised areas.",
    suggestedFrequency:
      "Daily for extensive bruising. Use three times during the first week for lesser injuries.",
    precautions: "Standard precautions apply.",
    setupNotes: "Red/yellow above the bruise. Blue/green below the bruise.",
    tags: [
      "bruise",
      "bruising",
      "contusion",
      "impact",
      "minor trauma",
      "soreness",
      "recovery",
    ],
  },
  {
    number: 4,
    code: "Inj4",
    name: "Quick Injury / General Pain",
    module: "Module 1: Injury",
    time: "15 min",
    usesFor:
      "Quick intervention for general joint pain, sprains, and unspecified pain. May help when a shorter general pain support program is needed.",
    suggestedFrequency:
      "Use for intermittent joint pain. If repeated use is needed or relief is not adequate, consider the full related program instead.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "quick pain",
      "general pain",
      "joint pain",
      "sprain",
      "injury pain",
      "acute pain",
      "unspecified pain",
    ],
  },
  {
    number: 5,
    code: "Inj5",
    name: "Quick Pain / Nerve",
    module: "Module 1: Injury",
    time: "21 min",
    usesFor:
      "Quick intervention for general pain and nerve-type pain. Nerve pain may feel sharp, electric, intense, aching, or like pins and needles.",
    suggestedFrequency:
      "Use for intermittent nerve pain. If repeated use is needed or relief is not adequate, consider the full nerve pain program instead.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck or nerve root. Blue/green at the end of the nerve root. See manual page 8.",
    tags: [
      "nerve pain",
      "quick nerve pain",
      "sharp pain",
      "electric pain",
      "pins and needles",
      "shooting pain",
      "radiating pain",
    ],
  },
  {
    number: 6,
    code: "Inj6",
    name: "Skin / Wound / Abrasion",
    module: "Module 1: Injury",
    time: "37 min",
    usesFor:
      "To reduce pain and promote healing in skin injuries such as cuts and abrasions.",
    suggestedFrequency:
      "Typical injuries are three treatments. May be used daily to twice daily for accelerating healing or larger abrasions for up to three days.",
    precautions:
      "Overuse may over-heal scars or contribute to excess scar tissue around stitches. Follow recommended frequency only.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "skin wound",
      "abrasion",
      "cut",
      "scrape",
      "skin injury",
      "wound support",
      "healing",
    ],
  },
  {
    number: 7,
    code: "Inj7",
    name: "Concussion Acute Short",
    module: "Module 1: Injury",
    time: "1 hr",
    usesFor:
      "To assist with pain and symptoms of mild concussion or trauma to the head. Medical attention should be prioritized.",
    suggestedFrequency:
      "Use as soon as possible after trauma, in addition to appropriate medical care.",
    precautions:
      "Only use as an adjunct to medical care. Head injury is serious and may lead to complications if improperly diagnosed. Do not return to play or activity until properly cleared by a physician.",
    setupNotes:
      "Red/yellow may be placed at the neck, forehead, or chest. See manual page 12.",
    tags: [
      "concussion",
      "head trauma",
      "head injury",
      "mild concussion",
      "acute head injury",
      "medical referral",
    ],
  },
  {
    number: 8,
    code: "JB1",
    name: "Sprains & Inflammation",
    module: "Module 2: Joint Bone",
    time: "41 min",
    usesFor:
      "For joint sprains, injury-related joint pain, inflammation, and some general pain patterns including TMJ, jaw pain, splints, and plantar fasciitis.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Night or Rehab versions when appropriate.",
    precautions:
      "Standard precautions apply. Use in conjunction with professional guidance when joint injury is significant, worsening, unstable, or not improving.",
    setupNotes:
      "Red/yellow above the joint and blue/green below the joint, or red/yellow left of the joint and blue/green right of the joint. See manual page 10.",
    tags: [
      "sprain",
      "inflammation",
      "joint pain",
      "tmj",
      "jaw pain",
      "splints",
      "plantar fasciitis",
      "joint injury",
      "pain control",
    ],
  },
  {
    number: 9,
    code: "JB2",
    name: "Joint / Cartilage / Meniscus / Labrum",
    module: "Module 2: Joint Bone",
    time: "30 min",
    usesFor:
      "For joint, cartilage, meniscus, labrum, TMJ/disc, and related joint tissue support. May support wellness of full or injured cartilage structures.",
    suggestedFrequency: "Use up to 3x/week. May need JB1 for pain control.",
    precautions:
      "Standard precautions apply. Use professional guidance for significant cartilage, labrum, meniscus, or disc injuries.",
    setupNotes:
      "Red/yellow above the joint and blue/green below the joint. See manual page 10.",
    tags: [
      "cartilage",
      "meniscus",
      "labrum",
      "joint cartilage",
      "tmj disc",
      "joint tissue",
      "cartilage support",
      "joint wellness",
    ],
  },
  {
    number: 10,
    code: "JB3",
    name: "Tendon",
    module: "Module 2: Joint Bone",
    time: "27 min",
    usesFor:
      "For tendon injuries, tendon inflammation, and tendonitis of any joint. Not intended for complete tendon tears unless professionally directed.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Night or Rehab versions when appropriate.",
    precautions:
      "Do not exceed recommended frequency for acute or repetitive stress injuries. Use only with proper care if a partial tear is diagnosed or rupture risk is present. Follow physician or professional guidance for activity and loading.",
    setupNotes:
      "Red/yellow at the top of the joint and blue/green below the joint, or red/yellow left of the joint and blue/green right of the joint. See manual page 10.",
    tags: [
      "tendon",
      "tendonitis",
      "tendon injury",
      "tendon inflammation",
      "partial tear",
      "joint tendon",
      "repetitive stress",
    ],
  },
  {
    number: 11,
    code: "JB4",
    name: "Bursa / Baker's Cyst",
    module: "Module 2: Joint Bone",
    time: "40 min",
    usesFor:
      "For bursa pain, bursitis, and related area discomfort including Baker's cyst of the knee.",
    suggestedFrequency:
      "Use as needed for pain relief, up to 3x/day. May need JB1 for pain control.",
    precautions:
      "Standard precautions apply. Use professional guidance when swelling, cyst-like symptoms, or knee symptoms are significant or worsening.",
    setupNotes: "Use the same joint setup style as JB3. See manual page 10.",
    tags: [
      "bursa",
      "bursitis",
      "bakers cyst",
      "knee cyst",
      "joint inflammation",
      "joint pain",
      "pain relief",
    ],
  },
  {
    number: 12,
    code: "JB5",
    name: "Rotator Cuff",
    module: "Module 2: Joint Bone",
    time: "46 min",
    usesFor:
      "For rotator cuff pain and shoulder injuries. May be helpful for general shoulder pain of unknown origin and shoulder tendon injury patterns.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Night version when appropriate.",
    precautions:
      "Same tendon-related precautions as JB3. Maintain range of motion when appropriate and follow professional guidance for shoulder instability, weakness, severe pain, or suspected tear.",
    setupNotes:
      "Red/yellow at the back of the neck. Blue/green at the front of the shoulder or arm. See manual page 10.",
    tags: [
      "rotator cuff",
      "shoulder",
      "shoulder pain",
      "shoulder injury",
      "shoulder tendon",
      "tendon pain",
      "range of motion",
    ],
  },
  {
    number: 13,
    code: "JB6",
    name: "Ligament Injury / Repair",
    module: "Module 2: Joint Bone",
    time: "25 min",
    usesFor:
      "To assist with pain and recovery involving known ligament injury or damage. Use with professional instruction when ligament injury is confirmed.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Night version when appropriate.",
    precautions:
      "Same tendon-related precautions as JB3. Maintain range of motion when appropriate. Use professional guidance for significant ligament injury, instability, or suspected tear.",
    setupNotes:
      "Red/yellow at the top of the joint and blue/green below the joint, or red/yellow left of the joint and blue/green right of the joint. See manual page 10.",
    tags: [
      "ligament",
      "ligament injury",
      "ligament repair",
      "sprain",
      "joint instability",
      "joint pain",
      "pain recovery",
    ],
  },
  {
    number: 14,
    code: "JB7",
    name: "Sprains & Ligament Repair",
    module: "Module 2: Joint Bone",
    time: "56 min",
    usesFor:
      "A combination of sprain and ligament support programs for sprains with known ligament injury or pain.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Night version when appropriate.",
    precautions:
      "Same tendon-related precautions as JB3. Maintain range of motion when appropriate. Use professional guidance for significant sprain, instability, or ligament injury.",
    setupNotes: "Use the same joint setup style as JB6. See manual page 10.",
    tags: [
      "sprain",
      "ligament repair",
      "ligament injury",
      "joint sprain",
      "joint pain",
      "joint recovery",
      "instability",
    ],
  },
  {
    number: 15,
    code: "JB8",
    name: "AC / Acromioclavicular Injury",
    module: "Module 2: Joint Bone",
    time: "1 hr",
    usesFor:
      "For shoulder injuries involving the AC joint. May also be used with JB4 when pain patterns suggest bursa involvement.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control. Accelerated healing goals may use Night version when appropriate.",
    precautions:
      "Standard precautions apply. Use professional guidance for AC joint separation, major shoulder injury, deformity, instability, or severe pain.",
    setupNotes:
      "Red/yellow at the back of the neck. Blue/green at the front of the shoulder over the AC joint. See manual page 10.",
    tags: [
      "ac joint",
      "acromioclavicular",
      "shoulder injury",
      "shoulder pain",
      "shoulder separation",
      "clavicle",
      "bursa",
    ],
  },
  {
    number: 16,
    code: "JB9",
    name: "Achilles",
    module: "Module 2: Joint Bone",
    time: "50 min",
    usesFor:
      "For Achilles pain and Achilles-related injury patterns. Not intended as an Achilles stretching program.",
    suggestedFrequency: "Use up to 3x/week to daily when appropriate.",
    precautions:
      "Standard precautions apply. Use professional guidance for suspected Achilles tear, severe calf pain, sudden popping sensation, major swelling, or loss of push-off strength.",
    setupNotes: "Use the same joint setup style as JB6. See manual page 10.",
    tags: [
      "achilles",
      "achilles tendon",
      "ankle tendon",
      "heel tendon",
      "tendon pain",
      "calf",
      "ankle",
    ],
  },
  {
    number: 17,
    code: "JB10",
    name: "Bone Rx / Fracture",
    module: "Module 2: Joint Bone",
    time: "47 min",
    usesFor:
      "For pain related to bone fractures, including stress fractures, when the skin is closed. For best results, use as soon as possible after injury or surgery when appropriate.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Accelerated healing goals may use 3x/week during the early healing period, then 1x/week after initial healing is confirmed when appropriate.",
    precautions:
      "Standard precautions apply. Use only with proper medical care for fractures. Trauma should be evaluated with appropriate imaging and professional guidance. Do not use as a substitute for fracture care.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "fracture",
      "bone fracture",
      "stress fracture",
      "bone injury",
      "bone healing",
      "post surgery",
      "medical referral",
    ],
  },
  {
    number: 18,
    code: "JB11",
    name: "Bone Bruise",
    module: "Module 2: Joint Bone",
    time: "32 min",
    usesFor:
      "For pain from bone bruises or deep contusions affecting bone. May be paired with JB2 if the growth plate is impacted.",
    suggestedFrequency:
      "Use as needed for pain relief, up to 3x/day. If growth plate is impacted, use daily for 2 days, then 3x/week until healing is confirmed by appropriate evaluation.",
    precautions:
      "Standard precautions apply. Seek professional evaluation for deep trauma, growth plate concern, persistent pain, or suspected fracture.",
    setupNotes:
      "Red/yellow above the injury area. Blue/green below the injury area. See manual page 10.",
    tags: [
      "bone bruise",
      "deep bruise",
      "deep contusion",
      "bone pain",
      "impact injury",
      "growth plate",
      "post trauma",
    ],
  },
  {
    number: 19,
    code: "JB12",
    name: "Bone Pain",
    module: "Module 2: Joint Bone",
    time: "25 min",
    usesFor:
      "For bone pain or residual pain after injury, especially collision impacts that do not respond to other programs. May be helpful after surgeries involving pins.",
    suggestedFrequency: "Use as needed for pain relief, up to 3x/day.",
    precautions:
      "Standard precautions apply. Seek professional evaluation for unexplained bone pain, severe pain, worsening pain, or suspected fracture.",
    setupNotes:
      "Red/yellow above the painful area. Blue/green below the painful area. See manual pages 10 and 11.",
    tags: [
      "bone pain",
      "residual pain",
      "collision impact",
      "post surgery pain",
      "pins",
      "deep pain",
      "injury pain",
    ],
  },
  {
    number: 20,
    code: "JB13",
    name: "Hip Pointer",
    module: "Module 2: Joint Bone",
    time: "18 min",
    usesFor: "For pain related to injuries commonly referred to as hip pointers.",
    suggestedFrequency: "Use as needed for pain relief, up to 3x/day.",
    precautions:
      "Standard precautions apply. Use professional guidance for severe hip trauma, inability to bear weight, deformity, or worsening symptoms.",
    setupNotes: "Red/yellow at the low back. Blue/green below the hip pain area.",
    tags: [
      "hip pointer",
      "hip pain",
      "hip injury",
      "impact injury",
      "sports injury",
      "pelvis",
      "iliac crest",
    ],
  },
  {
    number: 21,
    code: "JB14",
    name: "Bone Spur Pain",
    module: "Module 2: Joint Bone",
    time: "26 min",
    usesFor:
      "For pain related to bone spurs. May also require JB1, JB12, or a rehab version depending on the case.",
    suggestedFrequency:
      "Use as needed for pain relief, up to 3x/day. For longer-term relief, try Night version when appropriate.",
    precautions:
      "Standard precautions apply. Use professional guidance for persistent pain, nerve compression, mobility loss, or worsening symptoms.",
    setupNotes:
      "Red/yellow above the area. Blue/green below the area. See manual pages 10 and 11.",
    tags: [
      "bone spur",
      "bone spur pain",
      "heel spur",
      "joint spur",
      "pain relief",
      "chronic pain",
    ],
  },
  {
    number: 22,
    code: "JB15",
    name: "Pitcher's Arm",
    module: "Module 2: Joint Bone",
    time: "15 min",
    usesFor:
      "A quick calm-down program for pain of throwing arms during or between baseball, softball, or other throwing sports and events involving shoulder strain.",
    suggestedFrequency: "Use as able. For more complete pain issues, use JB5 or JB1.",
    precautions:
      "Standard precautions apply. Use professional guidance for severe shoulder pain, loss of throwing strength, instability, numbness, or suspected tear.",
    setupNotes:
      "Red/yellow at the back of the neck. Blue/green at the front of the shoulder or arm.",
    tags: [
      "pitchers arm",
      "throwing arm",
      "baseball",
      "softball",
      "shoulder strain",
      "throwing sports",
      "arm pain",
    ],
  },
  {
    number: 23,
    code: "M1",
    name: "Muscle Strain / Muscle Injury",
    module: "Module 3: Muscle",
    time: "44 min",
    usesFor:
      "For pain related to muscle tears, severe muscle pain, and muscle pain related to injury. For severe strains, medical assistance should be used to determine severity.",
    suggestedFrequency:
      "Standard healing goals: 3x/week. Can be used daily as needed for pain control up to 1 week. Accelerated healing goals may use Inj1 or M1 daily when appropriate.",
    precautions:
      "Standard precautions apply. Overuse may result in scar tissue formation where healing is already normal. Do not exceed recommended frequency.",
    setupNotes:
      "Red/yellow above the injured muscle. Blue/green below the injured muscle. See manual page 10.",
    tags: [
      "muscle strain",
      "muscle injury",
      "muscle tear",
      "pulled muscle",
      "severe muscle pain",
      "sports injury",
      "strain",
      "soft tissue injury",
    ],
  },
  {
    number: 24,
    code: "M2",
    name: "Fascia Heal / Diastasis Recti & Accelerated Healing",
    module: "Module 3: Muscle",
    time: "35 min x4",
    usesFor:
      "For fascia-related support, non-pain symptoms related to muscle injuries, severe trauma with significant soft tissue bruising or swelling, diastasis recti support, and general fascial or tissue restriction patterns.",
    suggestedFrequency:
      "May be used during massage or up to 3x/week. Advise the client to drink water before and after the session. When used as an injury protocol, repeats may be stopped early if appropriate.",
    precautions:
      "Detox precaution: this program may promote detox-style responses. Drinking water before and after may minimize discomfort. Consult a health care provider for more information when needed.",
    setupNotes:
      "Option 1: Red/yellow at neck and blue/green at abdomen. Option 2: Red/yellow above injured area and blue/green below injured area. See manual page 9 or 10.",
    tags: [
      "fascia",
      "fascial restriction",
      "diastasis recti",
      "accelerated healing",
      "soft tissue bruising",
      "swelling",
      "muscle injury",
      "massage support",
      "detox",
    ],
  },
  {
    number: 25,
    code: "M3",
    name: "Connective Tissue / Fibrosis for Sports",
    module: "Module 3: Muscle",
    time: "50 min",
    usesFor:
      "Developed to help pain or fibrotic, hardened muscles and connective tissue related to old injuries, over-healing, or chronic tissue restriction. Can be used to help mobilize tissue areas.",
    suggestedFrequency:
      "Use with manual therapy to mobilize tissue, up to 3x/week. Use M4 if results are not adequate.",
    precautions:
      "Detox precaution: advise increased fluid intake. Use professional judgment for larger areas, old injuries, or dense tissue restriction.",
    setupNotes:
      "Red/yellow above the area. Blue/green below the area. See manual page 10.",
    tags: [
      "connective tissue",
      "fibrosis",
      "scar tissue",
      "old injury",
      "hardened muscle",
      "tissue restriction",
      "sports recovery",
      "manual therapy",
      "detox",
    ],
  },
  {
    number: 26,
    code: "M4",
    name: "Scar Basics",
    module: "Module 3: Muscle",
    time: "15 min",
    usesFor:
      "For pain related to old, scarred, or injured fascia and tissue restriction. Use with care and clinical judgment because scar tissue may help stabilize the body after injury.",
    suggestedFrequency:
      "Do not use without manual therapy or joint/tissue mobilization. Use conservatively, typically 1x/week with limited total use over a longer period.",
    precautions:
      "Scar precaution: do not use casually or aggressively over scar tissue. Scar work should be conservative and paired with appropriate hands-on assessment. Do not use on infected, open, or medically concerning tissue.",
    setupNotes:
      "Use local setup around the scar or restricted tissue area. Red/yellow above the area and blue/green below the area when appropriate. See manual page 10.",
    tags: [
      "scar",
      "scar tissue",
      "fascia",
      "old injury",
      "adhesion",
      "restricted tissue",
      "manual therapy",
      "scar pain",
    ],
  },
  {
    number: 27,
    code: "M5",
    name: "Rhabdo / Rhabdomyolysis",
    module: "Module 3: Muscle",
    time: "47 min",
    usesFor:
      "For muscle pain related to inflammation, typically following overtraining, intense workouts, or injury/lifting. Rhabdomyolysis is a serious condition and requires medical awareness.",
    suggestedFrequency:
      "Use only with appropriate professional or medical guidance. May be used as needed during recovery when cleared and symptoms are being monitored.",
    precautions:
      "Medical caution: if rhabdomyolysis is suspected, seek urgent medical evaluation. Watch for severe muscle pain, weakness, swelling, dark urine, dehydration, fever, or kidney-related symptoms. Do not use this as a substitute for medical care.",
    setupNotes:
      "Red/yellow above the painful muscle area. Blue/green below the painful muscle area. See manual page 10.",
    tags: [
      "rhabdo",
      "rhabdomyolysis",
      "overtraining",
      "intense workout",
      "muscle inflammation",
      "severe muscle pain",
      "dark urine",
      "kidney caution",
      "medical referral",
    ],
  },
  {
    number: 28,
    code: "Spn1",
    name: "Spine Complete",
    module: "Module 4: Spine Nerve Pain",
    time: "51 min",
    usesFor:
      "General spine pain and discomfort including neck, mid-back, and low-back issues. Can be used with elbow, hand, leg, or other new acute symptoms when the issue appears connected to the back. Useful for acute or chronic spine-related complaints.",
    suggestedFrequency:
      "Use up to 3x/day as needed for symptom relief.",
    precautions:
      "Spinal stenosis may cause temporary pain during this program. If pain increases, stop the program and do not run again until symptoms resolve.",
    setupNotes:
      "Red/yellow may be placed at the neck, back, or chest. Blue/green may be placed at the low back or chest. See manual page 6.",
    tags: [
      "spine",
      "neck pain",
      "mid back",
      "low back",
      "back pain",
      "spine pain",
      "athletic back injury",
      "acute back pain",
      "chronic back pain",
    ],
  },
  {
    number: 29,
    code: "Spn2",
    name: "Spine Short",
    module: "Module 4: Spine Nerve Pain",
    time: "26 min",
    usesFor:
      "Short version of the Spine Complete program for general spine discomfort when a shorter session is preferred.",
    suggestedFrequency:
      "Use when symptoms are not fully resolved with Spn1 or when a shorter spine session is needed.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow may be placed at the neck. Blue/green may be placed at the chest. See manual page 6.",
    tags: [
      "spine short",
      "spine",
      "back pain",
      "neck pain",
      "low back",
      "quick spine",
      "short session",
    ],
  },
  {
    number: 30,
    code: "Spn3",
    name: "Whiplash",
    module: "Module 4: Spine Nerve Pain",
    time: "50 min",
    usesFor:
      "For neck pain related to whiplash, falls, accidents, and related injury patterns. Works best when used early after injury and may support care alongside appropriate medical or rehabilitation interventions.",
    suggestedFrequency: "Use 1–2x/day as needed.",
    precautions:
      "Follow all medical standards of care. Use this device in conjunction with appropriate interventions and not instead of medical care for neck injury, trauma, or neurological symptoms.",
    setupNotes:
      "Red/yellow at the neck. Blue/green at the low back or chest. See manual page 6.",
    tags: [
      "whiplash",
      "neck injury",
      "neck pain",
      "fall",
      "accident",
      "cervical injury",
      "trauma",
      "spine injury",
    ],
  },
  {
    number: 31,
    code: "Spn4",
    name: "Whiplash Short",
    module: "Module 4: Spine Nerve Pain",
    time: "30 min",
    usesFor:
      "Short version of the whiplash program for whiplash-related symptoms when symptoms are controlled or a shorter session is desired.",
    suggestedFrequency: "Use as needed.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck or above the area. Blue/green at the low back or below. See manual page 6.",
    tags: [
      "whiplash short",
      "whiplash",
      "neck injury",
      "neck pain",
      "quick neck",
      "short session",
    ],
  },
  {
    number: 32,
    code: "Spn5",
    name: "Spine Disc Injury / Acute",
    module: "Module 4: Spine Nerve Pain",
    time: "53 min",
    usesFor:
      "For acute back pain due to lifting, straining, or twisting motions. Used when disc injury is known or suspected, especially when symptoms are severe or difficult to settle.",
    suggestedFrequency:
      "Use as needed for pain. Can be run continuously for severe pain. Consider longer Night programs when appropriate.",
    precautions:
      "Contact a physician or urgent medical provider immediately if bowel or bladder function is altered, numbness spreads, weakness appears, or symptoms are severe or worsening.",
    setupNotes:
      "Red/yellow at the mid-back or back/abdomen area. Blue/green at the low back or abdomen. See manual page 10.",
    tags: [
      "disc injury",
      "acute back pain",
      "lifting injury",
      "twisting injury",
      "disc pain",
      "severe back pain",
      "low back",
      "medical referral",
    ],
  },
  {
    number: 33,
    code: "Spn6",
    name: "Neck Pain",
    module: "Module 4: Spine Nerve Pain",
    time: "50 min",
    usesFor:
      "For chronic neck pain. Also useful prior to chiropractic or osteopathic manipulation.",
    suggestedFrequency: "Use 1–3x/day as needed for symptoms.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck. Blue/green at the chest. See manual page 6.",
    tags: [
      "neck pain",
      "chronic neck pain",
      "cervical pain",
      "neck tension",
      "chiropractic support",
      "osteopathic support",
    ],
  },
  {
    number: 34,
    code: "Spn7",
    name: "Spine Alignment",
    module: "Module 4: Spine Nerve Pain",
    time: "42 min",
    usesFor:
      "For a tendency to be out of alignment. Developed for use before chiropractic or osteopathic manipulation. For stronger pain relief, consider Spn1 or Spn5 when appropriate.",
    suggestedFrequency:
      "Use up to 3 hours before an appointment or as professionally directed.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck. Blue/green at the low back or chest. See manual page 7.",
    tags: [
      "spine alignment",
      "alignment",
      "chiropractic",
      "osteopathic",
      "back adjustment",
      "spine support",
      "pre adjustment",
    ],
  },
  {
    number: 35,
    code: "Spn8",
    name: "Nerve Complete",
    module: "Module 4: Spine Nerve Pain",
    time: "50 min",
    usesFor:
      "For general nerve pain characterized by sharp, shooting, pulsing, pins and needles, or intense dull aching in the back or symptoms coming from the spine into the arm or leg. Also useful when pain in a limb is not responding to other spine programs.",
    suggestedFrequency:
      "Use up to 3x/day until symptoms resolve. Longer Night programs may be used when a longer session is needed.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck or above the area. Blue/green at the low back or foot. See manual page 11.",
    tags: [
      "nerve pain",
      "shooting pain",
      "pins and needles",
      "radiating pain",
      "sciatica",
      "arm nerve pain",
      "leg nerve pain",
      "numbness",
      "spine nerve",
    ],
  },
  {
    number: 36,
    code: "Spn9",
    name: "Nerve Trn Stinger / Nerve Traction or Stinger Injury",
    module: "Module 4: Spine Nerve Pain",
    time: "26 min",
    usesFor:
      "For pain related to injuries commonly referred to as stingers. May help electric-type nerve pain after athletic injury or symptoms that respond to stretching. Can also be used for pain from neuromas.",
    suggestedFrequency:
      "Use up to 3x/day until symptoms resolve. May need Spn8 or Spn9 as well depending on symptoms.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the nerve root or above the injury area. Blue/green below the back or below the area. See manual page 6.",
    tags: [
      "stinger",
      "nerve stinger",
      "traction injury",
      "athletic nerve injury",
      "electric nerve pain",
      "neuroma",
      "radiating pain",
    ],
  },
  {
    number: 37,
    code: "Spn10",
    name: "Neuro Atrophy",
    module: "Module 4: Spine Nerve Pain",
    time: "32 min",
    usesFor:
      "For painful muscles or muscles that appear weak in an area of nerve injury. Useful when muscles do not seem to activate after injury or when weakness appears related to nerve involvement.",
    suggestedFrequency:
      "Use 1–2x until symptom response is complete, typically within one to three sessions.",
    precautions:
      "May slightly increase pain if nerve injury is not properly addressed before use. Do not use for numbness that is not responding with other programs. Contact HoweRT or a clinical provider when symptoms are unclear.",
    setupNotes:
      "Red/yellow at the nerve root above the injury area. Blue/green to the nerve ending.",
    tags: [
      "neuro atrophy",
      "muscle weakness",
      "nerve injury",
      "weak muscle",
      "nerve activation",
      "rehab support",
      "nerve root",
    ],
  },
  {
    number: 38,
    code: "Spn11",
    name: "Spine Arthritis",
    module: "Module 4: Spine Nerve Pain",
    time: "40 min",
    usesFor:
      "For spine pain with known arthritic issues. If pain is not adequately reduced, try other spine programs.",
    suggestedFrequency:
      "Use up to 2x/day until symptoms resolve. Consider longer Night programs for sleep support if appropriate.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck or above the area. Blue/green at the low back or below the area.",
    tags: [
      "spine arthritis",
      "arthritis",
      "arthritic spine",
      "back arthritis",
      "neck arthritis",
      "chronic spine pain",
      "joint degeneration",
    ],
  },
  {
    number: 39,
    code: "Spn12",
    name: "Scoliosis Basics",
    module: "Module 4: Spine Nerve Pain",
    time: "55 min",
    usesFor:
      "A general program for individuals with scoliosis of the spine. Intended to reduce pain by improving flexibility and may be used with stretching and other supportive interventions.",
    suggestedFrequency:
      "Use daily in conjunction with physiotherapy, chiropractic programming, stretching, and strengthening as appropriate.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the neck. Blue/green at the low back. See manual pages 6 and 7.",
    tags: [
      "scoliosis",
      "spine curve",
      "spinal curvature",
      "spine flexibility",
      "back pain",
      "chiropractic",
      "physiotherapy",
      "stretching",
    ],
  },
  {
    number: 40,
    code: "Spn13",
    name: "SI & Facet Pain",
    module: "Module 4: Spine Nerve Pain",
    time: "39 min",
    usesFor:
      "For hip pain related to the SI joint or spine pain related to facet joints. Facet pain is characterized by sharp pain in the spine and pain that increases with backward bending. May need Spn1 or Spn5 if disc issues are known.",
    suggestedFrequency: "Use up to 2x/day until symptoms resolve.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow at the low back or above the area. Blue/green at the buttock or below. See manual pages 6 and 7.",
    tags: [
      "si joint",
      "facet pain",
      "facet joint",
      "low back",
      "hip pain",
      "sacroiliac",
      "back bending pain",
      "sharp spine pain",
    ],
  },
  {
    number: 41,
    code: "WO1",
    name: "DOMS After Exercise / Localized Onset Muscle Soreness",
    module: "Module 5: Work Out Programs",
    time: "25 min",
    usesFor:
      "For muscle pain that can occur following intense exercise or training. Pain is characterized by intense muscle soreness and stiffness in the 24–48 hours after exercise.",
    suggestedFrequency:
      "Use as soon as possible after exercise. For full-body focus, it can be run in a tub by placing red/yellow to one side of the tub and blue/green to another.",
    precautions:
      "Standard precautions apply. Do not use when operating equipment, vehicles, or machinery. Do not use prior to events.",
    setupNotes:
      "Site-specific setup or tub setup. Red/yellow to one side, blue/green to another when using tub-style setup.",
    tags: [
      "doms",
      "delayed onset muscle soreness",
      "muscle soreness",
      "post workout",
      "exercise soreness",
      "training soreness",
      "stiffness",
      "recovery",
      "workout recovery",
    ],
  },
  {
    number: 42,
    code: "WO2",
    name: "Calm Down / Reset",
    module: "Module 5: Work Out Programs",
    time: "45 min",
    usesFor:
      "To assist with sleep and calming down following pain, intense exercise, or an event that leads to a heightened adrenaline mood effect. For chronic stress, consider the wellness stress program instead.",
    suggestedFrequency:
      "Use prior to bed or about 45 minutes after the event.",
    precautions:
      "May cause relaxation. Do not use when operating equipment, vehicles, or machinery. Do not use prior to events.",
    setupNotes:
      "Red/yellow at the neck. Blue/green at the abdomen or chest. See manual page 9.",
    tags: [
      "calm down",
      "reset",
      "adrenaline",
      "sleep support",
      "post workout calm",
      "after event",
      "relaxation",
      "stress",
      "recovery",
    ],
  },
  {
    number: 43,
    code: "WO3",
    name: "Quick Intervention Muscle / General Pain",
    module: "Module 5: Work Out Programs",
    time: "15 min",
    usesFor:
      "Quick intervention for general joint pain, muscle pain, or general pain. Program length may not be adequate for all situations. If pain relief is not gained, use a more specific full program.",
    suggestedFrequency:
      "Use for intermittent joint or general pain. Not suggested for repeated use; use the full related program if needed.",
    precautions: "Standard precautions apply.",
    setupNotes:
      "Red/yellow above the joint or pain area. Blue/green below the joint or pain area. See manual page 10.",
    tags: [
      "quick intervention",
      "general pain",
      "muscle pain",
      "joint pain",
      "quick pain",
      "workout pain",
      "intermittent pain",
      "short session",
    ],
  },
];

export function findHoweRTProProgramsByTag(
  searchText: string
): HoweRTProProgram[] {
  const normalized = searchText.toLowerCase().trim();

  if (!normalized) {
    return [];
  }

  return howertProProgramLibrary.filter((program) => {
    const searchable = [
      program.code,
      program.name,
      program.module,
      program.usesFor,
      program.suggestedFrequency,
      program.precautions,
      program.setupNotes,
      ...program.tags,
    ]
      .join(" ")
      .toLowerCase();

    return (
      searchable.includes(normalized) ||
      program.tags.some(
        (tag) => tag.includes(normalized) || normalized.includes(tag)
      )
    );
  });
}

export function getHoweRTProProgramByNumber(
  number: number
): HoweRTProProgram | undefined {
  return howertProProgramLibrary.find((program) => program.number === number);
}
