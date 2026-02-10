import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'
import JsonLd from './JsonLd'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-theme">
      <JsonLd />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}
