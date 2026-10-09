// Solar Configuration and Engineering Constants
// Updated to reflect clarified Davis Granite site figures

export interface SiteSolarConfig {
  siteName: string;
  phase: string;
  status: string;
  capacityKwp: number | { min: number; max: number };
  capacityLabel: string;
  panelCount: number | { min: number; max: number };
  panelCountLabel: string;
  panelWattage: number; // 600W
  annualGenerationMwh: number | { min: number; max: number };
  annualGenerationLabel: string;
  co2AvoidedTonnes: number | { min: number; max: number };
  co2AvoidedLabel: string;
  capexUsd: number | { min: number; max: number };
  capexLabel: string;
  landAreaHa: number | { min: number; max: number };
  landAreaLabel: string;
  description: string;
}

// 4. GLOBAL SOLAR CONSTANTS
export const BULAWAYO_CAPACITY_KWP = 220;
export const BULAWAYO_PANELS = 367;
export const BULAWAYO_ANNUAL_MWH = 411; // 220 kWp * 1,868 kWh/kWp = 410,960 kWh ≈ 411 MWh
export const BULAWAYO_DAILY_AVG_KWH = 1126; // ~1,126 kWh/day
export const BULAWAYO_CAPEX_USD = 160000; // Bulawayo solar installation price — final commercial figure
export const BULAWAYO_CO2_TONNES = 329; // 411 MWh * 0.8 tCO2/MWh = ~329 tonnes/year
export const BULAWAYO_CARBON_CREDIT_MIN_USD = 4935; // At $15/t = $4,935/yr
export const BULAWAYO_CARBON_CREDIT_MAX_USD = 9870; // At $30/t = $9,870/yr
export const BULAWAYO_DIESEL_SAVINGS_MIN_USD = 25000;
export const BULAWAYO_DIESEL_SAVINGS_MAX_USD = 40000;
export const BULAWAYO_SOLAR_ALONE_ANNUAL_USD = 29000;
export const BULAWAYO_SOLAR_ALONE_PAYBACK_YRS = 5.5; // $160,000 / $29,000 = 5.5 yrs
export const BULAWAYO_COMBINED_INVESTMENT_USD = 395000; // $160k solar + $235k automation
export const BULAWAYO_COMBINED_ANNUAL_USD = 150000; // conservative combined value
export const BULAWAYO_COMBINED_PAYBACK_YRS = 2.6; // $395,000 / $150,000 = 2.6 yrs
export const BULAWAYO_LAND_HA = 0.35;

export const HARARE_CAPACITY_KWP_MIN = 250;
export const HARARE_CAPACITY_KWP_MAX = 350;
export const HARARE_PANELS_MIN = 417;
export const HARARE_PANELS_MAX = 583;
export const HARARE_ANNUAL_MWH_MIN = 467;
export const HARARE_ANNUAL_MWH_MAX = 654;
export const HARARE_CO2_TONNES_MIN = 300;
export const HARARE_CO2_TONNES_MAX = 420;
export const HARARE_CAPEX_MIN_USD = 100000;
export const HARARE_CAPEX_MAX_USD = 140000;
export const HARARE_LAND_HA_MIN = 0.4;
export const HARARE_LAND_HA_MAX = 0.6;

export const PHASE_1_SITE = "Bulawayo";
export const PHASE_2_SITE = "Harare";
export const PHASE_3_SITE = "Marondera";

// Site-by-site structured profiles
export const SOLAR_SITES: Record<string, SiteSolarConfig> = {
  bulawayo: {
    siteName: 'Bulawayo Quarry',
    phase: 'Phase 1 — Primary Site',
    status: 'Proof of Concept',
    capacityKwp: BULAWAYO_CAPACITY_KWP,
    capacityLabel: '~220 kWp',
    panelCount: BULAWAYO_PANELS,
    panelCountLabel: '~367 panels (600W Tier-1)',
    panelWattage: 600,
    annualGenerationMwh: BULAWAYO_ANNUAL_MWH,
    annualGenerationLabel: '~411 MWh/year',
    co2AvoidedTonnes: BULAWAYO_CO2_TONNES,
    co2AvoidedLabel: '~329 tonnes/year',
    capexUsd: BULAWAYO_CAPEX_USD,
    capexLabel: '~$160,000',
    landAreaHa: BULAWAYO_LAND_HA,
    landAreaLabel: '~0.35 hectares',
    description: 'Primary deployment proving automated microgrid load-shifting, diesel avoidance, and tariff peak clipping.'
  },
  harare: {
    siteName: 'Harare Quarry',
    phase: 'Phase 2 — Expansion Site',
    status: 'Pending Bulawayo proof of concept',
    capacityKwp: { min: HARARE_CAPACITY_KWP_MIN, max: HARARE_CAPACITY_KWP_MAX },
    capacityLabel: '~250–350 kWp',
    panelCount: { min: HARARE_PANELS_MIN, max: HARARE_PANELS_MAX },
    panelCountLabel: '~417–583 panels (600W Tier-1)',
    panelWattage: 600,
    annualGenerationMwh: { min: HARARE_ANNUAL_MWH_MIN, max: HARARE_ANNUAL_MWH_MAX },
    annualGenerationLabel: '~467–654 MWh/year',
    co2AvoidedTonnes: { min: HARARE_CO2_TONNES_MIN, max: HARARE_CO2_TONNES_MAX },
    co2AvoidedLabel: '~300–420 tonnes/year',
    capexUsd: { min: HARARE_CAPEX_MIN_USD, max: HARARE_CAPEX_MAX_USD },
    capexLabel: '~$100,000–$140,000',
    landAreaHa: { min: HARARE_LAND_HA_MIN, max: HARARE_LAND_HA_MAX },
    landAreaLabel: '~0.4–0.6 hectares',
    description: 'Commercial scale expansion site across high-throughput commercial aggregate and road base crushing circuits.'
  },
  marondera: {
    siteName: 'Marondera Quarry',
    phase: 'Phase 3 — Future Site',
    status: 'Pending',
    capacityKwp: { min: 0, max: 0 },
    capacityLabel: 'TBC (Following Harare rollout)',
    panelCount: { min: 0, max: 0 },
    panelCountLabel: 'TBC after land survey',
    panelWattage: 600,
    annualGenerationMwh: { min: 0, max: 0 },
    annualGenerationLabel: 'TBC',
    co2AvoidedTonnes: { min: 0, max: 0 },
    co2AvoidedLabel: 'TBC',
    capexUsd: { min: 0, max: 0 },
    capexLabel: 'TBC',
    landAreaHa: { min: 0, max: 0 },
    landAreaLabel: 'TBC',
    description: 'Future multi-site fleet integration under central QuarryIQ command & control.'
  }
};
