// Architected and built by Classy.
// [APPROVED]

import About from '@/components/About'
import Audrey from '@/components/Audrey'
import Clients from '@/components/Clients'
import ClinicalTrajectory from '@/components/ClinicalTrajectory'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import News from '@/components/News'
import ProjectSlider from '@/components/ProjectSlider'
import ScrollGallery from '@/components/ScrollGallery'
import SentraBlueprint from '@/components/SentraBlueprint'
import SentraSim from '@/components/SentraSim'
import Services from '@/components/Services'
import Showcase from '@/components/Showcase'

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <ProjectSlider />
      <About />
      <Clients />
      <SentraSim />
      <SentraBlueprint />
      <Showcase />
      <Services />
      <Audrey />
      <ClinicalTrajectory />
      <News />
      <ScrollGallery />
      <FAQ />
      <Footer />
    </main>
  )
}
