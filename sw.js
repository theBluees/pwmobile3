// Nama cache storage
const CACHE_NAME = 'umkla-cache-v1';

// File statis yang dicache untuk offline
const urlsToCache = [
  '/',
  '/index.html',
  '/umbulbesuki.html',
  '/umbulbrintik.html',
  '/umbulcokro.html',
  '/umbulmanten.html',
  '/umbulponggok.html',
  '/umbulsigedang.html',
  '/images/logoumkla.png',
  '/images/gambarhero.jpg',
  '/images/ponggok.jpeg',
  '/images/manten.jpeg',
  '/images/sigedang.jpeg',
  '/images/cokro.jpeg',
  '/images/brintik.jpeg',
  '/images/besuki.jpeg',
  // tambahkan semua gambar galeri jika perlu
];

// Saat service worker ter-install
self.addEventListener('install', event => {
  // Precache semua file statis
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Precaching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat service worker aktif
self.addEventListener('activate', event => {
  // Bersihkan cache lama jika ada
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Tangani permintaan fetch (online dulu, fallback offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match('/index.html'))
    )
  );
});
