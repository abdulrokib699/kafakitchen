import { useState, useEffect } from 'react'
import { Icon }    from '../icons/index.jsx'
import { scrollTo } from '../utils/helpers.js'
import { STORE_NAME } from '../data/constants.js'

const NAV_LINKS = [
  { label: 'Home',   id: 'home'    },
  { label: 'Menu',   id: 'menu'    },
  { label: 'Galeri', id: 'gallery' },
  { label: 'Tentang',id: 'about'   },
  { label: 'Kontak', id: 'contact' },
]

export default function Navbar({ cartCount, onCartOpen, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    scrollTo(id)
    setMobileOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(93,58,26,0.97)' : 'rgba(93,58,26,0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 4px 30px rgba(93,58,26,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ── Logo ── */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2">
          <span className="text-3xl">🍞</span>
          <span className="font-pacifico text-2xl leading-none" style={{ color: '#E67E22' }}>
            {STORE_NAME}
          </span>
        </button>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="px-4 py-2 rounded-full text-sm font-medium font-poppins transition-all duration-200"
              style={{
                color:      activeSection === link.id ? '#E67E22' : '#FFF5E6',
                background: activeSection === link.id ? 'rgba(230,126,34,0.15)' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Cart + Hamburger ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-full transition-colors"
            style={{ color: '#FFF5E6', background: 'rgba(255,245,230,0.1)' }}
            aria-label="Buka keranjang belanja"
          >
            <Icon.Cart />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                           text-xs font-bold text-white font-montserrat"
                style={{ background: '#E67E22' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full"
            style={{ color: '#FFF5E6', background: 'rgba(255,245,230,0.1)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <Icon.X /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'rgba(93,58,26,0.98)', borderColor: 'rgba(230,126,34,0.2)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="w-full text-left px-6 py-4 text-sm font-medium font-poppins
                         border-b flex items-center justify-between transition-colors"
              style={{
                color:       activeSection === link.id ? '#E67E22' : '#FFF5E6',
                borderColor: 'rgba(230,126,34,0.1)',
              }}
            >
              {link.label}
              <Icon.ChevronRight />
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
