import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DeviceSelector } from '../components/DeviceSelector';
import { ClinicalAgent } from '../components/ClinicalAgent';
import { ProtocolResponseCard } from '../components/ProtocolResponseCard';
import { BodyMap } from '../components/BodyMap';
import { ReferenceGrid } from '../components/ReferenceGrid';
import { VibeJournal } from '../components/VibeJournal';
import type { DeviceModel } from '../data/deviceModels';
import type { AzulAgentResponse, UserMode, VibeJournalData } from '../services/azulAgent';

export function DashboardScreen({
  activeModel,
  setActiveModel,
  userMode,
  setUserMode,
  question,
  setQuestion,
  selectedBodyArea,
  setSelectedBodyArea,
  onAnalyze,
  onClear,
  response,
  isAnalyzing,
  vibeJournalData,
  onOpenVibeLog,
  onRequestAssessment,
}: {
  activeModel: DeviceModel;
  setActiveModel: (model: DeviceModel) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  question: string;
  setQuestion: (value: string) => void;
  selectedBodyArea?: string;
  setSelectedBodyArea: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  response: AzulAgentResponse;
  isAnalyzing: boolean;
  vibeJournalData: VibeJournalData;
  onOpenVibeLog: () => void;
  onRequestAssessment: () => void;
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>The Biological Edge</Text>
        <Text style={styles.title}>Azul Clinical Agent</Text>
        <Text style={styles.subtitle}>
          Guided resonance support with a polished clinical-wellness brain.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DeviceSelector activeModel={activeModel} onChange={setActiveModel} />
        <ClinicalAgent
          question={question}
          onChangeQuestion={setQuestion}
          onAnalyze={onAnalyze}
          isAnalyzing={isAnalyzing}
          selectedBodyArea={selectedBodyArea}
          userMode={userMode}
          onChangeMode={setUserMode}
          onClear={onClear}
        />
        <ProtocolResponseCard
          response={response}
          isLoading={isAnalyzing}
          onRequestAssessment={onRequestAssessment}
        />
        <BodyMap
          selectedBodyArea={selectedBodyArea}
          onSelect={(bodyArea) => {
            setSelectedBodyArea(bodyArea);
            if (!question.includes(bodyArea)) {
              setQuestion(question ? `${question} [Area: ${bodyArea}]` : bodyArea);
            }
          }}
        />
        <ReferenceGrid />
        <VibeJournal vibeJournalData={vibeJournalData} onOpen={onOpenVibeLog} />
      </ScrollView>
      {response.recommendAssessment ? (
        <View style={styles.floatingDock}>
          <Pressable style={styles.floatingButton} onPress={onRequestAssessment}>
            <Text style={styles.floatingButtonLabel}>Request Clinical Assessment with Lavelle</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#002366',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
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
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 18,
  },
  floatingDock: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
  },
  floatingButton: {
    minHeight: 72,
    borderRadius: 22,
    backgroundColor: '#002366',
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  floatingButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
