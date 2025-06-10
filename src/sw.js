importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyB6QYgCZ9XcumtqLqSOBdH1gFmZ-fLgCw0',
  authDomain: 'comket-fcm.firebaseapp.com',
  projectId: 'comket-fcm',
  storageBucket: 'comket-fcm.firebasestorage.app',
  messagingSenderId: '711290931053',
  appId: '1:711290931053:web:b90dde005f629923f8fc64',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async payload => {
  console.log('[SW] background message:', payload);
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clients.length || payload.notification) return;

  const { title, body, url } = payload.data ?? {};
  if (!title || !body) return;

  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png',
    data: { url },
    tag: 'comket-default',
    renotify: false,
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url;
  if (!url) return;

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(winClients => {
      for (const client of winClients) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  workbox.precaching.cleanupOutdatedCaches();
  workbox.core.clientsClaim();
  workbox.core.skipWaiting();
  console.log('[SW] Workbox loaded and precache done');
}
