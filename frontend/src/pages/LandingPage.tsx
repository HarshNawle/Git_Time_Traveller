// import BranchVisualization from '@/components/landing/BranchVisualization'
import { FeatureHighlights } from '@/components/landing/FeatureHighlights'
import Hero from '@/components/landing/Hero'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Hero />
      <FeatureHighlights />
    </div>
  )
}

export default LandingPage