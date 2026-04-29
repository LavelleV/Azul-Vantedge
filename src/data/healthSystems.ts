export const healthSystems = [
  {
    name: 'Neuro-Calm',
    description: 'Stress, anxiety, and nervous system settling.',
    examples: ['#50', '#58'],
  },
  {
    name: 'Cognitive Flow',
    description: 'Focus, clarity, brain fog, and mental performance.',
    examples: ['#45'],
  },
  {
    name: 'Joint Decompression',
    description: 'Swelling, pressure, stiffness, and irritated joints.',
    examples: ['#19', '#16'],
  },
  {
    name: 'Fascial Release',
    description: 'Stuck tissue, restricted glide, scar-tissue feel, and mobility limits.',
    examples: ['#21'],
  },
  {
    name: 'Systemic Reset',
    description: 'Whole-body inflammation, fatigue, and heavy-body feeling.',
    examples: ['#84'],
  },
  {
    name: 'Dorsal Recovery',
    description: 'Low back, SI joint, facet-style pain, and spinal support.',
    examples: ['#15', '#16'],
  },
  {
    name: 'Neural Path',
    description: 'Nerve irritation, tingling, burning, and traveling pain.',
    examples: ['#24'],
  },
  {
    name: 'Glymphatic Flush',
    description: 'Brain recovery, lymph flow, and system clearing.',
    examples: ['#60'],
  },
  {
    name: 'Vitality Core',
    description: 'Circulation and vascular support.',
    examples: ['#85'],
  },
  {
    name: 'Dermal Repair',
    description: 'Tendon, ligament, skin, and tissue-repair support.',
    examples: ['#26'],
  },
  {
    name: 'Somnolence',
    description: 'Sleep preparation and downshifting the nervous system.',
    examples: ['#50'],
  },
  {
    name: 'Enteric Balance',
    description: 'Gut-brain connection and digestive support.',
    examples: [],
  },
  {
    name: 'Ocular Refresh',
    description: 'Eye strain, screen fatigue, and cranial tension.',
    examples: [],
  },
  {
    name: 'Respiratory Open',
    description: 'Breath support, rib restriction, and respiratory ease.',
    examples: [],
  },
  {
    name: 'Adrenal Support',
    description: 'Burnout, fatigue, and stress-load recovery.',
    examples: ['#51', '#52'],
  },
] as const;

export type HealthSystemCard = (typeof healthSystems)[number];
