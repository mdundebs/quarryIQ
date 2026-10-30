import React, { useState } from 'react';
import {
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Building2,
  Cpu,
  Zap,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Maximize2,
  X,
  Camera,
  Layers
} from 'lucide-react';

interface PastProjectPhoto {
  id: string;
  title: string;
  partner: string;
  location: string;
  description: string;
  tags: string[];
  imageSrc: string;
}

export const TeamExperience: React.FC = () => {
  const [activeModalPhoto, setActiveModalPhoto] = useState<PastProjectPhoto | null>(null);

  const partners = [
    {
      name: 'Fireflies Energy (Pvt) Ltd',
      role: 'Lead Consortium & System Integrator',
      desc: 'Overall project execution, AI Studio application delivery, edge compute deployment, and commercial warranty.',
      badge: 'CONSORTIUM LEAD',
      color: 'border-[#FFC72C] text-[#FFC72C] bg-[#FFC72C]/10',
    },
    {
      name: 'Ivevane Automation',
      role: 'Electrical & Drives Partner',
      desc: 'Tier-1 electrical engineering, MCC panel fabrication, ABB VSD retrofits, and WEG Soft Starter installation.',
      badge: 'ELECTRICAL & DRIVES',
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      projects: [
        'Mining Automation & VSD Retrofit (DRC)',
        'Heavy Industrial Switchgear & MCC Assembly',
        'Sugar Mill Boiler Automation & Drive Control',
        'Municipal Water SCADA & Telemetry Systems',
      ],
    },
    {
      name: 'Ndebele Visionary Nexus',
      role: 'Fabrication, Training & Cybersecurity Partner',
      desc: 'Structural steel camera mounting fabrication, cybersecurity & data protection protocols, smart transformation strategy, and staff training in Harare/Bulawayo.',
      badge: 'FABRICATION & STRATEGY',
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    },
  ];

  const teamMembers = [
    {
      name: 'Mduduzi Ndebele',
      title: 'Business Development Director & QuarryIQ Architect | CEO Ndebele Visionary Nexus',
      role: 'Consortium Business Strategy & Smart Transformation Lead',
      bio: 'Leads commercial development, client alignment, smart transformation architecture, and local staff training protocols for industrial quarry implementations across Southern Africa.',
      icon: Briefcase,
    },
    {
      name: 'Nhlanhla Ncube',
      title: 'Lead SCADA & Automation Engineer',
      role: 'Automation, SCADA & Industrial Systems Architect',
      profile: 'BSc Honors in Applied Physics (NUST), Siemens Certified TIA Portal and WinCC Programmer, ST-WinCC SCADA Certified. 10+ years of experience. Key Mining Experience: Kamoa Copper SA (DRC) - Phase 2 Milling and Concentrators.',
      icon: GraduationCap,
    },
  ];

  // Past Projects Photo Evidence Gallery
  const pastProjectPhotos: PastProjectPhoto[] = [
    {
      id: 'photo-01',
      title: 'Outdoor MCC Switchgear & Drive Commissioning',
      partner: 'Ivevane Automation & Nhlanhla Ncube',
      location: 'Kamoa Copper SA (DRC) Phase 2',
      description: 'On-site electrical technician terminating power cables and testing cubicle interlocks for outdoor weather-resistant Motor Control Center (MCC) panels and VSD drives.',
      tags: ['MCC Switchgear', 'VSD Commissioning', '10 Cubicles'],
      imageSrc: '/assets/aistudio/5c64843c-ed6e-45d2-b914-8b43594ce9a9_6a991a85.jpeg',
    },
    {
      id: 'photo-02',
      title: 'Heavy Mining Concentrator & Erection Site',
      partner: 'Consortium Industrial Partners',
      location: 'Kamoa Copper Concentrator Plant',
      description: 'Full-scale structural steel erection, crane installation, slurry tanks, and heavy crushing/milling circuit infrastructure during Phase 2 execution.',
      tags: ['Mining Concentrator', 'Structural Steel', 'Heavy Erection'],
      imageSrc: '/assets/aistudio/09386ced-9283-4085-a17d-e6a1239c0e90_854302aa.jpeg',
    },
    {
      id: 'photo-03',
      title: 'Cable Tray Gantries & Thickener Infrastructure',
      partner: 'Electrical & Automation Team',
      location: 'DRC Mining Milling Complex',
      description: 'Panoramic view of elevated cable tray gantries spanning across thickener tanks, routing armored XLPE power cables and shielded SCADA telemetry lines.',
      tags: ['Cable Gantries', 'Armored XLPE', 'Thickener Tanks'],
      imageSrc: '/assets/aistudio/fc7f5107-ee9e-44f2-9ee4-ca6e1282c430_a7f00167.jpeg',
    },
    {
      id: 'photo-04',
      title: 'Process Slurry Piping & High-Pressure Manifolds',
      partner: 'Process Piping & Mechanical Team',
      location: 'DRC Copper Processing Plant',
      description: 'High-pressure flanged steel slurry piping manifolds and pump feed lines supplying concentrator flotation cells and classification cyclones.',
      tags: ['Process Piping', 'Slurry Lines', 'Pump Manifolds'],
      imageSrc: '/assets/aistudio/6db8dfa6-38bd-4a7b-a66e-4a108c0fd4c2_29990a3e.jpeg',
    },
    {
      id: 'photo-05',
      title: 'Plant Yard Integration & Equipment Operations',
      partner: 'Site Logistics & Automation',
      location: 'DRC Concentrator Yard',
      description: 'Operational plant yard featuring mobile machinery, pump banks, and heavy structural frameworks during final SCADA commissioning.',
      tags: ['Plant Yard', 'Pump Banks', 'SCADA Integration'],
      imageSrc: '/assets/aistudio/c34dd702-4aab-4a27-a9c8-a5315f5ccc93_8d12c7ba.jpeg',
    },
  ];

  return (
    <div className="space-y-8 text-[#E2E8F0] font-mono">
      {/* Header Banner */}
      <div className="bg-[#1A1A1F] border border-[#FFC72C]/40 rounded-xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Team &amp; Partner Experience</h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0B0B0F]">
              PHASE 1 CONSORTIUM
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Proven track record in heavy mining automation, electrical retrofits, and local operational handover.
          </p>
        </div>

        <div className="text-right shrink-0 text-xs text-[#FFC72C] bg-stone-900 border border-stone-800 px-3 py-2 rounded-lg">
          <div>Presented by Fireflies Energy</div>
          <div className="text-stone-400 text-[10px]">Harare &amp; Bulawayo Operations</div>
        </div>
      </div>

      {/* Consortium Delivery Partners */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
          <Building2 className="w-5 h-5 text-[#FFC72C]" />
          <h2 className="text-lg font-bold text-white">Delivery Partner Organizations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-[#FFC72C]/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${partner.color}`}>
                    {partner.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{partner.name}</h3>
                <div className="text-xs text-[#FFC72C] font-semibold">{partner.role}</div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">{partner.desc}</p>
              </div>

              {partner.projects && (
                <div className="pt-3 border-t border-stone-800 space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Key Reference Projects:</div>
                  <ul className="space-y-1 text-[11px] text-stone-300 font-sans">
                    {partner.projects.map((proj, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Engineering Leadership */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
          <Award className="w-5 h-5 text-[#FFC72C]" />
          <h2 className="text-lg font-bold text-white">Engineering &amp; Executive Leadership</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member 1: Mduduzi Ndebele */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-3 hover:border-[#FFC72C]/40 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">{teamMembers[0].name}</h3>
                <div className="text-xs text-[#FFC72C] font-bold mt-1 leading-snug">
                  {teamMembers[0].title}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-[#FFC72C] shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-stone-300 font-sans leading-relaxed pt-2">
              {teamMembers[0].bio}
            </p>

            <div className="pt-3 border-t border-stone-800 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cybersecurity &amp; Local Staff Training Coordinator</span>
            </div>
          </div>

          {/* Member 2: Nhlanhla Ncube */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-3 hover:border-[#FFC72C]/40 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">{teamMembers[1].name}</h3>
                <div className="text-xs text-[#FFC72C] font-bold mt-1 leading-snug">
                  {teamMembers[1].title}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-[#FFC72C] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-stone-300 font-sans leading-relaxed pt-2">
              {teamMembers[1].profile}
            </p>

            <div className="pt-3 border-t border-stone-800 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lead Programmer for Siemens S7 PLC &amp; WinCC SCADA</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: PAST PROJECTS PHOTO EVIDENCE GALLERY */}
      <div className="bg-[#1A1A1F] border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFC72C]/20 border border-[#FFC72C]/50 flex items-center justify-center text-[#FFC72C]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Past Project Site Execution Gallery</h2>
              <p className="text-xs text-stone-400 font-sans">
                Real photographic evidence from our team's past heavy mining, MCC switchgear, and concentrator projects (e.g. Kamoa Copper DRC).
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0">
            5 VERIFIED SITE PHOTOS
          </span>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastProjectPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveModalPhoto(photo)}
              className="group bg-stone-900 border border-stone-800 hover:border-[#FFC72C] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-video bg-black">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity border border-stone-700">
                  <Maximize2 className="w-4 h-4 text-[#FFC72C]" />
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono font-bold text-stone-200">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-stone-700 text-[#FFC72C]">
                    {photo.location}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-[#FFC72C] transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <div className="text-[11px] text-[#FFC72C] font-semibold mt-0.5">
                    {photo.partner}
                  </div>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed mt-1.5 line-clamp-3">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-1.5 font-mono">
                  {photo.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {activeModalPhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-mono">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModalPhoto(null)}
          />

          <div className="relative bg-[#1A1A1F] border-2 border-[#FFC72C]/60 rounded-2xl max-w-4xl w-full text-white shadow-2xl overflow-hidden z-10 animate-fadeIn">
            <div className="p-4 bg-[#0B0B0F] border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#FFC72C]" />
                  <span>{activeModalPhoto.title}</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {activeModalPhoto.location} &bull; {activeModalPhoto.partner}
                </p>
              </div>

              <button
                onClick={() => setActiveModalPhoto(null)}
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-black rounded-xl overflow-hidden max-h-[60vh] flex items-center justify-center border border-stone-800">
                <img
                  src={activeModalPhoto.imageSrc}
                  alt={activeModalPhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <div className="text-xs text-[#FFC72C] font-bold">PROJECT SITE DETAILS:</div>
                <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                  {activeModalPhoto.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {activeModalPhoto.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-stone-950 text-[#FFC72C] border border-[#FFC72C]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0B0B0F] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Verified Past Execution Reference</span>
              <button
                onClick={() => setActiveModalPhoto(null)}
                className="px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0B0B0F] font-bold cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
