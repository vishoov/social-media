self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/", // Cache the root URL
        "/index.html", // Cache other important URLs
        "/style.css",
        "/script.js",
        // Add other resources you want to cache
      ]);
    })
  );
});
