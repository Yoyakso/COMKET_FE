import { messaging } from '@/utils/firebase';
import { getToken, onMessage } from 'firebase/messaging';

let swRegistration: ServiceWorkerRegistration | null = null;

/** FCM 권한 요청 + 토큰 발급(단 1회) */
export const requestFcmPermission = async (): Promise<string | null> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('브라우저 환경이 아니거나 Notification API 사용 불가');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('알림 권한 거부됨');
      return null;
    }

    swRegistration = await navigator.serviceWorker.ready;

    /* 반드시 등록된 SW를 넘겨줘야 firebase가 push-scope SW를 또 생성하지 않음 */
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    console.log('FCM token:', token);
    return token;
  } catch (err) {
    console.error('FCM 토큰 발급 실패:', err);
    return null;
  }
};

/** Foreground 수신 */
export const listenToForegroundMessages = () => {
  onMessage(messaging, payload => {
    console.log('foreground message:', payload);

    /* notification + data 없는 pure notification → 브라우저가 이미 토스트 띄움 */
    if (payload.notification && !payload.data) return;

    /* data-only 또는 hybrid(payload.data 포함) */
    const { title, body, url } = {
      ...payload.notification,
      ...payload.data,
    } as { title?: string; body?: string; url?: string };

    if (!title || !body) return;

    new Notification(title, {
      body,
      icon: '/logo192.png',
      tag: 'comket-default',
      data: { url },
    });
  });
};
