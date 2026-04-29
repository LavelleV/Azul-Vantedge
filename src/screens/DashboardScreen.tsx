import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DeviceSelector } from '../components/DeviceSelector';
import { ClinicalAgent } from '../components/ClinicalAgent';
import { ProtocolResponseCard } from '../components/ProtocolResponseCard';
import { BodyMap } from '../components/BodyMap';
import { SessionHistory, type SavedSession } from '../components/SessionHistory';
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
  sessions,
  onOpenSession,
  onDeleteSession,
  onClearHistory,
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
  sessions: SavedSession[];
  onOpenSession: (session: SavedSession) => void;
  onDeleteSession: (session: SavedSession) => void;
  onClearHistory: () => void;
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
          onClear={() => setSelectedBodyArea('')}
          onSelect={(bodyArea) => {
            setSelectedBodyArea(bodyArea);
            if (!question.trim()) {
              setQuestion(bodyArea);
            }
          }}
        />
        <SessionHistory
          sessions={sessions}
          onOpen={onOpenSession}
          onDelete={onDeleteSession}
          onClear={onClearHistory}
        />
        <ReferenceGrid
          onSelect={(value) => {
            if (!question.trim()) {
              setQuestion(value);
              return;
            }

            if (!question.includes(value)) {
              setQuestion(`${question} | ${value}`);
            }
          }}
        />
        <VibeJournal vibeJournalData={vibeJournalData} onOpen={onOpenVibeLog} />
      </ScrollView>
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
    paddingBottom: 32,
    gap: 18,
  },
});
