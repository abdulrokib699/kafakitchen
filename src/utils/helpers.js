// ── Format Rupiah ────────────────────────────────────────────────────────────
export const formatRp = (amount) =>
  'Rp ' + Number(amount).toLocaleString('id-ID')

// ── Smooth Scroll to Section ─────────────────────────────────────────────────
export const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ── Stock Config ─────────────────────────────────────────────────────────────
export const STOCK_CONFIG = {
  ready:  { label: 'Tersedia',     color: 'bg-emerald-500' },
  almost: { label: 'Hampir Habis', color: 'bg-amber-500'   },
  habis:  { label: 'Habis',        color: 'bg-red-500'     },
}

// ── Tomorrow Date (for min date picker) ─────────────────────────────────────
export const getTomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}
