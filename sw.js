// BURADAKİ İSMİ DEĞİŞTİRİYORUZ Kİ TELEFON YENİ KODU GÖRSÜN
const CACHE_NAME = 'altay-tam-surum-v1'; 

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js',
  'https://labs.phaser.io/assets/skies/space3.png',
  'https://labs.phaser.io/assets/sprites/platform.png',
  'https://labs.phaser.io/assets/sprites/diamond.png',
  'https://labs.phaser.io/assets/sprites/dude.png',
  'https://labs.phaser.io/assets/sprites/baddie.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

// Eski önbellekleri temizle (Telefonda yer açar ve güncel tutar)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
