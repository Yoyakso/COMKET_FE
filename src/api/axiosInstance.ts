import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 오류일 때만 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 요청 보내기
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/reissue`,
          {},
          { withCredentials: true },
        );

        // 새 accessToken 저장
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 실패했던 요청에 새 토큰 넣고 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        // 리프레시도 실패한 경우 (캡처 이미지 기준: 401 or 메시지)
        const message = refreshError.response?.data?.message || '';
        const code = refreshError.response?.data?.code || '';

        if (
          message.includes('RefreshToken') ||
          code === 'REFRESH_NOT_FOUND' ||
          code === 'REFRESH_INVALID'
        ) {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    // 그 외 에러는 그대로 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
