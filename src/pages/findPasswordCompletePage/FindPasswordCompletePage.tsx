import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { FindPasswordComplete } from '@/components/login/FindPasswordComplete';
import * as S from './FindPasswordCompletePage.Style';
import { useNavigate } from 'react-router-dom';

export const FindPasswordCompletePage = () => {
  const navigate = useNavigate();

  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <FindPasswordComplete
            onBack={() => navigate('/login')}
            onNext={email => console.log('입력된 이메일:', email)}
          />
        </S.PageContainer>
        <Footer type="default" />
      </div>
    </PageTransitionWrapper>
  );
};
