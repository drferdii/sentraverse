// Architected and built by Classy.
'use client'

import { Sparkles, Activity, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import Audrey from '@/components/Audrey'
import ClinicalPrognosis from '@/components/ClinicalPrognosis'
import ClinicalTrajectory from '@/components/ClinicalTrajectory'
import { layoutGovernance, typeGovernance } from '@/lib/design-governance'
import { cn } from '@/lib/utils'

const tabs = [
  {
    id: 0,
    label: 'TRIAGE & KO-PILOT',
    sub: 'Dukungan keputusan Audrey AI',
    icon: Sparkles,
  },
  {
    id: 1,
    label: 'TRAJEKTORI',
    sub: 'Pemantauan deteriorasi klinis',
    icon: Activity,
  },
  {
    id: 2,
    label: 'PROGNOSIS',
    sub: 'Pemodelan risiko prediktif',
    icon: TrendingUp,
  },
]

export default function ClinicalSuite() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      id="clinical-suite"
      className={cn('bg-background border-b border-muted/20', layoutGovernance.sectionY.standard)}
    >
      <div className={cn(layoutGovernance.container.wide, layoutGovernance.sectionX)}>
        {/* === Header Area === */}
        <div className="mb-10">
          <span className={cn(typeGovernance.eyebrow, 'mb-3 block')}>• RUANG KERJA KLINIS</span>
          <h2 className={cn(typeGovernance.sectionTitle, 'mb-3 max-w-[800px] uppercase')}>
            Ruang kerja klinis yang berjalan otonom
          </h2>
          <p className={cn(typeGovernance.bodySm, 'mb-8 max-w-[680px]')}>
            Sentra AI mengotomatiskan alur kerja klinis, memantau trajektori risiko, dan
            memproyeksikan prognosis pasien secara real-time.
          </p>
        </div>

        {/* === Workspace — border tipis + aksen double-rule ala Sentra === */}
        <div className="rounded-xl border border-muted/15 overflow-hidden">
          <div className="grid md:grid-cols-[260px_1fr]">
            {/* Left Sidebar Tabs */}
            <div className="border-r border-muted/15 flex flex-col bg-foreground/[0.015]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-5 text-left flex items-start gap-4 border-b border-muted/15 transition-all duration-300 cursor-pointer hover:bg-muted/5 ${
                      isActive ? 'bg-foreground/[0.03]' : ''
                    }`}
                  >
                    {/* Left Active Accent Line */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
                    )}

                    <Icon
                      size={16}
                      className={`mt-0.5 transition-colors ${
                        isActive ? 'text-accent' : 'text-muted'
                      }`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-[11px] font-bold tracking-wider font-jakarta transition-colors ${
                          isActive ? 'text-foreground' : 'text-muted'
                        }`}
                      >
                        {tab.label}
                      </span>
                      <span className="text-[9px] text-muted/60 font-jakarta">{tab.sub}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right Content Panel — tinggi mengikuti konten, tidak lagi fixed 820px */}
            <div className="p-4 md:p-6 flex flex-col justify-start bg-foreground/[0.01] w-full min-w-0">
              {activeTab === 0 && <Audrey hideHeader />}
              {activeTab === 1 && <ClinicalTrajectory hideHeader trajectoryOnly />}
              {activeTab === 2 && <ClinicalPrognosis />}
            </div>
          </div>

          {/* Aksen double-rule penutup ala kartu Sentra favorit */}
          <div className="h-[2px] bg-accent" />
          <div className="h-px bg-muted/15" />
        </div>
      </div>
    </section>
  )
}
