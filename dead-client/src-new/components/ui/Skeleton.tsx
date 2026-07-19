// React import not required with the react-jsx transform

export interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md ${className || 'h-4 w-full'}`}
      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}
    />
  )
}
