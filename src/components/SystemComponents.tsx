import React, { useState } from 'react';
import {
  CircuitBoard,
  Cpu,
  Camera,
  Activity,
  Radio,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowRight,
  ArrowDown,
  Wifi,
  Lock,
  Server,
  Zap,
  HardDrive,
  Eye,
  Sliders,
  Wind,
  Droplets,
  Scale,
  Maximize2,
  Info,
  MapPin,
  RefreshCw,
  ExternalLink,
  Terminal,
  HelpCircle,
  Clock,
  Send
} from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  category: 'sensors' | 'cameras' | 'controllers' | 'mounting';
  categoryLabel: string;
  type: string;
  model: string;
  quantity: string;
  location: string;
  protocol: string;
  function: string;
  mounting: string;
  interactions: string;
  status: 'Online' | 'Calibrated' | 'Standby' | 'Active';
}

const EQUIPMENT_INVENTORY: EquipmentItem[] = [
  {
    id: 'belt-scales',
    name: 'Belt Scale BS1-BS4',
    category: 'sensors',
    categoryLabel: 'Weight & Mass Sensor',
    type: 'Dual-Idler Continuous Belt Weightometer Assembly',
    model: 'Thermo Ramsey Series 14 / Ramsey Micro-Tech 9101',
    quantity: '4 Systems (BS1, BS2, BS3, BS4)',
    location: 'Conveyors CV-01 (Primary Jaw discharge), CV-02 (Screen feed), CV-04 (Sand plant feed), CV-07 (Overland loadout)',
    protocol: 'Modbus RTU / RS-485 & Isolated 4-20mA to Siemens S7-1500 PLC',
    function: 'Continuous dynamic mass flow rate measurement (TPH) and cumulative tonnage counter with certified ±0.25% fiscal accuracy across operational belt load range (20% to 120%).',
    mounting: 'Pivoting dual-idler weighbridge bolted directly into conveyor structural channel stringers; dynamically leveled with precision shims.',
    interactions: 'Excited by 8x Vishay load cells, synchronized with trailing speed wheel pulses; outputs instantaneous TPH and tonnage pulses to S7-1500 PLC & Edge AI for mass balance audit.',
    status: 'Online'
  },
  {
    id: 'load-cells',
    name: 'Load Cells (8 units)',
    category: 'sensors',
    categoryLabel: 'Strain Gauge Transducer',
    type: 'Precision Hermetic Shear Beam Stainless Steel Load Cell',
    model: 'Vishay Sensortronics 65023A / Zemic H8C-C3-1.0T (IP68 hermetic weld)',
    quantity: '8 Units (2 load cells per belt scale weighbridge)',
    location: 'Installed in pairs under weighbridge idler carriages on BS1, BS2, BS3, and BS4',
    protocol: 'Analog differential mV/V bridge excitation (10V DC) via shielded 6-core polyurethane cable',
    function: 'Converts physical downward gravitational load of granite stream into micro-volt electrical differential signal with zero creep and internal temperature compensation (-20°C to +70°C).',
    mounting: 'Stainless steel self-aligning spherical bearing pivot mounts with integral anti-uplift overload stops and mechanical transport lockout bolts.',
    interactions: 'Directly wired to local Ramsey Micro-Tech 9101 digital integrator summing junction box; calibrated against physical test weights and NIST roller chain.',
    status: 'Calibrated'
  },
  {
    id: 'speed-sensors',
    name: 'Speed Sensors (4 units)',
    category: 'sensors',
    categoryLabel: 'Velocity Encoder',
    type: 'Digital Trailing-Arm Optical Belt Speed Sensor',
    model: 'Ramsey 60-12 Heavy-Duty Digital Belt Speed Sensor',
    quantity: '4 Units (1 per belt scale line)',
    location: 'Mounted under non-driven return belt / tail pulley on CV-01, CV-02, CV-04, and CV-07',
    protocol: '24V DC Digital PNP High-Speed Pulse Train (kHz) to Integrator & S7-1500 High-Speed Counter (HSC)',
    function: 'Continuously reads actual linear conveyor belt speed (0.1 to 4.5 m/s); provides instantaneous conveyor slip detection, motor belt trip protection, and zero-speed stalling alerts.',
    mounting: 'Cast-iron trailing-arm swivel assembly riding directly against clean inside surface of return belt with sealed double-row ball bearings.',
    interactions: 'Feeds high-speed pulse train into Belt Scale Integrator for mass rate calculation (kg/m × m/s = kg/s); also wired into PLC emergency safety trip circuit.',
    status: 'Active'
  },
  {
    id: 'integrators',
    name: 'Belt Scale Integrators (4 units)',
    category: 'controllers',
    categoryLabel: 'Signal Digitizer & Totalizer',
    type: 'Microprocessor Digital Integrator & Batch Controller',
    model: 'Thermo Fisher Ramsey Micro-Tech 9101 Field Integrator',
    quantity: '4 Units',
    location: 'NEMA 4X / IP66 local field junction panels adjacent to conveyor maintenance walkways',
    protocol: 'Modbus RTU / RS-485 2-wire serial + 4-20mA analog rate + dry alarm relay contacts',
    function: 'Performs 100 Hz high-speed analog-to-digital signal conversion, load cell bridge summing, tare drift compensation, automatic zero tracking, and calibration routine management.',
    mounting: 'Stainless steel wall-mount enclosure affixed to conveyor vertical stanchion with neoprene vibration dampers.',
    interactions: 'Aggregates mV signals from 2x load cells and pulses from speed sensor; outputs formatted Modbus registers directly to Siemens S7-1500 PLC rack over shielded Belden 9841 cable.',
    status: 'Online'
  },
  {
    id: 'ai-cameras',
    name: 'AI Cameras CAM-01, 02, 03',
    category: 'cameras',
    categoryLabel: 'Optical 3D Vision',
    type: 'Rugged Industrial 4K Stereoscopic Vision Camera',
    model: 'Basler blaze-101 3D Time-of-Flight & Hikrobot MV-CS200-10GM 4K GigE Industrial Vision',
    quantity: '3 Cameras (CAM-01: Primary Jaw Discharge; CAM-02: Screen Oversize; CAM-03: Sizing & Slabs)',
    location: 'Overhead Portal Gantries G1 (CV-01), G2 (CV-03), and Finished Product Yard Staging Gantry',
    protocol: 'GigE Vision (GenICam) over shielded Cat6A STP Ethernet (1000BASE-T) with Power-over-Ethernet (PoE+)',
    function: 'Real-time 3D volumetric rock segmentation, Particle Size Distribution (PSD) curve estimation, boulder oversize detection (>400mm), and granite slab area volumetric validation.',
    mounting: 'Anti-vibration 3-axis gimbal mount with heavy-duty locking clamp attached to gantry overhead crossbar.',
    interactions: 'Streams 30 fps uncompressed frames to NVIDIA Jetson Edge AI unit; cross-checks volumetric m³/h against belt scale mass t/h to calculate live rock bulk density.',
    status: 'Online'
  },
  {
    id: 'camera-enclosures',
    name: 'Camera Enclosures (3 units) with Air Purge',
    category: 'mounting',
    categoryLabel: 'Optical Protective Housing',
    type: 'IP67 Stainless Steel Heavy Industrial Camera Housing with Purge Collar',
    model: 'autoVimation Colibri / Meganova Stainless IP67 with BK7 Coated Optical Glass',
    quantity: '3 Enclosures',
    location: 'Overhead gantries enclosing CAM-01, CAM-02, and CAM-03',
    protocol: 'Passive mechanical hermetic protection with internal thermostatic heating/cooling',
    function: 'Shields sensitive CMOS sensors and precision lenses from abrasive quartz dust, high-velocity granite rock fragments, sun glare, and extreme tropical temperatures (-10°C to +55°C).',
    mounting: 'Heavy-duty 4-bolt swivel bracket with pan/tilt vernier micrometer adjustments for millimeter-perfect alignment.',
    interactions: 'Houses camera body, lens, and internal heater; pneumatic fitting connects directly to compressed air purge kit to maintain positive internal envelope pressure.',
    status: 'Active'
  },
  {
    id: 'air-purge-kits',
    name: 'Air Purge Kits (3 units)',
    category: 'mounting',
    categoryLabel: 'Pneumatic Cleaning Curtain',
    type: 'Continuous Laminar Positive-Pressure Air Curtain System',
    model: 'EXAIR 110006 Super Air Knife & Coanda Vortex Continuous Lens Purge',
    quantity: '3 Kits',
    location: 'Threaded onto front snout of Camera Enclosures (CAM-01, CAM-02, CAM-03)',
    protocol: 'Pneumatic 4 to 6 bar clean dry instrument air line (ISO 8573-1 Class 2:4:2)',
    function: 'Generates high-velocity laminar air curtain across outer protective glass window, preventing settling of fine granite dust and water droplets without wiping or human intervention.',
    mounting: 'Threaded anodized aluminum ring adapter screwed directly to front bezel of camera housing.',
    interactions: 'Fed from plant instrument air ring-main via Parker 5-micron coalescing filter regulator; solenoid commanded by PLC for high-flow blast cycles every 15 minutes.',
    status: 'Active'
  },
  {
    id: 'isolators',
    name: 'Wire Rope Isolators (4 units)',
    category: 'mounting',
    categoryLabel: 'Harmonic Vibration Dampener',
    type: 'Multi-Axis Helical Stainless Steel Cable Vibration Isolator Set',
    model: 'Enidine Compact CR Series Helical Wire Rope Isolators (CR3-100)',
    quantity: '4 Isolator Sets (16 helical elements total)',
    location: 'Sandwiched between overhead portal gantry crossbeam and camera mounting baseplate',
    protocol: 'Passive mechanical elastic damping (multi-directional 3D attenuation)',
    function: 'Attenuates >94% of low-frequency vibrations (5 Hz to 50 Hz) generated by vibrating screens, jaw crusher flywheels, and rock impact chutes to ensure blur-free high-speed optical capture.',
    mounting: 'Bolt-through mounting between structural steel gantry flange and precision instrument sub-plate with grade 8.8 zinc-plated hardware.',
    interactions: 'Mechanically decouples camera optical alignment from structural conveyor steel tremors.',
    status: 'Active'
  },
  {
    id: 'lidar-scanner',
    name: 'LiDAR Scanner (1 unit)',
    category: 'sensors',
    categoryLabel: 'Spatial 3D Profiler',
    type: 'Multi-Layer 3D Terrestrial Solid-State LiDAR Profiler',
    model: 'SICK MRS6000 Multi-Layer High-Density 3D LiDAR Scanner (200m range)',
    quantity: '1 Unit',
    location: 'Primary Stockpile Surge Gantry Apex overlooking ROM pad and coarse surge pile',
    protocol: 'Gigabit Ethernet TCP/IP / SICK SOPAS protocol to Edge Processing Unit',
    function: 'Continuous 360° point-cloud scanning of stockpile geometry, heap height, live draw-down cone volume, and volumetric stockpile inventory audits accurate to ±1.5%.',
    mounting: 'Articulated boom bracket with sun/rain cowl mounted 8.5m above ground on stockpile mast.',
    interactions: 'Pushes 3D point cloud coordinate packets to Edge AI unit; algorithms reconstruct digital surface model (DSM) to compute real-time stockpile tonnage for Digital Twin.',
    status: 'Online'
  },
  {
    id: 'dust-sensor',
    name: 'Dust Sensor (1 unit)',
    category: 'sensors',
    categoryLabel: 'Environmental Air Quality',
    type: 'Continuous Optical Light-Scattering Particulate Matter Monitor',
    model: 'Met One Instruments BAM 1020 / DynOptic Continuous Dust Opacity Monitor',
    quantity: '1 Unit',
    location: 'Primary Jaw Crusher hopper throat perimeter & downwind boundary monitoring mast',
    protocol: 'Isolated 4-20mA current loop & Modbus RTU / RS-485 to Siemens S7-1500 PLC',
    function: 'Monitors real-time airborne dust opacity (0 to 100 mg/m³) and PM10 particulate concentration for statutory EMA (Environmental Management Agency) environmental compliance.',
    mounting: 'Mast clamp assembly with weather-resistant sampling cyclone and heated optical inlet tube to prevent false fog readings.',
    interactions: 'Continuously polled by Siemens PLC; triggers automated water spray solenoid valves whenever dust exceeds pre-alarm threshold of 20.0 mg/m³.',
    status: 'Online'
  },
  {
    id: 'spray-solenoids',
    name: 'Water Spray Solenoids (3 units)',
    category: 'sensors',
    categoryLabel: 'Automated Dust Actuator',
    type: 'Heavy-Duty 24V DC High-Pressure Brass Solenoid Valve',
    model: 'Burkert Type 6281 EV Servo-Assisted Diaphragm Valve (1" NPT, 16 bar rating)',
    quantity: '3 Valves (Crusher Throat, CV-01 Discharge Chute, Screen Feed Chute)',
    location: 'Suppression manifold at Primary Jaw hopper, Transfer Tower 1, and Screen Box inlet',
    protocol: '24V DC Digital Output (DO) relay driver from Siemens S7-1500 PLC DQ module',
    function: 'Instantly opens water delivery to high-atomization micro-mist nozzles upon command, knocking down fugitive dust clouds with zero aggregate slurry pooling.',
    mounting: 'In-line brass piping installation with upstream manual ball-valve isolation and 100-mesh stainless steel Y-strainer.',
    interactions: 'Actuated by PLC automated closed-loop dust suppression routine; interlocked with jaw crusher running status and high dust opacity signals.',
    status: 'Active'
  },
  {
    id: 'siemens-plc',
    name: 'Siemens S7-1500 PLC (1 unit)',
    category: 'controllers',
    categoryLabel: 'Core Automation Master',
    type: 'Modular Industrial Programmable Logic Controller (PLC) Rack',
    model: 'Siemens SIMATIC S7-1516-3 PN/DP (CPU 1516-3) with DI/DQ/AI/HSC modules',
    quantity: '1 Master Controller Rack',
    location: 'Central Motor Control Center (MCC) climate-controlled instrumentation cabinet',
    protocol: 'PROFINET IO (Dual Port 100 Mbps) + Modbus RTU / RS-485 via CM 1541 communication module',
    function: 'Hard real-time deterministic process control (10ms scan cycle), belt scale integration, safety interlocks, emergency stop supervision, water spray logic, and energy dispatch sequencing.',
    mounting: 'Standard 35mm DIN rail mounting inside Rittal IP65 industrial cabinet with thermostatically controlled filtered vortex AC cooling.',
    interactions: 'Directly polls all field sensors, drives solenoid valves, interfaces crusher motor VFDs, and exchanges SCADA telemetry with Edge Processing Unit via PROFINET/OPC-UA.',
    status: 'Online'
  },
  {
    id: 'edge-unit',
    name: 'Edge Processing Unit (1 unit)',
    category: 'controllers',
    categoryLabel: 'Industrial AI Supercomputer',
    type: 'Ruggedized Fanless Industrial Edge AI Computer',
    model: 'Advantech MIC-733-AO / NVIDIA Jetson AGX Orin Industrial (64GB RAM, 275 TOPS AI compute)',
    quantity: '1 Unit',
    location: 'Central Control Room Server Rack (Rack Unit 4)',
    protocol: 'Dual Gigabit RJ45 / M12 Ethernet (PROFINET / OPC UA client, MQTT publisher, RTSP capture)',
    function: 'Executes real-time YOLOv8 deep learning vision models for particle sizing, 3D point cloud reconstruction from LiDAR, local SQLite 72-hour telemetry buffering, and mass balance algorithms.',
    mounting: 'Heavy-duty wall/rack mount bracket with vibration-isolated rubber dampers and dual redundant 24V DC DIN power supply.',
    interactions: 'Ingests 3x GigE vision video streams and LiDAR point clouds; correlates with Siemens PLC data; pushes encrypted MQTT packets to Cloud Dashboard and WhatsApp Bot API.',
    status: 'Online'
  },
  {
    id: 'router-4g',
    name: '4G Router (1 unit)',
    category: 'controllers',
    categoryLabel: 'Industrial Telemetry Gateway',
    type: 'Dual-SIM Industrial Cellular VPN Gateway & Router',
    model: 'Teltonika RUTX11 / Cisco Catalyst IR1101 Rugged Industrial Router',
    quantity: '1 Unit',
    location: 'Central Control Room Mast Cabinet with external roof-mounted MIMO antenna',
    protocol: 'Dual SIM LTE Cat 6 (Econet / NetOne auto-failover) + IPsec / OpenVPN + 4x Gigabit LAN',
    function: 'Provides unbroken military-grade encrypted WAN backhaul for remote cloud synchronization, automated morning WhatsApp briefing delivery, and zero-trust remote engineering diagnostics.',
    mounting: 'DIN rail mount inside locked communications enclosure with lightning surge arrestor on RF antenna coax.',
    interactions: 'Bridges Edge Processing Unit and plant SCADA server to QuarryIQ cloud servers, executive smartphones, and remote technical support portals.',
    status: 'Online'
  },
  {
    id: 'portal-gantries',
    name: 'Overhead Portal Gantries (2 units)',
    category: 'mounting',
    categoryLabel: 'Heavy Structural Foundation',
    type: 'Heavy Structural Hot-Dip Galvanized Steel Tubular Portal Truss Frame',
    model: 'Custom Engineered 4.5m Clearance Heavy Steel Overhead Portal Frame (AS/NZS 1170 compliant)',
    quantity: '2 Gantries (Gantry 1: CV-01 Primary Discharge; Gantry 2: CV-03 Sizing Conveyor)',
    location: 'Straddling Conveyors CV-01 and CV-03 with full 4.5m vertical maintenance clearance',
    protocol: 'Structural mechanical anchor (integrally grounded to plant copper earthing grid)',
    function: 'Provides ultra-rigid overhead structural support for optical cameras, LiDAR sensors, strobe illumination lights, and air purge distribution lines without obstructing conveyor access.',
    mounting: 'Heavy reinforced concrete footing piers with 4x M24 chemical anchor studs per leg; anti-sway diagonal gusset bracing and integrated safety ladder with harness fall-arrest line.',
    interactions: 'Physical structural carrier for CAM-01, CAM-02, air supply manifolds, and vibration isolation assemblies above active moving rock stream.',
    status: 'Active'
  }
];

interface PlantLocation {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  description: string;
  components: string[];
  type: 'pit' | 'crush' | 'screen' | 'sand' | 'stock' | 'weigh' | 'rail' | 'control';
}

const PLANT_LOCATIONS: PlantLocation[] = [
  {
    id: 'pit',
    name: 'Granite Quarry Pit',
    code: 'LOC-01',
    x: 70,
    y: 190,
    description: 'Active granite blasting face and 60t haul truck loading bench with automated RFID tracking.',
    components: ['Haul Truck RFID Tags', 'Haul Cycle Telemetry'],
    type: 'pit'
  },
  {
    id: 'rom-pad',
    name: 'ROM Dump Pad',
    code: 'LOC-02',
    x: 180,
    y: 190,
    description: 'Run-of-Mine dump hopper with vibrating grizzly feeder and rock fragmentation assessment.',
    components: ['Vibrating Grizzly Feeder', 'Stockpile LiDAR Horizon'],
    type: 'pit'
  },
  {
    id: 'primary-crusher',
    name: 'Primary Jaw Crusher',
    code: 'LOC-03',
    x: 300,
    y: 190,
    description: 'Metso C120 Jaw Crusher reducing blast rock to 0-150mm. Core telemetry epicenter.',
    components: [
      'Belt Scale BS1',
      '2x Load Cells',
      'Speed Sensor SS-01',
      'AI Camera CAM-01',
      'Gantry 1',
      'Dust Sensor',
      'Solenoid 1',
      'Air Purge Kit 1',
      'Wire Rope Isolators'
    ],
    type: 'crush'
  },
  {
    id: 'screen',
    name: 'Primary Scalping Screen',
    code: 'LOC-04',
    x: 430,
    y: 190,
    description: 'Triple-deck vibrating sizing screen separating oversized rock from primary crushed granite.',
    components: [
      'Belt Scale BS2',
      '2x Load Cells',
      'Speed Sensor SS-02',
      'AI Camera CAM-02',
      'Gantry 2',
      'Solenoid 2'
    ],
    type: 'screen'
  },
  {
    id: 'sand-plant',
    name: 'Sand Plant (VSI & Washing)',
    code: 'LOC-05',
    x: 560,
    y: 130,
    description: 'Vertical Shaft Impactor (VSI) and hydro-cyclone producing high-grade manufactured sand.',
    components: ['Belt Scale BS3', '2x Load Cells', 'Speed Sensor SS-03', 'Solenoid 3'],
    type: 'sand'
  },
  {
    id: 'final-screen',
    name: 'Final Aggregate Screen',
    code: 'LOC-06',
    x: 560,
    y: 250,
    description: 'Final multi-deck screen sizing into 19mm concrete stone, 10mm stone, and road-base aggregate.',
    components: ['Belt Scale BS4', '2x Load Cells', 'Speed Sensor SS-04'],
    type: 'screen'
  },
  {
    id: 'stockpiles',
    name: 'Product Stockpiles & Slabs',
    code: 'LOC-07',
    x: 700,
    y: 190,
    description: 'Radial stockpiles and dimensional slab yard scanned continuously by LiDAR and AI vision.',
    components: ['SICK 3D LiDAR Scanner', 'AI Camera CAM-03 (Slab Sizing)'],
    type: 'stock'
  },
  {
    id: 'weighbridge',
    name: 'Automated Weighbridge',
    code: 'LOC-08',
    x: 830,
    y: 130,
    description: 'Dual-scale unattended dispatch weighbridge with ANPR optical camera and RFID driver scan.',
    components: ['Dual Weighbridge Scales', 'ANPR Plate Camera', 'RFID Reader', 'Gate Barrier'],
    type: 'weigh'
  },
  {
    id: 'rail',
    name: 'Rail Loadout Terminal',
    code: 'LOC-09',
    x: 830,
    y: 250,
    description: 'Bulk rail siding for 50,000t Port Export manifests and high-speed bottom-discharge hopper.',
    components: ['Overland CV-07 Scale Feed', 'Rail Loadout Ledger Terminal'],
    type: 'rail'
  },
  {
    id: 'control-room',
    name: 'Central Control Room (MCC)',
    code: 'LOC-10',
    x: 480,
    y: 350,
    description: 'Climate-controlled MCC housing master PLC, Edge AI supercomputer, and 4G telemetry gateway.',
    components: [
      'Siemens S7-1500 PLC Rack',
      'Advantech / NVIDIA Edge AI',
      'Teltonika 4G Cellular Gateway',
      '4x Micro-Tech Integrators'
    ],
    type: 'control'
  }
];

interface DataFlowItem {
  id: string;
  from: string;
  to: string;
  protocol: string;
  data: string;
  frequency: string;
  latency: string;
}

const DATA_FLOW_ROWS: DataFlowItem[] = [
  {
    id: 'df-1',
    from: 'Belt Scale Integrators (BS1-BS4)',
    to: 'Siemens S7-1500 PLC',
    protocol: 'Modbus RTU (RS-485 Shielded)',
    data: 'Instantaneous TPH rate, cumulative totalizer kg, zero-drift offset, tare status',
    frequency: '100 ms',
    latency: '<20 ms'
  },
  {
    id: 'df-2',
    from: 'Speed Sensors (SS-01 - 04)',
    to: 'S7-1500 High-Speed Counters',
    protocol: '24V DC Digital Pulse Train (PNP)',
    data: 'Pulley rotation frequency, belt linear velocity (m/s), mechanical slip flags',
    frequency: 'Hardware Interrupt',
    latency: '<5 ms'
  },
  {
    id: 'df-3',
    from: 'AI Cameras (CAM-01, 02, 03)',
    to: 'Edge Processing Unit (Jetson AGX)',
    protocol: 'GigE Vision (UDP / Cat6A STP)',
    data: 'Uncompressed 4K video frames, stereoscopic depth disparity maps, boulder alerts',
    frequency: '30 fps continuous',
    latency: '~33 ms'
  },
  {
    id: 'df-4',
    from: 'SICK 3D LiDAR Scanner',
    to: 'Edge Processing Unit (Jetson AGX)',
    protocol: 'Ethernet TCP/IP (SOPAS protocol)',
    data: 'High-density 3D distance point clouds, surface mesh, surge cone coordinates',
    frequency: '10 Hz (100 ms)',
    latency: '<40 ms'
  },
  {
    id: 'df-5',
    from: 'Optical Dust Opacity Sensor',
    to: 'Siemens S7-1500 PLC Analog Input',
    protocol: '4-20 mA Isolated Current Loop',
    data: 'Particulate density (0.0 to 100.0 mg/m³), optical lens window occlusion flag',
    frequency: 'Continuous Analog',
    latency: '<50 ms'
  },
  {
    id: 'df-6',
    from: 'Siemens S7-1500 PLC',
    to: 'Water Spray Solenoid Valves',
    protocol: '24V DC Digital Output Relays',
    data: 'Actuate high-pressure suppression spray pulse (On/Off closed-loop command)',
    frequency: 'Event-driven',
    latency: '<15 ms'
  },
  {
    id: 'df-7',
    from: 'Siemens S7-1500 PLC',
    to: 'Edge Processing Unit (Jetson AGX)',
    protocol: 'PROFINET IO / Industrial Ethernet',
    data: 'Crusher motor kW draw, VFD speeds, physical belt scale mass, safety trips',
    frequency: '50 ms cyclical',
    latency: '<10 ms'
  },
  {
    id: 'df-8',
    from: 'Edge Processing Unit',
    to: 'QuarryIQ Cloud & Dashboard',
    protocol: 'MQTT over TLS 1.3 / WebSocket',
    data: 'Real-time JSON telemetry, AI slab count, PSD curves, mass balance reconciliation',
    frequency: '1 Second',
    latency: '<120 ms'
  },
  {
    id: 'df-9',
    from: 'Edge Processing Unit / Cloud',
    to: 'Managing Director Smartphone',
    protocol: 'HTTPS REST (Meta WhatsApp API)',
    data: 'Formatted WhatsApp 06:00 AM morning executive report, urgent bearing alarms',
    frequency: 'Daily @ 06:00 & Alerts',
    latency: '<2 sec'
  },
  {
    id: 'df-10',
    from: 'Automated Weighbridge Terminal',
    to: 'QuarryIQ Ledger & ERP',
    protocol: 'Secure WebSockets / REST API',
    data: 'Gross/Tare/Net tonnage, ANPR license plate match, RFID driver ID, fraud check',
    frequency: 'Per Truck Transaction',
    latency: '<250 ms'
  }
];

export const SystemComponents: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'inventory' | 'map' | 'comms'>('inventory');

  // Sub-tab 1: Inventory state
  const [inventoryFilter, setInventoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'belt-scales': true,
    'ai-cameras': true,
    'siemens-plc': true
  });

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllRows = () => {
    const all: Record<string, boolean> = {};
    EQUIPMENT_INVENTORY.forEach((item) => {
      all[item.id] = true;
    });
    setExpandedRows(all);
  };

  const collapseAllRows = () => {
    setExpandedRows({});
  };

  const filteredInventory = EQUIPMENT_INVENTORY.filter((item) => {
    const matchesCategory = inventoryFilter === 'all' || item.category === inventoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.function.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sub-tab 2: Placement map state
  const [mapFilter, setMapFilter] = useState<'all' | 'sensors' | 'cameras' | 'controllers' | 'mounting'>('all');
  const [selectedLocation, setSelectedLocation] = useState<PlantLocation | null>(PLANT_LOCATIONS[2]); // Default to Primary Jaw

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0B0B0F] text-white p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <CircuitBoard className="w-3.5 h-3.5" />
              Technical Master Reference
            </span>
            <span className="text-xs text-stone-400 font-mono">QuarryIQ Hardware Architecture v2.4</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            System Components &amp; Plant Architecture
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mt-1 leading-relaxed">
            Comprehensive hardware inventory, plant-wide sensor placement map, and deterministic three-layer data communications specification.
          </p>
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="flex items-center p-1.5 bg-stone-900/90 rounded-xl border border-stone-800 self-start md:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => setActiveSubTab('inventory')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'inventory'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Equipment Inventory</span>
          </button>

          <button
            onClick={() => setActiveSubTab('map')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'map'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>2. Plant Placement Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('comms')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'comms'
                ? 'bg-[#FFC72C] text-[#0B0B0F] shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>3. Data Flow &amp; Security</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: EQUIPMENT INVENTORY                                  */}
      {/* ============================================================== */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-6">
          {/* Summary Bar: 9 sensors, 3 cameras, 2 controllers, 2 mounting structures */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Field Telemetry
                </span>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  9 Sensors
                </span>
                <span className="text-[10px] text-blue-700 block font-medium mt-0.5">
                  Scales, Speed, Dust, Flow, LiDAR
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Optical AI Vision
                </span>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  3 Cameras
                </span>
                <span className="text-[10px] text-purple-700 block font-medium mt-0.5">
                  4K Stereoscopic Industrial GigE
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B38300] shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Computing Core
                </span>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  2 Controllers
                </span>
                <span className="text-[10px] text-amber-800 block font-medium mt-0.5">
                  Siemens S7-1500 &amp; Jetson Edge AI
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Structural Foundations
                </span>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  2 Mounting Structures
                </span>
                <span className="text-[10px] text-emerald-800 block font-medium mt-0.5">
                  Heavy Tubular Overhead Gantries
                </span>
              </div>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Equipment (15)' },
                { id: 'sensors', label: 'Sensors (6)' },
                { id: 'cameras', label: 'Cameras (1)' },
                { id: 'controllers', label: 'Controllers & Comms (4)' },
                { id: 'mounting', label: 'Mounting & Protective (4)' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setInventoryFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    inventoryFilter === btn.id
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search model, location, function..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#FFC72C]"
                />
              </div>

              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={expandAllRows}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                  title="Expand all specification rows"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAllRows}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                  title="Collapse all rows"
                >
                  Collapse
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Equipment Table */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <span>Hardware Bill of Materials &amp; Technical Specifications</span>
                <span className="text-xs font-mono text-stone-500 font-normal">
                  ({filteredInventory.length} items listed)
                </span>
              </h3>
              <span className="text-[11px] text-stone-500 font-mono">
                Click any row to view complete integration parameters
              </span>
            </div>

            <div className="divide-y divide-stone-200">
              {filteredInventory.map((item) => {
                const isExpanded = !!expandedRows[item.id];
                return (
                  <div key={item.id} className="transition-colors hover:bg-stone-50/60">
                    {/* Header Row */}
                    <button
                      onClick={() => toggleRow(item.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-hidden"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            item.category === 'sensors'
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : item.category === 'cameras'
                              ? 'bg-purple-50 text-purple-600 border border-purple-200'
                              : item.category === 'controllers'
                              ? 'bg-amber-50 text-[#B38300] border border-amber-200'
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}
                        >
                          {item.category === 'sensors' && <Activity className="w-4 h-4" />}
                          {item.category === 'cameras' && <Camera className="w-4 h-4" />}
                          {item.category === 'controllers' && <Cpu className="w-4 h-4" />}
                          {item.category === 'mounting' && <Layers className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-black text-sm text-stone-900 tracking-tight">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                item.category === 'sensors'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.category === 'cameras'
                                  ? 'bg-purple-100 text-purple-800'
                                  : item.category === 'controllers'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {item.categoryLabel}
                            </span>
                            <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <div className="text-xs text-stone-500 mt-1 flex items-center gap-3 truncate">
                            <span className="font-semibold text-stone-700">{item.model}</span>
                            <span>&bull;</span>
                            <span className="text-stone-500 font-mono text-[11px] truncate">
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          {item.status}
                        </span>

                        <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 bg-stone-50/90 border-t border-stone-100 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                          {/* Col 1: Type & Model */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              Component Specification
                            </span>
                            <div className="text-xs font-bold text-stone-900">{item.type}</div>
                            <div className="text-xs font-mono text-stone-600 mt-1">{item.model}</div>
                            <div className="text-[11px] font-mono text-[#B38300] font-semibold mt-1">
                              Total Deploy: {item.quantity}
                            </div>
                          </div>

                          {/* Col 2: Location & Mounting */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              Mounting &amp; Physical Location
                            </span>
                            <div className="text-xs text-stone-800 font-medium leading-relaxed">
                              {item.location}
                            </div>
                            <div className="mt-2 text-[11px] text-stone-600 bg-stone-50 p-2 rounded border border-stone-200 leading-snug">
                              <strong>Mount:</strong> {item.mounting}
                            </div>
                          </div>

                          {/* Col 3: Communication Protocol */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              Communication Protocol &amp; IO
                            </span>
                            <div className="p-2 rounded bg-stone-900 text-stone-100 font-mono text-[11px] leading-relaxed border border-stone-800">
                              {item.protocol}
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Verified Deterministic Line</span>
                            </div>
                          </div>

                          {/* Col 4: Functional Interactions */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                              Interactions &amp; Data Role
                            </span>
                            <div className="text-xs text-stone-700 leading-relaxed">
                              {item.function}
                            </div>
                            <div className="mt-2 text-[11px] text-stone-600 pt-2 border-t border-stone-100">
                              <strong className="text-stone-800">Interfaces with:</strong> {item.interactions}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: PLANT PLACEMENT MAP                                  */}
      {/* ============================================================== */}
      {activeSubTab === 'map' && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-[#FFC72C]">
                  Topological Layout
                </span>
                <h3 className="font-black text-lg text-stone-900">
                  Granite Processing Flow &amp; Sensor Placement Map
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Pit to Rail material flow showing exact instrumentation coordinates and monitoring nodes
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider px-2">
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Markers' },
                { id: 'sensors', label: 'Sensors' },
                { id: 'cameras', label: 'Cameras' },
                { id: 'controllers', label: 'Controllers' },
                { id: 'mounting', label: 'Mounting' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setMapFilter(btn.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mapFilter === btn.id
                      ? 'bg-stone-900 text-[#FFC72C] shadow-xs'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-[#0B0B0F] p-4 sm:p-6 rounded-2xl border border-stone-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-3 border-b border-stone-800 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#FFC72C]" />
                Interactive Plant Canvas (Click any station node to inspect details)
              </span>
              <span className="font-mono text-[11px] text-stone-500">
                Scale: 1:500 Industrial Schematic &bull; Dual Circuit
              </span>
            </div>

            {/* SVG Visual Scheme */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[920px]">
                <svg
                  viewBox="0 0 960 440"
                  className="w-full h-auto select-none font-sans"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))' }}
                >
                  <defs>
                    <linearGradient id="conveyorFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#FFC72C" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>

                    <pattern id="conveyorTread" width="12" height="12" patternUnits="userSpaceOnUse">
                      <path d="M 0 0 L 6 12 M 6 0 L 12 12" stroke="#2B2B38" strokeWidth="1" />
                    </pattern>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background grid */}
                  <rect x="0" y="0" width="960" height="440" fill="#0E0E14" rx="14" />
                  <rect x="0" y="0" width="960" height="440" fill="url(#conveyorTread)" opacity="0.3" rx="14" />

                  {/* Conveyor Main Flow Paths */}
                  {/* Pit to ROM Pad */}
                  <path
                    d="M 100 190 L 170 190"
                    stroke="#FFC72C"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                  />
                  {/* ROM to Primary Jaw */}
                  <path
                    d="M 190 190 L 290 190"
                    stroke="url(#conveyorFlow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Primary Jaw to Screen (CV-01) */}
                  <path
                    d="M 310 190 L 420 190"
                    stroke="url(#conveyorFlow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Screen split to Sand Plant (upper CV-04) */}
                  <path
                    d="M 440 180 Q 480 130 550 130"
                    fill="none"
                    stroke="#FFC72C"
                    strokeWidth="4"
                    strokeDasharray="4 3"
                  />
                  {/* Screen to Final Screen (lower CV-02) */}
                  <path
                    d="M 440 200 Q 480 250 550 250"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    strokeDasharray="4 3"
                  />
                  {/* Sand Plant & Final Screen to Stockpiles */}
                  <path
                    d="M 570 130 Q 640 150 690 180"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  <path
                    d="M 570 250 Q 640 230 690 200"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  {/* Stockpiles to Weighbridge & Rail */}
                  <path
                    d="M 710 180 Q 770 140 820 130"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                  />
                  <path
                    d="M 710 200 Q 770 240 820 250"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                  />

                  {/* PROFINET / High-Speed Comms Bus to Control Room */}
                  <path
                    d="M 300 220 L 300 350 L 470 350"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />
                  <path
                    d="M 430 220 L 430 350 L 470 350"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />
                  <path
                    d="M 700 220 L 700 350 L 590 350"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />

                  {/* Station Process Boxes */}
                  {PLANT_LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation?.id === loc.id;
                    const isControl = loc.type === 'control';
                    return (
                      <g
                        key={loc.id}
                        transform={`translate(${loc.x}, ${loc.y})`}
                        onClick={() => setSelectedLocation(loc)}
                        className="cursor-pointer group"
                      >
                        {/* Node Card Container */}
                        <rect
                          x="-45"
                          y={isControl ? '-30' : '-32'}
                          width={isControl ? '130' : '90'}
                          height={isControl ? '60' : '64'}
                          rx="10"
                          fill={isSelected ? '#1A1A24' : '#14141E'}
                          stroke={isSelected ? '#FFC72C' : '#2A2A3A'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          className="transition-all duration-300 group-hover:stroke-stone-300"
                        />

                        {/* Top Code Badge */}
                        <rect
                          x="-38"
                          y={isControl ? '-24' : '-26'}
                          width="42"
                          height="14"
                          rx="4"
                          fill={isSelected ? '#FFC72C' : '#222230'}
                        />
                        <text
                          x="-17"
                          y={isControl ? '-14' : '-16'}
                          textAnchor="middle"
                          fill={isSelected ? '#0B0B0F' : '#94A3B8'}
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {loc.code}
                        </text>

                        {/* Node Name */}
                        <text
                          x={isControl ? '20' : '0'}
                          y="4"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {loc.name.length > 14 ? `${loc.name.slice(0, 12)}..` : loc.name}
                        </text>

                        {/* Sub-label count */}
                        <text
                          x={isControl ? '20' : '0'}
                          y="18"
                          textAnchor="middle"
                          fill="#94A3B8"
                          fontSize="8"
                          fontFamily="monospace"
                        >
                          {loc.components.length} nodes
                        </text>

                        {/* Selected Indicator Ring */}
                        {isSelected && (
                          <circle
                            cx="0"
                            cy="0"
                            r="48"
                            fill="none"
                            stroke="#FFC72C"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className="animate-spin"
                            style={{ animationDuration: '10s' }}
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Component Markers overlay based on Filter */}
                  {/* Primary Crusher Instrumentation Cluster */}
                  {(mapFilter === 'all' || mapFilter === 'sensors') && (
                    <g transform="translate(300, 135)">
                      <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        BS1
                      </text>
                      <circle cx="-16" cy="18" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
                      <text x="-16" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
                        LC
                      </text>
                      <circle cx="16" cy="18" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
                      <text x="16" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
                        SS
                      </text>
                    </g>
                  )}

                  {(mapFilter === 'all' || mapFilter === 'cameras') && (
                    <g transform="translate(350, 150)">
                      <circle cx="0" cy="0" r="10" fill="#7C3AED" stroke="#FFC72C" strokeWidth="1.5" filter="url(#glow)" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        C1
                      </text>
                    </g>
                  )}

                  {(mapFilter === 'all' || mapFilter === 'mounting') && (
                    <g transform="translate(350, 190)">
                      <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        G1
                      </text>
                    </g>
                  )}

                  {/* Screen Instrumentation Cluster */}
                  {(mapFilter === 'all' || mapFilter === 'sensors') && (
                    <g transform="translate(430, 135)">
                      <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        BS2
                      </text>
                    </g>
                  )}

                  {(mapFilter === 'all' || mapFilter === 'cameras') && (
                    <g transform="translate(470, 150)">
                      <circle cx="0" cy="0" r="10" fill="#7C3AED" stroke="#FFC72C" strokeWidth="1.5" filter="url(#glow)" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        C2
                      </text>
                    </g>
                  )}

                  {(mapFilter === 'all' || mapFilter === 'mounting') && (
                    <g transform="translate(470, 190)">
                      <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        G2
                      </text>
                    </g>
                  )}

                  {/* Sand Plant & Final Screen Scales */}
                  {(mapFilter === 'all' || mapFilter === 'sensors') && (
                    <>
                      <g transform="translate(560, 95)">
                        <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                          BS3
                        </text>
                      </g>
                      <g transform="translate(560, 290)">
                        <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                          BS4
                        </text>
                      </g>
                    </>
                  )}

                  {/* Stockpiles LiDAR & CAM-03 */}
                  {(mapFilter === 'all' || mapFilter === 'sensors') && (
                    <g transform="translate(700, 135)">
                      <circle cx="0" cy="0" r="10" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" filter="url(#glow)" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        LiD
                      </text>
                    </g>
                  )}

                  {(mapFilter === 'all' || mapFilter === 'cameras') && (
                    <g transform="translate(735, 150)">
                      <circle cx="0" cy="0" r="10" fill="#7C3AED" stroke="#FFC72C" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        C3
                      </text>
                    </g>
                  )}

                  {/* Control Room Core Controllers */}
                  {(mapFilter === 'all' || mapFilter === 'controllers') && (
                    <g transform="translate(480, 310)">
                      <rect x="-35" y="-12" width="30" height="24" rx="4" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="-20" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        PLC
                      </text>

                      <rect x="5" y="-12" width="30" height="24" rx="4" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="20" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                        AI
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Selected Location Detailed Inspection Callout */}
            {selectedLocation && (
              <div className="mt-4 p-4 rounded-xl bg-[#14141E] border border-stone-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC72C] text-[#0B0B0F] flex items-center justify-center font-black text-sm shrink-0">
                    {selectedLocation.code}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{selectedLocation.name}</span>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                        {selectedLocation.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-stone-300 mt-0.5 max-w-xl leading-relaxed">
                      {selectedLocation.description}
                    </div>
                  </div>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-stone-800 pt-2 md:pt-0 md:pl-4 self-stretch flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Deployed Telemetry &amp; Nodes:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-w-md">
                    {selectedLocation.components.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 text-[10px] font-mono border border-stone-700"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Map Legend at Bottom */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-stone-300 font-bold uppercase tracking-wider">Legend:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#3B82F6] border border-white"></span>
                  <span>Sensors (Scales, Speed, Dust)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#7C3AED] border border-[#FFC72C]"></span>
                  <span>AI Cameras &amp; 3D Vision</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#D97706] border border-white"></span>
                  <span>Controllers (PLC &amp; Edge)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#059669] border border-white"></span>
                  <span>Portal Gantries &amp; Isolation</span>
                </span>
              </div>

              <div className="text-stone-500">
                Material Flow: Left $\to$ Right (Pit to Port)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 3: COMMUNICATION & DATA FLOW                            */}
      {/* ============================================================== */}
      {activeSubTab === 'comms' && (
        <div className="space-y-8">
          {/* Three-Layer Flow Diagram */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-[#FFC72C]">
                  Industrial Topology
                </span>
                <h3 className="font-black text-xl text-stone-900 mt-1">
                  Three-Layer Industrial Architecture &amp; Data Flow
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                Deterministic OT/IT Convergence
              </span>
            </div>

            {/* Visual Three-Layer Stack */}
            <div className="space-y-4">
              {/* LAYER 3: User Interfaces (Top Layer) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 to-[#14141E] text-white border border-stone-800 shadow-md">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFC72C] text-[#0B0B0F] font-black text-xs flex items-center justify-center font-mono">
                      L3
                    </span>
                    <h4 className="font-bold text-sm tracking-tight text-white uppercase">
                      Top Layer — User Interfaces &amp; Executive Consoles
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#FFC72C]">
                    Zero-Trust HTTPS / TLS 1.3 / Meta Cloud
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                    <span className="text-[10px] font-bold text-[#FFC72C] uppercase block">Web &amp; PWA Client</span>
                    <span className="text-sm font-bold text-white block mt-0.5">MD Executive Dashboard</span>
                    <span className="text-[10px] text-stone-400 mt-0.5 block">Recharts, Real-Time KPIs, OEE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                    <span className="text-[10px] font-bold text-[#FFC72C] uppercase block">Control Room SCADA</span>
                    <span className="text-sm font-bold text-white block mt-0.5">Multi-Display Operator HMI</span>
                    <span className="text-[10px] text-stone-400 mt-0.5 block">What-If, Sliders, Emergency Trips</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                    <span className="text-[10px] font-bold text-[#FFC72C] uppercase block">Mobile Automated Bot</span>
                    <span className="text-sm font-bold text-white block mt-0.5">WhatsApp Morning Report</span>
                    <span className="text-[10px] text-stone-400 mt-0.5 block">06:00 AM Dispatch + 1-Tap Approvals</span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                    <span className="text-[10px] font-bold text-[#FFC72C] uppercase block">Enterprise ERP / Rail</span>
                    <span className="text-sm font-bold text-white block mt-0.5">Weighbridge &amp; Mass Balance</span>
                    <span className="text-[10px] text-stone-400 mt-0.5 block">Statutory Audit, Stock Reconciliation</span>
                  </div>
                </div>
              </div>

              {/* Protocol Arrow 2: Middle to Top */}
              <div className="flex items-center justify-center gap-3 py-1">
                <div className="h-6 w-0.5 bg-stone-300"></div>
                <div className="px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-[11px] font-mono font-bold text-stone-700 flex items-center gap-2">
                  <ArrowDown className="w-3.5 h-3.5 text-[#B38300]" />
                  <span>Protocol: MQTT over TLS 1.3 &bull; WebSockets &bull; HTTPS REST &bull; Cellular 4G LTE</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#B38300]" />
                </div>
                <div className="h-6 w-0.5 bg-stone-300"></div>
              </div>

              {/* LAYER 2: PLC + Edge AI (Middle Layer) */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-[#FFC72C] shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B0B0F] text-[#FFC72C] font-black text-xs flex items-center justify-center font-mono">
                      L2
                    </span>
                    <h4 className="font-bold text-sm tracking-tight text-stone-900 uppercase">
                      Middle Layer — Industrial Control &amp; Edge AI Inference Core
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Deterministic 10ms Scan &bull; 275 TOPS Compute
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                      <span>Siemens SIMATIC S7-1516 PLC</span>
                      <Cpu className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      Hard real-time deterministic control, belt scale totalization, interlocks, spray solenoid drive.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-stone-500">
                      Cycle: 10ms &bull; PROFINET IO &bull; Modbus Master
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                      <span>NVIDIA Jetson AGX Orin Edge AI</span>
                      <HardDrive className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      YOLOv8 optical boulder &amp; particle sizing, 3D LiDAR point cloud surface modeling, SQLite caching.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-purple-800 font-semibold">
                      GigE Vision &bull; SOPAS TCP &bull; 30 FPS inference
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                      <span>Teltonika RUTX11 4G Gateway</span>
                      <Wifi className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      Dual-SIM Econet/NetOne failover cellular backhaul, hardware firewall, IPsec encrypted tunnel.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-blue-800 font-semibold">
                      LTE Cat 6 &bull; Dual SIM &bull; IPsec DMZ
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol Arrow 1: Bottom to Middle */}
              <div className="flex items-center justify-center gap-3 py-1">
                <div className="h-6 w-0.5 bg-stone-300"></div>
                <div className="px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-[11px] font-mono font-bold text-stone-700 flex items-center gap-2">
                  <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  <span>Protocol: Modbus RTU (RS-485) &bull; 4-20mA &bull; GigE Vision &bull; PROFINET IO</span>
                  <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="h-6 w-0.5 bg-stone-300"></div>
              </div>

              {/* LAYER 1: Field Devices (Bottom Layer) */}
              <div className="p-5 rounded-2xl bg-stone-100 text-stone-900 border border-stone-300 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-800 text-white font-black text-xs flex items-center justify-center font-mono">
                      L1
                    </span>
                    <h4 className="font-bold text-sm tracking-tight text-stone-900 uppercase">
                      Bottom Layer — Physical Field Devices &amp; Instrumentation
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-600">
                    Industrial IP67/68 Sealed Field Transducers
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Belt Scales</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">BS1 to BS4</span>
                    <span className="text-[9px] text-blue-600 font-mono">Modbus RS-485</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Load Cells</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">8x Vishay Cells</span>
                    <span className="text-[9px] text-stone-500 font-mono">Analog mV/V</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Speed Wheels</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">4x Optical Pulse</span>
                    <span className="text-[9px] text-stone-500 font-mono">24V PNP Pulse</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Optical AI</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">CAM 01 - 03</span>
                    <span className="text-[9px] text-purple-700 font-mono">GigE Cat6A</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Stockpile</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">SICK 3D LiDAR</span>
                    <span className="text-[9px] text-blue-600 font-mono">TCP/IP SOPAS</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-center">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Suppression</span>
                    <span className="text-xs font-bold text-stone-900 block mt-0.5">Dust &amp; 3x Valves</span>
                    <span className="text-[9px] text-emerald-700 font-mono">4-20mA / 24V DO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Table */}
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-stone-900">
                  Data Flow Matrix (From / To / Protocol / Data / Frequency)
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Complete input-output mapping showing industrial baud rates, transport protocols, and cycle times
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-stone-600 bg-white px-2.5 py-1 rounded border border-stone-200">
                10 Active Pipes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-600 font-mono uppercase text-[10px] border-b border-stone-200">
                    <th className="py-3 px-4">From (Source)</th>
                    <th className="py-3 px-4">To (Destination)</th>
                    <th className="py-3 px-4">Protocol</th>
                    <th className="py-3 px-4">Data Payload</th>
                    <th className="py-3 px-4">Frequency</th>
                    <th className="py-3 px-4 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
                  {DATA_FLOW_ROWS.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-stone-900 font-sans">{row.from}</td>
                      <td className="py-3 px-4 font-semibold text-stone-700 font-sans">{row.to}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200 font-bold">
                          {row.protocol}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-600 font-sans max-w-xs">{row.data}</td>
                      <td className="py-3 px-4 text-[#B38300] font-bold">{row.frequency}</td>
                      <td className="py-3 px-4 text-right text-emerald-700 font-bold">{row.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cyber Security Card */}
          <div className="bg-[#0B0B0F] rounded-2xl p-6 sm:p-8 border border-stone-800 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Industrial Cybersecurity &bull; IEC 62443 Standard
                  </span>
                  <h4 className="text-lg font-black text-white mt-1">
                    Air-Gapped Operational Technology (OT) Security Architecture
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-bold">Firewall Enforced &bull; Read-Only SCADA</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2 text-[#FFC72C] font-bold text-xs mb-2">
                  <Lock className="w-4 h-4" />
                  <span>Air-Gapped DMZ &amp; Uni-Directional Proxy</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Plant control network (PROFINET / S7-1500) is physically separated from public WAN by hardware firewall. Cloud updates pass strictly through a read-only reverse proxy. <strong>No cloud commands can override local hardwired emergency stop relays.</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2 text-[#FFC72C] font-bold text-xs mb-2">
                  <Server className="w-4 h-4" />
                  <span>72-Hour Autonomous Local Buffering</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  In case of total cellular network blackout across Zimbabwe, the NVIDIA Jetson edge unit maintains a 72-hour rolling SQLite buffer. All mass records, camera logs, and weighbridge transactions are cached and auto-reconciled upon link restoration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <div className="flex items-center gap-2 text-[#FFC72C] font-bold text-xs mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>End-to-End Encryption &amp; RBAC</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  All MQTT and REST communications use TLS 1.3 with AES-256 session encryption. Access is enforced by cryptographic public/private key pairs and strict role-based access control (Managing Director, Plant Manager, Safety Officer, Field Tech).
                </p>
              </div>
            </div>
          </div>

          {/* 3 Summary Cards at Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary Card 1: What Gets Measured */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-sm text-stone-900">1. What Gets Measured</h5>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">
                    Physical Metrics
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-stone-700 leading-snug">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Throughput &amp; Mass Rate:</strong> Continuous metric tons per hour (t/h) and cumulative day tonnage on 4 critical transfer belts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Particle Size Distribution:</strong> 3D rock fragmentation curves and boulder oversize flags (&gt;400mm) at jaw discharge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Dimensional Granite Slabs:</strong> Surface area ($m^2$) recovery and count classified across 5 cut grades.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Environmental &amp; Safety:</strong> Airborne dust opacity ($mg/m^3$) and conveyor belt slip percentage.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                Measurement Accuracy: ±0.25% Mass &bull; ±1.5% Volume
              </div>
            </div>

            {/* Summary Card 2: How It Communicates */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-[#B38300]" />
                    <h5 className="font-bold text-sm text-stone-900">2. How It Communicates</h5>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-50 text-[#B38300] px-2 py-0.5 rounded font-bold">
                    Protocols &amp; Media
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-stone-700 leading-snug">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B38300] shrink-0 mt-0.5" />
                    <span><strong>Deterministic Field Bus:</strong> Modbus RTU (RS-485 shielded twisted pair) and isolated 4-20mA current loops for zero-latency sensor polling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B38300] shrink-0 mt-0.5" />
                    <span><strong>Plant High-Speed Backbone:</strong> Dual PROFINET IO (100 Mbps) and Cat6A Gigabit Ethernet streaming 4K vision and 3D LiDAR point clouds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B38300] shrink-0 mt-0.5" />
                    <span><strong>Executive Cloud &amp; Mobile:</strong> MQTT over TLS 1.3 telemetry to web console paired with automated Meta WhatsApp API daily briefs.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                Backhaul: Dual-SIM LTE 4G (Econet / NetOne Failover)
              </div>
            </div>

            {/* Summary Card 3: Where It Mounts */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-bold text-sm text-stone-900">3. Where It Mounts</h5>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Mechanical Locations
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-stone-700 leading-snug">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Conveyor Channel Stringers:</strong> Dual-idler weighbridge assemblies bolted directly to rigid conveyor channel frames on CV-01, 02, 04, 07.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Overhead Portal Gantries:</strong> 2x heavy tubular galvanized steel trusses with 4.5m clearance and helical wire-rope harmonic vibration dampening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Process Chutes &amp; Hoppers:</strong> High-pressure mist solenoid manifolds at jaw throat, transfer chute, and scalping screen inlet.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>MCC Central Server Enclosure:</strong> Climate-controlled Rittal IP65 cabinet housing Siemens S7-1500 PLC and NVIDIA Jetson AI unit.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                Vibration Isolation: &gt;94% Attenuation (5-50 Hz)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
