// import { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';
// import { X, Copy, Check } from 'lucide-react';
// import { AvatarWithName } from '@/components/ticket/AvatarWithName';
// import { useOutsideClick } from '@/hooks/useOutsideClick';
// import { useUserInfoModal } from '@/hooks/useUserInfoModal';
// import * as S from './UserInfoModal.Style';
// // import { getUserById } from '@/api/Member';          // ← REST API (예시)

// export const UserInfoModal = () => {
//   const { visible, userId, close } = useUserInfoModal();
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [copied, setCopied] = useState(false);
//   const [user, setUser] = useState<UserInfo | null>(null);

//   /* -------- 데이터 패칭 -------- */
//   useEffect(() => {
//     if (!userId || !visible) return;
//     (async () => {
//       const data = await getUserById(userId);
//       setUser(data);
//     })();
//   }, [userId, visible]);

//   /* -------- 바깥 클릭, ESC -------- */
//   useOutsideClick(modalRef, close);
//   useEffect(() => {
//     const esc = (e: KeyboardEvent) => e.key === 'Escape' && close();
//     if (visible) window.addEventListener('keydown', esc);
//     return () => window.removeEventListener('keydown', esc);
//   }, [visible, close]);

//   /* -------- early return -------- */
//   if (!visible || !user) return null;

//   /* -------- clipboard -------- */
//   const copy = () => {
//     navigator.clipboard.writeText(user.email);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   /* -------- PORTAL -------- */
//   return createPortal(
//     <S.Overlay role="dialog" aria-modal="true">
//       <S.Container ref={modalRef}>
//         {/* Header */}
//         <S.Header>
//           <S.Profile>
//             <AvatarWithName user={user} size={56} />
//             <S.Status>
//               <S.StatusDot status={user.status} />
//               <S.StatusText status={user.status}>{user.status}</S.StatusText>
//             </S.Status>
//           </S.Profile>
//           <S.IconBtn aria-label="닫기" onClick={close}>
//             <X size={20} />
//           </S.IconBtn>
//         </S.Header>

//         {/* Body */}
//         <S.Body>
//           <S.Item>
//             <S.Label>이메일</S.Label>
//             <S.EmailRow>
//               <S.Value>{user.email}</S.Value>
//               <S.IconBtn onClick={copy} aria-label="복사">
//                 {copied ? <Check size={16} /> : <Copy size={16} />}
//               </S.IconBtn>
//             </S.EmailRow>
//           </S.Item>

//           <S.Item><S.Label>소속</S.Label><S.Value>{user.department}</S.Value></S.Item>
//           <S.Item><S.Label>직책</S.Label><S.Value>{user.position}</S.Value></S.Item>
//           <S.Item><S.Label>직무</S.Label><S.Value>{user.jobTitle}</S.Value></S.Item>
//           <S.Item><S.Label>역할</S.Label><S.Value>{user.role}</S.Value></S.Item>

//           <S.Projects>
//             {user.projects.map(p => <S.Value key={p}>{p}</S.Value>)}
//           </S.Projects>
//         </S.Body>
//       </S.Container>
//     </S.Overlay>,
//     document.body
//   );
// };
