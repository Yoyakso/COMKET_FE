import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { requestFcmPermission, listenToForegroundMessages } from '@/hooks/useFcm';
// import { useUserStatusSocket } from './hooks/useUserStatusSocket';

export const AppInitializer = () => {
  const setProfileInfo = useUserStore(s => s.setProfileInfo);
  // useUserStatusSocket();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      console.log('현재 알림 권한 상태:', Notification.permission);
      listenToForegroundMessages();
    }
  }, []);

  return null;
};
