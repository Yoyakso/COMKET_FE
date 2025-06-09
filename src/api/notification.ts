import axiosInstance from './axiosInstance';

export const registerFcmToken = async (token: string) => {
  try {
    await axiosInstance.post('/api/v1/fcm/register', {
      token,
    });
  } catch (error) {
    console.error('FCM 토큰 등록 실패:', error);
  }
};
