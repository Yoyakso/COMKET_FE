import { useEffect } from 'react';
import { messaging } from '@/utils/firebase';
import { getToken, onMessage, isSupported } from 'firebase/messaging';

type FcmPayload = {
  title?: string;
  body?: string;
  icon?: string;
  ticketId?: string;
  projectId?: string;
  url?: string;
};

let swRegistration: ServiceWorkerRegistration | null = null;

//권한 요청 + FCM 토큰 발급
export const requestFcmPermission = async (): Promise<string | null> => {
  if (typeof window === 'undefined' || !('Notification' in window) || !(await isSupported())) {
    console.warn('[FCM] 브라우저가 Notification 또는 FCM을 지원하지 않음');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('[FCM] 알림 권한 거부됨');
      return null;
    }

    /** 이미 등록된 SW 활용 (vite-plugin-pwa가 `register()` 해 둠) */
    swRegistration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    console.log('[FCM] token:', token);
    return token;
  } catch (err) {
    console.error('[FCM] 토큰 발급 실패:', err);
    return null;
  }
};

export const listenToForegroundMessages = () => {
  const unsubscribe = onMessage(messaging, payload => {
    console.log('[FCM] foreground message:', payload);

    if (payload.notification && !payload.data) return;

    const data = {
      icon: '/images/comket192.png',
      ...payload.notification,
      ...payload.data,
    } as FcmPayload;
    const { title, body, icon, url, ticketId, projectId } = data;

    if (!title || !body) return;

    const link =
      url ||
      (projectId && ticketId
        ? `https://comket.co.kr/${projectId}/tickets/${ticketId}/thread`
        : undefined);

    const tag = `comket-fg-${ticketId || Date.now()}`;

    if (Notification.permission === 'granted') {
      const n = new Notification(title, {
        body,
        icon: '/images/comket192.png',
        tag,
        data: { url: link },
      });

      n.onclick = () => {
        window.focus();
        if (link) window.location.href = link;
      };
    }
  });

  return unsubscribe; // 필요 시 호출측에서 해제
};

//React Hook ─ 앱 루트에서 1회 호출
export const useForegroundNotification = () => {
  useEffect(() => {
    const off = listenToForegroundMessages();
    return off; // 컴포넌트 언마운트 시 리스너 해제
  }, []);
};
