import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

type BodyRegion = {
  key: string;
  frontOnly?: boolean;
  backOnly?: boolean;
  kind: 'circle' | 'rect' | 'ellipse';
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
};

const REGIONS: BodyRegion[] = [
  { key: 'Head / Brain', kind: 'circle', x: 110, y: 46, r: 24 },
  { key: 'Neck', kind: 'rect', x: 98, y: 74, width: 24, height: 18 },
  { key: 'Shoulder', kind: 'rect', x: 46, y: 96, width: 128, height: 28 },
  { key: 'Abdomen / Gut', kind: 'ellipse', x: 110, y: 182, width: 70, height: 48, frontOnly: true },
  { key: 'Low Back / SI', kind: 'ellipse', x: 110, y: 200, width: 82, height: 40, backOnly: true },
  { key: 'Hip', kind: 'rect', x: 62, y: 232, width: 96, height: 28 },
  { key: 'Knee', kind: 'rect', x: 74, y: 352, width: 72, height: 26 },
  { key: 'Ankle / Foot', kind: 'rect', x: 70, y: 466, width: 80, height: 22 },
  { key: 'Full Body / Systemic', kind: 'rect', x: 40, y: 506, width: 140, height: 26 },
];

const COLORS = {
  navy: '#002366',
  gold: '#D4AF37',
  slate: '#60718D',
  ink: '#474747',
  mist: '#EEF3F8',
  line: 'rgba(0, 35, 102, 0.15)',
  lineStrong: 'rgba(0, 35, 102, 0.28)',
  body: '#D0DAE6',
  bodyShadow: '#BCC8D8',
  bodyHighlight: '#E5ECF4',
};

function drawRegion(region: BodyRegion, active: boolean, onSelect: (key: string) => void) {
  const fill = active ? 'rgba(212, 175, 55, 0.90)' : 'rgba(0, 35, 102, 0.08)';
  const stroke = active ? COLORS.navy : COLORS.lineStrong;
  const strokeWidth = active ? 2.6 : 1.3;

  if (region.kind === 'circle') {
    return (
      <Circle
        key={region.key}
        cx={region.x}
        cy={region.y}
        r={region.r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        onPress={() => onSelect(region.key)}
      />
    );
  }

  if (region.kind === 'ellipse') {
    return (
      <Ellipse
        key={region.key}
        cx={region.x}
        cy={region.y}
        rx={(region.width ?? 0) / 2}
        ry={(region.height ?? 0) / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
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
      rx={(region.height ?? 18) / 2}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      onPress={() => onSelect(region.key)}
    />
  );
}

function FrontBodyBase() {
  return (
    <G>
      <Circle cx="110" cy="46" r="29" fill={COLORS.bodyHighlight} />
      <Circle cx="110" cy="46" r="27" fill={COLORS.body} />
      <Rect x="100" y="72" width="20" height="22" rx="9" fill={COLORS.bodyShadow} />
      <Path
        d="M62 108 C72 88, 88 84, 110 84 C132 84, 148 88, 158 108 L166 142 C164 152, 156 160, 144 164 L138 250 C130 258, 122 262, 110 262 C98 262, 90 258, 82 250 L76 164 C64 160, 56 152, 54 142 Z"
        fill={COLORS.body}
      />
      <Path
        d="M76 116 C86 106, 96 104, 110 104 C124 104, 134 106, 144 116 L150 146 C146 150, 140 152, 132 152 L128 210 C122 216, 116 220, 110 220 C104 220, 98 216, 92 210 L88 152 C80 152, 74 150, 70 146 Z"
        fill={COLORS.bodyHighlight}
        opacity="0.45"
      />
      <Path d="M76 122 L48 234 L62 238 L92 136 Z" fill={COLORS.bodyShadow} />
      <Path d="M144 122 L172 234 L158 238 L128 136 Z" fill={COLORS.bodyShadow} />
      <Path d="M82 250 L68 376 L86 380 L100 260 Z" fill={COLORS.body} />
      <Path d="M138 250 L120 260 L134 380 L152 376 Z" fill={COLORS.body} />
      <Path d="M70 378 L62 468 L82 470 L90 382 Z" fill={COLORS.bodyShadow} />
      <Path d="M150 376 L140 382 L148 470 L168 468 Z" fill={COLORS.bodyShadow} />
      <Path d="M60 470 C68 478, 80 482, 96 480" stroke={COLORS.bodyShadow} strokeWidth="12" strokeLinecap="round" fill="none" />
      <Path d="M124 480 C140 482, 152 478, 160 470" stroke={COLORS.bodyShadow} strokeWidth="12" strokeLinecap="round" fill="none" />
      <Path d="M92 170 C98 178, 102 182, 110 182 C118 182, 122 178, 128 170" stroke={COLORS.line} strokeWidth="1.2" fill="none" />
      <Path d="M96 206 C100 212, 104 214, 110 214 C116 214, 120 212, 124 206" stroke={COLORS.line} strokeWidth="1.2" fill="none" />
    </G>
  );
}

function BackBodyBase() {
  return (
    <G>
      <Circle cx="110" cy="46" r="29" fill={COLORS.bodyHighlight} />
      <Circle cx="110" cy="46" r="27" fill={COLORS.body} />
      <Rect x="100" y="72" width="20" height="22" rx="9" fill={COLORS.bodyShadow} />
      <Path
        d="M64 110 C74 90, 90 84, 110 84 C130 84, 146 90, 156 110 L164 150 C160 158, 152 164, 142 168 L136 250 C128 260, 120 264, 110 264 C100 264, 92 260, 84 250 L78 168 C68 164, 60 158, 56 150 Z"
        fill={COLORS.body}
      />
      <Path
        d="M86 118 C94 108, 102 106, 110 106 C118 106, 126 108, 134 118 L138 152 C130 158, 122 162, 110 162 C98 162, 90 158, 82 152 Z"
        fill={COLORS.bodyHighlight}
        opacity="0.42"
      />
      <Path d="M78 126 L52 234 L66 238 L94 138 Z" fill={COLORS.bodyShadow} />
      <Path d="M142 126 L168 234 L154 238 L126 138 Z" fill={COLORS.bodyShadow} />
      <Path d="M84 252 L70 376 L88 380 L102 262 Z" fill={COLORS.body} />
      <Path d="M136 252 L118 262 L132 380 L150 376 Z" fill={COLORS.body} />
      <Path d="M72 378 L64 468 L84 470 L92 382 Z" fill={COLORS.bodyShadow} />
      <Path d="M148 376 L138 382 L146 470 L166 468 Z" fill={COLORS.bodyShadow} />
      <Path d="M62 470 C70 478, 82 482, 98 480" stroke={COLORS.bodyShadow} strokeWidth="12" strokeLinecap="round" fill="none" />
      <Path d="M122 480 C138 482, 150 478, 158 470" stroke={COLORS.bodyShadow} strokeWidth="12" strokeLinecap="round" fill="none" />
      <Path d="M110 110 L110 246" stroke={COLORS.lineStrong} strokeWidth="1.2" opacity="0.55" />
      <Path d="M88 188 C94 182, 100 180, 110 180 C120 180, 126 182, 132 188" stroke={COLORS.line} strokeWidth="1.2" fill="none" />
      <Path d="M90 210 C96 220, 102 224, 110 224 C118 224, 124 220, 130 210" stroke={COLORS.line} strokeWidth="1.2" fill="none" />
    </G>
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
    <Svg width="100%" height="100%" viewBox="0 0 220 540">
      <G>
        <Rect x="10" y="10" width="200" height="520" rx="34" fill="#F7FAFD" />
      </G>
      {viewMode === 'front' ? <FrontBodyBase /> : <BackBodyBase />}
      <G>
        {visibleRegions.map((region) => drawRegion(region, selectedBodyArea === region.key, onSelect))}
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
      return 'Tap the anatomical silhouette to add location context before you analyze.';
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
    height: 620,
    borderRadius: 30,
    backgroundColor: COLORS.mist,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 14,
    justifyContent: 'center',
  },
  visualPanelWide: {
    flex: 1.4,
  },
  sidePanel: {
    gap: 12,
  },
  sidePanelWide: {
    flex: 0.8,
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
