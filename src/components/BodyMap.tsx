import React, { memo, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { fullBodyRegions, type BodyMapPrimaryRegion, type BodyMapView, type CloseUpHotspot } from '../data/bodyMapRegions';

import frontFullBodyImage from '../../assets/body-map/full/front-full-body.png';
import backFullBodyImage from '../../assets/body-map/full/back-full-body.png';
import shoulderFrontImage from '../../assets/body-map/regions/shoulder-front.png';
import armFrontImage from '../../assets/body-map/regions/arm-front.png';
import chestFrontImage from '../../assets/body-map/regions/chest-front.png';
import abdomenFrontImage from '../../assets/body-map/regions/abdomen-front.png';
import hipFrontImage from '../../assets/body-map/regions/hip-front.png';
import hipGluteBackImage from '../../assets/body-map/regions/hip-glute-back.png';
import thighFrontImage from '../../assets/body-map/regions/thigh-front.png';
import kneeFrontImage from '../../assets/body-map/regions/knee-front.png';
import lowerLegFrontImage from '../../assets/body-map/regions/lower-leg-front.png';
import footAnkleFrontImage from '../../assets/body-map/regions/foot-ankle-front.png';
import neckFrontImage from '../../assets/body-map/regions/neck-front.png';
import lowBackBackImage from '../../assets/body-map/regions/low-back-back.png';

// Future anatomical image assets for the production body-map system:
// assets/body-map/full/front-full-body.png
// assets/body-map/full/back-full-body.png
// assets/body-map/regions/*.png
//
// This component keeps the current vector fallback active until those assets exist.
// The region and hotspot overlay values are stored as percentages in bodyMapRegions.ts
// so image-based alignment can be tuned later without rewriting selection behavior.

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

const HAS_FULL_BODY_IMAGE_ASSETS = true;
const SHOW_HOTSPOT_DEBUG = false;

// Verified region-to-image audit map.
// Back views must never reuse unrelated front-only anatomy. If a correct back asset is
// unavailable, getDetailImage() returns null and the SVG fallback is used instead.
const DETAIL_IMAGE_MAP: Record<string, { front?: any; back?: any }> = {
  shoulder: { front: shoulderFrontImage },
  arm: { front: armFrontImage },
  chest: { front: chestFrontImage },
  abdomen: { front: abdomenFrontImage },
  'hip-glute': { front: hipFrontImage, back: hipGluteBackImage },
  thigh: { front: thighFrontImage },
  knee: { front: kneeFrontImage },
  'lower-leg': { front: lowerLegFrontImage },
  'foot-ankle': { front: footAnkleFrontImage },
  neck: { front: neckFrontImage },
  'low-back': { back: lowBackBackImage },
};

function getDetailImage(regionId: string, viewMode: 'front' | 'back') {
  const regionImage = DETAIL_IMAGE_MAP[regionId];
  if (!regionImage) {
    return null;
  }

  if (viewMode === 'front') {
    return regionImage.front ?? null;
  }

  return regionImage.back ?? null;
}

type OverlayRegionProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  active: boolean;
  onPress: () => void;
  subtle?: boolean;
  pointerOnly?: boolean;
};

const OverlayRegion = memo(function OverlayRegion({ x, y, width, height, active, onPress, subtle = false, pointerOnly = false }: OverlayRegionProps) {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={Math.min(height / 2, 12)}
      fill={pointerOnly ? 'transparent' : active ? 'rgba(212, 175, 55, 0.10)' : 'rgba(0, 35, 102, 0.002)'}
      stroke={pointerOnly ? 'transparent' : active ? 'rgba(212, 175, 55, 0.30)' : subtle ? 'rgba(0, 35, 102, 0.008)' : COLORS.lineStrong}
      strokeWidth={pointerOnly ? 0 : active ? 0.8 : subtle ? 0.15 : 1}
      onPress={onPress}
    />
  );
});

const FrontBodyBase = memo(function FrontBodyBase() {
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
    </G>
  );
});

const BackBodyBase = memo(function BackBodyBase() {
  return (
    <G>
      <Circle cx="110" cy="46" r="29" fill={COLORS.bodyHighlight} />
      <Circle cx="110" cy="46" r="27" fill={COLORS.body} />
      <Rect x="100" y="72" width="20" height="22" rx="9" fill={COLORS.bodyShadow} />
      <Path
        d="M64 110 C74 90, 90 84, 110 84 C130 84, 146 90, 156 110 L164 150 C160 158, 152 164, 142 168 L136 250 C128 260, 120 264, 110 264 C100 264, 92 260, 84 250 L78 168 C68 164, 60 158, 56 150 Z"
        fill={COLORS.body}
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
    </G>
  );
});

function getVisiblePrimaryRegions(viewMode: 'front' | 'back') {
  const visible = fullBodyRegions.filter((region) => {
    if (region.supportedView === 'both') {
      return true;
    }
    return region.supportedView === viewMode;
  });

  const priority = [
    'head',
    'neck',
    'shoulder',
    'chest',
    'abdomen',
    'low-back',
    'hip-glute',
    'thigh',
    'knee',
    'lower-leg',
    'foot-ankle',
    'arm',
  ];

  return visible.sort((left, right) => priority.indexOf(left.id) - priority.indexOf(right.id));
}

function toCanvasRect(region: { x: number; y: number; width: number; height: number }) {
  return {
    x: (region.x / 100) * 220,
    y: (region.y / 100) * 540,
    width: (region.width / 100) * 220,
    height: (region.height / 100) * 540,
  };
}

function toTapCanvasRect(region: BodyMapPrimaryRegion) {
  return toCanvasRect({
    x: region.tapX ?? region.x,
    y: region.tapY ?? region.y,
    width: region.tapWidth ?? region.width,
    height: region.tapHeight ?? region.height,
  });
}

function getTapRects(region: BodyMapPrimaryRegion) {
  if (region.tapRects?.length) {
    return region.tapRects.map(toCanvasRect);
  }

  return [toTapCanvasRect(region)];
}

function FullBodyMap({
  viewMode,
  selectedBodyArea,
  onSelectRegion,
}: {
  viewMode: 'front' | 'back';
  selectedBodyArea?: string;
  onSelectRegion: (region: BodyMapPrimaryRegion) => void;
}) {
  const visibleRegions = useMemo(() => getVisiblePrimaryRegions(viewMode), [viewMode]);
  const visibleRegionRects = useMemo(
    () =>
      visibleRegions.map((region) => ({
        region,
        rect: toCanvasRect(region),
        tapRects: getTapRects(region),
      })),
    [visibleRegions]
  );
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = HAS_FULL_BODY_IMAGE_ASSETS && !imageFailed;

  return (
    <View style={styles.assetCanvas}>
      {showImage ? (
        <Image
          source={viewMode === 'front' ? frontFullBodyImage : backFullBodyImage}
          style={styles.assetImage}
          resizeMode="contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Svg width="100%" height="100%" viewBox="0 0 220 540">
          <Rect x="10" y="10" width="200" height="520" rx="34" fill="#F7FAFD" />
          {viewMode === 'front' ? <FrontBodyBase /> : <BackBodyBase />}
        </Svg>
      )}

      <Svg width="100%" height="100%" viewBox="0 0 220 540" style={styles.overlaySvg}>
        <G>
          {visibleRegionRects.map(({ region, rect, tapRects }) => {
            return (
              <G key={`${viewMode}-${region.id}`}>
                {tapRects.map((tapRect, index) => (
                  <OverlayRegion
                    key={`${region.id}-tap-${index}`}
                    {...tapRect}
                    label={`${region.label}-tap-${index}`}
                    active={false}
                    pointerOnly
                    onPress={() => onSelectRegion(region)}
                  />
                ))}
                <OverlayRegion
                  {...rect}
                  label={region.label}
                  active={selectedBodyArea === region.label}
                  subtle={!SHOW_HOTSPOT_DEBUG}
                  onPress={() => onSelectRegion(region)}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

function CloseUpMap({
  region,
  viewMode,
  selectedBodyArea,
  onSelectHotspot,
}: {
  region: BodyMapPrimaryRegion;
  viewMode: 'front' | 'back';
  selectedBodyArea?: string;
  onSelectHotspot: (hotspot: CloseUpHotspot) => void;
}) {
  const hotspotRects = useMemo(
    () => region.closeUpHotspots.map((hotspot) => ({ hotspot, rect: toCanvasRect(hotspot) })),
    [region]
  );
  const [imageFailed, setImageFailed] = useState(false);
  const regionImage = getDetailImage(region.id, viewMode);
  const showDetailImage = !!regionImage && !imageFailed;
  const showCloseUpOverlays = SHOW_HOTSPOT_DEBUG;

  return (
    <View style={styles.assetCanvas}>
      {showDetailImage ? (
        <Image
          source={viewMode === 'front' ? regionImage.front : regionImage.back}
          style={styles.assetImage}
          resizeMode="contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Svg width="100%" height="100%" viewBox="0 0 220 220">
          <Rect x="10" y="10" width="200" height="200" rx="28" fill="#F7FAFD" />
          <Ellipse cx="110" cy="110" rx="76" ry="88" fill={COLORS.bodyHighlight} />
          <Ellipse cx="110" cy="112" rx="68" ry="80" fill={COLORS.body} />
          <Path d="M68 62 C84 42, 136 42, 152 62" stroke={COLORS.lineStrong} strokeWidth="2" fill="none" />
          <Path d="M72 158 C92 176, 128 176, 148 158" stroke={COLORS.lineStrong} strokeWidth="2" fill="none" />
        </Svg>
      )}

      {showCloseUpOverlays ? (
        <Svg width="100%" height="100%" viewBox="0 0 220 220" style={styles.overlaySvg}>
          <G>
            {hotspotRects.map(({ hotspot, rect }) => {
              return (
                <OverlayRegion
                  key={hotspot.id}
                  {...rect}
                  label={hotspot.displayName}
                  active={selectedBodyArea === hotspot.displayName}
                  onPress={() => onSelectHotspot(hotspot)}
                />
              );
            })}
          </G>
        </Svg>
      ) : null}
    </View>
  );
}

function BodyMapVisual({
  viewMode,
  selectedBodyArea,
  activeRegion,
  onSelectRegion,
  onSelectHotspot,
}: {
  viewMode: 'front' | 'back';
  selectedBodyArea?: string;
  activeRegion: BodyMapPrimaryRegion | null;
  onSelectRegion: (region: BodyMapPrimaryRegion) => void;
  onSelectHotspot: (hotspot: CloseUpHotspot) => void;
}) {
  // Real anatomical assets are active for the full-body map and hip close-up.
  // If any image fails to load at runtime, the SVG fallback remains in place so
  // the app never loses selection behavior or blanks the page.

  if (activeRegion) {
    return (
        <CloseUpMap
          region={activeRegion}
          viewMode={viewMode}
          selectedBodyArea={selectedBodyArea}
          onSelectHotspot={onSelectHotspot}
        />
    );
  }

  return (
    <FullBodyMap
      viewMode={viewMode}
      selectedBodyArea={selectedBodyArea}
      onSelectRegion={onSelectRegion}
    />
  );
}

function getCloseUpHotspotsForPanel(activeRegion: BodyMapPrimaryRegion | null) {
  if (!activeRegion) {
    return [] as CloseUpHotspot[];
  }

  return activeRegion.closeUpHotspots;
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
  const [activeRegion, setActiveRegion] = useState<BodyMapPrimaryRegion | null>(null);
  const { width } = useWindowDimensions();
  const wideLayout = width >= 900;

  const helperCopy = useMemo(() => {
    if (activeRegion) {
      return `Select a more precise area inside ${activeRegion.closeUpTitle}.`;
    }

    if (!selectedBodyArea) {
      return 'Tap near the area that feels affected. Azul will use it as location context.';
    }

    return `Azul will include ${selectedBodyArea} as location context the next time you analyze your question.`;
  }, [activeRegion, selectedBodyArea]);

  const selectedLabel = activeRegion ? `${activeRegion.label} detail` : selectedBodyArea ?? 'None selected yet';
  const closeUpHotspots = useMemo(() => getCloseUpHotspotsForPanel(activeRegion), [activeRegion]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.copyBlock}>
          <Text style={styles.eyebrow}>Visual Body Map</Text>
          <Text style={styles.title}>{activeRegion ? activeRegion.closeUpTitle : 'Tap an area to add location context to your question.'}</Text>
          <Text style={styles.helper}>{helperCopy}</Text>
        </View>
        {!activeRegion ? (
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
        ) : null}
      </View>

      <View style={[styles.contentRow, wideLayout && styles.contentRowWide]}>
        <View style={[styles.visualPanel, wideLayout && styles.visualPanelWide]}>
          {activeRegion ? (
            <Pressable style={styles.backButton} onPress={() => setActiveRegion(null)}>
              <Text style={styles.backButtonLabel}>Back to Full Body</Text>
            </Pressable>
          ) : null}
          <BodyMapVisual
            viewMode={viewMode}
            selectedBodyArea={selectedBodyArea}
            activeRegion={activeRegion}
            onSelectRegion={(region) => {
              setActiveRegion(region);
              if (!selectedBodyArea) {
                onSelect(region.label);
              }
            }}
            onSelectHotspot={(hotspot) => onSelect(hotspot.displayName)}
          />
        </View>

        <View style={[styles.sidePanel, wideLayout && styles.sidePanelWide]}>
          <View style={styles.selectionCard}>
            <Text style={styles.selectionLabel}>Selected area</Text>
            <Text style={styles.selectionValue}>{selectedLabel}</Text>
            <Text style={styles.selectionHint}>
              The body map helps Azul localize your question. It does not auto-run analysis.
            </Text>
            {selectedBodyArea ? (
              <Pressable
                onPress={() => {
                  setActiveRegion(null);
                  onClear();
                }}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonLabel}>Clear selection</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>{activeRegion ? 'Close-Up Selection' : 'Full Body Selection'}</Text>
            <Text style={styles.legendBody}>
              {activeRegion
                ? 'Choose the most precise hotspot you can identify. The selected label is passed back into Azul as context.'
                : 'Start with a broad region, then move into a close-up map for more precise targeting.'}
            </Text>
            {closeUpHotspots.length ? (
              <View style={styles.hotspotButtonWrap}>
                {closeUpHotspots.map((hotspot) => (
                  <Pressable
                    key={hotspot.id}
                    style={[
                      styles.hotspotButton,
                      selectedBodyArea === hotspot.displayName && styles.hotspotButtonActive,
                    ]}
                    onPress={() => onSelect(hotspot.displayName)}
                  >
                    <Text
                      style={[
                        styles.hotspotButtonLabel,
                        selectedBodyArea === hotspot.displayName && styles.hotspotButtonLabelActive,
                      ]}
                    >
                      {hotspot.displayName}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
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
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  assetCanvas: {
    flex: 1,
    cursor: 'pointer',
  },
  overlaySvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  visualPanelWide: {
    flex: 1.4,
  },
  assetImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  backButtonLabel: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '700',
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
  legendBody: {
    color: COLORS.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  hotspotButtonWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  hotspotButton: {
    minHeight: 34,
    borderRadius: 999,
    backgroundColor: '#EEF3F8',
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  hotspotButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
    borderColor: 'rgba(212, 175, 55, 0.45)',
  },
  hotspotButtonLabel: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  hotspotButtonLabelActive: {
    color: COLORS.navy,
  },
});
