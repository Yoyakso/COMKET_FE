import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useUserStore } from '@/stores/userStore';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { PortalDropdown } from '@/utils/PortalDropdown';
import * as S from './WorkspaceSelectorDropdown.Style';
import { fetchMyWorkspaces } from '@/api/Workspace';
import { logOut } from '@/api/Oauth';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

interface Props {
  triggerRef: React.RefObject<HTMLElement>;
  close: () => void;
}

export const WorkspaceSelectorDropdown = ({ triggerRef, close }: Props) => {
  const { workspaceId, workspaceSlug, myWorkspaces, setWorkspaceStore, setMyWorkspaces } =
    useWorkspaceStore();
  const email = useUserStore(s => s.email);
  const navigate = useNavigate();

  const [showSub, setShowSub] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const { clearUser } = useUserStore();
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick([triggerRef, dropdownRef], close);

  useEffect(() => {
    if (!showSub) return;
    (async () => {
      const list = await fetchMyWorkspaces();
      setMyWorkspaces(list);
    })();
  }, [showSub, setMyWorkspaces]);

  const handleSelect = (ws: (typeof myWorkspaces)[number]) => {
    setWorkspaceStore({
      workspaceId: ws.id,
      workspaceName: ws.name,
      workspaceSlug: ws.slug,
      profileFileUrl: ws.profileFileUrl ?? '',
    });
    navigate(`/${ws.slug}/project`);
    close();
  };

  const handleLogout = async () => {
    try {
      await logOut();
      clearUser();
      toast.success('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  const enter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowSub(true);
  };

  const leave = () => {
    hideTimer.current = setTimeout(() => setShowSub(false), 120);
  };

  return (
    <PortalDropdown triggerRef={triggerRef}>
      <AnimatePresence>
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, type: 'tween' }}
        >
          <S.Dropdown>
            <S.Item onClick={() => window.open(`/${workspaceSlug}/settings`)}>
              워크스페이스 정보
            </S.Item>
            <S.Item onClick={() => window.open(`/${workspaceSlug}/plan`)}>플랜 관리</S.Item>
            <S.Item onClick={() => window.open(`/${workspaceSlug}/member`)}>멤버 관리</S.Item>
            <S.Item onClick={() => window.open(`/${workspaceSlug}/project`)}>프로젝트 관리</S.Item>
            <S.Item onClick={() => window.open(`/contact`)}>문의하기</S.Item>

            <S.Divider />

            <S.SubWrapper onMouseEnter={enter} onMouseLeave={leave}>
              <S.Item>
                워크스페이스 변경 <ChevronRight size={16} />
              </S.Item>
              {showSub && (
                <S.SubDropdown
                  as={motion.div}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ type: 'tween', duration: 0.18 }}
                  onMouseEnter={enter}
                  onMouseLeave={leave}
                >
                  {myWorkspaces.map((ws, idx) => (
                    <S.SubItem
                      as={motion.div}
                      key={`${ws.id}-${idx}`}
                      onClick={() => handleSelect(ws)}
                      $active={ws.slug === workspaceSlug}
                      transition={{ type: 'tween', duration: 0.1 }}
                    >
                      {ws.profileFileUrl ? <S.Img src={ws.profileFileUrl} /> : <S.Placeholder />}
                      {ws.name}
                    </S.SubItem>
                  ))}
                  <S.Divider />
                  <S.SubItem onClick={() => navigate('/workspace/create')}>
                    신규 워크스페이스 생성
                  </S.SubItem>
                </S.SubDropdown>
              )}
            </S.SubWrapper>

            <S.Item
              onClick={e => {
                e.stopPropagation();
                handleLogout();
              }}
            >
              로그아웃
            </S.Item>
          </S.Dropdown>
        </motion.div>
      </AnimatePresence>
    </PortalDropdown>
  );
};
