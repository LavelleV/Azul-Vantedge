import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { VibeJournalData } from '../services/azulAgent';

function MetricRow({
  label,
  before,
  after,
  direction,
}: {
  label: string;
  before: number;
  after: number;
  direction: 'lower-is-better' | 'higher-is-better';
}) {
  const delta =
    direction === 'lower-is-better' ? before - after : after - before;

  const resultLabel =
    delta > 0 ? 'Improved' : delta < 0 ? 'Needs review' : 'Same';

  return (
    <View style={styles.metricRow}>
      <View style={styles.metricTextColumn}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricResult}>{resultLabel}</Text>
      </View>

      <View style={styles.metricValues}>
        <Text style={styles.metricValue}>{before}</Text>
        <Text style={styles.metricArrow}>→</Text>
        <Text style={styles.metricValueAfter}>{after}</Text>
      </View>
    </View>
  );
}

function buildInsight(
  label: string,
  delta: number,
  positiveVerb: string,
  negativeVerb: string
) {
  if (delta === 0) {
    return `${label} stayed the same.`;
  }

  if (delta > 0) {
    return `${label} ${positiveVerb} by ${delta} points.`;
  }

  return `${label} ${negativeVerb} by ${Math.abs(delta)} points.`;
}

export function VibeJournal({
  vibeJournalData,
  onOpen,
}: {
  vibeJournalData: VibeJournalData;
  onOpen: () => void;
}) {
  const painDelta = vibeJournalData.painBefore - vibeJournalData.painAfter;
  const focusDelta = vibeJournalData.focusAfter - vibeJournalData.focusBefore;
  const stressDelta = vibeJournalData.stressBefore - vibeJournalData.stressAfter;

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Vibe Journal</Text>
      <Text style={styles.title}>Before and after protocol tracker</Text>
      <Text style={styles.helper}>
        Log how you feel before a session, then log how you feel after. Azul
        will use the latest saved Vibe entry as session context.
      </Text>

      <View style={styles.summaryGrid}>
        <View style={styles.phaseCard}>
          <Text style={styles.phaseTitle}>Latest saved snapshot</Text>

          <MetricRow
            label="Pain Level"
            before={vibeJournalData.painBefore}
            after={vibeJournalData.painAfter}
            direction="lower-is-better"
          />

          <MetricRow
            label="Focus / Clarity"
            before={vibeJournalData.focusBefore}
            after={vibeJournalData.focusAfter}
            direction="higher-is-better"
          />

          <MetricRow
            label="Stress / Tension"
            before={vibeJournalData.stressBefore}
            after={vibeJournalData.stressAfter}
            direction="lower-is-better"
          />
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Quick interpretation</Text>
        <Text style={styles.insightText}>
          {buildInsight('Pain', painDelta, 'improved', 'increased')}
        </Text>
        <Text style={styles.insightText}>
          {buildInsight('Focus', focusDelta, 'improved', 'dropped')}
        </Text>
        <Text style={styles.insightText}>
          {buildInsight('Stress', stressDelta, 'reduced', 'increased')}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onOpen}>
        <Text style={styles.buttonLabel}>Log Vibe</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    gap: 14,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#002366',
    fontSize: 22,
    fontWeight: '700',
  },
  helper: {
    color: '#5F6C84',
    fontSize: 14,
    lineHeight: 21,
  },
  summaryGrid: {
    gap: 12,
  },
  phaseCard: {
    borderRadius: 20,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 14,
    gap: 10,
  },
  phaseTitle: {
    color: '#002366',
    fontSize: 16,
    fontWeight: '800',
  },
  metricRow: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricTextColumn: {
    flex: 1,
  },
  metricLabel: {
    color: '#474747',
    fontSize: 14,
    fontWeight: '700',
  },
  metricResult: {
    color: '#5F6C84',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  metricValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    color: '#5F6C84',
    fontSize: 14,
    fontWeight: '700',
  },
  metricArrow: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '800',
  },
  metricValueAfter: {
    color: '#002366',
    fontSize: 15,
    fontWeight: '800',
  },
  insightCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.28)',
    padding: 14,
    gap: 6,
  },
  insightTitle: {
    color: '#002366',
    fontSize: 15,
    fontWeight: '800',
  },
  insightText: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
