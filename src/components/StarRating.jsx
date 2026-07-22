import { StarIcon } from './Icons'

export default function StarRating({ stars, max = 3, size = 'md' }) {
  const dimension = size === 'lg' ? 'h-9 w-9' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${stars} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <StarIcon
          key={i}
          filled={i < stars}
          className={`${dimension} ${i < stars ? 'text-amber-400' : 'text-ink/20'}`}
        />
      ))}
    </div>
  )
}
