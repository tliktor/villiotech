import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl opacity-70 mb-8">Az oldal nem található.</p>
      <Link to="/" className="btn btn-primary">Vissza a főoldalra</Link>
    </section>
  )
}
