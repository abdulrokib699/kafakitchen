import { useState } from 'react'
import { Icon }        from '../icons/index.jsx'
import { formatRp } from '../utils/helpers.js'
import { WA_NUMBER }   from '../data/constants.js'

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const isHabis = product.stock === 0 || product.stock <= 0

  // Konfigurasi stok berdasarkan integer stock
  const getStockConfig = () => {
    if (product.stock === undefined || product.stock === null) return { label: 'Tersedia', color: 'bg-green-500' }
    if (product.stock === 0) return { label: 'Habis', color: 'bg-red-500' }
    if (product.stock <= 5) return { label: 'Hampir Habis', color: 'bg-yellow-500' }
    return { label: 'Tersedia', color: 'bg-green-500' }
  }
  const stockConfig = getStockConfig()

  const handleWA = () => {
    const msg = encodeURIComponent(
      `Halo Kafa Kitchen! Saya mau pesan *${product.name}* (${formatRp(product.price)}). Apakah masih tersedia?`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
      style={{
        background:  '#fff',
        boxShadow:   hovered ? '0 20px 40px rgba(93,58,26,0.15)' : '0 4px 20px rgba(93,58,26,0.08)',
        transform:   hovered ? 'translateY(-6px)' : 'translateY(0)',
        border:      '1px solid rgba(93,58,26,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product image area */}
      <div
        className="relative aspect-square flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF5E6, #FFE0B2)' }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          />
        ) : (
          <span
            style={{
              fontSize:   '4rem',
              filter:     'drop-shadow(0 4px 8px rgba(93,58,26,0.2))',
              transition: 'transform 0.3s',
              transform:  hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            🥖
          </span>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_best_seller && (
            <span
              className="px-2 py-0.5 rounded-full font-bold text-white font-poppins"
              style={{ background: '#E74C3C', fontSize: '0.6rem' }}
            >
              ⭐ Best Seller
            </span>
          )}
          {product.is_new && (
            <span
              className="px-2 py-0.5 rounded-full font-bold text-white font-poppins"
              style={{ background: '#27AE60', fontSize: '0.6rem' }}
            >
              ✨ New
            </span>
          )}
        </div>

        {/* Stock indicator */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.9)' }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${stockConfig.color}`} />
          <span className="font-poppins font-semibold" style={{ color: '#3E2723', fontSize: '0.55rem' }}>
            {stockConfig.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col">
        <h3
          className="font-poppins font-semibold mb-1 leading-tight"
          style={{ color: '#3E2723', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}
        >
          {product.name}
        </h3>
        <p
          className="line-clamp-1 flex-1 font-poppins"
          style={{ color: '#6D4C41', fontSize: '0.7rem', marginBottom: '0.5rem' }}
        >
          {product.description}
        </p>
        <div
          className="font-montserrat font-bold mb-3"
          style={{ color: '#E67E22', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
        >
          {formatRp(product.price)}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => !isHabis && onAddToCart(product)}
            disabled={isHabis}
            className="flex-1 py-2 rounded-xl text-xs font-semibold font-poppins transition-all duration-200"
            style={{
              background: isHabis ? '#e5e5e5' : 'linear-gradient(135deg, #E67E22, #D35400)',
              color:      isHabis ? '#999'    : '#fff',
              cursor:     isHabis ? 'not-allowed' : 'pointer',
            }}
          >
            {isHabis ? 'Habis' : 'Tambah'}
          </button>
          <button
            onClick={handleWA}
            className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
            style={{ background: '#25D366', color: '#fff' }}
            title="Pesan via WhatsApp"
            aria-label="Pesan via WhatsApp"
          >
            <Icon.WA />
          </button>
        </div>
      </div>
    </div>
  )
}