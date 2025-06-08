import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as S from './AddProjectMemberModal.Style';
import { ChevronDown, X } from 'lucide-react';
import { inviteProjectMembers } from '@/api/Project';
import { getColorFromString } from '@/utils/avatarColor';
import { toast } from 'react-toastify';
import type { ProjectMember } from './ProjectMemberModal';
import { useWorkspaceStore } from '@/stores/workspaceStore';

export interface Member {
  id: number;
  name?: string;
  email: string;
  initial: string;
  color: string;
  profileFileUrl: string;
}

interface AddProjectMemberModalProps {
  onClose: () => void;
  projectId: number;
  memberMap: Map<string, {
    profileFileUrl: string; memberId: number; name: string; email: string
  }>;
  onAddSuccess: (newMembers: ProjectMember[]) => void;
}

export const AddProjectMemberModal = ({
  onClose,
  projectId,
  memberMap,
  onAddSuccess,
}: AddProjectMemberModalProps) => {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [emailInput, setEmailInput] = useState<string>('');
  const [role, setRole] = useState<string>('일반 멤버');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const workspaceName = useWorkspaceStore(state => state.workspaceName);
  const [suggestions, setSuggestions] = useState<Member[]>([]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.role-dropdown') && !target.closest('.role-button')) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!emailInput) {
      setSuggestions([]);
      return;
    }

    const filtered = Array.from(memberMap.values())
      .filter(m => m.email.includes(emailInput) && !selectedMembers.some(s => s.email === m.email))
      .slice(0, 5); // 최대 5개

    const suggestionList: Member[] = filtered.map(m => ({
      id: m.memberId,
      name: m.name,
      email: m.email,
      initial: m.name?.charAt(0).toUpperCase() || m.email.charAt(0).toUpperCase(),
      color: getColorFromString(m.email),
      profileFileUrl: m.profileFileUrl,
    }));

    setSuggestions(suggestionList);
  }, [emailInput, memberMap, selectedMembers]);

  const toggleRoleDropdown = () => setIsRoleDropdownOpen(!isRoleDropdownOpen);
  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setIsRoleDropdownOpen(false);
  };

  const removeMember = (memberId: number) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const email = emailInput.trim().replace(/,$/, '');
      if (!email) return;

      const matched = memberMap.get(email);
      if (!matched) {
        toast.error('해당 이메일은 워크스페이스 멤버가 아닙니다.');
        return;
      }

      addMember(matched);
    }
  };

  const addMember = (m: {
    profileFileUrl: string; memberId: number; name: string; email: string
  }) => {
    if (selectedMembers.some(member => member.email === m.email)) {
      toast.error('이미 추가된 이메일입니다.');
      return;
    }

    if (!m.memberId) {
      toast.error('유효하지 않은 멤버입니다.');
      return;
    }

    const initial = m.name?.charAt(0).toUpperCase() || m.email.charAt(0).toUpperCase();
    const color = getColorFromString(m.email);

    const newMember: Member = {
      id: m.memberId,
      name: m.name,
      email: m.email,
      initial,
      color,
      profileFileUrl: m.profileFileUrl,
    };

    setSelectedMembers([...selectedMembers, newMember]);
    setEmailInput('');
  };

  const handleSubmit = async () => {
    if (selectedMembers.length === 0) return;

    setIsSubmitting(true);
    try {
      if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

      const workspaceMemberIdList = selectedMembers
        .map(m => m.id)
        .filter((id): id is number => id !== null && id !== undefined);

      if (workspaceMemberIdList.length === 0) {
        toast.error('선택된 멤버가 없습니다.');
        setIsSubmitting(false);
        return;
      }

      const positionType = role === '프로젝트 관리자' ? 'ADMIN' : 'MEMBER';

      await inviteProjectMembers(workspaceName, projectId, {
        workspaceMemberIdList,
        positionType,
      });

      onAddSuccess(
        selectedMembers.map(m => ({
          id: m.id,
          email: m.email,
          name: m.name ?? '',
          position: '',
          role: role === '프로젝트 관리자' ? '프로젝트 관리자' : '일반 멤버',
          initial: m.initial,
          color: m.color,
          profileFileUrl: m.profileFileUrl,
        })),
      );
      toast.success('멤버 초대가 완료되었습니다.');
      onClose();
    } catch (error) {
      console.error('멤버 초대 실패:', error);
      toast.error('멤버 초대 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.Title>프로젝트 멤버 추가</S.Title>

        <S.FormRow>
          <S.Label>추가 대상</S.Label>
          <S.InputContainer>
            <S.MemberTagsContainer>
              {selectedMembers.map(member => (
                <S.MemberTag key={member.email}>
                  <S.MemberAvatar $bgColor={member.color}>{member.initial}</S.MemberAvatar>
                  <span>
                    {member.name} [{member.email}]
                  </span>
                  <S.RemoveButton onClick={() => removeMember(member.id)}>
                    <X size={16} />
                  </S.RemoveButton>
                </S.MemberTag>
              ))}
              <S.EmailInput
                type="text"
                placeholder="이메일 입력 후 Enter 또는 쉼표로 추가"
                value={emailInput}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
              />
              {suggestions.length > 0 && (
                <S.SuggestionList>
                  {suggestions.map(s => (
                    <S.SuggestionItem
                      key={s.email}
                      onClick={() =>
                        addMember({
                          memberId: s.id,
                          name: s.name || '',
                          email: s.email,
                          profileFileUrl: s.profileFileUrl,
                        })
                      }
                    >
                      <S.SuggestionAvatar $bgColor={s.color}>{s.initial}</S.SuggestionAvatar>
                      <span>
                        {s.name} [{s.email}]
                      </span>
                    </S.SuggestionItem>
                  ))}
                </S.SuggestionList>
              )}
            </S.MemberTagsContainer>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>역할</S.Label>
          <S.InputContainer>
            <S.DropdownContainer>
              <S.DropdownButton className="role-button" onClick={toggleRoleDropdown}>
                {role}
                <ChevronDown size={20} />
              </S.DropdownButton>

              {isRoleDropdownOpen && (
                <S.DropdownMenu className="role-dropdown">
                  <S.DropdownItem
                    $active={role === '프로젝트 관리자'}
                    onClick={() => handleRoleSelect('프로젝트 관리자')}
                  >
                    프로젝트 관리자
                  </S.DropdownItem>
                  <S.DropdownItem
                    $active={role === '일반 멤버'}
                    onClick={() => handleRoleSelect('일반 멤버')}
                  >
                    일반 멤버
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.DropdownContainer>
          </S.InputContainer>
        </S.FormRow>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose} disabled={isSubmitting}>
            취소
          </S.CancelButton>
          <S.AddButton
            onClick={handleSubmit}
            disabled={isSubmitting || selectedMembers.length === 0}
          >
            {isSubmitting ? '추가 중...' : '추가'}
          </S.AddButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
