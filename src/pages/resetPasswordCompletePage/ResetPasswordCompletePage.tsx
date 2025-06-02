import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { ResetPasswordComplete } from '@/components/password/ResetPasswordComplete';
import * as S from './ResetPasswordCompletePage.Style';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordCompletePage = () => {
  const navigate = useNavigate();

  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <ResetPasswordComplete />
        </S.PageContainer>
        <Footer type="default" />
      </div>
    </PageTransitionWrapper>
  );
};
