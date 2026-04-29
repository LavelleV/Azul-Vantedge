export const safetyRules = [
  'Sudden severe pain',
  'Chest pain',
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

export function containsRedFlag(question: string) {
  const normalized = question.toLowerCase();
  return safetyRules.some((rule) => {
    const keyword = rule.toLowerCase();
    return normalized.includes(keyword.split(' ')[0]);
  });
}
