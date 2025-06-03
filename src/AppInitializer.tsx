import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { requestFcmPermission, listenToForegroundMessages } from '@/hooks/useFcm';
// import { useUserStatusSocket } from './hooks/useUserStatusSocket';

export const AppInitializer = () => {
  const setProfileInfo = useUserStore(s => s.setProfileInfo);
  // useUserStatusSocket();

  useEffect(() => {
    requestFcmPermission();
    listenToForegroundMessages();
  }, []);

  return null;
};
