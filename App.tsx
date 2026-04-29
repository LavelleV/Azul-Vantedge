import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  type DimensionValue,
  Linking,
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  royalAzul: '#002366',
  slate: '#474747',
  gold: '#D4AF37',
  pearl: '#F7F4EC',
  mist: '#E8E2D2',
  cloud: '#F5F7FA',
  white: '#FFFFFF',
};

const Stack = createNativeStackNavigator();

const onboardingPages = [
  {
    eyebrow: 'The Greeting',
    title: 'Welcome to the Vantedge.',
    body:
      'Establish your baseline. Optimize your biology. You are now entering a space where frequency meets physiology. Azul Vantedge is your personal interface for resonance therapy, designed to bridge the gap between your clinical sessions with Lavelle and your daily performance.',
  },
  {
    eyebrow: 'The Resonance Standard',
    title: 'Broadcast a cleaner signal.',
    body:
      "Your body operates on a delicate electrical frequency. Stress, injury, and fatigue create 'noise' in that system. By using the Azul Vantedge protocols, you are broadcasting a clean signal back into your cells, increasing ATP production and restoring structural integrity.",
  },
  {
    eyebrow: 'The Call to Action',
    title: 'Enter the Resonance Suite.',
    body:
      "Before every session, log your Vibe in the Journal. After every session, follow the integration rituals. If you ever feel you've reached a plateau, your Clinical Concierge is one tap away. Ready to enter the Resonance Suite?",
  },
] as const;

const deviceModels = ['Home Model', 'Professional Model', 'Clinical Suite'] as const;
const sliderMetrics = ['Pain', 'Focus', 'Stress'] as const;

const healthSystems = [
  'Autonomic Nervous System',
  'Cardiovascular Rhythm',
  'Joint Decompression (Knee/Shoulder)',
  'Musculoskeletal Alignment',
  'Lymphatic Flow',
  'Dorsal Recovery (Back/Hip)',
  'Endocrine Balance',
  'Glymphatic Flush (Brain Detox)',
  'Vitality Core (Circulation/Vascular)',
  'Cognitive Performance',
  'Sleep Recovery',
  'Inflammatory Load',
  'Pain Modulation',
  'Stress Regulation',
  'Hormonal Vitality',
] as const;

const systemDetails: Record<
  number,
  {
    title: string;
    focus: string;
    protocol: string;
    clinicalTip?: string;
  }
> = {
  1: {
    title: 'Autonomic Nervous System',
    focus: 'Stress regulation and nervous system tone.',
    protocol: 'Use when anxiety, overstimulation, or poor recovery is leading the symptom picture.',
  },
  2: {
    title: 'Cardiovascular Rhythm',
    focus: 'Circulatory cadence and performance pacing.',
    protocol: 'Use when stamina feels inconsistent or when physical output lacks smooth rhythm.',
  },
  3: {
    title: 'Joint Decompression (Knee/Shoulder)',
    focus: 'Mechanical relief for compressed, irritated, or overworked joints.',
    protocol: 'Ideal for knee and shoulder sessions where tissue glide and structural space need to improve.',
    clinicalTip:
      "Avoid icing the joint for 4 hours after resonance. We want to keep the cellular highway open.",
  },
  4: {
    title: 'Musculoskeletal Alignment',
    focus: 'Postural sequencing and load distribution.',
    protocol: 'Use when imbalances are creating compensations across the movement chain.',
  },
  5: {
    title: 'Lymphatic Flow',
    focus: 'Fluid movement and detox support.',
    protocol: 'Best when stagnation, puffiness, or recovery lag suggests drainage support is needed.',
  },
  6: {
    title: 'Dorsal Recovery (Back/Hip)',
    focus: 'Posterior chain recovery for lumbar, sacral, and hip loading patterns.',
    protocol: 'Use when back pain, hip stiffness, or seated compression are limiting movement quality.',
    clinicalTip:
      'Place one pad along the low back and the second across the lateral hip. Stand and walk for two minutes after the session so the new signal locks into motion.',
  },
  7: {
    title: 'Endocrine Balance',
    focus: 'Hormonal rhythm and metabolic steadiness.',
    protocol: 'Use when hormonal variability is affecting recovery, energy, or consistency.',
  },
  8: {
    title: 'Glymphatic Flush (Brain Detox)',
    focus: 'Neurological drainage and overnight recovery support.',
    protocol: 'Use when mental residue, overload, or sluggish neurological recovery is present.',
    clinicalTip:
      'Run this protocol in the evening, hydrate well, and keep the room low-stimulation afterward. The goal is to give the brain a clean window to clear and reset.',
  },
  9: {
    title: 'Vitality Core (Circulation/Vascular)',
    focus: 'Circulatory return, vascular tone, and lower-extremity vitality.',
    protocol: 'Use when swelling, heaviness, or sluggish blood flow are part of the symptom pattern.',
    clinicalTip:
      'Place one pad on the inner ankle and one on the inner calf. Elevate your leg above your heart during the session to maximize the biological edge.',
  },
  10: {
    title: 'Cognitive Performance',
    focus: 'Attention, processing speed, and executive sharpness.',
    protocol: 'Use when mental clarity and sustained concentration need reinforcement.',
  },
  11: {
    title: 'Sleep Recovery',
    focus: 'Recovery depth and sleep quality.',
    protocol: 'Use when sleep onset, overnight restlessness, or poor restoration are the bottleneck.',
  },
  12: {
    title: 'Inflammatory Load',
    focus: 'System-wide inflammatory burden and tissue irritation.',
    protocol: 'Use when soreness, heat, and generalized irritation are persisting longer than expected.',
  },
  13: {
    title: 'Pain Modulation',
    focus: 'Pain signaling and sensitivity management.',
    protocol: 'Use when discomfort itself is the dominant limiter to function or progress.',
  },
  14: {
    title: 'Stress Regulation',
    focus: 'Stress chemistry and recovery tolerance.',
    protocol: 'Use when psychological load is showing up in the body and dragging performance.',
  },
  15: {
    title: 'Hormonal Vitality',
    focus: 'Longer-horizon vitality and endocrine resilience.',
    protocol: 'Use when recovery, drive, and consistency need broader hormonal support.',
  },
};

const symptomMappings = [
  {
    keywords: ['foot', 'ankle', 'swollen'],
    systems: [8, 9],
  },
  {
    keywords: ['brain fog', "can't focus", 'study'],
    systems: [2],
  },
  {
    keywords: ['anxious', 'stress', "can't sleep"],
    systems: [1, 11],
  },
  {
    keywords: ['back pain', 'stiff hip'],
    systems: [6],
  },
] as const;

type DeviceModel = (typeof deviceModels)[number];
type SliderMetric = (typeof sliderMetrics)[number];
type JournalState = Record<SliderMetric, number>;
type VibeJournal = {
  preSession: JournalState;
  postSession: JournalState;
};

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  DeviceSelection: undefined;
  Dashboard: undefined;
  SystemDetail: { systemNumber: number };
};

const defaultVibeJournal: VibeJournal = {
  preSession: {
    Pain: 40,
    Focus: 52,
    Stress: 63,
  },
  postSession: {
    Pain: 18,
    Focus: 78,
    Stress: 28,
  },
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function getClinicalAssessmentSmsUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return {
    primary: `sms:8105225460&body=${encoded}`,
    fallback: `sms:8105225460?body=${encoded}`,
  };
}

async function openClinicalSms(message: string) {
  const { primary, fallback } = getClinicalAssessmentSmsUrl(message);

  try {
    const supported = await Linking.canOpenURL(primary);
    await Linking.openURL(supported ? primary : fallback);
  } catch {
    await Linking.openURL(fallback);
  }
}

function getSystemsForConsult(normalizedSearch: string) {
  const scores = new Map<number, number>();

  if (!normalizedSearch) {
    return scores;
  }

  symptomMappings.forEach(({ keywords, systems }) => {
    let score = 0;

    keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      if (
        normalizedSearch.includes(normalizedKeyword) ||
        normalizedKeyword.includes(normalizedSearch)
      ) {
        score += normalizedKeyword.split(' ').length > 1 ? 3 : 2;
      } else {
        const searchTerms = normalizedSearch.split(' ');
        const keywordTerms = normalizedKeyword.split(' ');
        const hasPartialMatch = keywordTerms.some((term) =>
          searchTerms.some(
            (searchTerm) => searchTerm.length > 2 && term.includes(searchTerm)
          )
        );

        if (hasPartialMatch) {
          score += 1;
        }
      }
    });

    if (score > 0) {
      systems.forEach((systemNumber) => {
        scores.set(systemNumber, (scores.get(systemNumber) ?? 0) + score);
      });
    }
  });

  return scores;
}

function getPlacementInstruction(systemNumber: number, activeModel: DeviceModel) {
  const modelPrefix =
    activeModel === 'Home Model'
      ? 'For the Home Model, keep the pad pathway simple and conservative.'
      : activeModel === 'Professional Model'
        ? 'For the Professional Model, you can use a broader two-zone clinical pathway.'
        : 'For the Clinical Suite, use the full clinical layout with precision spacing and monitored output.';

  switch (systemNumber) {
    case 3:
      return `${modelPrefix} Pad one channel above the joint line and one below it so the current crosses the compression zone. For shoulders, bracket the front and rear capsule rather than stacking both pads on one side.`;
    case 6:
      return `${modelPrefix} Place one pad along the low back near the pain anchor and the second over the lateral hip or gluteal shelf to bridge the posterior chain.`;
    case 8:
      return `${modelPrefix} Place pads along the upper cervical-occipital line and keep the session low stimulation. This is a drainage-support orientation, not an intensity chase.`;
    case 9:
      return `${modelPrefix} Place one pad on the inner ankle and one on the inner calf, then elevate the leg above heart level during the session.`;
    case 11:
      return `${modelPrefix} Position pads high on the upper trapezius and low at the base of the skull to downshift the system before bed.`;
    case 1:
      return `${modelPrefix} Cross one pad near the upper neck and the second at the upper thoracic hinge to quiet autonomic overdrive.`;
    case 2:
      return `${modelPrefix} Use a clean front-back torso pathway so the current has a broad circulatory arc rather than a tight local loop.`;
    default:
      return `${modelPrefix} Bracket the most irritated zone with one pad upstream and one downstream so the signal crosses the tissue instead of sitting directly on one hotspot.`;
  }
}

function getModelGuardrail(activeModel: DeviceModel) {
  if (activeModel === 'Home Model') {
    return 'Stay within consumer-safe protocols. Do not escalate into professional-only high-frequency or advanced clinical sequencing.';
  }

  if (activeModel === 'Professional Model') {
    return 'Professional-level protocols are available, but keep the recommendation practical unless symptom complexity clearly justifies a broader sequence.';
  }

  return 'Clinical Suite is active, so advanced sequencing and deeper clinical layering are available when the pattern warrants it.';
}

function getJournalContext(vibeJournal: VibeJournal) {
  const painShift = vibeJournal.preSession.Pain - vibeJournal.postSession.Pain;
  const focusShift = vibeJournal.postSession.Focus - vibeJournal.preSession.Focus;
  const stressShift = vibeJournal.preSession.Stress - vibeJournal.postSession.Stress;

  return {
    painShift,
    focusShift,
    stressShift,
    summary: `Vibe Journal trend: Pain ${vibeJournal.preSession.Pain} to ${vibeJournal.postSession.Pain}, Focus ${vibeJournal.preSession.Focus} to ${vibeJournal.postSession.Focus}, Stress ${vibeJournal.preSession.Stress} to ${vibeJournal.postSession.Stress}.`,
  };
}

function formatSection(title: string, bullets: string[]) {
  return `**${title}**\n${bullets.map((bullet) => `- ${bullet}`).join('\n')}`;
}

function buildRotatorCuffResponse(
  normalizedSearch: string,
  activeModel: DeviceModel,
  journalContext: ReturnType<typeof getJournalContext>
) {
  const executiveSummary = [] as string[];
  const physiology = [] as string[];

  if (normalizedSearch.includes('pain')) {
    executiveSummary.push(
      'Pain is present, so the first objective is interrupting the nociceptive signal before the shoulder reinforces a protective holding pattern.'
    );
    physiology.push(
      'The resonance field should be tuned to reduce signal noise around the irritated cuff while broadcasting a clean signal through the local tissue environment.'
    );
  }

  if (normalizedSearch.includes('stiffness') || normalizedSearch.includes('stiff')) {
    executiveSummary.push(
      'Stiffness is also present, so the session must focus on decompressing the neural glide and restoring smoother mechanical travel through the cuff complex.'
    );
    physiology.push(
      'That means tuning the system so metabolic debris clears more efficiently and the shoulder can regain a cleaner excursion pattern.'
    );
  }

  if (!executiveSummary.length) {
    executiveSummary.push(
      'The symptom pattern points to a shoulder-cuff presentation that needs precise resonance placement and a measured physiological response.'
    );
    physiology.push(
      'The objective is to broadcast a clean signal across the cuff architecture so the system stops reinforcing noise, guarding, and inefficient repair behavior.'
    );
  }

  const protocolLine =
    activeModel === 'Home Model'
      ? 'Protocol #19 Inflammation Support'
      : 'Protocol #3 Joint Decompression with rotator-cuff support sequencing';

  const placementLine =
    activeModel === 'Home Model'
      ? 'Place one pad just anterior to the shoulder over the Coracoid Process and the second posteriorly over the Infraspinatus fossa. By placing pads on the Coracoid and Infraspinatus, we are creating a sub-sensory resonance field that bridges the structural gap in the tissue rather than hammering the tear directly.'
      : 'Place one pad over the Coracoid Process/anterior shoulder line and the second over the Infraspinatus or posterior cuff bed. If the device configuration permits it, layer a superior support pathway near the supraspinatus footprint to tune the cuff from front to back with cleaner structural continuity.';

  const tips =
    activeModel === 'Home Model'
      ? [
          'Support the arm in a neutral, unloaded position so the HoweRT frequency model can calm excess noise without inviting more shearing.',
          'Hydrate after resonance to help clear metabolic debris, and avoid loading the shoulder aggressively the same day.',
          'Home Model power can support inflammation and signal quality, but structural repair belongs to Clinical-Suite power when tissue integrity is in question.',
        ]
      : [
          'Keep the scapula relaxed and the shoulder slightly supported so the HoweRT field can tune the cuff without adding defensive compression.',
          'Hydrate well after session to help the tissue clear metabolic debris before returning to overhead demand.',
          'If the shoulder is acutely reactive, do not ice for 4 hours after resonance unless separately instructed clinically, because we want the tissue highway open while the signal integrates.',
        ];

  const summary = [
    formatSection('Executive Summary', executiveSummary),
    formatSection('Protocol', [`Protocol Number & Name: ${protocolLine}`]),
    formatSection('Pad Placement', [placementLine]),
    formatSection('Why This Works', physiology),
    formatSection('Clinical Tips', tips),
    formatSection('Vibe Journal Context', [
      `Your before-vs-after pattern matters here: ${journalContext.summary}`,
    ]),
  ].join('\n\n');

  const followUp =
    activeModel === 'Home Model'
      ? [
          formatSection('Consult Direction', [
            'For the HovERT brand standard, a Home Model can tune the inflammatory environment, but it does not carry enough Clinical-Suite power for structural repair sequencing.',
            'If weakness, tearing, or major range loss is part of the picture, a professional assessment is the premium clinical move.',
          ]),
        ].join('\n\n')
      : [
          formatSection('Consult Direction', [
            'This device class can support a broader HoweRT shoulder sequence. Confirm whether the pain is anterior, lateral, or posterior and whether weakness appears with abduction or external rotation.',
          ]),
        ].join('\n\n');

  return {
    summary,
    followUp,
    systems: [] as Array<{ system: string; systemNumber: number; score: number }>,
    recommendAssessment: activeModel === 'Home Model',
  };
}

function buildAgentResponse(
  searchText: string,
  activeModel: DeviceModel,
  vibeJournal: VibeJournal
) {
  const normalizedSearch = normalizeText(searchText);
  const journalContext = getJournalContext(vibeJournal);

  if (normalizedSearch.includes('rotator cuff')) {
    return buildRotatorCuffResponse(normalizedSearch, activeModel, journalContext);
  }

  const scores = getSystemsForConsult(normalizedSearch);
  const rankedSystems = healthSystems
    .map((system, index) => {
      const systemNumber = index + 1;
      const score = scores.get(systemNumber) ?? 0;
      return { system, systemNumber, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.systemNumber - right.systemNumber;
    });

  if (!normalizedSearch) {
    return {
      summary: [
        formatSection('Executive Summary', [
          'Azul is standing by as your luxury medical microcurrent consultant.',
          'Describe the symptom, the anatomical location, and whether your priority is interrupting pain, decompressing stiffness, restoring recovery, improving sleep, sharpening focus, or upgrading circulation.',
        ]),
      ].join('\n\n'),
      followUp: [
        formatSection('Next Detail Needed', [
          'Tell me what structure or region is involved, what aggravates it, and which device configuration you are using so I can tune the system precisely.',
          `Current physiological context: ${journalContext.summary}`,
        ]),
      ].join('\n\n'),
      systems: [] as Array<{ system: string; systemNumber: number; score: number }>,
      recommendAssessment: false,
    };
  }

  if (!rankedSystems.length) {
    return {
      summary: [
        formatSection('Executive Summary', [
          'This presentation does not map cleanly to a single resonance lane.',
          'The system is showing enough mixed physiology that a professional assessment is the cleaner clinical decision.',
        ]),
      ].join('\n\n'),
      followUp: [
        formatSection('Next Detail Needed', [
          'Reply with the exact body location, onset pattern, and device configuration if you want Azul to refine the read further.',
          `Current physiological context: ${journalContext.summary}`,
        ]),
      ].join('\n\n'),
      systems: [] as Array<{ system: string; systemNumber: number; score: number }>,
      recommendAssessment: true,
    };
  }

  const lead = rankedSystems[0];
  const secondary = rankedSystems[1];
  const leadDetail = systemDetails[lead.systemNumber];
  const placement = getPlacementInstruction(lead.systemNumber, activeModel);

  const journalRead =
    journalContext.painShift > 0 || journalContext.stressShift > 0 || journalContext.focusShift > 0
      ? `Your latest before-vs-after journal shows a response trend: ${journalContext.summary}`
      : `Your latest journal does not show a clear improvement trend yet: ${journalContext.summary}`;

  const modelRead =
    activeModel === 'Home Model'
      ? 'This recommendation stays within a premium home-device lane and avoids pretending Home power can replace Clinical-Suite structural work.'
      : activeModel === 'Professional Model'
        ? 'This recommendation fits a professional session structure and a more deliberate HoweRT sequencing model.'
        : 'This recommendation is calibrated for a full Clinical-Suite workflow and deeper structural tuning.';

  const symptomPivot = [] as string[];

  if (normalizedSearch.includes('pain')) {
    symptomPivot.push(
      'Pain is part of the presentation, so the treatment arc should begin by interrupting the nociceptive signal before chasing performance.'
    );
  }

  if (normalizedSearch.includes('stiffness') || normalizedSearch.includes('stiff')) {
    symptomPivot.push(
      'Stiffness is also present, so the sequence should include decompressing the neural glide and restoring cleaner tissue travel.'
    );
  }

  if (!symptomPivot.length) {
    symptomPivot.push(
      'The immediate objective is tuning the system so the tissue receives a cleaner signal and stops reinforcing unnecessary defensive noise.'
    );
  }

  return {
    summary: [
      formatSection('Executive Summary', [
        `The lead match is System #${lead.systemNumber} ${leadDetail.title}.`,
        leadDetail.protocol,
        modelRead,
        ...symptomPivot,
      ]),
      formatSection('Protocol', [
        `Protocol Number & Name: System #${lead.systemNumber} ${leadDetail.title}`,
      ]),
      formatSection('Pad Placement', [placement]),
      formatSection('Why This Works', [
        'The purpose of the placement is to broadcast a clean signal through the target system rather than simply stimulate a sore point.',
        'That lets the tissue reduce noise, clear metabolic debris more efficiently, and move toward a more coherent physiological rhythm.',
      ]),
      formatSection('Clinical Tips', [
        journalRead,
        'Hydrate after session and keep the treated region mechanically quiet for a short integration window so the signal can settle cleanly.',
        leadDetail.clinicalTip ?? 'Avoid stacking both pads directly on the same pain hotspot if a broader tissue bridge is possible.',
      ]),
    ].join('\n\n'),
    followUp: [
      formatSection('Next Detail Needed', [
        'Tell me your exact device model next if there are multiple attachments in play.',
        secondary
          ? `Secondary cross-check: System #${secondary.systemNumber} ${systemDetails[secondary.systemNumber].title}.`
          : 'No secondary cross-check is leading the pattern at this time.',
      ]),
    ].join('\n\n'),
    systems: rankedSystems,
    recommendAssessment: false,
  };
}

function FrequencyLogo() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.08],
  });

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.65],
  });

  const bars = [32, 60, 96, 72, 38, 72, 96, 60, 32];

  return (
    <Animated.View style={[styles.logoShell, { transform: [{ scale }] }]}>
      <Animated.View style={[styles.logoGlow, { opacity: glowOpacity }]} />
      <View style={styles.logoCore}>
        <Text style={styles.logoWordmark}>AZUL</Text>
        <View style={styles.waveRow}>
          {bars.map((height, index) => (
            <Animated.View
              key={`${height}-${index}`}
              style={[
                styles.waveBar,
                {
                  height,
                  opacity: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5 + index * 0.03, 0.95],
                  }),
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.logoSubhead}>VANTEDGE</Text>
      </View>
    </Animated.View>
  );
}

function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 2400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.splashScreen}>
      <StatusBar style="light" />
      <View style={styles.splashBackdropTop} />
      <View style={styles.splashBackdropBottom} />
      <FrequencyLogo />
      <Text style={styles.splashTitle}>Luxury Medical Resonance</Text>
      <Text style={styles.splashSubtitle}>
        Precision frequency. Clinical elegance. Performance restoration.
      </Text>
    </View>
  );
}

function OnboardingScreen({ navigation }: { navigation: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const gestureStart = useRef(0);

  const goToPage = (index: number) => {
    const bounded = Math.max(0, Math.min(onboardingPages.length - 1, index));
    setActiveIndex(bounded);
    Animated.spring(translateX, {
      toValue: -bounded * SCREEN_WIDTH,
      useNativeDriver: true,
      damping: 18,
      stiffness: 140,
    }).start();
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 8,
        onPanResponderGrant: () => {
          gestureStart.current = -activeIndex * SCREEN_WIDTH;
        },
        onPanResponderMove: (_, gestureState) => {
          translateX.setValue(gestureStart.current + gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -SCREEN_WIDTH * 0.18) {
            goToPage(activeIndex + 1);
            return;
          }

          if (gestureState.dx > SCREEN_WIDTH * 0.18) {
            goToPage(activeIndex - 1);
            return;
          }

          goToPage(activeIndex);
        },
      }),
    [activeIndex, translateX]
  );

  return (
    <SafeAreaView style={styles.onboardingScreen}>
      <StatusBar style="light" />
      <View style={styles.onboardingHeader}>
        <Text style={styles.brandCaption}>Azul Vantedge</Text>
        <Text style={styles.brandTitle}>Resonance Welcome</Text>
      </View>

      <View style={styles.carouselClip} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.carouselTrack,
            {
              width: SCREEN_WIDTH * onboardingPages.length,
              transform: [{ translateX }],
            },
          ]}
        >
          {onboardingPages.map((page) => (
            <View key={page.eyebrow} style={styles.pageCard}>
              <Text style={styles.pageEyebrow}>{page.eyebrow}</Text>
              <Text style={styles.pageTitle}>{page.title}</Text>
              <Text style={styles.pageBody}>{page.body}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <View style={styles.paginationRow}>
        {onboardingPages.map((page, index) => (
          <Pressable key={page.eyebrow} onPress={() => goToPage(index)}>
            <View
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.onboardingFooter}>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigation.replace('DeviceSelection')}
        >
          <Text style={styles.secondaryButtonLabel}>Skip Intro</Text>
        </Pressable>
        <Pressable
          style={styles.primaryButton}
          onPress={() =>
            activeIndex === onboardingPages.length - 1
              ? navigation.replace('DeviceSelection')
              : goToPage(activeIndex + 1)
          }
        >
          <Text style={styles.primaryButtonLabel}>
            {activeIndex === onboardingPages.length - 1 ? 'Select Device' : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DeviceSelectionScreen({
  navigation,
  activeModel,
  setActiveModel,
}: {
  navigation: any;
  activeModel: DeviceModel;
  setActiveModel: (value: DeviceModel) => void;
}) {
  return (
    <SafeAreaView style={styles.deviceScreen}>
      <StatusBar style="light" />
      <View style={styles.deviceHeader}>
        <Text style={styles.brandCaption}>Device Initialization</Text>
        <Text style={styles.deviceTitle}>Select Your Device</Text>
        <Text style={styles.deviceSubtitle}>
          Azul will tailor protocol logic, placement guidance, and escalation rules to your active hardware profile.
        </Text>
      </View>
      <View style={styles.deviceList}>
        {deviceModels.map((model) => (
          <Pressable
            key={model}
            style={[
              styles.deviceCard,
              activeModel === model && styles.deviceCardActive,
            ]}
            onPress={() => setActiveModel(model)}
          >
            <Text
              style={[
                styles.deviceCardTitle,
                activeModel === model && styles.deviceCardTitleActive,
              ]}
            >
              {model}
            </Text>
            <Text style={styles.deviceCardBody}>
              {model === 'Home Model'
                ? 'Consumer-safe guidance with conservative placement and no professional-only protocol escalation.'
                : model === 'Professional Model'
                  ? 'Expanded clinical flexibility for broader sequencing and advanced local applications.'
                  : 'Full-suite precision guidance for comprehensive clinical setups and deeper consult logic.'}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.deviceFooter}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.replace('Dashboard')}>
          <Text style={styles.primaryButtonLabel}>Enter Dashboard</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MetricSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const fillWidth = `${value}%` as DimensionValue;
  const thumbLeft = `${Math.max(0, Math.min(92, value - 4))}%` as DimensionValue;

  return (
    <View style={styles.sliderBlock}>
      <View style={styles.sliderLabelRow}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>{value}</Text>
      </View>
      <View style={styles.sliderScale}>
        <View style={[styles.sliderScaleFill, { width: fillWidth }]} />
        <View style={[styles.sliderThumb, { left: thumbLeft }]} />
      </View>
      <View style={styles.sliderButtonsRow}>
        <Pressable style={styles.sliderAdjustButton} onPress={() => onChange(Math.max(0, value - 5))}>
          <Text style={styles.sliderAdjustLabel}>-5</Text>
        </Pressable>
        <Pressable style={styles.sliderAdjustButton} onPress={() => onChange(Math.min(100, value + 5))}>
          <Text style={styles.sliderAdjustLabel}>+5</Text>
        </Pressable>
      </View>
    </View>
  );
}

function VibeLogModal({
  visible,
  onClose,
  vibeJournal,
  setVibeJournal,
}: {
  visible: boolean;
  onClose: () => void;
  vibeJournal: VibeJournal;
  setVibeJournal: React.Dispatch<React.SetStateAction<VibeJournal>>;
}) {
  const updateMetric = (
    phase: 'preSession' | 'postSession',
    metric: SliderMetric,
    value: number
  ) => {
    setVibeJournal((current) => ({
      ...current,
      [phase]: {
        ...current[phase],
        [metric]: value,
      },
    }));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.sectionEyebrow}>Vibe Log</Text>
          <Text style={styles.sectionTitle}>Document your before vs. after session state.</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.journalColumns}>
              <View style={styles.journalColumn}>
                <Text style={styles.journalColumnTitle}>Before Session</Text>
                {sliderMetrics.map((metric) => (
                  <MetricSlider
                    key={`modal-pre-${metric}`}
                    label={metric}
                    value={vibeJournal.preSession[metric]}
                    onChange={(value) => updateMetric('preSession', metric, value)}
                  />
                ))}
              </View>

              <View style={styles.journalColumn}>
                <Text style={styles.journalColumnTitle}>After Session</Text>
                {sliderMetrics.map((metric) => (
                  <MetricSlider
                    key={`modal-post-${metric}`}
                    label={metric}
                    value={vibeJournal.postSession[metric]}
                    onChange={(value) => updateMetric('postSession', metric, value)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <Pressable style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonLabel}>Save Vibe</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function FormattedResponse({
  content,
  bodyStyle,
  bulletStyle,
}: {
  content: string;
  bodyStyle: object;
  bulletStyle: object;
}) {
  const sections = content.split('\n\n').filter(Boolean);

  return (
    <View style={styles.formattedResponseWrap}>
      {sections.map((section, sectionIndex) => {
        const lines = section.split('\n').filter(Boolean);

        return (
          <View key={`${sectionIndex}-${lines[0]}`} style={styles.formattedResponseSection}>
            {lines.map((line, lineIndex) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <Text key={`${lineIndex}-${line}`} style={styles.formattedResponseHeader}>
                    {line.replace(/\*\*/g, '')}
                  </Text>
                );
              }

              if (line.startsWith('- ')) {
                return (
                  <Text key={`${lineIndex}-${line}`} style={bulletStyle}>
                    {line}
                  </Text>
                );
              }

              return (
                <Text key={`${lineIndex}-${line}`} style={bodyStyle}>
                  {line}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function SettingsStrip({
  activeModel,
  setActiveModel,
}: {
  activeModel: DeviceModel;
  setActiveModel: (value: DeviceModel) => void;
}) {
  return (
    <View style={styles.settingsStrip}>
      <Text style={styles.settingsLabel}>Device Toggle</Text>
      <View style={styles.settingsToggleRow}>
        {deviceModels.map((model) => (
          <Pressable
            key={model}
            style={[
              styles.settingsToggleButton,
              activeModel === model && styles.settingsToggleButtonActive,
            ]}
            onPress={() => setActiveModel(model)}
          >
            <Text
              style={[
                styles.settingsToggleLabel,
                activeModel === model && styles.settingsToggleLabelActive,
              ]}
            >
              {model === 'Home Model'
                ? 'Home'
                : model === 'Professional Model'
                  ? 'Pro'
                  : 'Suite'}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SystemDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const systemNumber = route.params?.systemNumber ?? 1;
  const detail = systemDetails[systemNumber] ?? systemDetails[1];

  return (
    <SafeAreaView style={styles.detailScreen}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHero}>
          <Pressable style={styles.detailBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.detailBackLabel}>Back</Text>
          </Pressable>
          <Text style={styles.brandCaption}>System #{systemNumber}</Text>
          <Text style={styles.detailTitle}>{detail.title}</Text>
          <Text style={styles.detailIntro}>
            Refined guidance for your resonance session, recovery window, and structural support.
          </Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionEyebrow}>Clinical Focus</Text>
          <Text style={styles.detailBody}>{detail.focus}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionEyebrow}>Protocol Intent</Text>
          <Text style={styles.detailBody}>{detail.protocol}</Text>
        </View>

        {detail.clinicalTip ? (
          <View style={styles.tipCard}>
            <Text style={styles.sectionEyebrow}>Lavelle&apos;s Clinical Tip</Text>
            <Text style={styles.tipBody}>{detail.clinicalTip}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function DashboardScreen({
  navigation,
  activeModel,
  setActiveModel,
  vibeJournal,
  setVibeJournal,
}: {
  navigation: any;
  activeModel: DeviceModel;
  setActiveModel: (value: DeviceModel) => void;
  vibeJournal: VibeJournal;
  setVibeJournal: React.Dispatch<React.SetStateAction<VibeJournal>>;
}) {
  const [consultInput, setConsultInput] = useState('');
  const [submittedInput, setSubmittedInput] = useState('');
  const [vibeVisible, setVibeVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [responseState, setResponseState] = useState(() =>
    buildAgentResponse('', activeModel, vibeJournal)
  );
  const analysisTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!submittedInput.trim()) {
      setResponseState(buildAgentResponse('', activeModel, vibeJournal));
      return;
    }

    setResponseState(buildAgentResponse(submittedInput, activeModel, vibeJournal));
  }, [submittedInput, activeModel, vibeJournal]);

  const openClinicalAssessment = async () => {
    await openClinicalSms(
      `Hello Azul Vantedge, I would like an assessment with Lavelle. Active device: ${activeModel}.`
    );
  };

  const askLavelle = async () => {
    const detail = submittedInput.trim() || consultInput.trim() || 'I need help finding the right system.';
    await openClinicalSms(
      `Hello Lavelle, I need guidance from the Azul Clinical Agent about: ${detail}. Active device: ${activeModel}.`
    );
  };

  const clearConversation = () => {
    if (analysisTimeoutRef.current) {
      clearTimeout(analysisTimeoutRef.current);
      analysisTimeoutRef.current = null;
    }

    setConsultInput('');
    setSubmittedInput('');
    setIsAnalyzing(false);
    setResponseState(buildAgentResponse('', activeModel, vibeJournal));
  };

  const handleAnalyze = () => {
    const textInput = consultInput.trim();

    if (!textInput || isAnalyzing) {
      return;
    }

    if (analysisTimeoutRef.current) {
      clearTimeout(analysisTimeoutRef.current);
    }

    setResponseState({
      summary: '',
      followUp: '',
      systems: [],
      recommendAssessment: false,
    });
    setIsAnalyzing(true);
    analysisTimeoutRef.current = setTimeout(() => {
      const nextResponse = buildAgentResponse(textInput, activeModel, vibeJournal);
      setSubmittedInput(textInput);
      setResponseState(nextResponse);
      setIsAnalyzing(false);
      analysisTimeoutRef.current = null;
    }, 600);
  };

  return (
    <SafeAreaView style={styles.dashboardScreen}>
      <StatusBar style="light" />
      <VibeLogModal
        visible={vibeVisible}
        onClose={() => setVibeVisible(false)}
        vibeJournal={vibeJournal}
        setVibeJournal={setVibeJournal}
      />

      <View style={styles.dashboardHeader}>
        <Text style={styles.brandCaption}>Symphony Start</Text>
        <Text style={styles.dashboardTitle}>Azul Clinical Agent</Text>
        <Text style={styles.dashboardSubtitle}>
          An authoritative microcurrent consultant calibrated to your active device and your latest Vibe response pattern.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <SettingsStrip activeModel={activeModel} setActiveModel={setActiveModel} />

        <View style={styles.agentCard}>
          <Text style={styles.sectionEyebrow}>Clinical Agent</Text>
          <Text style={styles.sectionTitle}>Describe your issue or ask a medical question...</Text>
          <View style={styles.agentInputRow}>
            <View style={styles.agentInputShell}>
            <TextInput
              value={consultInput}
              onChangeText={setConsultInput}
              placeholder="Describe your issue or ask a medical question..."
              placeholderTextColor="rgba(71, 71, 71, 0.5)"
              style={styles.agentInput}
              autoCapitalize="sentences"
              autoCorrect
              multiline
              returnKeyType="send"
              blurOnSubmit
              onSubmitEditing={handleAnalyze}
            />
            </View>
            <Pressable
              style={[
                styles.analyzeButton,
                (!consultInput.trim() || isAnalyzing) && styles.analyzeButtonDisabled,
              ]}
              onPress={handleAnalyze}
            >
              <Text style={styles.analyzeButtonLabel}>
                {isAnalyzing ? '...' : 'Analyze'}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.agentHint}>
            Example: swollen ankle after training, brain fog before studying, can&apos;t sleep, low back pain, stiff hip.
          </Text>
          <Pressable style={styles.clearConversationButton} onPress={clearConversation}>
            <Text style={styles.clearConversationLabel}>Clear Conversation</Text>
          </Pressable>
        </View>

        <View style={styles.responseCard}>
          <Text style={styles.sectionEyebrow}>Response Window</Text>
          <Text style={styles.responseLead}>Azul</Text>
          {isAnalyzing ? (
            <Text style={styles.analyzingLabel}>Analyzing your biology and device data...</Text>
          ) : (
            <>
              <FormattedResponse
                content={responseState.summary}
                bodyStyle={styles.responseBody}
                bulletStyle={styles.responseBullet}
              />
              <FormattedResponse
                content={responseState.followUp}
                bodyStyle={styles.responsePrompt}
                bulletStyle={styles.responsePromptBullet}
              />
            </>
          )}

          {!isAnalyzing && responseState.systems.length ? (
            <View style={styles.agentMatchesWrap}>
              {responseState.systems.slice(0, 3).map(({ systemNumber, system }) => (
                <Pressable
                  key={`${systemNumber}-${system}`}
                  onPress={() => navigation.navigate('SystemDetail', { systemNumber })}
                  style={styles.agentMatchPill}
                >
                  <Text style={styles.agentMatchPillLabel}>#{systemNumber}</Text>
                  <Text style={styles.agentMatchPillText}>{system}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          {!isAnalyzing && responseState.recommendAssessment ? (
            <Pressable style={styles.askLavelleButton} onPress={askLavelle}>
              <Text style={styles.askLavelleButtonLabel}>Ask Lavelle</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.vibeSummaryCard}>
          <Text style={styles.sectionEyebrow}>Vibe Log</Text>
          <Text style={styles.vibeSummaryText}>
            Before vs. After: Pain {vibeJournal.preSession.Pain} to {vibeJournal.postSession.Pain}, Focus {vibeJournal.preSession.Focus} to {vibeJournal.postSession.Focus}, Stress {vibeJournal.preSession.Stress} to {vibeJournal.postSession.Stress}.
          </Text>
          <Pressable style={styles.logVibeButton} onPress={() => setVibeVisible(true)}>
            <Text style={styles.logVibeButtonLabel}>Log Vibe</Text>
          </Pressable>
        </View>

        <View style={styles.referenceCard}>
          <Text style={styles.referenceTitle}>Reference Grid</Text>
          <View style={styles.referenceGrid}>
            {healthSystems.map((system, index) => (
              <Pressable
                key={system}
                onPress={() => navigation.navigate('SystemDetail', { systemNumber: index + 1 })}
                style={styles.referenceBox}
              >
                <Text style={styles.referenceBoxIndex}>#{index + 1}</Text>
                <Text style={styles.referenceBoxLabel}>{system}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.assessmentDock}>
        <Pressable style={styles.assessmentButton} onPress={openClinicalAssessment}>
          <Text style={styles.assessmentButtonLabel}>Assessment with Lavelle</Text>
          <Text style={styles.assessmentButtonSubLabel}>Persistent SMS to 810-522-5460</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const [activeModel, setActiveModel] = useState<DeviceModel>('Home Model');
  const [vibeJournal, setVibeJournal] = useState<VibeJournal>(defaultVibeJournal);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding">
          {(props) => <OnboardingScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DeviceSelection">
          {(props) => (
            <DeviceSelectionScreen
              {...props}
              activeModel={activeModel}
              setActiveModel={setActiveModel}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {(props) => (
            <DashboardScreen
              {...props}
              activeModel={activeModel}
              setActiveModel={setActiveModel}
              vibeJournal={vibeJournal}
              setVibeJournal={setVibeJournal}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SystemDetail" component={SystemDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: COLORS.royalAzul,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  splashBackdropTop: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
  },
  splashBackdropBottom: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  logoShell: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logoGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.gold,
  },
  logoCore: {
    width: 260,
    borderRadius: 34,
    backgroundColor: 'rgba(7, 19, 49, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.55)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoWordmark: {
    color: COLORS.pearl,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 6,
    marginBottom: 14,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  waveBar: {
    width: 10,
    borderRadius: 999,
    backgroundColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  logoSubhead: {
    color: COLORS.mist,
    fontSize: 13,
    letterSpacing: 4,
    fontWeight: '600',
  },
  splashTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  splashSubtitle: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  onboardingScreen: {
    flex: 1,
    backgroundColor: '#03173F',
    paddingVertical: 12,
  },
  onboardingHeader: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 4,
  },
  brandCaption: {
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 2.8,
    fontSize: 12,
    fontWeight: '700',
  },
  brandTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '700',
  },
  carouselClip: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  carouselTrack: {
    flexDirection: 'row',
    flex: 1,
  },
  pageCard: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  pageEyebrow: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    marginBottom: 14,
  },
  pageTitle: {
    color: COLORS.pearl,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: 20,
  },
  pageBody: {
    color: 'rgba(247, 244, 236, 0.84)',
    fontSize: 18,
    lineHeight: 30,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 26,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  paginationDotActive: {
    width: 34,
    backgroundColor: COLORS.gold,
  },
  onboardingFooter: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    paddingBottom: 8,
  },
  primaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabel: {
    color: COLORS.royalAzul,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  secondaryButtonLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  deviceScreen: {
    flex: 1,
    backgroundColor: COLORS.royalAzul,
    padding: 24,
  },
  deviceHeader: {
    marginTop: 18,
    marginBottom: 24,
  },
  deviceTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 10,
  },
  deviceSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 23,
  },
  deviceList: {
    gap: 14,
  },
  deviceCard: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    padding: 18,
  },
  deviceCardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: COLORS.gold,
  },
  deviceCardTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  deviceCardTitleActive: {
    color: COLORS.pearl,
  },
  deviceCardBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 21,
  },
  deviceFooter: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
  detailScreen: {
    flex: 1,
    backgroundColor: COLORS.cloud,
  },
  detailContent: {
    padding: 20,
    gap: 16,
  },
  detailHero: {
    backgroundColor: COLORS.royalAzul,
    borderRadius: 28,
    padding: 20,
  },
  detailBackButton: {
    alignSelf: 'flex-start',
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  detailBackLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  detailTitle: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 10,
  },
  detailIntro: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  detailBody: {
    color: COLORS.slate,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
  },
  tipCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  tipBody: {
    color: COLORS.royalAzul,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
  },
  dashboardScreen: {
    flex: 1,
    backgroundColor: COLORS.cloud,
  },
  dashboardHeader: {
    backgroundColor: COLORS.royalAzul,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  dashboardTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 8,
  },
  dashboardSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  dashboardContent: {
    padding: 20,
    paddingBottom: 140,
    gap: 18,
  },
  settingsStrip: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  settingsLabel: {
    color: COLORS.slate,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  settingsToggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  settingsToggleButton: {
    flex: 1,
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: '#F0F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsToggleButtonActive: {
    backgroundColor: COLORS.royalAzul,
  },
  settingsToggleLabel: {
    color: COLORS.slate,
    fontSize: 12,
    fontWeight: '700',
  },
  settingsToggleLabelActive: {
    color: COLORS.white,
  },
  agentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  agentInputRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 10,
  },
  agentInputShell: {
    flex: 1,
    minHeight: 108,
    borderRadius: 18,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  agentInput: {
    color: COLORS.slate,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 74,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    width: 88,
    borderRadius: 18,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  analyzeButtonDisabled: {
    opacity: 0.55,
  },
  analyzeButtonLabel: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  agentHint: {
    color: 'rgba(71, 71, 71, 0.72)',
    fontSize: 13,
    lineHeight: 19,
  },
  clearConversationButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearConversationLabel: {
    color: COLORS.royalAzul,
    fontSize: 13,
    fontWeight: '700',
  },
  responseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  sectionEyebrow: {
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionTitle: {
    color: COLORS.royalAzul,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    marginBottom: 18,
  },
  responseLead: {
    color: COLORS.royalAzul,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  responseBody: {
    color: COLORS.slate,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
  },
  responseBullet: {
    color: COLORS.slate,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
    paddingLeft: 2,
  },
  responsePrompt: {
    color: COLORS.royalAzul,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
  responsePromptBullet: {
    color: COLORS.royalAzul,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    paddingLeft: 2,
  },
  analyzingLabel: {
    color: COLORS.royalAzul,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  formattedResponseWrap: {
    gap: 14,
    marginBottom: 12,
  },
  formattedResponseSection: {
    gap: 6,
  },
  formattedResponseHeader: {
    color: COLORS.royalAzul,
    fontSize: 16,
    fontWeight: '800',
  },
  agentMatchesWrap: {
    gap: 10,
    marginTop: 16,
  },
  agentMatchPill: {
    borderRadius: 18,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.1)',
    padding: 14,
  },
  agentMatchPillLabel: {
    color: COLORS.royalAzul,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  agentMatchPillText: {
    color: COLORS.slate,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  vibeSummaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  vibeSummaryText: {
    color: COLORS.slate,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 16,
  },
  logVibeButton: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#F0F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logVibeButtonLabel: {
    color: COLORS.royalAzul,
    fontSize: 15,
    fontWeight: '800',
  },
  referenceCard: {
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.07)',
  },
  referenceTitle: {
    color: COLORS.slate,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  referenceBox: {
    width: '31%',
    minHeight: 88,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 35, 102, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 10,
  },
  referenceBoxIndex: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  referenceBoxLabel: {
    color: COLORS.slate,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  askLavelleButton: {
    marginTop: 16,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  askLavelleButtonLabel: {
    color: COLORS.royalAzul,
    fontSize: 15,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '88%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 16,
  },
  journalColumns: {
    gap: 18,
  },
  journalColumn: {
    backgroundColor: '#FBFCFE',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(71, 71, 71, 0.08)',
  },
  journalColumnTitle: {
    color: COLORS.royalAzul,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  sliderBlock: {
    marginBottom: 14,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderLabel: {
    color: COLORS.slate,
    fontSize: 15,
    fontWeight: '600',
  },
  sliderValue: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: '800',
  },
  sliderScale: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#D9DFEA',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  sliderScaleFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: COLORS.gold,
  },
  sliderThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.royalAzul,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  sliderButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  sliderAdjustButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.08)',
  },
  sliderAdjustLabel: {
    color: COLORS.royalAzul,
    fontWeight: '700',
  },
  assessmentDock: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
  },
  assessmentButton: {
    minHeight: 72,
    borderRadius: 22,
    backgroundColor: COLORS.royalAzul,
    borderWidth: 1,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: COLORS.royalAzul,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  assessmentButtonLabel: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },
  assessmentButtonSubLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    marginTop: 3,
  },
});
