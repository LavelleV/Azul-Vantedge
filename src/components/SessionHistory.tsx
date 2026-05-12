import React from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { DeviceModel } from '../data/deviceModels';
import type { AzulAgentResponse, UserMode, VibeJournalData } from '../services/azulAgent';
import type { ActiveAnalysisContext } from '../services/anatomicalContextRules';

export type SavedSession = {
  id: string;
  createdAt: string;
  question: string;
  selectedBodyArea?: string;
  activeDeviceModel: DeviceModel;
  userMode: UserMode;
  response: AzulAgentResponse;
  vibeJournalData: VibeJournalData;
  analysisContext?: ActiveAnalysisContext;
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

function extractProtocolBadges(response: AzulAgentResponse) {
  const combined = [
    ...response.bestStartingProtocol,
    ...response.padPlacement,
    ...response.whyThisPlacement,
    ...response.sessionTips,
    ...response.aftercare,
    ...response.escalation,
  ].join(' ');

  const matches = combined.match(/#\d+/g) ?? [];
  return [...new Set(matches)].slice(0, 4);
}

function MetaBadge({ label, tone = 'slate' }: { label: string; tone?: 'slate' | 'navy' | 'gold' }) {
  return (
    <View
      style={[
        styles.badge,
        tone === 'navy' && styles.badgeNavy,
        tone === 'gold' && styles.badgeGold,
      ]}
    >
      <Text
        style={[
          styles.badgeLabel,
          tone === 'navy' && styles.badgeLabelLight,
          tone === 'gold' && styles.badgeLabelNavy,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function SessionHistory({
  sessions,
  onOpen,
  onClear,
  onDelete,
}: {
  sessions: SavedSession[];
  onOpen: (session: SavedSession) => void;
  onClear: () => void;
  onDelete: (session: SavedSession) => void;
}) {
  const handleClear = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.confirm('Remove all saved session history from this device view?')) {
        onClear();
      }
      return;
    }

    Alert.alert('Clear Session History', 'Remove all saved session history from this device view?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: onClear },
    ]);
  };

  const handleDelete = (session: SavedSession) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.confirm('Delete this saved session?')) {
        onDelete(session);
      }
      return;
    }

    Alert.alert('Delete Saved Session', 'Delete this saved session?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(session) },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Session History</Text>
          <Text style={styles.title}>Saved protocol guidance</Text>
        </View>
        {sessions.length ? (
          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonLabel}>Clear History</Text>
          </Pressable>
        ) : null}
      </View>

      {sessions.length ? (
        sessions.map((session) => {
          const protocolBadges = extractProtocolBadges(session.response);

          return (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionTopRow}>
                <Text style={styles.timestamp}>{formatTimestamp(session.createdAt)}</Text>
                <View style={styles.actionRow}>
                  <Pressable style={styles.deleteButton} onPress={() => handleDelete(session)}>
                    <Text style={styles.deleteButtonLabel}>Delete</Text>
                  </Pressable>
                  <Pressable style={styles.openButton} onPress={() => onOpen(session)}>
                    <Text style={styles.openButtonLabel}>View</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.questionPreview} numberOfLines={2}>
                {session.question}
              </Text>

              <View style={styles.badgesWrap}>
                <MetaBadge label={session.selectedBodyArea || 'No body area'} tone="gold" />
                <MetaBadge label={session.activeDeviceModel} tone="navy" />
                <MetaBadge label={session.userMode === 'client' ? 'Client Mode' : 'Practitioner Mode'} />
              </View>

              {protocolBadges.length ? (
                <View style={styles.protocolRow}>
                  <Text style={styles.protocolLabel}>Top protocols</Text>
                  <View style={styles.protocolBadgesWrap}>
                    {protocolBadges.map((protocol) => (
                      <MetaBadge key={`${session.id}-${protocol}`} label={protocol} tone="gold" />
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          );
        })
      ) : (
        <Text style={styles.emptyText}>
          Saved sessions will appear here after you analyze a question.
        </Text>
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
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
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
    fontSize: 20,
    fontWeight: '700',
  },
  clearButton: {
    minHeight: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  clearButtonLabel: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '700',
  },
  sessionCard: {
    borderRadius: 18,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 14,
    gap: 10,
  },
  sessionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timestamp: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '700',
  },
  questionPreview: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    minHeight: 28,
    borderRadius: 999,
    backgroundColor: '#EEF3F8',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  badgeNavy: {
    backgroundColor: '#002366',
    borderColor: '#002366',
  },
  badgeGold: {
    backgroundColor: '#F4E7AC',
    borderColor: 'rgba(212, 175, 55, 0.45)',
  },
  badgeLabel: {
    color: '#5F6C84',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeLabelLight: {
    color: '#FFFFFF',
  },
  badgeLabelNavy: {
    color: '#002366',
  },
  protocolRow: {
    gap: 8,
  },
  protocolLabel: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  protocolBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  openButton: {
    minHeight: 38,
    borderRadius: 14,
    backgroundColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  deleteButton: {
    minHeight: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  deleteButtonLabel: {
    color: '#5F6C84',
    fontSize: 12,
    fontWeight: '700',
  },
  openButtonLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyText: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 21,
  },
});
