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

/**
 * 백그라운드 푸시 수신
 *  브라우저가 notification-payload를 이미 처리한 경우 → skip
 *  열려있는 창(탭)이 있으면 → Foreground에서 처리하도록 skip
 *  data-only 메시지일 때만 직접 알림 표시
 */
messaging.onBackgroundMessage(async payload => {
  console.log('[SW] background message:', payload);

  /* 창 열려 있으면 skip */
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });
  if (clients.length) return;

  /* notification 필드가 있으면 브라우저 기본 알림으로 이미 표시됨 → skip */
  if (payload.notification) return;

  /* data-only 메시지라면 우리가 직접 표시 */
  const { title, body, url } = payload.data ?? {};
  if (!title || !body) return;

  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png',
    data: { url }, // 클릭 시 이동할 링크 전달
    tag: 'comket-default', // 같은 tag면 OS가 중복 합침
    renotify: false,
  });
});

/* 알림 클릭 시 새 창(또는 기존 창) 열기 */
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
