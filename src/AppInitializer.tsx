import { useEffect } from 'react';
import { getMyProfile } from '@/api/Member';
import { useUserStore } from '@/stores/userStore';
import { useUserStatusSocket } from './hooks/useUserStatusSocket';

export const AppInitializer = () => {
  const setProfileInfo = useUserStore(s => s.setProfileInfo);
  useUserStatusSocket();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getMyProfile();
        setProfileInfo({
          name: res.realName ?? '',
          profileFileUrl: res.profileFileUrl ?? '',
        });
      } catch (error) {
        console.error('앱 초기 유저 프로필 불러오기 실패', error);
      }
    };

    init();
  }, [setProfileInfo]);

  return null;
};
