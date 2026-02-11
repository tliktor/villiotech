import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/useTheme'
import Layout from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import SkeletonCard from './components/SkeletonCard'
import SkeletonText from './components/SkeletonText'
import './i18n/config'

// Route-level code splitting
const Home = lazy(() => import('./pages/Home'))
const Lakossagnak = lazy(() => import('./pages/Lakossagnak'))
const Tarsashazaknak = lazy(() => import('./pages/Tarsashazaknak'))
const Munkahelyeknek = lazy(() => import('./pages/Munkahelyeknek'))
const VillamosFelulvizsgalat = lazy(() => import('./pages/szolgaltatasok/VillamosFelulvizsgalat'))
const Villanyszereles = lazy(() => import('./pages/szolgaltatasok/Villanyszereles'))
const ItHalozat = lazy(() => import('./pages/szolgaltatasok/ItHalozat'))
const KeziszerszamFelulvizsgalat = lazy(() => import('./pages/szolgaltatasok/KeziszerszamFelulvizsgalat'))
const EnglishSpeaking = lazy(() => import('./pages/EnglishSpeaking'))
const Rolam = lazy(() => import('./pages/Rolam'))
const Kapcsolat = lazy(() => import('./pages/Kapcsolat'))
const Adatvedelem = lazy(() => import('./pages/Adatvedelem'))
const ASZF = lazy(() => import('./pages/ASZF'))

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="h-12 bg-base-300 rounded mb-8 w-1/3 mx-auto animate-pulse"></div>
      <div className="bento-grid-home bento-grid mb-20">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="max-w-2xl mx-auto">
        <SkeletonText lines={5} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/lakossagnak" element={<Lakossagnak />} />
                  <Route path="/tarsashazaknak" element={<Tarsashazaknak />} />
                  <Route path="/munkahelyeknek" element={<Munkahelyeknek />} />
                  <Route path="/szolgaltatasok/villamos-felulvizsgalat" element={<VillamosFelulvizsgalat />} />
                  <Route path="/szolgaltatasok/villanyszereles" element={<Villanyszereles />} />
                  <Route path="/szolgaltatasok/it-halozat" element={<ItHalozat />} />
                  <Route path="/szolgaltatasok/keziszerszam-felulvizsgalat" element={<KeziszerszamFelulvizsgalat />} />
                  <Route path="/en/english-speaking" element={<EnglishSpeaking />} />
                  <Route path="/rolam" element={<Rolam />} />
                  <Route path="/kapcsolat" element={<Kapcsolat />} />
                  <Route path="/adatvedelem" element={<Adatvedelem />} />
                  <Route path="/aszf" element={<ASZF />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
