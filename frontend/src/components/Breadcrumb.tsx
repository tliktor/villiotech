import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const routeNames: Record<string, { hu: string; en: string }> = {
  '/': { hu: 'Főoldal', en: 'Home' },
  '/lakossagnak': { hu: 'Lakosságnak', en: 'For Residents' },
  '/munkahelyeknek': { hu: 'Munkahelyeknek', en: 'For Workplaces' },
  '/tarsashazaknak': { hu: 'Társasházaknak', en: 'For Condominiums' },
  '/villanyszereles': { hu: 'Villanyszerelés', en: 'Electrical Work' },
  '/villamos-felulvizsgalat': { hu: 'Villamos Felülvizsgálat', en: 'Electrical Inspection' },
  '/keziszerszam-felulvizsgalat': { hu: 'Kéziszerszám Felülvizsgálat', en: 'Hand Tool Inspection' },
  '/it-halozat': { hu: 'IT Hálózat', en: 'IT Network' },
  '/rolam': { hu: 'Rólam', en: 'About Me' },
  '/kapcsolat': { hu: 'Kapcsolat', en: 'Contact' },
  '/aszf': { hu: 'ÁSZF', en: 'Terms' },
  '/adatvedelem': { hu: 'Adatvédelem', en: 'Privacy' },
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  if (pathname === '/') return null

  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ path: '/', label: routeNames['/'][i18n.language as 'hu' | 'en'] }]

  let currentPath = ''
  paths.forEach((segment) => {
    currentPath += `/${segment}`
    const route = routeNames[currentPath]
    if (route) {
      breadcrumbs.push({ path: currentPath, label: route[i18n.language as 'hu' | 'en'] })
    }
  })

  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-4 py-3">
        <div className="breadcrumbs text-sm">
          <ul>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path}>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-base-content/70">{crumb.label}</span>
                ) : (
                  <Link to={crumb.path} className="hover:text-primary">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
