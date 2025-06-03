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

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
