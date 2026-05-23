import { useState, useEffect } from 'react'
import { scrollTo } from '../utils/helpers.js'
import { STORE_NAME } from '../data/constants.js'

const BREADS    = ['🥐', '🍞', '🧁', '🎂', '🍰', '🥖', '🍫', '🫓']
const HERO_STATS = [
  ['500+', 'Produk Terjual'],
  ['4.9★', 'Rating Pelanggan'],
  ['6+',   'Tahun Berpengalaman'],
]
const FLOATING_ITEMS = [
  { emoji: '🍞', style: { top: '-10%', left: '-10%' },   size: '4rem',   delay: '0.5s' },
  { emoji: '🎂', style: { top: '-10%', right: '-10%' },  size: '3.5rem', delay: '1s'   },
  { emoji: '🍪', style: { bottom: '-5%', left: '0%' },   size: '3rem',   delay: '1.5s' },
  { emoji: '🧁', style: { bottom: '0%', right: '-5%' },  size: '3.5rem', delay: '0.8s' },
]

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE0B2 50%, #FFCCBC 100%)' }}
    >
      {/* ── Floating bread emojis (background decoration) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BREADS.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl md:text-6xl opacity-10 animate-float"
            style={{
              left:            `${(i * 13 + 5) % 90}%`,
              top:             `${(i * 17 + 10) % 80}%`,
              animationDelay:  `${i * 0.4}s`,
              animationDuration:`${3 + (i % 3)}s`,
              transform:       `rotate(${i * 15}deg)`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* ── Glow circles ── */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E67E22, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5D3A1A, transparent)' }}
      />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text column */}
        <div
          className="text-center md:text-left transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)' }}
        >
          {/* Promo badge */}
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-medium font-poppins mb-4"
            style={{ background: 'rgba(230,126,34,0.15)', color: '#E67E22' }}
          >
            🎉 Gratis ongkir minimal belanja Rp 50.000
          </div>

          {/* Heading */}
          <h1
            className="font-pacifico mb-4 leading-tight"
            style={{ color: '#5D3A1A', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Roti Hangat,
            <br />
            <span style={{ color: '#E67E22' }}>Senyuman Tulus</span>
          </h1>

          <p
            className="font-poppins text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed"
            style={{ color: '#6D4C41' }}
          >
            Dibuat dengan cinta setiap harinya. Roti artisanal premium dari bahan pilihan,
            fresh from the oven sejak 2018.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => scrollTo('menu')}
              className="px-8 py-4 rounded-full font-semibold font-poppins text-white
                         shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #E67E22, #D35400)' }}
            >
              🍞 Lihat Menu
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 rounded-full font-semibold font-poppins border-2
                         transition-all duration-200 hover:scale-105"
              style={{ color: '#5D3A1A', borderColor: '#5D3A1A', background: 'rgba(255,245,230,0.8)' }}
            >
              📋 Pre-Order
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 justify-center md:justify-start">
            {HERO_STATS.map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-montserrat font-bold text-2xl" style={{ color: '#5D3A1A' }}>
                  {num}
                </div>
                <div className="font-poppins text-xs" style={{ color: '#6D4C41' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual column */}
        <div
          className="relative flex items-center justify-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transitionDelay: '0.2s',
          }}
        >
          {/* Outer dashed ring */}
          <div
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(230,126,34,0.2), rgba(93,58,26,0.1))',
              border: '2px dashed rgba(230,126,34,0.4)',
            }}
          >
            {/* Inner circle */}
            <div
              className="w-60 h-60 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #FFF5E6, #FFE0B2)',
                border: '4px solid rgba(230,126,34,0.3)',
              }}
            >
              <span
                className="animate-float"
                style={{
                  fontSize: '8rem',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 8px 16px rgba(93,58,26,0.3))',
                }}
              >
                🥐
              </span>
            </div>

            {/* Floating satellite items */}
            {FLOATING_ITEMS.map(({ emoji, style, size, delay }, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center shadow-lg animate-float"
                style={{
                  ...style,
                  width: size,
                  height: size,
                  background: '#FFF5E6',
                  border: '2px solid rgba(230,126,34,0.3)',
                  fontSize: `calc(${size} * 0.55)`,
                  animationDelay: delay,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-poppins text-xs" style={{ color: '#6D4C41' }}>Scroll</span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: '#6D4C41' }}
        >
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#E67E22' }} />
        </div>
      </div>
    </section>
  )
}
