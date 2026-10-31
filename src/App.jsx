import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Categories } from './components/Categories'
import { Schedule } from './components/Schedule'
import { Venue } from './components/Venue'
import { Register } from './components/Register'
import { Organizers } from './components/Organizers'
import { Gallery } from './components/Gallery'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { useAnchorScroll } from './lib/useAnchorScroll'

export default function App() {
  useAnchorScroll()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Categories />
        <Schedule />
        <Venue />
        <Register />
        <Organizers />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
