import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LoginForm } from '@/components/login/LoginForm';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { NotificationPermissionBanner } from '@/components/common/banner/NotificationPermissionBanner';
import * as S from './LoginPage.Style';

export const LoginPage = () => {
  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <LoginForm />
        </S.PageContainer>
        <Footer type="default" />
        <NotificationPermissionBanner />
      </div>
    </PageTransitionWrapper>
  );
};
