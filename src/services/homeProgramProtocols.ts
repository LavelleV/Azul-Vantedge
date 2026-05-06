export const HOME_DEVICE_NAME = 'HoweRT Micro-Sport Home';

export const HOME_PROTOCOL_DISCLAIMER =
  'All protocol names are descriptive and do not imply treatment, diagnosis, or efficacy. Use the device manual and professional guidance when appropriate.';

export type HomeProtocolCategory =
  | 'Pain / Spine'
  | 'Injury / Trauma'
  | 'Arthritis / Joint'
  | 'Stress / Nervous System'
  | 'Female Health'
  | 'Post-Op / Support'
  | 'Wellness'
  | 'Immune / Illness'
  | 'Night Programs'
  | 'Male Health';

export type HomeProgramProtocol = {
  line: number;
  code: string;
  name: string;
  time: string;
  category: HomeProtocolCategory;
  deviceType: 'home';
  source: 'HoweRT Micro-Sport Home Programs reference card';
};

const source = 'HoweRT Micro-Sport Home Programs reference card' as const;

function protocol(
  line: number,
  code: string,
  name: string,
  time: string,
  category: HomeProtocolCategory
): HomeProgramProtocol {
  return { line, code, name, time, category, deviceType: 'home', source };
}

export const HOME_PROGRAM_PROTOCOLS: HomeProgramProtocol[] = [
  protocol(1, 'Pn1', 'Spine Complete', '49m', 'Pain / Spine'),
  protocol(2, 'Pn2', 'Spine Short', '26m', 'Pain / Spine'),
  protocol(3, 'Pn3', 'Fibro/Body Pn', '1h,25m', 'Pain / Spine'),
  protocol(4, 'Pn4', 'Whip', '50m', 'Pain / Spine'),
  protocol(5, 'Pn5', 'Whip Short', '30m', 'Pain / Spine'),
  protocol(6, 'Pn6', 'Spine Disc Inj Ac', '53m', 'Pain / Spine'),
  protocol(7, 'Pn7', 'Neck Pain', '50m', 'Pain / Spine'),
  protocol(8, 'Pn8', 'Spine Chronic', '47m', 'Pain / Spine'),
  protocol(9, 'Pn9', 'Nerve Complete', '50m', 'Pain / Spine'),
  protocol(10, 'Pn10', 'Spine w Stenosis', '1h,14m', 'Pain / Spine'),
  protocol(11, 'Pn11', 'Nerve Trxn Stinger', '26m', 'Pain / Spine'),
  protocol(12, 'Pn12', 'Neuro Atrophy', '32m', 'Pain / Spine'),
  protocol(13, 'Pn13', 'Spine Arthritis', '40m', 'Pain / Spine'),
  protocol(14, 'Pn14', 'Scolio Basics', '55m', 'Pain / Spine'),
  protocol(15, 'Pn15', 'Spine Align', '42m', 'Pain / Spine'),
  protocol(16, 'Pn16', 'SI & Facet Pn', '34m', 'Pain / Spine'),
  protocol(17, 'Inj1', 'Trauma Basics', '1hr,13m', 'Injury / Trauma'),
  protocol(18, 'Inj2', 'Sprains & Jnt', '41m', 'Injury / Trauma'),
  protocol(19, 'Inj3', 'Joint Swell', '50m', 'Injury / Trauma'),
  protocol(20, 'Inj4', 'Musc Strain/Inj', '44m', 'Injury / Trauma'),
  protocol(21, 'Inj5', 'Fascia "Heal"', '35m x 4', 'Injury / Trauma'),
  protocol(22, 'Inj6', 'Bruise', '15m', 'Injury / Trauma'),
  protocol(23, 'Inj7', 'Quick Jnt/Gen Pn', '15m', 'Injury / Trauma'),
  protocol(24, 'Inj8', 'Quick Pn Nerve', '15m', 'Injury / Trauma'),
  protocol(25, 'Inj9', 'Cartilage/Meniscus', '30m', 'Injury / Trauma'),
  protocol(26, 'Inj10', 'Tendon Injury', '27m', 'Injury / Trauma'),
  protocol(27, 'Inj11', 'Bursa/Bkr Cyst', '40m', 'Injury / Trauma'),
  protocol(28, 'Inj12', 'Bone Fx', '47m', 'Injury / Trauma'),
  protocol(29, 'Inj13', 'Bone Bruise', '32m', 'Injury / Trauma'),
  protocol(30, 'Inj14', 'Bone Pain', '25m', 'Injury / Trauma'),
  protocol(31, 'Inj15', 'Bone Spur Pain', '18m', 'Injury / Trauma'),
  protocol(32, 'Inj16', 'Head Conc Short', '53m', 'Injury / Trauma'),
  protocol(33, 'Inj17', 'Skin Wound Hl', '37m', 'Injury / Trauma'),
  protocol(34, 'Inj18', 'Skin Sun', '20m', 'Injury / Trauma'),
  protocol(35, 'A1', 'Arth Pn', '43m', 'Arthritis / Joint'),
  protocol(36, 'A2', 'Auto Imm Reboot', '41m', 'Arthritis / Joint'),
  protocol(37, 'A3', 'Tendon Release', '20m', 'Arthritis / Joint'),
  protocol(38, 'A4', 'Jnt Stiffness', '22m', 'Arthritis / Joint'),
  protocol(39, 'A5', 'Nrv Pn Diab', '50m', 'Arthritis / Joint'),
  protocol(40, 'A6', 'Arth w Injury', '59m', 'Arthritis / Joint'),
  protocol(41, 'A7', 'Arth Spurs', '56m', 'Arthritis / Joint'),
  protocol(42, 'A8', 'Stiff Musc/Tiss', '1hr', 'Arthritis / Joint'),
  protocol(43, 'A9', 'Jnt Pn Stiff Gout', '26m', 'Arthritis / Joint'),
  protocol(44, 'A10', 'Gout Chr', '39m', 'Arthritis / Joint'),
  protocol(45, 'Str1', 'Attn/Focus', '38m', 'Stress / Nervous System'),
  protocol(46, 'Str2', 'Stress & Nrv Reset', '50m', 'Stress / Nervous System'),
  protocol(47, 'Str3', 'Anx', '32m', 'Stress / Nervous System'),
  protocol(48, 'Str4', 'Dp Brn Reset', '1hr,30m', 'Stress / Nervous System'),
  protocol(49, 'Str5', 'Depr', '39m', 'Stress / Nervous System'),
  protocol(50, 'Str6', 'Calm/Rest', '23m', 'Stress / Nervous System'),
  protocol(51, 'Str7', 'Trauma Sev-Emot', '1hr,37m', 'Stress / Nervous System'),
  protocol(52, 'Fem1', 'Menstrual Cramps', '22m', 'Female Health'),
  protocol(53, 'Fem2', 'Men Hvy Bld', '57m', 'Female Health'),
  protocol(54, 'Fem3', 'Bloat', '49m', 'Female Health'),
  protocol(55, 'Fem4', 'Breast Health', '55m', 'Female Health'),
  protocol(56, 'PO1', 'Jnt Run First', '54m', 'Post-Op / Support'),
  protocol(57, 'PO2', 'Organ Run First', '1hr,5m', 'Post-Op / Support'),
  protocol(58, 'PO3', 'Nerv Sys Reset', '50m', 'Post-Op / Support'),
  protocol(59, 'PO4', 'Detox Support', '49m', 'Post-Op / Support'),
  protocol(60, 'PO5', 'Lymph & Swell', '38m', 'Post-Op / Support'),
  protocol(61, 'PO6', 'Tox/Anesth', '33m', 'Post-Op / Support'),
  protocol(62, 'PO7', 'Post Op Constip', '34m', 'Post-Op / Support'),
  protocol(63, 'PO8', 'Nrv Post Op Numb', '34m', 'Post-Op / Support'),
  protocol(64, 'Well1', 'CNS Wellness', '31m', 'Wellness'),
  protocol(65, 'Well2', 'GI Distress', '1hr,24m', 'Wellness'),
  protocol(66, 'Well3', 'Phys Stress', '45m', 'Wellness'),
  protocol(67, 'Well4', 'Sleep', '40m', 'Wellness'),
  protocol(68, 'Well5', 'Ins Reset-Fat', '25m', 'Wellness'),
  protocol(69, 'Well6', 'Sinus Allergy', '1hr,5m', 'Wellness'),
  protocol(70, 'Well7', 'Gen Inflam', '43m', 'Wellness'),
  protocol(71, 'Well8', 'Skin Wrinkles', '28m', 'Wellness'),
  protocol(72, 'Well9', 'Skin Acne', '30m', 'Wellness'),
  protocol(73, 'Well10', 'Kid Stne Pn', '47m', 'Wellness'),
  protocol(74, 'Well11', 'Liver Health', '33m', 'Wellness'),
  protocol(75, 'Well12', 'Colon', '1hr,24m', 'Wellness'),
  protocol(76, 'Well13', 'Const Bowel', '32m', 'Wellness'),
  protocol(77, 'I1', 'Imm Supp', '43m', 'Immune / Illness'),
  protocol(78, 'I2', 'Stomach Par/Vir', '1hr,4m', 'Immune / Illness'),
  protocol(79, 'I3', 'Candida/Fung', '32m', 'Immune / Illness'),
  protocol(80, 'I4', 'Cold Vir Chest', '47m', 'Immune / Illness'),
  protocol(81, 'I5', 'Fvr', '17m', 'Immune / Illness'),
  protocol(82, 'I6', 'Influ Fvr', '1hr,10m', 'Immune / Illness'),
  protocol(83, 'I7', 'Virus', '30m x 4', 'Immune / Illness'),
  protocol(84, 'I8', 'Infl Full Bod', '1hr,4m', 'Immune / Illness'),
  protocol(85, 'I9', 'Skin Cellulite Pn', '16m', 'Immune / Illness'),
  protocol(86, 'I10', 'Sinus Inf', '44m', 'Immune / Illness'),
  protocol(87, 'I11', 'Pneumo', '1hr,4m', 'Immune / Illness'),
  protocol(88, 'I12', 'Lung Asth', '30m', 'Immune / Illness'),
  protocol(89, 'I13', 'Skin All & Body Hist', '1hr', 'Immune / Illness'),
  protocol(90, 'Night1', 'Jnt & Sprn', '2hr,26m', 'Night Programs'),
  protocol(91, 'Night2', 'Fx & Bone Inj', '3hr,14m', 'Night Programs'),
  protocol(92, 'Night3', 'Anti Aging', '4hr', 'Night Programs'),
  protocol(93, 'Night4', 'PC Inflam Reset', '3hr,30m', 'Night Programs'),
  protocol(94, 'Night5', 'Disc-Super Disc Long', '80m x 2', 'Night Programs'),
  protocol(95, 'Male1', 'Pros Health (opt)', '34m', 'Male Health'),
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function getHomeProtocolByLine(lineNumber: number) {
  return HOME_PROGRAM_PROTOCOLS.find((protocol) => protocol.line === lineNumber);
}

export function getHomeProtocolByCode(code: string) {
  const normalizedCode = normalize(code);
  return HOME_PROGRAM_PROTOCOLS.find((protocol) => normalize(protocol.code) === normalizedCode);
}

export function searchHomeProtocols(query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return HOME_PROGRAM_PROTOCOLS;
  }

  return HOME_PROGRAM_PROTOCOLS.filter((protocol) => {
    const searchable = normalize(`${protocol.line} ${protocol.code} ${protocol.name} ${protocol.time} ${protocol.category}`);
    return searchable.includes(normalizedQuery);
  });
}

export function getHomeProtocolsByCategory(category: HomeProtocolCategory) {
  return HOME_PROGRAM_PROTOCOLS.filter((protocol) => protocol.category === category);
}
