// Architected and built by Classy.
// [APPROVED]
'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { SIMULATION_BRANCHES } from '@/components/sentrasim/data'
import {
  createInitialSimulationState,
  getDesktopLayoutSnapshot,
  getHeaderColor,
  subscribeDesktopLayout,
} from '@/components/sentrasim/helpers'
import { runSimulationSequence } from '@/components/sentrasim/sequence'
import { SidebarColumn } from '@/components/sentrasim/SidebarColumn'
import { SimulationHero } from '@/components/sentrasim/SimulationHero'
import { TimelineColumn } from '@/components/sentrasim/TimelineColumn'
import type { SeverityKey, SimulationState } from '@/components/sentrasim/types'

const TIMELINE_MARKER_CLASS_NAME =
  'absolute -left-[68.5px] top-2 h-[7px] w-[7px] rounded-full border border-muted bg-[var(--sentra-canvas)]'

export default function SentraSim() {
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityKey>('sedang')
  const activeBranch = SIMULATION_BRANCHES[selectedSeverity]
  const [simulation, setSimulation] = useState<SimulationState>(() =>
    createInitialSimulationState(SIMULATION_BRANCHES.sedang)
  )
  const isDesktopLayout = useSyncExternalStore(
    subscribeDesktopLayout,
    getDesktopLayoutSnapshot,
    () => false
  )
  const isMountedRef = useRef(true)
  const isRunningRef = useRef(false)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const patchSimulation = (patch: Partial<SimulationState>): void => {
    if (!isMountedRef.current) {
      return
    }

    setSimulation((previous) => ({ ...previous, ...patch }))
  }

  const handleSelectSeverity = (nextSeverity: SeverityKey): void => {
    if (isRunningRef.current || nextSeverity === selectedSeverity) {
      return
    }

    setSelectedSeverity(nextSeverity)
    setSimulation(createInitialSimulationState(SIMULATION_BRANCHES[nextSeverity]))
  }

  const runSimulation = async (): Promise<void> => {
    if (isRunningRef.current || simulation.isComplete) {
      return
    }

    isRunningRef.current = true
    patchSimulation({ isRunning: true })

    try {
      await runSimulationSequence(activeBranch, patchSimulation)
    } finally {
      isRunningRef.current = false
      patchSimulation({ isRunning: false })
    }
  }

  const visibleMedicationCount = Math.min(
    simulation.managementCount,
    activeBranch.medications.length
  )
  const visibleTherapyCount = Math.max(
    simulation.managementCount - activeBranch.medications.length,
    0
  )

  return (
    <section
      data-sentra-sim
      data-theme="dark"
      className="bg-background py-24 px-6 md:px-12 border-t border-muted/50 overflow-hidden"
    >
      <SimulationHero
        activeBranch={activeBranch}
        branches={SIMULATION_BRANCHES}
        isComplete={simulation.isComplete}
        isRunning={simulation.isRunning}
        onRunSimulation={runSimulation}
        onSelectSeverity={handleSelectSeverity}
        selectedSeverity={selectedSeverity}
      />

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[800px_1fr] gap-20 relative">
        <div
          className="absolute -top-10 left-0 text-xs font-medium uppercase tracking-widest transition-colors duration-500"
          style={{ color: getHeaderColor(simulation.headerTone) }}
        >
          {simulation.status}
        </div>

        <TimelineColumn
          activeBranch={activeBranch}
          isDesktopLayout={isDesktopLayout}
          onPatchSimulation={patchSimulation}
          selectedSeverity={selectedSeverity}
          simulation={simulation}
          timelineMarkerClassName={TIMELINE_MARKER_CLASS_NAME}
          visibleMedicationCount={visibleMedicationCount}
          visibleTherapyCount={visibleTherapyCount}
        />

        <SidebarColumn
          activeBranch={activeBranch}
          isDesktopLayout={isDesktopLayout}
          selectedSeverity={selectedSeverity}
          simulation={simulation}
          timelineMarkerClassName={TIMELINE_MARKER_CLASS_NAME}
          visibleMedicationCount={visibleMedicationCount}
          visibleTherapyCount={visibleTherapyCount}
        />
      </div>
    </section>
  )
}
