import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Icon } from '../icons/index.jsx'

const ABOUT_BADGES = [
  { icon: '🏆', text: 'Best Bakery 2023', sub: 'Food Awards Indonesia', delay: '0s' },
  { icon: '❤️', text: 'Dibuat dengan cinta', sub: 'Setiap hari', delay: '0.5s' },
]

export default function AboutSection() {
  const [aboutText, setAboutText] = useState('')
  const [openingHours, setOpeningHours] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Ambil settings
      const { data: settingsData } = await supabase
        .from('settings')
        .select('key, value')
      
      if (settingsData) {
        const settingsMap = {}
        settingsData.forEach(s => { settingsMap[s.key] = s.value })
        
        // About text
        setAboutText(settingsMap.about_text || 'Kafa Kitchen lahir dari dapur kecil keluarga pada tahun 2018. Berawal dari kecintaan mendalam terhadap seni membuat roti dan keinginan berbagi kelezatan dengan semua orang. Kami percaya bahwa roti yang baik bukan hanya soal bahan – melainkan tentang cinta, waktu, dan dedikasi yang tercurahkan di setiap adonan.')
        
        // Opening hours: bisa dalam format JSON string atau teks biasa. Asumsikan string multi-baris atau JSON.
        // Jika dalam format JSON array: [{"day":"Senin","time":"08:00 - 20:00"}, ...]
        const hoursRaw = settingsMap.opening_hours || 'Senin - Sabtu: 08.00 - 20.00\nMinggu: 08.00 - 15.00'
        // Coba parse jika JSON
        try {
          const parsed = JSON.parse(hoursRaw)
          if (Array.isArray(parsed)) setOpeningHours(parsed)
          else setOpeningHours([{ day: 'Senin - Sabtu', time: '08.00 - 20.00' }, { day: 'Minggu', time: '08.00 - 15.00' }])
        } catch {
          // Jika bukan JSON, konversi teks biasa ke array
          const lines = hoursRaw.split('\n')
          const hoursArray = lines.map(line => {
            const [day, time] = line.split(':')
            return { day: day.trim(), time: time.trim() }
          })
          setOpeningHours(hoursArray)
        }
        
        // Payment methods: bisa dalam bentuk JSON array
        const paymentsRaw = settingsMap.payment_methods || '["QRIS", "Bank Transfer", "Cash"]'
        try {
          const parsed = JSON.parse(paymentsRaw)
          setPaymentMethods(parsed)
        } catch {
          setPaymentMethods(['QRIS', 'Bank Transfer', 'Cash'])
        }
      }
      
      // Ambil testimoni yang sudah disetujui
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(3)
      
      if (testimonialsData) {
        // Format testimoni sesuai kebutuhan komponen
        const formatted = testimonialsData.map(t => ({
          id: t.id,
          name: t.name,
          text: t.text,
          rating: t.rating,
          date: new Date(t.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
          avatar: t.name.charAt(0).toUpperCase()
        }))
        setTestimonials(formatted)
      }
      
      setLoading(false)
    }
    
    fetchData()
  }, [])

  return (
    <section
      id="about"
      className="py-20 px-4"
      style={{ background: 'linear-gradient(135deg, #FFF5E6, #FFE0B2)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Visual - tetap statis */}
          <div className="relative flex items-center justify-center order-2 md:order-1">
            <div className="relative">
              <div
                className="w-72 h-72 md:w-96 md:h-96 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(93,58,26,0.1), rgba(230,126,34,0.2))',
                  border: '2px dashed rgba(230,126,34,0.4)',
                }}
              >
                <span className="animate-float" style={{ fontSize: '8rem' }}>👨‍🍳</span>
              </div>

              {ABOUT_BADGES.map(({ icon, text, sub, delay }, i) => (
                <div
                  key={i}
                  className="absolute p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float"
                  style={{
                    background: '#fff',
                    minWidth: 160,
                    animationDelay: delay,
                    ...(i === 0
                      ? { top: '-5%', right: '-10%' }
                      : { bottom: '5%', left: '-10%' }),
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>{icon}</span>
                  <div>
                    <p className="font-poppins font-semibold" style={{ color: '#3E2723', fontSize: '0.8rem' }}>
                      {text}
                    </p>
                    <p className="font-poppins" style={{ color: '#6D4C41', fontSize: '0.7rem' }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-poppins font-medium mb-4"
              style={{ background: 'rgba(230,126,34,0.1)', color: '#E67E22' }}
            >
              🏠 Tentang Kami
            </div>

            <h2
              className="font-pacifico mb-6 leading-tight"
              style={{ color: '#5D3A1A', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Kisah di Balik<br />
              <span style={{ color: '#E67E22' }}>Setiap Roti</span>
            </h2>

            <p className="font-poppins mb-4 leading-relaxed" style={{ color: '#6D4C41' }}>
              {aboutText.split('\n')[0]}
            </p>
            {aboutText.split('\n').slice(1).map((para, idx) => (
              <p key={idx} className="font-poppins mb-4 leading-relaxed" style={{ color: '#6D4C41' }}>
                {para}
              </p>
            ))}

            {/* Hours */}
            <div
              className="rounded-2xl p-5 mb-6"
              style={{ background: '#fff', border: '1px solid rgba(93,58,26,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-4" style={{ color: '#5D3A1A' }}>
                <Icon.Clock />
                <span className="font-poppins font-semibold">Jam Operasional</span>
              </div>
              {openingHours.map(({ day, time }) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: 'rgba(93,58,26,0.08)' }}
                >
                  <span className="font-poppins text-sm" style={{ color: '#6D4C41' }}>{day}</span>
                  <span className="font-montserrat font-bold text-sm" style={{ color: '#E67E22' }}>
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div>
              <p className="font-poppins font-semibold text-sm mb-3" style={{ color: '#3E2723' }}>
                💳 Metode Pembayaran
              </p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1.5 rounded-lg text-sm font-poppins font-medium"
                    style={{ background: 'rgba(230,126,34,0.1)', color: '#E67E22', fontSize: '0.8rem' }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        {!loading && testimonials.length > 0 && (
          <div className="mt-20">
            <h3
              className="font-pacifico text-center mb-10"
              style={{ color: '#5D3A1A', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Kata Pelanggan Kami ❤️
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: '#fff',
                    boxShadow: '0 4px 20px rgba(93,58,26,0.08)',
                    border: '1px solid rgba(93,58,26,0.06)',
                  }}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon.Star key={i} filled={i < t.rating} />
                    ))}
                  </div>
                  <p
                    className="font-poppins italic mb-4 leading-relaxed"
                    style={{ color: '#6D4C41', fontSize: '0.85rem' }}
                  >
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center
                                 font-bold text-white font-poppins"
                      style={{ background: 'linear-gradient(135deg, #E67E22, #5D3A1A)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-sm" style={{ color: '#3E2723' }}>
                        {t.name}
                      </p>
                      <p className="font-poppins text-xs" style={{ color: '#6D4C41' }}>
                        {t.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}