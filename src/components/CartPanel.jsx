import { Icon }      from '../icons/index.jsx'
import { formatRp }  from '../utils/helpers.js'
import { WA_NUMBER } from '../data/constants.js'
import { scrollTo }  from '../utils/helpers.js'

export default function CartPanel({ cart, onClose, onAdd, onRemove, onDelete }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    const lines = cart
      .map((i) => `• ${i.emoji} ${i.name} x${i.qty} = ${formatRp(i.price * i.qty)}`)
      .join('\n')
    const msg = encodeURIComponent(
      `🛒 *Pesanan dari Kafa Kitchen*\n\n${lines}\n\n*Total: ${formatRp(total)}*\n\nMohon dikonfirmasi. Terima kasih! 🙏`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[80] bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full z-[90] w-full max-w-sm flex flex-col"
        style={{ background: '#fff', boxShadow: '-10px 0 40px rgba(93,58,26,0.2)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'rgba(93,58,26,0.1)' }}
        >
          <div>
            <h3 className="font-poppins font-bold text-secondary text-lg">🛒 Keranjang</h3>
            <p className="font-poppins text-muted text-xs">{cart.length} item dipilih</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full"
            style={{ color: '#5D3A1A', background: 'rgba(93,58,26,0.1)' }}
            aria-label="Tutup keranjang"
          >
            <Icon.X />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2">
              <span className="text-6xl">🛒</span>
              <p className="font-poppins font-semibold text-muted">Keranjang masih kosong</p>
              <p className="font-poppins text-muted text-sm">Yuk pilih roti favoritmu!</p>
              <button
                onClick={() => { onClose(); scrollTo('menu') }}
                className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white font-poppins"
                style={{ background: 'linear-gradient(135deg, #E67E22, #D35400)' }}
              >
                Lihat Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ background: '#FFF5E6', border: '1px solid rgba(93,58,26,0.08)' }}
              >
                <span className="text-4xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-dark text-sm truncate">{item.name}</p>
                  <p className="font-montserrat font-bold text-primary text-sm">
                    {formatRp(item.price * item.qty)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: '#fff', color: '#5D3A1A', border: '1px solid rgba(93,58,26,0.2)' }}
                    aria-label="Kurangi"
                  >
                    <Icon.Minus />
                  </button>
                  <span className="font-montserrat font-bold text-dark text-sm w-5 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onAdd(item)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: '#E67E22', color: '#fff' }}
                    aria-label="Tambah"
                  >
                    <Icon.Plus />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center ml-1"
                    style={{ background: '#fee2e2', color: '#ef4444' }}
                    aria-label="Hapus item"
                  >
                    <Icon.Trash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer checkout */}
        {cart.length > 0 && (
          <div
            className="p-5 border-t"
            style={{ borderColor: 'rgba(93,58,26,0.1)', background: '#FFF5E6' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-poppins font-semibold text-secondary">Total</span>
              <span className="font-montserrat font-bold text-primary text-xl">
                {formatRp(total)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl font-semibold text-white font-poppins
                         flex items-center justify-center gap-2 transition-all duration-200
                         hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              }}
            >
              <Icon.WA />
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}
