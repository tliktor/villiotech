import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden">
      <Link
        to="/kapcsolat"
        className="btn btn-primary btn-block shadow-lg gap-2"
      >
        <FileText className="w-5 h-5" />
        Ajánlatot kérek
      </Link>
    </div>
  )
}
