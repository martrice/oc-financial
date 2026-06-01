const CACHE_NAME = "oc-financial-pwa-v1";
const OFFLINE_URL = "/offline.html";

// Keep this list small; it should not require authentication.
const STATIC_ASSETS = [
  OFFLINE_URL,
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.addAll(STATIC_ASSETS);
      } catch {
        // Ignore install-time failures; runtime caching will still help.
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
          return Promise.resolve();
        })
      );
      self.clients.claim();
    })()
  );
});

function isSameOrigin(request) {
  return request.url && new URL(request.url).origin === self.location.origin;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (!isSameOrigin(request)) return;

  const url = new URL(request.url);
  const cache = caches.open(CACHE_NAME);

  // Navigation requests: try network, fall back to offline page.
  const wantsNavigation =
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");
  if (wantsNavigation) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cacheHandle = await cache;
          cacheHandle.put(request, fresh.clone());
          return fresh;
        } catch {
          const cacheHandle = await cache;
          const cached = await cacheHandle.match(request);
          return cached || (await cacheHandle.match(OFFLINE_URL));
        }
      })()
    );
    return;
  }

  // App shell/static assets: cache-first.
  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.json" ||
    url.pathname === OFFLINE_URL;

  if (isStaticAsset) {
    event.respondWith(
      (async () => {
        const cacheHandle = await cache;
        const cached = await cacheHandle.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh && fresh.ok) cacheHandle.put(request, fresh.clone());
        return fresh;
      })()
    );
    return;
  }

  // Default: network-first with cache fallback.
  event.respondWith(
    (async () => {
      const cacheHandle = await cache;
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) cacheHandle.put(request, fresh.clone());
        return fresh;
      } catch {
        return (await cacheHandle.match(request)) || (await cacheHandle.match(OFFLINE_URL));
      }
    })()
  );
});

