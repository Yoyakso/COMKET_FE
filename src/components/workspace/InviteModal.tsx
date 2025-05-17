import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as S from './InviteModal.Style';
import { ChevronDown } from '@assets/icons';
import { inviteWorkspaceMembers } from '@/api/Member';
import { getColorFromString } from '@utils/avatarColor';
import { toast } from 'react-toastify';
import { useWorkspaceStore } from '@/stores/workspaceStore';

interface InviteType {
  id: string;
  email: string;
  prefix: string;
  color: string;
}

interface InviteModalProps {
  onClose: () => void;
}

type RoleType = '일반 멤버' | '워크스페이스 소유자' | '워크스페이스 관리자';

export const InviteModal = ({ onClose }: InviteModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [invitees, setInvitees] = useState<InviteType[]>([]);
  const [role, setRole] = useState<RoleType>('일반 멤버');
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [generateLink, setGenerateLink] = useState<boolean>(false);
  const workspaceId = useWorkspaceStore(state => state.workspaceId);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.trim() !== '') {
      addInvitee();
    }
  };

  const addInvitee = () => {
    if (email.trim() === '') return;

    const trimmedEmail = email.trim();
    const newInvitee: InviteType = {
      id: Date.now().toString(),
      email: trimmedEmail,
      prefix: trimmedEmail.charAt(0).toUpperCase(),
      color: getColorFromString(trimmedEmail),
    };

    setInvitees([...invitees, newInvitee]);
    setEmail('');
  };

  const removeInvitee = (id: string) => {
    setInvitees(invitees.filter(invitee => invitee.id !== id));
  };

  const toggleRoleDropdown = () => {
    setIsRoleOpen(!isRoleOpen);
  };

  const selectRole = (selectedRole: RoleType) => {
    setRole(selectedRole);
    setIsRoleOpen(false);
  };

  const toggleLinkGeneration = () => {
    setGenerateLink(!generateLink);
  };

  const mapRoleToPositionType = (role: RoleType): 'ADMIN' | 'OWNER' | 'MEMBER' => {
    switch (role) {
      case '워크스페이스 소유자':
        return 'OWNER';
      case '워크스페이스 관리자':
        return 'ADMIN';
      default:
        return 'MEMBER';
    }
  };

  const handleSendInvite = async () => {
    if (invitees.length === 0) return toast.error('초대할 멤버를 입력하세요.');

    try {
      const memberEmailList = invitees.map(invitee => invitee.email);

      await inviteWorkspaceMembers(workspaceId, {
        memberEmailList,
        positionType: mapRoleToPositionType(role),
        state: 'ACTIVE',
      });

      toast.success('초대가 완료되었습니다.');
      onClose();
    } catch (error: any) {
      const code = error?.response?.data?.code;
      const message = error?.response?.data?.message || '알 수 없는 오류가 발생했습니다.';

      switch (code) {
        case 'CANNOT_FOUND_MEMBER':
          alert('입력한 이메일에 해당하는 사용자를 찾을 수 없습니다.');
          break;
        case 'MEMBER_ALREADY_INVITED':
          alert('이미 초대된 멤버가 포함되어 있습니다.');
          break;
        case 'INVALID_MEMBER_LIST':
          alert('초대할 멤버 이메일이 비어 있습니다.');
          break;
        default:
          alert(`초대 중 오류 발생: ${message}`);
      }
      throw error;
    }
  };

  const ModalContent = (
    <S.ModalContent onClick={e => e.stopPropagation()}>
      <S.Title>워크스페이스 멤버 초대</S.Title>

      <S.Section>
        <S.Label>초대 대상</S.Label>
        <S.ContentContainer>
          <S.InviteInputContainer>
            <S.InviteList>
              {invitees.map(invitee => (
                <S.InviteTag key={invitee.id}>
                  <S.InvitePrefix style={{ backgroundColor: invitee.color }}>
                    {invitee.prefix}
                  </S.InvitePrefix>
                  {invitee.email}
                  <S.RemoveButton onClick={() => removeInvitee(invitee.id)}>×</S.RemoveButton>
                </S.InviteTag>
              ))}
              <S.EmailInput
                placeholder={
                  invitees.length === 0 && email.trim() === ''
                    ? '이메일을 입력해 워크스페이스 멤버로 초대해 보세요.'
                    : undefined
                }
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
              />
            </S.InviteList>
          </S.InviteInputContainer>
        </S.ContentContainer>
      </S.Section>

      <S.Section>
        <S.Label>역할</S.Label>
        <S.ContentContainer>
          <S.DropdownContainer>
            <S.DropdownButton onClick={toggleRoleDropdown}>
              {role}
              <ChevronDown width={20} height={20} />
            </S.DropdownButton>
            {isRoleOpen && (
              <S.DropdownMenu>
                <S.DropdownItem onClick={() => selectRole('일반 멤버')}>일반 멤버</S.DropdownItem>
                <S.DropdownItem onClick={() => selectRole('워크스페이스 소유자')}>
                  워크스페이스 소유자
                </S.DropdownItem>
                <S.DropdownItem onClick={() => selectRole('워크스페이스 관리자')}>
                  워크스페이스 관리자
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.DropdownContainer>
        </S.ContentContainer>
      </S.Section>

      <S.Section>
        <S.Label>초대 링크</S.Label>
        <S.ContentContainer>
          <S.LinkGenerationContainer>
            <S.LinkGenerationText>안 함</S.LinkGenerationText>
            <S.ToggleSwitch>
              <S.ToggleInput
                type="checkbox"
                checked={generateLink}
                onChange={toggleLinkGeneration}
              />
              <S.ToggleSlider />
            </S.ToggleSwitch>
            <S.LinkGenerationText>링크 생성</S.LinkGenerationText>
            <S.CopyLinkButton disabled={!generateLink}>링크 복사</S.CopyLinkButton>
          </S.LinkGenerationContainer>
        </S.ContentContainer>
      </S.Section>

      <S.ButtonContainer>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
        <S.SendButton onClick={handleSendInvite}>보내기</S.SendButton>
      </S.ButtonContainer>
    </S.ModalContent>
  );

  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose}>{ModalContent}</S.ModalOverlay>,
    document.body,
  );
};
