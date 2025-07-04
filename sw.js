const CACHE_NAME = "zikir-app-v3";
const ASSETS_TO_CACHE = [
  "index.html",
  "style.css",
  "scripts.js",
  "dzikir.json",
  "manifest.json",
  "public/images/web-app-manifest-192x192.png",
  "public/images/web-app-manifest-512x512.png",
  "public/fonts/LPMQ IsepMisbah.ttf",
  "public/fonts/UthmaniFont.woff",
  "public/fonts/UthmaniFont2.woff",
  "public/fonts/EduQLDHand.ttf",
  "public/fonts/Handlee.ttf",
  "public/fonts/Nunito.ttf",
  "public/fonts/ShadowsIntoLight.ttf",
  "https://unpkg.com/lucide@latest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve from cache if available, otherwise fetch from network
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          return caches.match("/index.html");
        })
      );
    })
  );
});
