export interface HourlyTelemetry {
  time: string;
  throughputTph: number;
  targetTph: number;
  solarKw: number;
  gridKw: number;
  dieselKw: number;
  costPerTon: number;
}

export interface StockpileItem {
  id: string;
  name: string;
  fraction: string;
  currentTons: number;
  maxCapacityTons: number;
  pricePerTonUSD: number;
  dailyConsumptionTons: number;
  dailyProductionTons: number;
  status: 'optimal' | 'low' | 'critical' | 'overflow';
}

export interface ScenarioResult {
  id: string;
  title: string;
  description: string;
  triggerLabel: string;
  category: 'energy' | 'logistics' | 'equipment' | 'market' | 'dispatch';
  badge: string;
  headlineSummary: string;
  impactMetrics: {
    metric: string;
    before: string;
    after: string;
    delta: string;
    trend: 'positive' | 'negative' | 'neutral';
  }[];
  automatedMitigations: string[];
  executiveTakeaway: string;
  financialImpactUSD: string;
}

export interface SafetyMetrics {
  dustOpacityMgM3: number;
  dustThresholdWarning: number;
  dustThresholdCritical: number;
  noiseDbBoundary: number;
  haulRoadMistingActive: boolean;
  blastClearanceStatus: 'cleared' | 'standby' | 'active_blasting';
  lastBlastTime: string;
  daysIncidentFree: number;
  complianceItems: {
    id: string;
    regulation: string;
    agency: string;
    status: 'Compliant' | 'Audited & Cleared' | 'Attention Required';
    lastInspected: string;
  }[];
  incidentLogs: {
    id: string;
    timestamp: string;
    severity: 'Low' | 'Medium' | 'High';
    zone: string;
    description: string;
    actionTaken: string;
  }[];
}

export interface AssetHealthItem {
  id: string;
  assetName: string;
  category: 'Crushing' | 'Screening' | 'Conveying' | 'Mobile Fleet';
  operatingHours: number;
  vibrationMmS: number;
  vibrationThreshold: number;
  temperatureC: number;
  tempThreshold: number;
  rulHours: number; // Remaining Useful Life
  healthScore: number; // 0 - 100
  failureRisk: 'Normal' | 'Moderate Warning' | 'Critical Failure Imminent';
  predictedFailureReason?: string;
  recommendedAction: string;
}

export interface MaterialBalanceNode {
  nodeId: string;
  stageName: string;
  feedRateTph: number;
  openingStockTons: number;
  minedInputTons: number;
  processedTons: number;
  closingStockTons: number;
  discrepancyTons: number;
  lossPercentage: number;
  status: 'balanced' | 'surplus' | 'shrinkage_flagged';
}

export interface EnergyTelemetry {
  currentTotalKw: number;
  solarKw: number;
  gridKw: number;
  dieselKw: number;
  solarSharePercent: number;
  energyCostPerTonAvg: number;
  gridTariffTier: 'Off-Peak ($0.08/kWh)' | 'Standard ($0.14/kWh)' | 'Peak Demand ($0.28/kWh)';
  virtualBatteryTonsBuffered: number;
  virtualBatteryKwhEquivalent: number;
  co2SavedTonnesToday: number;
  hourlyEnergyProfile: {
    hour: string;
    solarKw: number;
    gridKw: number;
    dieselKw: number;
    tariffCentsKwh: number;
  }[];
}

export interface WeighbridgeTruck {
  ticketNumber: string;
  timestamp: string;
  plateNumber: string;
  haulerCompany: string;
  productType: string;
  grossWeightKg: number;
  tareWeightKg: number;
  netWeightTons: number;
  anprMatchConfidence: number;
  rfidDriverName: string;
  axleDiscrepancyKg: number;
  status: 'Completed' | 'Weighing Active' | 'Audit Flagged';
}

export interface ReportItem {
  id: string;
  title: string;
  frequency: string;
  generatedDate: string;
  fileSize: string;
  fileType: 'PDF' | 'XLSX' | 'CSV';
  description: string;
}

// ---------------------------------------------------------------------------
// MOCK DATA EXPORTS
// ---------------------------------------------------------------------------

export const HOURLY_TELEMETRY: HourlyTelemetry[] = [
  { time: '06:00', throughputTph: 240, targetTph: 400, solarKw: 0, gridKw: 480, dieselKw: 0, costPerTon: 4.85 },
  { time: '07:00', throughputTph: 360, targetTph: 400, solarKw: 95, gridKw: 560, dieselKw: 0, costPerTon: 4.30 },
  { time: '08:00', throughputTph: 410, targetTph: 400, solarKw: 280, gridKw: 490, dieselKw: 0, costPerTon: 3.85 },
  { time: '09:00', throughputTph: 425, targetTph: 400, solarKw: 480, gridKw: 390, dieselKw: 0, costPerTon: 3.20 },
  { time: '10:00', throughputTph: 435, targetTph: 400, solarKw: 680, gridKw: 240, dieselKw: 0, costPerTon: 2.65 },
  { time: '11:00', throughputTph: 450, targetTph: 400, solarKw: 820, gridKw: 150, dieselKw: 0, costPerTon: 2.10 },
  { time: '12:00', throughputTph: 460, targetTph: 400, solarKw: 850, gridKw: 140, dieselKw: 0, costPerTon: 1.95 },
  { time: '13:00', throughputTph: 440, targetTph: 400, solarKw: 810, gridKw: 160, dieselKw: 0, costPerTon: 2.15 },
  { time: '14:00', throughputTph: 420, targetTph: 400, solarKw: 690, gridKw: 260, dieselKw: 0, costPerTon: 2.75 },
  { time: '15:00', throughputTph: 415, targetTph: 400, solarKw: 490, gridKw: 380, dieselKw: 0, costPerTon: 3.40 },
  { time: '16:00', throughputTph: 395, targetTph: 400, solarKw: 220, gridKw: 540, dieselKw: 0, costPerTon: 4.10 },
  { time: '17:00', throughputTph: 380, targetTph: 400, solarKw: 40, gridKw: 610, dieselKw: 0, costPerTon: 4.60 },
  { time: '18:00', throughputTph: 350, targetTph: 400, solarKw: 0, gridKw: 620, dieselKw: 0, costPerTon: 5.15 },
];

export const STOCKPILES: StockpileItem[] = [
  {
    id: 'sp-1',
    name: '19mm Granite Aggregate',
    fraction: '19mm (Concrete & Asphalt Spec)',
    currentTons: 14250,
    maxCapacityTons: 20000,
    pricePerTonUSD: 18.5,
    dailyConsumptionTons: 1200,
    dailyProductionTons: 1650,
    status: 'optimal',
  },
  {
    id: 'sp-2',
    name: 'G1 Sub-Base Course',
    fraction: '0-37.5mm Dense Graded',
    currentTons: 8400,
    maxCapacityTons: 15000,
    pricePerTonUSD: 12.8,
    dailyConsumptionTons: 950,
    dailyProductionTons: 800,
    status: 'optimal',
  },
  {
    id: 'sp-3',
    name: '10mm Granite Stone',
    fraction: '10mm High-Yield Aggregate',
    currentTons: 3100,
    maxCapacityTons: 12000,
    pricePerTonUSD: 22.0,
    dailyConsumptionTons: 850,
    dailyProductionTons: 400,
    status: 'low',
  },
  {
    id: 'sp-4',
    name: 'Quarry Sand & Fines',
    fraction: '0-4mm Washed Manufactured Sand',
    currentTons: 16800,
    maxCapacityTons: 18000,
    pricePerTonUSD: 9.5,
    dailyConsumptionTons: 450,
    dailyProductionTons: 1100,
    status: 'overflow',
  },
  {
    id: 'sp-5',
    name: 'Granite Dimension Blocks',
    fraction: 'Rough Monumental Blocks (Export Grade)',
    currentTons: 2250,
    maxCapacityTons: 4000,
    pricePerTonUSD: 85.0,
    dailyConsumptionTons: 80,
    dailyProductionTons: 120,
    status: 'optimal',
  },
  {
    id: 'sp-6',
    name: 'Surge Buffer Stockpile',
    fraction: 'Primary Crushed Run-of-Mine (-120mm)',
    currentTons: 11200,
    maxCapacityTons: 16000,
    pricePerTonUSD: 7.2,
    dailyConsumptionTons: 3200,
    dailyProductionTons: 3500,
    status: 'optimal',
  },
];

export const SCENARIOS: ScenarioResult[] = [
  {
    id: 'power-cut',
    title: 'Scenario 1: 4-Hour Grid Outage (Load Shedding)',
    description: 'Simulates the sudden loss of high-voltage utility power at 11:30 AM.',
    triggerLabel: 'Simulate Grid Power Outage',
    category: 'energy',
    badge: 'Critical Energy Resilience',
    headlineSummary: 'Automated 12-second islanding switched auxiliary screens to solar array; 1.2MW Tier-4 Genset kicked in exclusively for primary jaw. Zero total shutdown.',
    impactMetrics: [
      { metric: 'Crushing Plant Uptime', before: '0% (Shutdown)', after: '78.5% (Automated Island)', delta: '+78.5%', trend: 'positive' },
      { metric: 'Revenue Lost Avoided', before: '-$42,800', after: '-$4,100 (Diesel Delta)', delta: '+$38,700 Saved', trend: 'positive' },
      { metric: 'Hourly Throughput', before: '0 t/h', after: '320 t/h', delta: '-80 t/h', trend: 'neutral' },
      { metric: 'Blended Cost per Ton', before: '$14.20/t (Idling)', after: '$5.40/t', delta: '-$8.80/t', trend: 'positive' },
    ],
    automatedMitigations: [
      'Automatic PLC load shed for non-essential conveyor dust extractor belts 7 & 8',
      'Solar PV plant redirected via microgrid inverter to feed Secondary Cone CH440 directly',
      'Surge stockpile feed rate dialed down to 320 t/h to balance diesel genset peak load',
      'SMS advisory dispatched to haulage logistics queue holding incoming trucks at staging gate',
    ],
    executiveTakeaway: 'Without QuarryIQ automation, this outage would have cost $42,800 in unrecoverable fixed overhead and demurrage penalties. Automated islanding preserved $38,700.',
    financialImpactUSD: '+$38,700 Net Preserved',
  },
  {
    id: 'large-order',
    title: 'Scenario 2: Rush 50,000t Port Export Contract',
    description: 'Simulates an urgent customer demand for 50,000 tonnes of 19mm Aggregate deliverable in 9 days.',
    triggerLabel: 'Simulate 50,000t Port Rush Order',
    category: 'market',
    badge: 'Commercial Opportunity',
    headlineSummary: 'Digital Twin dynamically reschedules cone crusher Closed Side Setting (CSS) from 22mm to 18mm, boosting 19mm fraction yield from 34% to 51%.',
    impactMetrics: [
      { metric: '19mm Fraction Yield', before: '34.2%', after: '51.8%', delta: '+17.6%', trend: 'positive' },
      { metric: 'Days to Complete Order', before: '14.8 Days', after: '8.4 Days', delta: '-6.4 Days', trend: 'positive' },
      { metric: 'Expected Gross Margin', before: '$198,000', after: '$324,500', delta: '+$126,500', trend: 'positive' },
      { metric: 'Stockyard Congestion Risk', before: 'High (Fines build-up)', after: 'Low (Diverted to sand wash)', delta: 'Resolved', trend: 'positive' },
    ],
    automatedMitigations: [
      'Cone Crusher hydraulic CSS automatically adjusted by 4mm via SCADA feedback',
      'Screen deck angle adjusted to maximize separation efficiency for 19mm cut',
      'Dual-shift night haulage schedule pre-cleared with unattended weighbridge automation',
      'Rail freight dispatch manifest automatically transmitted to logistics coordinator',
    ],
    executiveTakeaway: 'Granite quarrying is all about product cut ratios. Modifying the CSS yield dynamically captures high-margin export spot premiums without capital expenditure.',
    financialImpactUSD: '+$126,500 Gross Margin',
  },
  {
    id: 'crusher-bearing',
    title: 'Scenario 3: Primary Jaw Bearing Thermal Anomaly',
    description: 'Simulates an unexpected thermal spike (+38°C) in the eccentric shaft bearing of the Metso C140 Jaw Crusher.',
    triggerLabel: 'Simulate Jaw Bearing Thermal Spike',
    category: 'equipment',
    badge: 'Catastrophic Failure Prevention',
    headlineSummary: 'AI vibration frequency analysis identified micro-spalling 140 operational hours prior to catastrophic seizure. Scheduled 45-min controlled bearing flush during lunch lull.',
    impactMetrics: [
      { metric: 'Catastrophic Downtime Risk', before: '84 Hours (Seizure)', after: '0 Hours (Controlled Flush)', delta: '-84 hrs', trend: 'positive' },
      { metric: 'Emergency Repair Bill', before: '$185,000 (New Shaft)', after: '$2,400 (Lube & Seal Flush)', delta: '-$182,600', trend: 'positive' },
      { metric: 'Production Tonnes Lost', before: '33,600 Tonnes', after: '310 Tonnes', delta: '-33,290 Tonnes saved', trend: 'positive' },
      { metric: 'Bearing Remaining Life (RUL)', before: '3.2 Hours (Crash)', after: '1,450 Hours (Restored)', delta: '+1,446.8 hrs', trend: 'positive' },
    ],
    automatedMitigations: [
      'Automated lube pump frequency raised to flush contaminated grease reservoir',
      'Vibrating grizzly feeder slowed by 15% to mitigate impact load while monitoring thermal delta',
      'Maintenance team push notification generated with exact bearing SKU and torque specs',
      'Secondary cone bypassed using 11,200t surge pile buffer with zero disruption to sales loading',
    ],
    executiveTakeaway: 'A seized main eccentric shaft paralyzes the entire pit for nearly two weeks. Catching bearing micro-spalling before catastrophic lockup saves $182,600.',
    financialImpactUSD: '+$182,600 Loss Avoided',
  },
  {
    id: 'solar-surfeit',
    title: 'Scenario 4: Solar Surfeit & "Virtual Battery" Peak',
    description: 'Simulates bright midday solar output exceeding 850 kW while grid tariff climbs to peak surcharge.',
    triggerLabel: 'Simulate 1.2MW Solar Peak & Surfeit',
    category: 'energy',
    badge: 'Virtual Battery Storage',
    headlineSummary: 'QuarryIQ accelerates primary crushing to 460 t/h during free solar hours, depositing 1,400 surplus tons into the surge pile to feed downstream night screens.',
    impactMetrics: [
      { metric: 'Effective Solar Self-Consumption', before: '68.4%', after: '99.2%', delta: '+30.8%', trend: 'positive' },
      { metric: 'Virtual Battery Energy Stored', before: '0 kWh', after: '4,368 kWh equiv.', delta: '+4,368 kWh', trend: 'positive' },
      { metric: 'Avoided Chemical Battery Cost', before: '$1.4M (Tesla Megapack)', after: '$0 (Rock Surge Storage)', delta: '-$1.4M Capex', trend: 'positive' },
      { metric: 'Afternoon Energy Bill', before: '$1,850/day', after: '$410/day', delta: '-77.8%', trend: 'positive' },
    ],
    automatedMitigations: [
      'Primary jaw crusher feed ramped to 110% of nominal rating to convert free solar into crushed rock mass',
      'Surge conveyor CV-02 speed increased to handle surge pile volumetric mound build-up',
      'Downstream dry classifiers switched on to prepare road sub-base ahead of 16:00 grid tariff spike',
      'Compressor stations and water pumps cycled to utilize excess PV inverter clipping',
    ],
    executiveTakeaway: 'Crushed rock in a surge stockpile is kinetic energy stored without expensive lithium degradation. We store energy as broken rock.',
    financialImpactUSD: '$3,800 Daily Opex Trim',
  },
  {
    id: 'diesel-spike',
    title: 'Scenario 5: 35% Diesel Price Spike & Haul Cycle Optimization',
    description: 'Simulates sudden global crude fuel surge impacting CAT 775G haul truck fleet economics.',
    triggerLabel: 'Simulate 35% Diesel Price Spike',
    category: 'logistics',
    badge: 'Fleet Telematics Optimization',
    headlineSummary: 'Fleet telematics adjusts pit loading spots by 80 meters, reducing average haul road grade by 2.2% and eliminating 4.1 minutes of loader queue idling.',
    impactMetrics: [
      { metric: 'Diesel Burn per Haul Cycle', before: '14.8 Liters', after: '10.9 Liters', delta: '-26.3%', trend: 'positive' },
      { metric: 'Loader Queue Idle Time', before: '6.4 mins/cycle', after: '0.8 mins/cycle', delta: '-87.5%', trend: 'positive' },
      { metric: 'Monthly Diesel Expenditure', before: '$112,000', after: '$88,400', delta: '-$23,600/mo', trend: 'positive' },
      { metric: 'Haul Fleet Turnaround Rate', before: '4.2 cycles/hr', after: '5.1 cycles/hr', delta: '+21.4%', trend: 'positive' },
    ],
    automatedMitigations: [
      'Telematics dispatch routes CAT 775G trucks through optimized bench access ramp',
      'CAT 988K wheel loader payload scale auto-calibrates 3-pass loading to hit 62.5t legal payload target',
      'Strict automated engine shut-off alert after 90 seconds idle in the dump hopper queue',
      'Haul road grade profiling flagged for grader maintenance to minimize rolling resistance',
    ],
    executiveTakeaway: 'Haul trucks burn the majority of mobile diesel. Eliminating ramp gradients and queue idle counteracts fuel inflation completely.',
    financialImpactUSD: '+$23,600 Monthly Savings',
  },
];

export const SAFETY_DATA: SafetyMetrics = {
  dustOpacityMgM3: 22.4,
  dustThresholdWarning: 40.0,
  dustThresholdCritical: 50.0,
  noiseDbBoundary: 68.5,
  haulRoadMistingActive: true,
  blastClearanceStatus: 'cleared',
  lastBlastTime: 'Today at 05:45 AM (Bench 3)',
  daysIncidentFree: 412,
  complianceItems: [
    {
      id: 'c-1',
      regulation: 'Mines Safety & Dust Particulate PM10/PM2.5 Standard',
      agency: 'Dept of Mineral Resources & Environment',
      status: 'Compliant',
      lastInspected: '2026-09-18 (Audited & Cleared)',
    },
    {
      id: 'c-2',
      regulation: 'Ground Vibration & Air Overpressure Blasting Limits',
      agency: 'Seismic Geological Bureau',
      status: 'Compliant',
      lastInspected: '2026-10-01 (Peak 4.8 mm/s vs 10 mm/s limit)',
    },
    {
      id: 'c-3',
      regulation: 'Conveyor Emergency Pull-Wire & Nip-Point Guarding ISO 12100',
      agency: 'Occupational Safety Inspectorate',
      status: 'Compliant',
      lastInspected: '2026-09-29 (100% Interlock Verified)',
    },
    {
      id: 'c-4',
      regulation: 'Stormwater Runoff & Settling Silt Pond pH Quality',
      agency: 'Water Affairs Directorate',
      status: 'Audited & Cleared',
      lastInspected: '2026-09-25 (Turbidity <25 NTU, pH 7.4)',
    },
    {
      id: 'c-5',
      regulation: 'Pit Wall Slope Stability Geotechnical Radar Scan',
      agency: 'Geotechnical Structural Audit',
      status: 'Compliant',
      lastInspected: '2026-10-03 (Zero bench displacement detected)',
    },
  ],
  incidentLogs: [
    {
      id: 'inc-101',
      timestamp: 'Today 09:14 AM',
      severity: 'Low',
      zone: 'Haul Road Junction 2',
      description: 'Misting cannon water booster pressure dipped to 2.2 bar due to sediment trap debris.',
      actionTaken: 'Automated solenoid back-flush executed; misting density restored to 100% within 4 mins.',
    },
    {
      id: 'inc-102',
      timestamp: 'Yesterday 14:32 PM',
      severity: 'Low',
      zone: 'Primary Feeder Hopper',
      description: 'Oversize boulder (>1.1m) triggered sonic sensor interlock on rock breaker arm.',
      actionTaken: 'Hydraulic boom breaker operator deployed in 60s; boulder fragmented without chute hangup.',
    },
    {
      id: 'inc-103',
      timestamp: '3 Days Ago 11:20 AM',
      severity: 'Medium',
      zone: 'Conveyor CV-03 Screen Feed',
      description: 'Belt wander limit switch triggered momentarily due to off-center feed loading.',
      actionTaken: 'Auto-centering pneumatic idler cradle realigned belt; zero spillage or belt edge wear.',
    },
    {
      id: 'inc-104',
      timestamp: '8 Days Ago 06:10 AM',
      severity: 'Low',
      zone: 'Bench 4 North Face',
      description: 'Exclusion zone proximity sensor flagged unverified utility bakkie near pre-blast perimeter.',
      actionTaken: 'Radio supervisor dispatched; vehicle redirected to muster point prior to primer insertion.',
    },
  ],
};

export const ASSET_HEALTH: AssetHealthItem[] = [
  {
    id: 'ast-01',
    assetName: 'Primary Jaw Crusher (Metso C140)',
    category: 'Crushing',
    operatingHours: 6420,
    vibrationMmS: 3.8,
    vibrationThreshold: 6.5,
    temperatureC: 62.4,
    tempThreshold: 85.0,
    rulHours: 1840,
    healthScore: 92,
    failureRisk: 'Normal',
    recommendedAction: 'Grease reservoir refill due in 180 operating hours. Jaw liner wear 42%.',
  },
  {
    id: 'ast-02',
    assetName: 'Secondary Cone Crusher (Sandvik CH440)',
    category: 'Crushing',
    operatingHours: 8190,
    vibrationMmS: 5.6,
    vibrationThreshold: 6.8,
    temperatureC: 78.9,
    tempThreshold: 82.0,
    rulHours: 320,
    healthScore: 71,
    failureRisk: 'Moderate Warning',
    predictedFailureReason: 'Eccentric bushing clearance widening; hydraulic pressure delta rising +1.2 bar.',
    recommendedAction: 'Schedule liner inspection and bushing wear ring rotation during Saturday maintenance shift.',
  },
  {
    id: 'ast-03',
    assetName: 'Triple-Deck Inclined Screen SC-01',
    category: 'Screening',
    operatingHours: 5410,
    vibrationMmS: 4.1,
    vibrationThreshold: 7.0,
    temperatureC: 51.0,
    tempThreshold: 75.0,
    rulHours: 1200,
    healthScore: 88,
    failureRisk: 'Normal',
    recommendedAction: 'Bottom deck polyurethane mesh 10mm tension check scheduled for next shift changeover.',
  },
  {
    id: 'ast-04',
    assetName: 'Main Overland Surge Conveyor CV-02',
    category: 'Conveying',
    operatingHours: 11200,
    vibrationMmS: 6.2,
    vibrationThreshold: 6.0,
    temperatureC: 84.1,
    tempThreshold: 80.0,
    rulHours: 72,
    healthScore: 49,
    failureRisk: 'Critical Failure Imminent',
    predictedFailureReason: 'Tail pulley pillow block bearing non-drive end thermal runaway detected.',
    recommendedAction: 'Replace 22218 spherical roller bearing immediately. 45-minute swap kit staged at station.',
  },
  {
    id: 'ast-05',
    assetName: 'CAT 988K Heavy Wheel Loader #01',
    category: 'Mobile Fleet',
    operatingHours: 9450,
    vibrationMmS: 2.9,
    vibrationThreshold: 5.5,
    temperatureC: 72.0,
    tempThreshold: 90.0,
    rulHours: 2400,
    healthScore: 94,
    failureRisk: 'Normal',
    recommendedAction: 'Bucket cutting edge flipped last week. Hydraulic oil viscosity within OEM spec.',
  },
  {
    id: 'ast-06',
    assetName: 'CAT 775G Rigid Haul Dump Truck #03',
    category: 'Mobile Fleet',
    operatingHours: 12800,
    vibrationMmS: 4.4,
    vibrationThreshold: 6.0,
    temperatureC: 79.5,
    tempThreshold: 88.0,
    rulHours: 850,
    healthScore: 82,
    failureRisk: 'Normal',
    recommendedAction: 'Left front strut nitrogen pressure checked. Transmission fluid sampling scheduled in 50 hrs.',
  },
];

export const DIGITAL_TWIN_NODES: MaterialBalanceNode[] = [
  {
    nodeId: 'n1',
    stageName: 'Pit Blasting & Extraction',
    feedRateTph: 450,
    openingStockTons: 65000,
    minedInputTons: 5400,
    processedTons: 5200,
    closingStockTons: 65200,
    discrepancyTons: -20,
    lossPercentage: 0.37,
    status: 'balanced',
  },
  {
    nodeId: 'n2',
    stageName: 'Primary Jaw Crushing (ROM)',
    feedRateTph: 420,
    openingStockTons: 3200,
    minedInputTons: 5200,
    processedTons: 5120,
    closingStockTons: 3280,
    discrepancyTons: +12,
    lossPercentage: 0.23,
    status: 'balanced',
  },
  {
    nodeId: 'n3',
    stageName: 'Surge Buffer Stockpile (-120mm)',
    feedRateTph: 420,
    openingStockTons: 10800,
    minedInputTons: 5120,
    processedTons: 4720,
    closingStockTons: 11200,
    discrepancyTons: 0,
    lossPercentage: 0.0,
    status: 'balanced',
  },
  {
    nodeId: 'n4',
    stageName: 'Secondary Cone & Screen Classifiers',
    feedRateTph: 395,
    openingStockTons: 1800,
    minedInputTons: 4720,
    processedTons: 4680,
    closingStockTons: 1840,
    discrepancyTons: -35,
    lossPercentage: 0.74,
    status: 'balanced',
  },
  {
    nodeId: 'n5',
    stageName: 'Finished Product Stockyards (Aggregate & G1)',
    feedRateTph: 380,
    openingStockTons: 42500,
    minedInputTons: 4680,
    processedTons: 4320,
    closingStockTons: 42860,
    discrepancyTons: -42,
    lossPercentage: 0.89,
    status: 'balanced',
  },
  {
    nodeId: 'n6',
    stageName: 'Weighbridge Dispatch to Rail & Road',
    feedRateTph: 360,
    openingStockTons: 0,
    minedInputTons: 4320,
    processedTons: 4305,
    closingStockTons: 0,
    discrepancyTons: -15,
    lossPercentage: 0.35,
    status: 'balanced',
  },
];

export const ENERGY_DATA: EnergyTelemetry = {
  currentTotalKw: 980,
  solarKw: 680,
  gridKw: 300,
  dieselKw: 0,
  solarSharePercent: 69.4,
  energyCostPerTonAvg: 2.84,
  gridTariffTier: 'Standard ($0.14/kWh)',
  virtualBatteryTonsBuffered: 11200,
  virtualBatteryKwhEquivalent: 34944,
  co2SavedTonnesToday: 18.6,
  hourlyEnergyProfile: [
    { hour: '06:00', solarKw: 0, gridKw: 480, dieselKw: 0, tariffCentsKwh: 8.5 },
    { hour: '07:00', solarKw: 95, gridKw: 560, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '08:00', solarKw: 280, gridKw: 490, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '09:00', solarKw: 480, gridKw: 390, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '10:00', solarKw: 680, gridKw: 240, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '11:00', solarKw: 820, gridKw: 150, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '12:00', solarKw: 850, gridKw: 140, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '13:00', solarKw: 810, gridKw: 160, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '14:00', solarKw: 690, gridKw: 260, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '15:00', solarKw: 490, gridKw: 380, dieselKw: 0, tariffCentsKwh: 14.0 },
    { hour: '16:00', solarKw: 220, gridKw: 540, dieselKw: 0, tariffCentsKwh: 28.5 },
    { hour: '17:00', solarKw: 40, gridKw: 610, dieselKw: 0, tariffCentsKwh: 28.5 },
    { hour: '18:00', solarKw: 0, gridKw: 620, dieselKw: 0, tariffCentsKwh: 28.5 },
  ],
};

export const WEIGHBRIDGE_TRUCKS: WeighbridgeTruck[] = [
  {
    ticketNumber: 'WB-2026-9812',
    timestamp: '18:14:22',
    plateNumber: 'GP 442-890',
    haulerCompany: 'Trans-Cor Haulage Logistics',
    productType: '19mm Granite Aggregate',
    grossWeightKg: 49840,
    tareWeightKg: 15200,
    netWeightTons: 34.64,
    anprMatchConfidence: 99.4,
    rfidDriverName: 'Sipho Ndlovu (Tag #8812)',
    axleDiscrepancyKg: 80,
    status: 'Completed',
  },
  {
    ticketNumber: 'WB-2026-9813',
    timestamp: '18:18:05',
    plateNumber: 'NW 912-401',
    haulerCompany: 'Bokone Infrastructure Logistics',
    productType: 'G1 Sub-Base Dense Course',
    grossWeightKg: 52100,
    tareWeightKg: 16120,
    netWeightTons: 35.98,
    anprMatchConfidence: 98.7,
    rfidDriverName: 'Jan Van Der Merwe (Tag #4902)',
    axleDiscrepancyKg: 120,
    status: 'Completed',
  },
  {
    ticketNumber: 'WB-2026-9814',
    timestamp: '18:21:40',
    plateNumber: 'CA 788-319',
    haulerCompany: 'Cape Rail Feeder Bulk Transport',
    productType: '10mm Granite Stone',
    grossWeightKg: 48900,
    tareWeightKg: 14950,
    netWeightTons: 33.95,
    anprMatchConfidence: 99.1,
    rfidDriverName: 'Michael Khumalo (Tag #1109)',
    axleDiscrepancyKg: 60,
    status: 'Completed',
  },
  {
    ticketNumber: 'WB-2026-9815',
    timestamp: '18:24:50',
    plateNumber: 'FS 310-994',
    haulerCompany: 'Freestate Highway Asphalt Mixers',
    productType: '19mm Granite Aggregate',
    grossWeightKg: 54600,
    tareWeightKg: 15300,
    netWeightTons: 39.30,
    anprMatchConfidence: 97.2,
    rfidDriverName: 'David Sithole (Tag #7731)',
    axleDiscrepancyKg: 490,
    status: 'Audit Flagged',
  },
  {
    ticketNumber: 'WB-2026-9816',
    timestamp: 'Live In-Position',
    plateNumber: 'GP 602-551',
    haulerCompany: 'AfriCrete ReadyMix Concrete',
    productType: 'Washed Quarry Manufactured Sand',
    grossWeightKg: 50420,
    tareWeightKg: 15100,
    netWeightTons: 35.32,
    anprMatchConfidence: 99.8,
    rfidDriverName: 'Kenneth Mthembu (Tag #9021)',
    axleDiscrepancyKg: 40,
    status: 'Weighing Active',
  },
];

export const EXECUTIVE_REPORTS: ReportItem[] = [
  {
    id: 'rep-01',
    title: 'Daily Managing Director Production & Yield Audit',
    frequency: 'Daily (Auto-generated 05:45 AM)',
    generatedDate: '2026-10-04',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    description: 'Executive rock-to-revenue reconciliation, blended cost per ton breakdown, and customer dispatch receipts.',
  },
  {
    id: 'rep-02',
    title: 'Plant Mass Balance & Stockpile Shrinkage Variance',
    frequency: 'Weekly (Every Sunday 23:00)',
    generatedDate: '2026-09-28',
    fileSize: '1.8 MB',
    fileType: 'XLSX',
    description: 'Digital Twin closing stock reconciliation, LiDAR drone survey comparisons, and crushing line yield percentages.',
  },
  {
    id: 'rep-03',
    title: 'Solar PV & Grid Virtual Battery Peak Arbitrage Ledger',
    frequency: 'Monthly',
    generatedDate: '2026-10-01',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    description: 'Quantified electricity tariff avoidance, solar self-consumption efficiency, and diesel genset run-hours.',
  },
  {
    id: 'rep-04',
    title: 'Mines Health, Safety & Ambient Dust Opacity Compliance',
    frequency: 'Bi-Weekly Statutory',
    generatedDate: '2026-10-02',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    description: 'PM10 particulate monitoring logs, boundary noise decibel certificates, and water misting availability stats.',
  },
  {
    id: 'rep-05',
    title: 'Predictive Maintenance & Asset Health Degradation Index',
    frequency: 'Weekly Maintenance Shift',
    generatedDate: '2026-10-03',
    fileSize: '890 KB',
    fileType: 'CSV',
    description: 'Bearing vibration spectral analysis, oil thermal trending, and liner wear Remaining Useful Life (RUL).',
  },
];

export const WHATSAPP_SUMMARY = {
  date: 'Sunday, 4 Oct 2026',
  time: '06:00 AM',
  recipient: 'Managing Director (Executive Phone)',
  tonnageProducedYesterday: '5,180 tonnes',
  targetTonnage: '5,000 tonnes (+3.6% over quota)',
  dailyRevenueRealized: '$86,450',
  blendedCostPerTon: '$3.94 / ton (Budget $4.25)',
  solarEnergyContribution: '64.2% of daytime power',
  safetyStatus: '100% Green (Zero incidents, 412 days safe)',
  keyAlert: 'Conveyor CV-02 tail pulley bearing flagged for 45-min swap during 12:30 lunch changeover.',
  mdActionRequired: 'Sign off rail dispatch allocation for 50k port contract by 10:00 AM.',
};
