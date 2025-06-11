importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Firebase Init
firebase.initializeApp({
  apiKey: 'AIzaSyB6QYgCZ9XcumtqLqSOBdH1gFmZ-fLgCw0',
  authDomain: 'comket-fcm.firebaseapp.com',
  projectId: 'comket-fcm',
  storageBucket: 'comket-fcm.firebasestorage.app',
  messagingSenderId: '711290931053',
  appId: '1:711290931053:web:b90dde005f629923f8fc64',
});

const messaging = firebase.messaging();
// 알림 데이터 → 링크 변환 함수
const buildUrlFromPayload = data => {
  const { ticketId, projectId, workspaceId, alarmType, url } = data || {};
  if (url) return url;

  // 환경 분기: 개발(local) vs 운영
  const isDev = self.location.hostname === 'localhost';
  const baseUrl = isDev ? 'http://localhost:3333' : 'https://comket.co.kr';

  switch (alarmType) {
    case 'TICKET_ASSIGNED':
    case 'TICKET_STATE_CHANGED':
    case 'TICKET_NAME_CHANGED':
    case 'TICKET_PRIORITY_CHANGED':
    case 'THREAD_MENTIONED':
    case 'TICKET_DATE_CHANGED':
      if (projectId && ticketId)
        return `${baseUrl}/${projectId}/tickets/${ticketId}/thread`;
      break;

    case 'PROJECT_INVITE':
      if (projectId) return `${baseUrl}/${projectId}/tickets`;
      break;

    case 'WORKSPACE_INVITE':
      return `${baseUrl}/workspace`;

    case 'WORKSPACE_POSITIONTYPE_CHANGED':
      return null;

    default:
      return null;
  }
};

// 백그라운드 메시지 수신
messaging.onBackgroundMessage(async payload => {
  console.log('[SW] background message:', payload);

  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clients.length || payload.notification) return; // 포그라운드에서 처리함

  const data = payload.data || {};
  const { title, body } = data;
  const url = buildUrlFromPayload(data);

  if (!title || !body) return;

  self.registration.showNotification(title, {
    body,
    icon: '/images/comket192.png',
    data: { url },
    tag: `comket-bg-${Date.now()}`,
    renotify: false,
  });
});

// 알림 클릭 시 URL로 이동
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification?.data?.url;
  if (!url) return;

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      for (const client of clients) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});

// Workbox 기본 설정
if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  workbox.precaching.cleanupOutdatedCaches();
  workbox.core.clientsClaim();
  workbox.core.skipWaiting();
  console.log('[SW] Workbox loaded and precache done');
}
