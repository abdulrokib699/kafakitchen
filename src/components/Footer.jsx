import { scrollTo }    from '../utils/helpers.js'
import { STORE_NAME, STORE_ADDRESS, INSTAGRAM, WA_NUMBER } from '../data/constants.js'

const NAV_LINKS = [
  { label: 'Home',    id: 'home'    },
  { label: 'Menu',    id: 'menu'    },
  { label: 'Galeri',  id: 'gallery' },
  { label: 'Tentang', id: 'about'   },
  { label: 'Kontak',  id: 'contact' },
]

export default function Footer() {
  return (
    <footer className="py-12 px-4" style={{ background: '#3E2723', color: '#FFF5E6' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍞</span>
              <span className="font-pacifico text-2xl" style={{ color: '#E67E22' }}>
                {STORE_NAME}
              </span>
            </div>
            <p
              className="font-poppins text-sm leading-relaxed"
              style={{ color: 'rgba(255,245,230,0.7)' }}
            >
              Roti artisanal premium dibuat dengan cinta setiap harinya.
              Karena Anda layak mendapat yang terbaik.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-poppins font-semibold mb-4" style={{ color: '#E67E22' }}>
              Navigasi
            </h4>
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block mb-2 font-poppins text-sm transition-colors hover:text-orange-300"
                style={{ color: 'rgba(255,245,230,0.7)' }}
              >
                → {l.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold mb-4" style={{ color: '#E67E22' }}>
              Hubungi Kami
            </h4>
            <div
              className="flex flex-col gap-2 font-poppins text-sm"
              style={{ color: 'rgba(255,245,230,0.7)' }}
            >
              <p>📍 {STORE_ADDRESS}</p>
              <p>📞 +62 812-3456-7890</p>
              <p>🕐 Sen–Sab: 08.00–20.00</p>
              <p>📸 {INSTAGRAM}</p>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-6 text-center"
          style={{ borderColor: 'rgba(255,245,230,0.1)' }}
        >
          <p className="font-poppins text-xs" style={{ color: 'rgba(255,245,230,0.5)' }}>
            © {new Date().getFullYear()} {STORE_NAME}. Made with ❤️ and 🍞 | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
