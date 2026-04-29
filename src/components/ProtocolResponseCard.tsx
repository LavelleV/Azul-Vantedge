import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AzulAgentResponse } from '../services/azulAgent';

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={`${title}-${item}`} style={styles.bullet}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

export function ProtocolResponseCard({
  response,
  isLoading,
  onRequestAssessment,
}: {
  response: AzulAgentResponse;
  isLoading: boolean;
  onRequestAssessment: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Protocol Guidance Card</Text>
      <Text style={styles.agentName}>Azul</Text>
      {isLoading ? (
        <Text style={styles.loading}>Analyzing your question, device profile, and wellness context...</Text>
      ) : (
        <>
          <Section title="Clinical Read" items={response.clinicalRead} />
          <Section title="Protocol Plan" items={response.bestStartingProtocol} />
          <Section title="Pad Placement" items={response.padPlacement} />
          <Section title="Why This Placement" items={response.whyThisPlacement} />
          <Section title="Session Tips" items={response.sessionTips} />
          <Section title="Aftercare" items={response.aftercare} />
          <Section title="When to Contact Lavelle / Medical Referral" items={response.escalation} />
          {response.recommendAssessment ? (
            <Pressable style={styles.assessmentButton} onPress={onRequestAssessment}>
              <Text style={styles.assessmentButtonLabel}>Request Clinical Assessment with Lavelle</Text>
            </Pressable>
          ) : null}
        </>
      )}
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
  agentName: {
    color: '#002366',
    fontSize: 22,
    fontWeight: '800',
  },
  loading: {
    color: '#002366',
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    color: '#002366',
    fontSize: 16,
    fontWeight: '800',
  },
  bullet: {
    color: '#474747',
    fontSize: 15,
    lineHeight: 23,
  },
  assessmentButton: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#002366',
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  assessmentButtonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});
