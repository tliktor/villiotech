import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import Layout from './components/Layout'
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
const Rolam = lazy(() => import('./pages/Rolam'))
const Kapcsolat = lazy(() => import('./pages/Kapcsolat'))
const Adatvedelem = lazy(() => import('./pages/Adatvedelem'))
const ASZF = lazy(() => import('./pages/ASZF'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
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
              <Route path="/rolam" element={<Rolam />} />
              <Route path="/kapcsolat" element={<Kapcsolat />} />
              <Route path="/adatvedelem" element={<Adatvedelem />} />
              <Route path="/aszf" element={<ASZF />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
