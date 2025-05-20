import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check } from 'lucide-react';
import * as S from './MemberDetailPanel.Style';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { getWorkspaceMembers } from '@/api/Member';
import { AvatarWithName } from '@/components/ticket/AvatarWithName';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { UserStatusBadge } from '@/components/common/badge/UserStatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberDetailPanelProps {
  memberId: number;
  onClose: () => void;
}

export const MemberDetailPanel = ({ memberId, onClose }: MemberDetailPanelProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const workspaceId = useWorkspaceStore(s => s.workspaceId);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    const fetchMember = async () => {
      const members = await getWorkspaceMembers(workspaceId);
      const found = members.find((m: any) => m.workspaceMemberid === memberId);
      setUser(found);
    };
    if (workspaceId && memberId) fetchMember();
  }, [workspaceId, memberId]);

  if (!user) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getKoreanRoleLabel = (positionType: string) => {
    switch (positionType) {
      case 'OWNER':
        return '워크스페이스 소유자';
      case 'ADMIN':
        return '워크스페이스 관리자';
      case 'MEMBER':
        return '일반 멤버';
      default:
        return '알 수 없음';
    }
  };

  return createPortal(
    <S.Overlay>
      <AnimatePresence>
        <S.PanelContainer
          as={motion.div}
          ref={modalRef}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        >
          <S.Header>
            <S.ProfileSection>
              <S.AvatarWrapper>
                <AvatarWithName user={user} />
              </S.AvatarWrapper>
              <UserStatusBadge email={user.email} />
            </S.ProfileSection>
            <S.CloseButton onClick={onClose} aria-label="닫기">
              <X size={20} />
            </S.CloseButton>
          </S.Header>

          <S.DetailsContainer>
            <S.DetailItem>
              <S.DetailLabel>이메일</S.DetailLabel>
              <S.EmailContainer>
                <S.DetailValue>{user.email}</S.DetailValue>
                <S.CopyButton onClick={handleCopy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </S.CopyButton>
              </S.EmailContainer>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>소속</S.DetailLabel>
              <S.DetailValue>{user.department}</S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>직책</S.DetailLabel>
              <S.DetailValue>{user.position}</S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>직무</S.DetailLabel>
              <S.DetailValue>{user.jobTitle}</S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>역할</S.DetailLabel>
              <S.DetailValue>{getKoreanRoleLabel(user.positionType)}</S.DetailValue>
            </S.DetailItem>

            {user.projects?.length > 0 && (
              <S.DetailItem>
                <S.DetailLabel>참여 프로젝트</S.DetailLabel>
                <S.ProjectsContainer>
                  {user.projects.map((p: string) => (
                    <S.DetailValue key={p}>{p}</S.DetailValue>
                  ))}
                </S.ProjectsContainer>
              </S.DetailItem>
            )}
          </S.DetailsContainer>
        </S.PanelContainer>
      </AnimatePresence>
    </S.Overlay>,
    document.body,
  );
};
