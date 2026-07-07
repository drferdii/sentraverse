'use client'

import { motion } from 'framer-motion'

import { AssessmentSection } from '@/components/sentrasim/AssessmentSection'
import { getAnomalyStyles } from '@/components/sentrasim/helpers'
import type { SeverityKey, SimulationBranch, SimulationState } from '@/components/sentrasim/types'
import { TextScramble } from '@/components/ui/text-scramble'

type SidebarColumnProps = {
  activeBranch: SimulationBranch
  isDesktopLayout: boolean
  selectedSeverity: SeverityKey
  simulation: SimulationState
  timelineMarkerClassName: string
  visibleMedicationCount: number
  visibleTherapyCount: number
}

export function SidebarColumn({
  activeBranch,
  isDesktopLayout,
  selectedSeverity,
  simulation,
  timelineMarkerClassName,
  visibleMedicationCount,
  visibleTherapyCount,
}: SidebarColumnProps) {
  return (
    <div className="lg:sticky lg:top-32 h-fit flex flex-col gap-12">
      <div className="flex flex-col">
        <div className="text-muted text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4">
          ARTIFICIAL INTELLIGENCE ENTITY: ANAMNESA
        </div>
        <div className="flex flex-col gap-3">
          {activeBranch.anamnesaTags.map((tag, index) => (
            <motion.div
              key={tag.text}
              initial={{ opacity: 0, x: 10 }}
              animate={index < simulation.anamnesaTagCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
              className="flex items-center justify-between text-foreground"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_var(--sdx-c-asesmen)]" />
                <span className="text-lg">{tag.text}</span>
              </div>
              <span className="text-[10px] font-bold border border-muted/20 px-1 rounded text-muted">
                {tag.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {simulation.showVitalsAnomaly ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <div className="text-red-500 text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            TRIAGE ALERT & CONTEXT
          </div>
          <div className="flex flex-col gap-3">
            {activeBranch.anomalyTags.map((tag, index) => {
              const styles = getAnomalyStyles(tag.tone)

              return (
                <motion.div
                  key={tag.text}
                  initial={{ opacity: 0, x: 10 }}
                  animate={
                    index < simulation.vitalsTagCount ? { opacity: 1, x: 0 } : { opacity: 0 }
                  }
                  className={`flex items-center justify-between ${styles.className}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-1 rounded-full ${styles.dotClassName}`}
                      style={styles.dotStyle}
                    />
                    <span className="text-lg">{tag.text}</span>
                  </div>
                  <span className="text-[10px] font-bold border border-current px-1 rounded opacity-80">
                    {tag.type}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ) : null}

      {isDesktopLayout ? (
        <AssessmentSection
          activeBranch={activeBranch}
          diagnosisCount={simulation.diagnosisCount}
          isMobile={false}
          selectedSeverity={selectedSeverity}
          showDiagnosis={simulation.showDiagnosis}
          showManagement={simulation.showManagement}
          timelineMarkerClassName={timelineMarkerClassName}
          visibleMedicationCount={visibleMedicationCount}
          visibleTherapyCount={visibleTherapyCount}
        />
      ) : null}

      {simulation.showTrajectoryInsight ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <div
            className="text-[10px] font-bold tracking-widest uppercase border-b border-muted/20 pb-3 mb-4 flex items-center gap-2"
            style={{ color: 'var(--sentra-warning)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--sentra-warning)' }}
            />
            AI TRAJECTORY INSIGHT
          </div>
          <TextScramble
            key={`trajectory-insight-${selectedSeverity}`}
            as="p"
            duration={0.85}
            speed={0.022}
            className="text-foreground text-lg leading-relaxed"
          >
            {activeBranch.trajectoryInsight}
          </TextScramble>
        </motion.div>
      ) : null}
    </div>
  )
}
