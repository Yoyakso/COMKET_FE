import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
// import { useUserStatusSocket } from './hooks/useUserStatusSocket';

export const AppInitializer = () => {
  const setProfileInfo = useUserStore(s => s.setProfileInfo);
  // useUserStatusSocket();

  return null;
};
