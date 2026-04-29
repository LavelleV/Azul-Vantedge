import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const disclaimerBullets = [
  'Pacemaker or implanted electrical device',
  'History of seizures or epilepsy',
  'Pregnancy',
  'Active cancer or malignancy',
  'Serious heart condition',
  'Unexplained severe pain',
  'Suspected blood clot',
  'Sudden swelling, redness, heat, or severe calf pain',
  'Progressive numbness, weakness, or loss of function',
];

export function SettingsLegalScreen({
  onBack,
  onResetDisclaimerAcknowledgment,
}: {
  onBack: () => void;
  onResetDisclaimerAcknowledgment: () => void;
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Settings / Legal</Text>
          <Text style={styles.title}>Safety & Wellness Information</Text>
        </View>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonLabel}>Close</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Safety Disclaimer</Text>
          <Text style={styles.bodyText}>Azul Vantedge provides educational wellness guidance only.</Text>
          <Text style={styles.bodyText}>It does not diagnose, treat, cure, or prevent disease.</Text>
          <Text style={styles.bodyText}>Users should consult a licensed medical professional for medical concerns.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wellness Guidance Notice</Text>
          <Text style={styles.bodyText}>
            Azul is designed to support protocol education, body-area context, and wellness-oriented resonance guidance. It does not replace physician evaluation, diagnosis, or emergency care.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Do Not Use Without Medical Clearance</Text>
          {disclaimerBullets.map((item) => (
            <Text key={item} style={styles.bulletText}>
              - {item}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency / Red Flag Reminder</Text>
          <Text style={styles.bodyText}>
            Stop use and seek medical care if symptoms worsen. Professional assessment with Lavelle does not replace medical diagnosis or emergency care.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prototype Notice</Text>
          <Text style={styles.bodyText}>App Version: Prototype Build</Text>
          <Pressable style={styles.resetButton} onPress={onResetDisclaimerAcknowledgment}>
            <Text style={styles.resetButtonLabel}>Reset Disclaimer Acknowledgment</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 18,
    paddingTop: 10,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    color: '#002366',
    fontSize: 28,
    fontWeight: '700',
  },
  backButton: {
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  backButtonLabel: {
    color: '#002366',
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    gap: 14,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    color: '#002366',
    fontSize: 17,
    fontWeight: '800',
  },
  bodyText: {
    color: '#474747',
    fontSize: 15,
    lineHeight: 23,
  },
  bulletText: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: 4,
  },
  resetButton: {
    alignSelf: 'flex-start',
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 4,
  },
  resetButtonLabel: {
    color: '#5F6C84',
    fontSize: 12,
    fontWeight: '700',
  },
});
