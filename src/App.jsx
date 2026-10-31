import { Navbar } from './components/Navbar'
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
import { event } from './data/event'
import { useAnchorScroll } from './lib/useAnchorScroll'

export default function App() {
  useAnchorScroll()

  return (
    <>
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

      {/* sticky mobile call-to-action */}
      <a
        href="#form"
        className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-crimson-500 py-3.5 text-center font-bold text-white shadow-2xl shadow-black/50 md:hidden"
      >
        Register for {event.name}
      </a>
    </>
  )
}
