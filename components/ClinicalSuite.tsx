// Architected and built by Classy.
'use client'

import { Sparkles, Activity, FileText, Share2 } from 'lucide-react'
import { useState } from 'react'

import Audrey from '@/components/Audrey'
import ClinicalTrajectory from '@/components/ClinicalTrajectory'
import { layoutGovernance, typeGovernance } from '@/lib/design-governance'
import { cn } from '@/lib/utils'

const tabs = [
  {
    id: 0,
    label: 'TRIAGE & CO-PILOT',
    sub: 'Audrey AI decision support',
    icon: Sparkles,
  },
  {
    id: 1,
    label: 'TRAJECTORY & PROGNOSIS',
    sub: 'Predictive risk modeling',
    icon: Activity,
  },
  {
    id: 2,
    label: 'ENTITY EXTRACTION',
    sub: 'Clinical NLP synthesis (Coming Soon)',
    icon: FileText,
    disabled: true,
  },
  {
    id: 3,
    label: 'REFERRAL & AUTO-DOC',
    sub: 'Automated documentation (Coming Soon)',
    icon: Share2,
    disabled: true,
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
          <span className={cn(typeGovernance.eyebrow, 'mb-3 block')}>• CLINICAL WORKSPACE</span>
          <h2 className={cn(typeGovernance.sectionTitle, 'mb-3 max-w-[800px] uppercase')}>
            Your clinical workspace runs autonomously
          </h2>
          <p className={cn(typeGovernance.bodySm, 'mb-8 max-w-[680px]')}>
            Sentra AI automates clinical workflows, extracts structured entities from raw
            narratives, and maps risk trajectories in real-time.
          </p>
        </div>

        {/* === Rigid Factory Workspace (Grid 2-Kolom) === */}
        <div className="border border-muted/15 bg-[#0a0a0a] grid md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] h-auto md:h-[820px] rounded-none overflow-hidden">
          {/* Left Sidebar Tabs */}
          <div className="border-r border-muted/15 flex flex-col h-full bg-[#080808]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  disabled={tab.disabled}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  className={`relative p-5 text-left flex items-start gap-4 border-b border-muted/15 transition-all duration-300 ${
                    tab.disabled
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-muted/5'
                  } ${isActive ? 'bg-foreground/[0.02]' : ''}`}
                >
                  {/* Left Active Accent Line */}
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />}

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

          {/* Right Content Panel */}
          <div className="p-4 md:p-6 flex flex-col justify-start bg-foreground/[0.01] w-full min-w-0 h-full overflow-y-auto">
            {/* Tab 0: Audrey Co-Pilot */}
            {activeTab === 0 ? <Audrey hideHeader={true} /> : null}

            {/* Tab 1: Trajectory & Prognosis */}
            {activeTab === 1 ? <ClinicalTrajectory hideHeader={true} /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
