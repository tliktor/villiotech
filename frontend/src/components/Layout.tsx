import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'
import JsonLd from './JsonLd'
import Breadcrumb from './Breadcrumb'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Scroll to top and focus first h1 on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Focus first h1 for screen readers
    const firstHeading = document.querySelector('h1')
    if (firstHeading) {
      firstHeading.focus()
    }
  }, [pathname])

  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (mainRef.current) {
      mainRef.current.focus()
      mainRef.current.scrollIntoView()
    }
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-theme">
      <a href="#main-content" className="skip-to-main" onClick={handleSkipToMain}>
        Skip to main content
      </a>
      <JsonLd />
      <Navbar />
      <Breadcrumb />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}
