import { useState, useEffect } from 'react'
import Navbar        from './components/Navbar.jsx'
import Toast         from './components/Toast.jsx'
import CartPanel     from './components/CartPanel.jsx'
import Footer        from './components/Footer.jsx'
import HeroSection   from './sections/HeroSection.jsx'
import MenuSection   from './sections/MenuSection.jsx'
import GallerySection from './sections/GallerySection.jsx'
import AboutSection  from './sections/AboutSection.jsx'
import ContactSection from './sections/ContactSection.jsx'
import { WA_NUMBER } from './data/constants.js'
import { Icon }      from './icons/index.jsx'

export default function App() {
  const [cart, setCart]           = useState([])
  const [cartOpen, setCartOpen]   = useState(false)
  const [toasts, setToasts]       = useState([])
  const [activeSection, setActiveSection] = useState('home')

  /* ── Track active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = ['home', 'menu', 'gallery', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.35 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  /* ── Toast helper ── */
  const addToast = (msg) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000)
  }

  /* ── Cart helpers ── */
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    addToast(`${product.emoji} ${product.name} ditambahkan ke keranjang!`)
  }

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter((i) => i.qty > 0)
    )
  }

  const deleteFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        activeSection={activeSection}
      />

      <Toast toasts={toasts} />

      <main>
        <HeroSection />
        <MenuSection onAddToCart={addToCart} />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {cartOpen && (
        <CartPanel
          cart={cart}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onDelete={deleteFromCart}
        />
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() =>
          window.open(
            `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Kafa Kitchen! 🍞 Saya ingin bertanya.')}`,
            '_blank'
          )
        }
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 20px rgba(37,211,102,0.5)' }}
        title="Chat WhatsApp"
        aria-label="Hubungi via WhatsApp"
      >
        <Icon.WA />
      </button>
    </>
  )
}
