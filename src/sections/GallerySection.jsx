import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Icon } from '../icons/index.jsx'

// Kategori tetap (opsional, bisa juga dari database)
const GALLERY_CATEGORIES = ['Semua', 'Produk', 'Toko', 'Proses', 'Event']

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null)
  const [filter, setFilter] = useState('Semua')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)
      let query = supabase
        .from('gallery')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true })

      const { data, error } = await query
      if (!error) {
        setItems(data)
      } else {
        console.error('Error fetching gallery:', error)
      }
      setLoading(false)
    }
    fetchGallery()
  }, [])

  // Filter berdasarkan kategori
  const filteredItems =
    filter === 'Semua'
      ? items
      : items.filter((item) => item.category === filter)

  // Helper untuk mendapatkan URL thumbnail (jika video YouTube)
  const getVideoThumbnail = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    if (videoId) return `https://img.youtube.com/vi/${videoId}/0.jpg`
    return null
  }

  // Helper untuk menentukan apakah item adalah video
  const isVideo = (item) => item.video_url && item.video_url.trim() !== ''

  return (
    <section id="gallery" className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
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

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-poppins transition-all duration-200"
              style={{
                background: filter === cat ? '#5D3A1A' : 'transparent',
                color: filter === cat ? '#fff' : '#6D4C41',
                border: `1.5px solid ${filter === cat ? '#5D3A1A' : 'rgba(93,58,26,0.2)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-2 text-brown-600">Memuat galeri...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-10 text-brown-600">
            Belum ada konten galeri.
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredItems.map((item, idx) => {
              const isLarge = idx === 0 || idx === 5 // atur sesuai keinginan
              const thumbUrl = item.image_url || getVideoThumbnail(item.video_url)
              const isVideoItem = isVideo(item)

              return (
                <div
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group
                              transition-all duration-300 hover:scale-[1.03] hover:shadow-xl
                              ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ minHeight: 160, aspectRatio: '1/1' }}
                >
                  {/* Background Image or Placeholder */}
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={item.caption || 'Galeri'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200"
                    >
                      <span className="text-4xl">🍞</span>
                    </div>
                  )}

                  {/* Video icon overlay */}
                  {isVideoItem && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay caption */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
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
        )}
      </div>

      {/* Lightbox Modal */}
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
            {/* Lightbox content */}
            <div className="relative flex items-center justify-center bg-black/50" style={{ aspectRatio: '4/3' }}>
              {isVideo(lightbox) ? (
                <iframe
                  src={lightbox.video_url.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                  title="Video galeri"
                />
              ) : lightbox.image_url ? (
                <img src={lightbox.image_url} alt={lightbox.caption} className="w-full h-full object-contain" />
              ) : (
                <span className="text-8xl">🍞</span>
              )}
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