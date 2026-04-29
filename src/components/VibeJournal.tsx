import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { VibeJournalData } from '../services/azulAgent';

export function VibeJournal({
  vibeJournalData,
  onOpen,
}: {
  vibeJournalData: VibeJournalData;
  onOpen: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Vibe Journal</Text>
      <Text style={styles.summary}>
        Before vs. After: Pain {vibeJournalData.painBefore} to {vibeJournalData.painAfter}, Focus {vibeJournalData.focusBefore} to {vibeJournalData.focusAfter}, Stress {vibeJournalData.stressBefore} to {vibeJournalData.stressAfter}.
      </Text>
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
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  summary: {
    color: '#474747',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 16,
  },
  button: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#F0F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#002366',
    fontSize: 15,
    fontWeight: '800',
  },
});
