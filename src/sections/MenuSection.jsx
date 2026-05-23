import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

export default function MenuSection({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('Semua')

  const filtered =
    activeTab === 'Semua'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab)

  return (
    <section id="menu" className="py-20 px-4" style={{ background: '#FFF5E6' }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-poppins font-medium mb-3"
            style={{ background: 'rgba(230,126,34,0.1)', color: '#E67E22' }}
          >
            🛒 Menu Kami
          </div>
          <h2
            className="font-pacifico mb-3"
            style={{ color: '#5D3A1A', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Pilihan Roti Terbaik
          </h2>
          <p
            className="font-poppins"
            style={{ color: '#6D4C41', maxWidth: 500, margin: '0 auto' }}
          >
            Dibuat segar setiap pagi menggunakan bahan-bahan premium pilihan
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="px-5 py-2.5 rounded-full text-sm font-medium font-poppins transition-all duration-200"
              style={{
                background: activeTab === cat
                  ? 'linear-gradient(135deg, #E67E22, #D35400)'
                  : '#fff',
                color:      activeTab === cat ? '#fff'    : '#6D4C41',
                border:     activeTab === cat ? 'none'    : '1.5px solid rgba(93,58,26,0.15)',
                boxShadow:  activeTab === cat ? '0 4px 15px rgba(230,126,34,0.4)' : 'none',
                transform:  activeTab === cat ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
