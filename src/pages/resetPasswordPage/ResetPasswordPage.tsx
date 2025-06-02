import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { ResetPassword } from '@/components/password/ResetPassword';
import * as S from './ResetPasswordPage.Style';

export const ResetPasswordPage = () => {
  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <ResetPassword />
        </S.PageContainer>
        <Footer type="default" />
      </div>
    </PageTransitionWrapper>
  );
};
