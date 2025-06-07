import { useState, useEffect } from 'react';
import * as S from './WorkspacePage.Style';
import { MotionCard } from './WorkspacePage.Style';
import { Button } from '@/components/common/button/Button';
import { Dropdown, DropdownOption } from '@/components/common/dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import { fetchMyWorkspaces } from '@/api/Workspace';
import { getMyWorkspaceProfile } from '@api/Workspace';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useUserStore } from '@/stores/userStore';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg?url';
import { NotificationPermissionBanner } from '@/components/common/banner/NotificationPermissionBanner';

export const WorkspacePage = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const workspaceId = useWorkspaceStore.getState().workspaceId;
  const [showBanner, setShowBanner] = useState(false);
  // const myProfile = useWorkspaceStore.getState().getMyProfileFor(workspaceId);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  useEffect(() => {
    const alreadyAsked = localStorage.getItem('fcmPermissionAsked');

    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied' &&
      !alreadyAsked
    ) {
      setShowBanner(true);
      localStorage.setItem('fcmPermissionAsked', 'true');
    }
  }, []);

  interface Workspace {
    id: string;
    name: string;
    slug: string;
    profileFileUrl?: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data: Workspace[] = await fetchMyWorkspaces();

        const formatted = data.map((ws: Workspace) => ({
          label: ws.name,
          value: ws.slug,
          imageSrc: ws.profileFileUrl?.trim() ? ws.profileFileUrl : DropdownIcon,
        }));

        setOptions(formatted);
        if (formatted.length > 0) {
          setSelectedSlug(formatted[0].value);
        }
        console.log(data);
      } catch (err) {
        console.error('워크스페이스 목록 불러오기 실패:', err);
        setOptions([]);
        setSelectedSlug('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJoin = async () => {
    if (!selectedSlug) return;

    try {
      const workspaces = await fetchMyWorkspaces();
      const selectedWorkspace = workspaces.find(ws => ws.slug === selectedSlug);
      if (!selectedWorkspace) throw new Error('선택된 워크스페이스가 없습니다.');

      useWorkspaceStore.getState().setWorkspaceStore({
        workspaceName: selectedWorkspace.name,
        workspaceSlug: selectedWorkspace.slug,
        workspaceId: Number(selectedWorkspace.id),
        profileFileUrl: selectedWorkspace.profileFileUrl || '',
      });

      const profileData = await getMyWorkspaceProfile(workspaceId);
      useUserStore.getState().setProfileInfo({
        name: profileData.name ?? '',
        profileFileUrl: profileData.profileFileUrl ?? '',
      });
      navigate(`/${selectedSlug}/project`);
    } catch (err) {
      console.error('워크스페이스 입장 실패:', err);
    }
  };

  return (
    <S.Container>
      {showBanner && <NotificationPermissionBanner />}
      {isLoading ? null : (
        <MotionCard variants={cardVariants} initial="hidden" animate="visible">
          <S.Title>워크스페이스 선택</S.Title>

          {options.length === 0 ? (
            <>
              <S.Description>
                아직 참여하고 있는 워크스페이스가 없습니다.
                <br />
                워크스페이스를 새로 생성하거나, 초대 코드로 입장해 보세요!
              </S.Description>

              <S.DividerBox>
                <S.Line />
                <S.DividerText>또는</S.DividerText>
                <S.Line />
              </S.DividerBox>

              <Button $variant="tealFilled" size="lg" onClick={() => navigate('/workspace/create')}>
                워크스페이스 생성
              </Button>
              <Button
                $variant="neutralOutlined"
                size="lg"
                onClick={() => navigate('/workspaces/invite')}
              >
                초대 코드로 입장
              </Button>
            </>
          ) : (
            <>
              <S.WorkspaceRow>
                <Dropdown
                  options={options}
                  value={selectedSlug}
                  onChange={value => {
                    if (typeof value === 'string') {
                      setSelectedSlug(value);
                    }
                  }}
                  placeholder="워크스페이스 선택"
                  size="md"
                  $variant="activated"
                  type="single-image"
                  iconLeft
                />
                <Button $variant="neutralFilled" size="md" onClick={handleJoin}>
                  참여
                </Button>
              </S.WorkspaceRow>

              <S.DividerBox>
                <S.Line />
                <S.DividerText>또는</S.DividerText>
                <S.Line />
              </S.DividerBox>

              <Button $variant="tealFilled" size="lg" onClick={() => navigate('/workspace/create')}>
                워크스페이스 생성
              </Button>
              <Button
                $variant="neutralOutlined"
                size="lg"
                onClick={() => navigate('/workspaces/invite')}
              >
                초대 코드로 입장
              </Button>
            </>
          )}
        </MotionCard>
      )}
    </S.Container>
  );
};
