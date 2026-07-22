// Decorative header art for the Home screen: a friendly shield-shaped guard
// mascot standing watch in front of a flat, Duolingo-style castle. Hand-built
// inline SVG so there's no image asset to fetch (keeps "no external network
// calls") and it stays crisp at any size.
export default function CastleGuardIllustration({ className }) {
  return (
    <svg viewBox="0 0 300 246" className={className} aria-hidden="true">
      {/* Castle */}
      <g transform="translate(0 16)">
        {/* connecting wall */}
        <rect x="62" y="118" width="176" height="34" fill="#EADFC8" />
        {/* crenellations */}
        {[62, 84, 106, 128, 174, 196, 218].map((x) => (
          <rect key={x} x={x} y="108" width="14" height="12" fill="#EADFC8" />
        ))}

        {/* left tower */}
        <rect x="48" y="66" width="38" height="86" fill="#EADFC8" />
        <polygon points="44,66 90,66 67,36" fill="#7c3aed" />
        <rect x="60" y="96" width="10" height="14" rx="2" fill="#B99B6B" />

        {/* right tower */}
        <rect x="214" y="66" width="38" height="86" fill="#EADFC8" />
        <polygon points="210,66 256,66 233,36" fill="#7c3aed" />
        <rect x="228" y="96" width="10" height="14" rx="2" fill="#B99B6B" />

        {/* center tower */}
        <rect x="118" y="42" width="64" height="110" fill="#F3E9D4" />
        <polygon points="112,42 188,42 150,6" fill="#4f46e5" />
        <rect x="134" y="66" width="12" height="16" rx="2" fill="#B99B6B" />
        <rect x="154" y="66" width="12" height="16" rx="2" fill="#B99B6B" />

        {/* flag */}
        <line x1="150" y1="6" x2="150" y2="-10" stroke="#9C8158" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="150,-10 172,-4 150,2" fill="#f59e0b" />

        {/* gate arch */}
        <path d="M136 152 v-30 a14 14 0 0 1 28 0 v30 z" fill="#B99B6B" />
      </g>

      {/* Guard mascot */}
      <g transform="translate(150 175)">
        <ellipse cx="0" cy="58" rx="40" ry="7" fill="#2A2340" opacity="0.08" />

        {/* arms */}
        <ellipse cx="-40" cy="-4" rx="9" ry="15" fill="#059669" transform="rotate(-24 -40 -4)" />
        <ellipse cx="42" cy="-20" rx="9" ry="15" fill="#059669" transform="rotate(50 42 -20)" />

        {/* shield body */}
        <path
          d="M0 -55 L36 -40 V0 C36 25 19 44 0 52 C-19 44 -36 25 -36 0 V-40 Z"
          fill="#059669"
        />
        <path
          d="M0 -46 L28 -34 V0 C28 20 15 35 0 42 C-15 35 -28 20 -28 0 V-34 Z"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="2.5"
        />

        {/* chest emblem */}
        <circle cx="0" cy="6" r="12" fill="#ffffff" />
        <path
          d="M-6 6 L-1.5 11 L7 -3"
          stroke="#059669"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* face */}
        <circle cx="-12" cy="-22" r="5.5" fill="#ffffff" />
        <circle cx="12" cy="-22" r="5.5" fill="#ffffff" />
        <circle cx="-12" cy="-21" r="2.6" fill="#1f2933" />
        <circle cx="12" cy="-21" r="2.6" fill="#1f2933" />
        <path d="M-9 -9 Q0 -1 9 -9" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <circle cx="-20" cy="-13" r="3.2" fill="#f472b6" opacity="0.55" />
        <circle cx="20" cy="-13" r="3.2" fill="#f472b6" opacity="0.55" />

        {/* helmet + plume */}
        <path d="M-17 -35 a17 15 0 0 1 34 0 z" fill="#f59e0b" />
        <rect x="-17" y="-37" width="34" height="6" rx="3" fill="#d97706" />
        <path d="M15 -42 q12 -4 9 -18" stroke="#0284c7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
