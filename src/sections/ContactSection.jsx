import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Icon } from '../icons/index.jsx'
import { formatRp, getTomorrow } from '../utils/helpers.js'

const FORM_INITIAL = { name: '', wa: '', product: '', qty: 1, date: '', notes: '' }

export default function ContactSection() {
  const [form, setForm] = useState(FORM_INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]) // untuk dropdown produk
  const [settings, setSettings] = useState({
    whatsapp_number: '',
    address: '',
    maps_url: '',
    opening_hours: ''
  })

  // Ambil data produk dan pengaturan dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Ambil produk yang tersedia (stok > 0 dan status published)
      const { data: productsData } = await supabase
        .from('products')
        .select('id, name, price')
        .eq('status', 'published')
        .gt('stock', 0)
        .order('name')
      if (productsData) setProducts(productsData)

      // Ambil pengaturan toko
      const { data: settingsData } = await supabase
        .from('settings')
        .select('key, value')
      if (settingsData) {
        const settingsMap = {}
        settingsData.forEach(s => { settingsMap[s.key] = s.value })
        setSettings({
          whatsapp_number: settingsMap.whatsapp_number || '6281234567890',
          address: settingsMap.address || 'Jl. Roti Manis No. 18, Bandung',
          maps_url: settingsMap.maps_embed_url || 'https://goo.gl/maps/example',
          opening_hours: settingsMap.opening_hours || 'Sen–Sab: 08.00–20.00 | Min: 08.00–15.00'
        })
      }
    }
    fetchData()
  }, [])

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    if (!form.name || !form.wa || !form.product || !form.date) {
      alert('Mohon lengkapi semua field yang wajib diisi!')
      return
    }
    setLoading(true)

    // Simpan ke database Supabase (tabel orders)
    const { error } = await supabase.from('orders').insert([
      {
        customer_name: form.name,
        whatsapp: form.wa,
        product_name: form.product,
        quantity: form.qty,
        pickup_date: form.date,
        notes: form.notes,
        status: 'pending'
      }
    ])

    if (error) {
      console.error('Gagal menyimpan pesanan:', error)
      alert('Gagal menyimpan pesanan. Silakan coba lagi.')
      setLoading(false)
      return
    }

    // Jika berhasil, kirim WA ke admin
    const msg = encodeURIComponent(
      `🍞 *Pre-Order Kafa Kitchen*\n\n` +
      `👤 Nama: ${form.name}\n` +
      `📱 WA: ${form.wa}\n` +
      `🛒 Produk: ${form.product}\n` +
      `🔢 Jumlah: ${form.qty}\n` +
      `📅 Tanggal Ambil: ${form.date}\n` +
      `📝 Catatan: ${form.notes || '-'}`
    )
    window.open(`https://wa.me/${settings.whatsapp_number}?text=${msg}`, '_blank')

    setLoading(false)
    setSubmitted(true)
  }

  const inputBase = 'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 font-poppins'
  const inputStyle = {
    borderColor: 'rgba(93,58,26,0.2)',
    background: '#fff',
    color: '#3E2723',
  }
  const onFocus = (e) => {
    e.target.style.borderColor = '#E67E22'
    e.target.style.boxShadow = '0 0 0 3px rgba(230,126,34,0.1)'
  }
  const onBlur = (e) => {
    e.target.style.borderColor = 'rgba(93,58,26,0.2)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-poppins font-medium mb-3"
            style={{ background: 'rgba(230,126,34,0.1)', color: '#E67E22' }}
          >
            📬 Kontak & Pre-Order
          </div>
          <h2
            className="font-pacifico mb-3"
            style={{ color: '#5D3A1A', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Yuk, Pesan Sekarang!
          </h2>
          <p className="font-poppins" style={{ color: '#6D4C41' }}>
            Pre-order minimal 1 hari sebelumnya untuk memastikan kesegaran produk kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Pre-order form */}
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{ background: '#FFF5E6', border: '1px solid rgba(93,58,26,0.1)' }}
          >
            <h3
              className="font-poppins font-bold text-secondary mb-6 flex items-center gap-2"
              style={{ fontSize: '1.1rem' }}
            >
              📋 Form Pre-Order
            </h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="font-pacifico mb-2" style={{ color: '#5D3A1A', fontSize: '1.5rem' }}>
                  Pesanan Diterima!
                </h4>
                <p className="font-poppins mb-6" style={{ color: '#6D4C41' }}>
                  Tim kami akan segera menghubungi Anda via WhatsApp untuk konfirmasi pesanan.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(FORM_INITIAL) }}
                  className="px-6 py-3 rounded-xl font-poppins font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #E67E22, #D35400)' }}
                >
                  Pesan Lagi
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Nama */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                    Nama Lengkap <span style={{ color: '#E67E22' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Masukkan nama lengkap Anda"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                    Nomor WhatsApp <span style={{ color: '#E67E22' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    className={inputBase}
                    style={inputStyle}
                    placeholder="08xxxxxxxxxx"
                    value={form.wa}
                    onChange={(e) => update('wa', e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Produk dropdown (dinamis dari database) */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                    Produk yang Dipesan <span style={{ color: '#E67E22' }}>*</span>
                  </label>
                  <select
                    className={inputBase}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.product}
                    onChange={(e) => update('product', e.target.value)}
                  >
                    <option value="">-- Pilih produk --</option>
                    {products.map((p) => (
                      <option key={p.id} value={`${p.name} (${formatRp(p.price)})`}>
                        {p.name} – {formatRp(p.price)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jumlah & Tanggal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                      Jumlah <span style={{ color: '#E67E22' }}>*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className={inputBase}
                      style={inputStyle}
                      value={form.qty}
                      onChange={(e) => update('qty', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                      Tanggal Ambil <span style={{ color: '#E67E22' }}>*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrow()}
                      className={inputBase}
                      style={inputStyle}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                    />
                  </div>
                </div>

                {/* Catatan */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium font-poppins" style={{ color: '#5D3A1A' }}>
                    Catatan Tambahan
                  </label>
                  <textarea
                    rows="3"
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Misal: tulisan di kue, alergi bahan tertentu, dll..."
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold font-poppins text-white
                             flex items-center justify-center gap-2 transition-all duration-200
                             hover:scale-[1.02]"
                  style={{
                    background: loading ? '#ccc' : 'linear-gradient(135deg, #E67E22, #D35400)',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(230,126,34,0.4)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading
                    ? <><span className="animate-spin">⏳</span> Memproses...</>
                    : <><span>📋</span> Kirim Pre-Order via WhatsApp</>
                  }
                </button>
              </div>
            )}
          </div>

          {/* Informasi Toko (dinamis dari Supabase) */}
          <div className="flex flex-col gap-5">
            {/* Map placeholder */}
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FFF5E6, #FFE0B2)',
                height: 220,
                border: '1px solid rgba(93,58,26,0.1)',
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <p className="font-poppins font-semibold" style={{ color: '#5D3A1A' }}>
                  Kafa Kitchen
                </p>
                <p className="font-poppins text-sm" style={{ color: '#6D4C41' }}>
                  {settings.address}
                </p>
                <button
                  className="mt-2 px-4 py-1.5 rounded-full text-xs font-medium font-poppins text-white"
                  style={{ background: '#E67E22' }}
                  onClick={() => window.open(settings.maps_url, '_blank')}
                >
                  Buka di Google Maps
                </button>
              </div>
            </div>

            {/* Contact info cards */}
            <div
              className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200"
              style={{ background: '#FFF5E6', border: '1px solid rgba(93,58,26,0.1)' }}
            >
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(230,126,34,0.15)', color: '#E67E22' }}>
                <Icon.MapPin />
              </div>
              <div>
                <p className="font-poppins font-semibold text-sm" style={{ color: '#5D3A1A' }}>Alamat</p>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: '#6D4C41' }}>{settings.address}</p>
              </div>
            </div>

            <div
              className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: '#FFF5E6', border: '1px solid rgba(93,58,26,0.1)' }}
            >
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(230,126,34,0.15)', color: '#E67E22' }}>
                <Icon.Clock />
              </div>
              <div>
                <p className="font-poppins font-semibold text-sm" style={{ color: '#5D3A1A' }}>Jam Buka</p>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: '#6D4C41' }}>{settings.opening_hours}</p>
              </div>
            </div>

            <div
              className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-200"
              style={{ background: '#FFF5E6', border: '1px solid rgba(93,58,26,0.1)' }}
              onClick={() => window.open(`https://wa.me/${settings.whatsapp_number}`, '_blank')}
            >
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(230,126,34,0.15)', color: '#E67E22' }}>
                <Icon.Phone />
              </div>
              <div>
                <p className="font-poppins font-semibold text-sm" style={{ color: '#5D3A1A' }}>WhatsApp</p>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: '#6D4C41' }}>
                  {settings.whatsapp_number}
                </p>
              </div>
            </div>

            {/* Direct chat button */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent('Halo Kafa Kitchen! Saya ingin bertanya.')}`,
                  '_blank'
                )
              }
              className="w-full py-4 rounded-2xl font-semibold font-poppins text-white
                         flex items-center justify-center gap-3 transition-all duration-200
                         hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              }}
            >
              <Icon.WA />
              Chat Langsung via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}