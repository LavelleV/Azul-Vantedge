import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { UserMode } from '../services/azulAgent';

export function ClinicalAgent({
  question,
  onChangeQuestion,
  onAnalyze,
  isAnalyzing,
  selectedBodyArea,
  userMode,
  onChangeMode,
  onClear,
}: {
  question: string;
  onChangeQuestion: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedBodyArea?: string;
  userMode: UserMode;
  onChangeMode: (mode: UserMode) => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>AI Clinical Agent</Text>
      <Text style={styles.title}>Describe your issue or ask a protocol question.</Text>
      <View style={styles.modeRow}>
        {(['client', 'practitioner'] as const).map((mode) => (
          <Pressable
            key={mode}
            onPress={() => onChangeMode(mode)}
            style={[styles.modeButton, userMode === mode && styles.modeButtonActive]}
          >
            <Text style={[styles.modeButtonLabel, userMode === mode && styles.modeButtonLabelActive]}>
              {mode === 'client' ? 'Client Mode' : 'Practitioner Mode'}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputShell}>
          <TextInput
            value={question}
            onChangeText={onChangeQuestion}
            placeholder="Describe your issue or ask a protocol question."
            placeholderTextColor="rgba(71, 71, 71, 0.5)"
            style={styles.input}
            autoCapitalize="sentences"
            autoCorrect
            multiline
            returnKeyType="send"
            blurOnSubmit
            onSubmitEditing={onAnalyze}
          />
        </View>
        <Pressable
          onPress={onAnalyze}
          style={[styles.analyzeButton, (!question.trim() || isAnalyzing) && styles.analyzeButtonDisabled]}
        >
          <Text style={styles.analyzeButtonLabel}>{isAnalyzing ? '...' : 'Analyze'}</Text>
        </Pressable>
      </View>
      {selectedBodyArea ? <Text style={styles.tag}>Tagged Area: {selectedBodyArea}</Text> : null}
      <Pressable style={styles.clearButton} onPress={onClear}>
        <Text style={styles.clearLabel}>Clear Conversation</Text>
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
    gap: 12,
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
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 999,
    backgroundColor: '#F0F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#002366',
  },
  modeButtonLabel: {
    color: '#474747',
    fontSize: 12,
    fontWeight: '700',
  },
  modeButtonLabelActive: {
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputShell: {
    flex: 1,
    minHeight: 132,
    borderRadius: 18,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    color: '#474747',
    fontSize: 15,
    fontWeight: '500',
    minHeight: 96,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    width: 92,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  analyzeButtonDisabled: {
    opacity: 0.55,
  },
  analyzeButtonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  tag: {
    color: '#002366',
    fontSize: 13,
    fontWeight: '700',
  },
  clearButton: {
    alignSelf: 'flex-start',
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearLabel: {
    color: '#002366',
    fontSize: 13,
    fontWeight: '700',
  },
});
