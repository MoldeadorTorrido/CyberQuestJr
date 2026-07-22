import { StarIcon } from './Icons'
import { useTranslation } from '../i18n/strings'

export default function StarRating({ stars, max = 3, size = 'md' }) {
  const dimension = size === 'lg' ? 'h-9 w-9' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'
  const { t } = useTranslation()

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={t('starsAria', { stars, max })}
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
