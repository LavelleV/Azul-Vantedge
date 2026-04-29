import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export function DisclaimerScreen({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Azul Vantedge</Text>
        <Text style={styles.title}>Wellness & Safety Disclaimer</Text>
        <Text style={styles.subtitle}>
          Please review this information before entering the Azul clinical-wellness dashboard.
        </Text>
      </View>

      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardContent}>
          <Text style={styles.bodyText}>
            Azul Vantedge provides educational wellness guidance only.
          </Text>
          <Text style={styles.bodyText}>
            It does not diagnose, treat, cure, or prevent disease.
          </Text>
          <Text style={styles.bodyText}>
            Users should consult a licensed medical professional for medical concerns.
          </Text>

          <Text style={styles.sectionTitle}>Do not use microcurrent or resonance devices without medical clearance if you have:</Text>
          {[
            'Pacemaker or implanted electrical device',
            'History of seizures or epilepsy',
            'Pregnancy',
            'Active cancer or malignancy',
            'Serious heart condition',
            'Unexplained severe pain',
            'Suspected blood clot',
            'Sudden swelling, redness, heat, or severe calf pain',
            'Progressive numbness, weakness, or loss of function',
          ].map((item) => (
            <Text key={item} style={styles.bulletText}>
              - {item}
            </Text>
          ))}

          <Text style={styles.bodyText}>Stop use and seek medical care if symptoms worsen.</Text>
          <Text style={styles.bodyText}>
            Professional assessment with Lavelle does not replace medical diagnosis or emergency care.
          </Text>
        </ScrollView>

        <Pressable
          style={[styles.checkboxRow, acknowledged && styles.checkboxRowActive]}
          onPress={() => setAcknowledged((current) => !current)}
        >
          <View style={[styles.checkbox, acknowledged && styles.checkboxActive]}>
            {acknowledged ? <View style={styles.checkboxInner} /> : null}
          </View>
          <Text style={styles.checkboxLabel}>I understand and agree</Text>
        </Pressable>

        <Pressable
          style={[styles.button, !acknowledged && styles.buttonDisabled]}
          onPress={onContinue}
          disabled={!acknowledged}
        >
          <Text style={styles.buttonLabel}>Continue to Azul</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    paddingTop: 12,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#002366',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: '#5F6C84',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 18,
    gap: 16,
  },
  cardContent: {
    gap: 10,
    paddingBottom: 10,
  },
  sectionTitle: {
    color: '#002366',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '800',
    marginTop: 8,
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
  checkboxRow: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.12)',
    backgroundColor: '#F8FAFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  checkboxRowActive: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.10)',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#002366',
    borderColor: '#002366',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  checkboxLabel: {
    flex: 1,
    color: '#002366',
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
