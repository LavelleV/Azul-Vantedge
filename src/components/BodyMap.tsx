import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

type BodyRegion = {
  key: string;
  label: string;
  frontOnly?: boolean;
  backOnly?: boolean;
  shape: 'circle' | 'rect' | 'ellipse';
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
};

const REGIONS: BodyRegion[] = [
  { key: 'Head / Brain', label: 'Head / Brain', shape: 'circle', x: 100, y: 42, r: 18 },
  { key: 'Neck', label: 'Neck', shape: 'rect', x: 90, y: 66, width: 20, height: 16 },
  { key: 'Shoulder', label: 'Shoulder', shape: 'rect', x: 48, y: 84, width: 104, height: 24 },
  { key: 'Abdomen / Gut', label: 'Abdomen / Gut', shape: 'ellipse', x: 100, y: 150, width: 54, height: 36, frontOnly: true },
  { key: 'Low Back / SI', label: 'Low Back / SI', shape: 'ellipse', x: 100, y: 165, width: 62, height: 30, backOnly: true },
  { key: 'Hip', label: 'Hip', shape: 'rect', x: 62, y: 188, width: 76, height: 22 },
  { key: 'Knee', label: 'Knee', shape: 'rect', x: 70, y: 276, width: 60, height: 22 },
  { key: 'Ankle / Foot', label: 'Ankle / Foot', shape: 'rect', x: 66, y: 360, width: 68, height: 20 },
  { key: 'Full Body / Systemic', label: 'Full Body / Systemic', shape: 'rect', x: 44, y: 392, width: 112, height: 24 },
];

const COLORS = {
  navy: '#002366',
  gold: '#D4AF37',
  slate: '#5F6C84',
  ink: '#474747',
  mist: '#EEF3F8',
  line: 'rgba(0, 35, 102, 0.16)',
  body: '#C7D3E1',
  bodyDark: '#B8C5D6',
};

function renderRegion(region: BodyRegion, active: boolean, onSelect: (key: string) => void) {
  const fill = active ? 'rgba(212, 175, 55, 0.88)' : 'rgba(0, 35, 102, 0.10)';
  const stroke = active ? COLORS.navy : COLORS.line;

  if (region.shape === 'circle') {
    return (
      <Circle
        key={region.key}
        cx={region.x}
        cy={region.y}
        r={region.r}
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.4 : 1.4}
        onPress={() => onSelect(region.key)}
      />
    );
  }

  if (region.shape === 'ellipse') {
    return (
      <Ellipse
        key={region.key}
        cx={region.x}
        cy={region.y}
        rx={(region.width ?? 0) / 2}
        ry={(region.height ?? 0) / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.4 : 1.4}
        onPress={() => onSelect(region.key)}
      />
    );
  }

  return (
    <Rect
      key={region.key}
      x={region.x}
      y={region.y}
      width={region.width}
      height={region.height}
      rx={region.height ? region.height / 2 : 10}
      fill={fill}
      stroke={stroke}
      strokeWidth={active ? 2.4 : 1.4}
      onPress={() => onSelect(region.key)}
    />
  );
}

function BodySilhouette({
  viewMode,
  selectedBodyArea,
  onSelect,
}: {
  viewMode: 'front' | 'back';
  selectedBodyArea?: string;
  onSelect: (bodyArea: string) => void;
}) {
  const visibleRegions = REGIONS.filter((region) => {
    if (viewMode === 'front' && region.backOnly) {
      return false;
    }
    if (viewMode === 'back' && region.frontOnly) {
      return false;
    }
    return true;
  });

  return (
    <Svg width="100%" height="100%" viewBox="0 0 200 430">
      <G>
        <Circle cx="100" cy="42" r="24" fill={COLORS.body} />
        <Rect x="90" y="66" width="20" height="18" rx="8" fill={COLORS.bodyDark} />
        <Path
          d="M58 92 C70 78, 84 76, 100 76 C116 76, 130 78, 142 92 L150 124 C146 134, 138 138, 128 140 L124 202 C118 210, 110 214, 100 214 C90 214, 82 210, 76 202 L72 140 C62 138, 54 134, 50 124 Z"
          fill={COLORS.body}
        />
        <Path
          d="M72 214 C80 224, 88 228, 100 228 C112 228, 120 224, 128 214 L136 246 C128 256, 116 260, 100 260 C84 260, 72 256, 64 246 Z"
          fill={COLORS.bodyDark}
        />
        <Path d="M68 112 L44 184 L56 188 L80 122 Z" fill={COLORS.bodyDark} />
        <Path d="M132 112 L156 184 L144 188 L120 122 Z" fill={COLORS.bodyDark} />
        <Path d="M74 246 L62 334 L78 338 L90 254 Z" fill={COLORS.body} />
        <Path d="M126 246 L110 254 L122 338 L138 334 Z" fill={COLORS.body} />
        <Path d="M64 338 L56 382 L74 384 L80 340 Z" fill={COLORS.bodyDark} />
        <Path d="M136 338 L126 340 L132 384 L150 382 Z" fill={COLORS.bodyDark} />
        <Path d="M54 384 C56 392, 66 396, 80 394" stroke={COLORS.bodyDark} strokeWidth="10" strokeLinecap="round" fill="none" />
        <Path d="M120 394 C134 396, 144 392, 146 384" stroke={COLORS.bodyDark} strokeWidth="10" strokeLinecap="round" fill="none" />
      </G>

      <G>
        {visibleRegions.map((region) => renderRegion(region, selectedBodyArea === region.key, onSelect))}
      </G>
    </Svg>
  );
}

export function BodyMap({
  selectedBodyArea,
  onSelect,
  onClear,
}: {
  selectedBodyArea?: string;
  onSelect: (bodyArea: string) => void;
  onClear: () => void;
}) {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const { width } = useWindowDimensions();
  const wideLayout = width >= 900;

  const helperCopy = useMemo(() => {
    if (!selectedBodyArea) {
      return 'Tap the silhouette to add location context before you analyze.';
    }

    return `Azul will include ${selectedBodyArea} as location context the next time you analyze your question.`;
  }, [selectedBodyArea]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.copyBlock}>
          <Text style={styles.eyebrow}>Visual Body Map</Text>
          <Text style={styles.title}>Tap an area to add location context to your question.</Text>
          <Text style={styles.helper}>{helperCopy}</Text>
        </View>
        <View style={styles.toggleRow}>
          {(['front', 'back'] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => setViewMode(mode)}
              style={[styles.toggleButton, viewMode === mode && styles.toggleButtonActive]}
            >
              <Text style={[styles.toggleLabel, viewMode === mode && styles.toggleLabelActive]}>
                {mode === 'front' ? 'Front' : 'Back'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.contentRow, wideLayout && styles.contentRowWide]}>
        <View style={[styles.visualPanel, wideLayout && styles.visualPanelWide]}>
          <BodySilhouette
            viewMode={viewMode}
            selectedBodyArea={selectedBodyArea}
            onSelect={onSelect}
          />
        </View>

        <View style={[styles.sidePanel, wideLayout && styles.sidePanelWide]}>
          <View style={styles.selectionCard}>
            <Text style={styles.selectionLabel}>Selected area</Text>
            <Text style={styles.selectionValue}>{selectedBodyArea ?? 'None selected yet'}</Text>
            <Text style={styles.selectionHint}>
              The body map helps Azul localize your question. It does not auto-run analysis.
            </Text>
            {selectedBodyArea ? (
              <Pressable onPress={onClear} style={styles.clearButton}>
                <Text style={styles.clearButtonLabel}>Clear selection</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>Interactive Regions</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendChip}>
                <View style={styles.legendDot} />
                <Text style={styles.legendText}>Available region</Text>
              </View>
              <View style={[styles.legendChip, styles.legendChipActive]}>
                <View style={[styles.legendDot, styles.legendDotActive]} />
                <Text style={[styles.legendText, styles.legendTextActive]}>Selected region</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    gap: 18,
  },
  topRow: {
    gap: 12,
  },
  copyBlock: {
    gap: 6,
  },
  eyebrow: {
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: COLORS.navy,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  helper: {
    color: COLORS.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
  },
  toggleButton: {
    minHeight: 36,
    minWidth: 72,
    borderRadius: 999,
    backgroundColor: '#EFF3F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.navy,
  },
  toggleLabel: {
    color: COLORS.slate,
    fontSize: 12,
    fontWeight: '700',
  },
  toggleLabelActive: {
    color: '#FFFFFF',
  },
  contentRow: {
    gap: 16,
  },
  contentRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  visualPanel: {
    height: 500,
    borderRadius: 28,
    backgroundColor: COLORS.mist,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 12,
    justifyContent: 'center',
  },
  visualPanelWide: {
    flex: 1.35,
  },
  sidePanel: {
    gap: 12,
  },
  sidePanelWide: {
    flex: 0.85,
  },
  selectionCard: {
    borderRadius: 22,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 16,
    gap: 8,
  },
  selectionLabel: {
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 11,
    fontWeight: '700',
  },
  selectionValue: {
    color: COLORS.navy,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  selectionHint: {
    color: COLORS.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  clearButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  clearButtonLabel: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  legendCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 16,
    gap: 10,
  },
  legendTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  legendRow: {
    gap: 8,
  },
  legendChip: {
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: COLORS.mist,
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendChipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.gold,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.navy,
  },
  legendDotActive: {
    backgroundColor: COLORS.gold,
  },
  legendText: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '600',
  },
  legendTextActive: {
    color: '#FFFFFF',
  },
});
