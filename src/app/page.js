import HeroVideo from '@/components/HeroVideo'
import FeaturesSection from '@/components/FeaturesSection'
import RingSection from '@/components/RingSection'
import BiomarkerSection from '@/components/BiomarkerSection'
import HorizontalScrollSection from '@/components/HorizontalScrollSection'
import CardCarousel from '@/components/CardCarousel'

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <FeaturesSection />
      <RingSection />
      {/* <BiomarkerSection /> */}
      <HorizontalScrollSection />
      <CardCarousel />
    </main>
  )
}