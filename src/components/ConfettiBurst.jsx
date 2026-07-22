import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const COLORS = ['#f59e0b', '#db2777', '#7c3aed', '#0284c7', '#059669', '#0d9488']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function ConfettiBurst({ count = 26 }) {
  const reducedMotion = usePrefersReducedMotion()
  if (reducedMotion) return null

  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${randomBetween(4, 96)}%`,
    xDrift: `${randomBetween(-90, 90)}px`,
    rot: `${randomBetween(180, 720)}deg`,
    duration: `${Math.round(randomBetween(700, 1100))}ms`,
    delay: `${Math.round(randomBetween(0, 150))}ms`,
    color: COLORS[i % COLORS.length],
    width: randomBetween(6, 10),
    height: randomBetween(3, 5),
  }))

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="animate-confetti absolute top-0 rounded-sm"
          style={{
            left: piece.left,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            '--x-drift': piece.xDrift,
            '--rot': piece.rot,
            '--duration': piece.duration,
          }}
        />
      ))}
    </div>
  )
}
