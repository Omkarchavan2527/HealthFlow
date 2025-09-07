// sw.js (Service Worker)

// ✅ Activate immediately after install
self.addEventListener("install", event => {
  console.log("[Service Worker] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("[Service Worker] Activated");
  event.waitUntil(clients.claim()); // take control of all pages
});

// ✅ Handle push events
self.addEventListener("push", event => {
  console.log("[Service Worker] Push received:", event);

  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (err) {
      data = { title: "Medicine Reminder 💊", body: event.data.text() };
    }
  }

  const title = data.title || "Reminder";
  const options = {
    body: data.body || "You have a new notification",
    icon: "/icon.png", // optional - replace with your app icon
    badge: "/badge.png", // optional - small monochrome icon
    vibrate: [200, 100, 200], // vibration pattern
    data: { url: "/" }, // where to open when clicked
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ✅ Handle notification click
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});
