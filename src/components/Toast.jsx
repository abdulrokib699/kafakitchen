export default function Toast({ toasts }) {
  return (
    <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-secondary text-cream px-4 py-3 rounded-xl shadow-xl text-sm
                     font-medium font-poppins flex items-center gap-2 pointer-events-auto
                     animate-slide-right"
        >
          <span>✅</span> {t.msg}
        </div>
      ))}
    </div>
  )
}
