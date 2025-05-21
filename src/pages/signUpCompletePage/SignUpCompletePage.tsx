import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { SignUpComplete } from '@/components/login/SignUpComplete';
import { Footer } from '@/components/common/footer/Footer';
import { fetchWorkspaceByInviteCode } from '@/api/Workspace';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import * as S from './SignUpCompletePage.Style';

export const SignUpCompletePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const inviteCode = localStorage.getItem('inviteCode');
    if (!inviteCode) return;

    const enterWorkspace = async () => {
      try {
        const data = await fetchWorkspaceByInviteCode(inviteCode);
        useWorkspaceStore.getState().setWorkspaceStore({
          workspaceName: data.name,
          workspaceSlug: data.slug,
          workspaceId: data.id,
          profileFileUrl: data.profileFileUrl ?? '',
        });
      } catch (error) {
        console.error('초대코드 처리 실패:', error);
        localStorage.removeItem('inviteCode');
      }
    };

    enterWorkspace();
  }, []);

  return (
    <div>
      <GlobalNavBar />
      <S.PageContainer>
        <SignUpComplete />
      </S.PageContainer>
      <Footer type="default" />
    </div>
  );
};
