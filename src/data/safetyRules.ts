export const safetyRules = [
  'Sudden severe pain',
  'Chest pain',
  'Chest pressure',
  'Trouble breathing',
  'Shortness of breath',
  'Severe wheezing',
  'Blue lips',
  'High fever',
  'Stroke-like symptoms',
  'Suspected blood clot',
  'Severe swelling with heat or redness',
  'Recent major trauma',
  'Loss of bowel or bladder control',
  'Progressive weakness or numbness',
  'Fever with joint swelling',
  'Unexplained severe calf pain',
  'Seizure history unless medically cleared',
  'Pacemaker or implanted electrical device',
  'Pregnancy unless medically cleared',
] as const;

const redFlagPhrases = [
  'sudden severe pain',
  'chest pain',
  'chest pressure',
  'crushing chest',
  'radiating chest pain',
  'heart attack',
  'cardiac symptoms',
  'trouble breathing',
  'shortness of breath',
  'difficulty breathing',
  'cant breathe',
  "can't breathe",
  'severe wheezing',
  'blue lips',
  'high fever',
  'stroke',
  'stroke like',
  'face drooping',
  'slurred speech',
  'suspected blood clot',
  'blood clot',
  'dvt',
  'severe swelling with heat',
  'severe swelling with redness',
  'hot red swelling',
  'recent major trauma',
  'major trauma',
  'loss of bowel',
  'loss of bladder',
  'bowel or bladder control',
  'progressive weakness',
  'progressive numbness',
  'fever with joint swelling',
  'unexplained severe calf pain',
  'seizure history',
  'seizure disorder',
  'pacemaker',
  'implanted electrical device',
  'implanted electronic device',
  'pregnancy',
  'pregnant',
];

function normalizeSafetyText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9']+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function containsRedFlag(question: string) {
  const normalized = normalizeSafetyText(question);

  return redFlagPhrases.some((phrase) =>
    normalized.includes(normalizeSafetyText(phrase))
  );
}
