import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { FindPassword } from '@/components/password/FindPassword';
import * as S from './FindPasswordPage.Style';
import { useNavigate } from 'react-router-dom';

export const FindPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <FindPassword
            onBack={() => navigate('/login')}
            onNext={email => console.log('입력된 이메일:', email)}
          />
        </S.PageContainer>
        <Footer type="default" />
      </div>
    </PageTransitionWrapper>
  );
};
