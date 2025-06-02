import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import { PageTransitionWrapper } from '@/components/common/wrapper/PageTransitionWrapper';
import { FindPasswordComplete } from '@/components/password/FindPasswordComplete';
import * as S from './FindPasswordCompletePage.Style';
import { useNavigate } from 'react-router-dom';

export const FindPasswordCompletePage = () => {
  const navigate = useNavigate();

  return (
    <PageTransitionWrapper>
      <div>
        <GlobalNavBar />
        <S.PageContainer>
          <FindPasswordComplete />
        </S.PageContainer>
        <Footer type="default" />
      </div>
    </PageTransitionWrapper>
  );
};
