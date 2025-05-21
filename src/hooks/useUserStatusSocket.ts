// import { useEffect, useRef, useCallback } from 'react';
// import { useUserStore } from '@/stores/userStore';
// import { useUserStatusStore } from '@/stores/userStatusStore';

// const BASE_URL = import.meta.env.VITE_WEBSOCKET_URL;

// export const useUserStatusSocket = () => {
//   const socketRef = useRef<WebSocket | null>(null);
//   const openedRef = useRef(false);
//   const email = useUserStore(state => state.email);
//   const token = localStorage.getItem('accessToken');

//   const connect = useCallback(() => {
//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       console.warn('이미 연결됨');
//       return;
//     }
//     const url = `${BASE_URL}/ws/status?email=${email}&token=${token}`;
//     const ws = new WebSocket(url);
//     socketRef.current = ws;
//     console.log('email);
//     console.log('토큰:', token);
//     console.log('WebSocket URL:', url);

//     ws.onopen = () => {
//       openedRef.current = true;
//       console.log('상태 WebSocket 연결됨');

//       ws.send(JSON.stringify({ type: 'register', email }));
//     };

//     ws.onmessage = event => {
//       try {
//         const { email, status } = JSON.parse(event.data);
//         useUserStatusStore.getState().setUserStatus(email, status);
//       } catch (err) {
//         console.error('유저 상태 메시지 파싱 실패:', event.data);
//       }
//     };

//     ws.onerror = e => {
//       console.error('상태 WebSocket 에러', e);
//     };

//     ws.onclose = e => {
//       if (!openedRef.current) {
//         console.warn('onopen 전에 종료됨', e.code);
//       } else {
//         console.log('상태 WebSocket 연결 종료', e.code);
//       }
//     };
//   }, [email]);

//   const disconnect = useCallback(() => {
//     socketRef.current?.close();
//     socketRef.current = null;
//     openedRef.current = false;
//   }, []);

//   useEffect(() => {
//     if (!email) return;
//     connect();

//     return () => disconnect();
//   }, [connect, disconnect, email]);

//   return { connect, disconnect };
// };
