interface SkeletonCardProps {
  className?: string
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`rounded-box p-6 animate-pulse bg-base-200 ${className}`}>
      <div className="w-10 h-10 bg-base-300 rounded mb-4"></div>
      <div className="h-6 bg-base-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-base-300 rounded mb-4 w-full"></div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-base-300 rounded w-5/6"></div>
        <div className="h-4 bg-base-300 rounded w-4/5"></div>
        <div className="h-4 bg-base-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-300 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-base-300 rounded w-24 mx-auto"></div>
    </div>
  )
}