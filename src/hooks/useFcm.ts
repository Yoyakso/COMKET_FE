import { messaging } from '@/utils/firebase';
import { getToken, onMessage } from 'firebase/messaging';

/** FCM 권한 요청 및 토큰 발급 */
export const requestFcmPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    console.log('FCM 토큰:', token);
    return token;
  } catch (error) {
    console.error('FCM 토큰 요청 실패:', error);
    return null;
  }
};

/** Foreground 수신 리스너 */
export const listenToForegroundMessages = () => {
  onMessage(messaging, payload => {
    console.log('FCM Foreground 메시지 수신:', payload);
  });
};
