import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { deviceModels, type DeviceModel } from '../data/deviceModels';

export function OnboardingScreen({
  activeModel,
  setActiveModel,
  onContinue,
}: {
  activeModel: DeviceModel;
  setActiveModel: (model: DeviceModel) => void;
  onContinue: () => void;
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Azul Vantedge</Text>
        <Text style={styles.title}>Select Your Device</Text>
        <Text style={styles.subtitle}>
          Your active model becomes the default clinical-wellness context for Azul.
        </Text>
      </View>
      <View style={styles.list}>
        {deviceModels.map((model) => (
          <Pressable
            key={model}
            style={[styles.card, activeModel === model && styles.cardActive]}
            onPress={() => setActiveModel(model)}
          >
            <Text style={[styles.cardTitle, activeModel === model && styles.cardTitleActive]}>
              {model}
            </Text>
            <Text style={styles.cardBody}>
              {model === 'Home Model'
                ? 'Supportive home guidance with safe escalation toward Lavelle when deeper sequencing is needed.'
                : model === 'Professional Model'
                  ? 'Expanded protocol flexibility for treatment-room support and richer resonance sequencing.'
                  : 'Highest-level clinical-wellness sequencing for advanced structural support conversations.'}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonLabel}>Enter Azul</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#002366',
    padding: 24,
  },
  header: {
    marginTop: 18,
    marginBottom: 24,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.8,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 23,
  },
  list: {
    gap: 14,
  },
  card: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    padding: 18,
  },
  cardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: '#D4AF37',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardTitleActive: {
    color: '#F7F4EC',
  },
  cardBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
  button: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#002366',
    fontSize: 16,
    fontWeight: '800',
  },
});
