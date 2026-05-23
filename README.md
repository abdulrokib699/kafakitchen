# 🍞 Kafa Kitchen – Website SPA

Website toko roti modern berbasis Single Page Application (SPA) dengan navigasi smooth scroll.

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build hasil
npm run preview
```

Buka http://localhost:5173 di browser.

## 📁 Struktur Proyek

```
kafa-kitchen/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   ├── constants.js      ← Konfigurasi toko (nama, WA, alamat, jam buka)
│   │   ├── products.js       ← Data katalog produk
│   │   ├── gallery.js        ← Data galeri foto
│   │   └── testimonials.js   ← Data testimoni pelanggan
│   ├── utils/
│   │   └── helpers.js        ← Fungsi utilitas (formatRp, scrollTo, dll)
│   ├── icons/
│   │   └── index.jsx         ← Semua ikon SVG inline
│   ├── components/
│   │   ├── Navbar.jsx        ← Navigasi sticky + hamburger mobile
│   │   ├── Toast.jsx         ← Notifikasi toast
│   │   ├── CartPanel.jsx     ← Panel keranjang belanja (slide dari kanan)
│   │   └── Footer.jsx        ← Footer
│   ├── sections/
│   │   ├── HeroSection.jsx   ← Section #home
│   │   ├── MenuSection.jsx   ← Section #menu (tab filter + grid produk)
│   │   ├── ProductCard.jsx   ← Kartu produk individual
│   │   ├── GallerySection.jsx← Section #gallery + lightbox
│   │   ├── AboutSection.jsx  ← Section #about + testimoni
│   │   └── ContactSection.jsx← Section #contact + form pre-order
│   ├── App.jsx               ← Root component + state management
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## ⚙️ Konfigurasi Toko

Edit file `src/data/constants.js` untuk mengubah informasi toko:

```js
export const STORE_NAME    = 'Kafa Kitchen'
export const WA_NUMBER     = '6281234567890'   // ← ganti nomor WA toko
export const STORE_ADDRESS = 'Jl. ...'
export const MAPS_URL      = 'https://maps.google.com/?q=...'
```

## 🛒 Menambah Produk Baru

Edit `src/data/products.js`:

```js
{
  id: 17,
  name: 'Nama Produk',
  category: 'Roti Manis',   // Roti Manis | Roti Gurih | Cake | Kue Kering
  price: 25000,
  desc: 'Deskripsi singkat produk',
  badge: 'New',             // 'Best Seller' | 'New' | ''
  stock: 'ready',           // 'ready' | 'almost' | 'habis'
  emoji: '🥐',
}
```

## 🖼️ Menambah Foto Galeri

Edit `src/data/gallery.js`:

```js
{
  id: 9,
  type: 'photo',
  caption: 'Caption foto',
  category: 'Produk',       // Produk | Proses | Toko | Event
  emoji: '🍞',
  bg: 'from-amber-100 to-orange-200',
}
```

## 📦 Tech Stack

| Teknologi      | Versi   | Kegunaan              |
|----------------|---------|-----------------------|
| React          | ^18.2   | UI framework          |
| Vite           | ^5.0    | Build tool            |
| Tailwind CSS   | ^3.4    | Utility CSS           |
| Google Fonts   | –       | Pacifico, Poppins, Montserrat |

## 🌐 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload folder dist/ ke Netlify
```
