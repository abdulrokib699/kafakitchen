import { useState } from 'react'
import { GALLERY, GALLERY_CATEGORIES } from '../data/gallery.js'
import { Icon } from '../icons/index.jsx'

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null)
  const [filter,   setFilter]   = useState('Semua')

  const filtered =
    filter === 'Semua'
      ? GALLERY
      : GALLERY.filter((g) => g.category === filter)

  return (
    <section id="gallery" className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-poppins font-medium mb-3"
            style={{ background: 'rgba(230,126,34,0.1)', color: '#E67E22' }}
          >
            📸 Galeri
          </div>
          <h2
            className="font-pacifico mb-3"
            style={{ color: '#5D3A1A', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Momen & Kreasi Kami
          </h2>
          <p className="font-poppins" style={{ color: '#6D4C41' }}>
            Setiap foto bercerita tentang passion kami dalam membuat roti terbaik
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-poppins transition-all duration-200"
              style={{
                background: filter === cat ? '#5D3A1A' : 'transparent',
                color:      filter === cat ? '#fff'    : '#6D4C41',
                border:     `1.5px solid ${filter === cat ? '#5D3A1A' : 'rgba(93,58,26,0.2)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Photo Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((item, i) => {
            const isLarge = i === 0 || i === 5
            return (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group
                            transition-all duration-300 hover:scale-[1.03] hover:shadow-xl
                            ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ minHeight: 160, aspectRatio: '1/1' }}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bg}
                               flex items-center justify-center`}
                >
                  <span
                    style={{ fontSize: isLarge ? '6rem' : '3.5rem' }}
                  >
                    {item.emoji}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               flex items-end p-3"
                >
                  <span className="text-white text-xs font-medium font-poppins">
                    {item.caption}
                  </span>
                </div>

                {/* Category chip */}
                <div
                  className="absolute top-2 right-2 px-2 py-0.5 rounded-full font-poppins"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: '#5D3A1A',
                    fontSize: '0.6rem',
                  }}
                >
                  {item.category}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`bg-gradient-to-br ${lightbox.bg} flex items-center justify-center`}
              style={{ aspectRatio: '4/3' }}
            >
              <span style={{ fontSize: '8rem' }}>{lightbox.emoji}</span>
            </div>
            <div className="p-4" style={{ background: '#fff' }}>
              <p className="font-poppins font-semibold" style={{ color: '#3E2723' }}>
                {lightbox.caption}
              </p>
              <p className="font-poppins text-sm" style={{ color: '#6D4C41' }}>
                Kategori: {lightbox.category}
              </p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
              aria-label="Tutup lightbox"
            >
              <Icon.X />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
