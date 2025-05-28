import React from 'react';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import * as S from './WorkspaceLayout.Style';

export const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.Wrapper>
      <GlobalNavBar variant="white" />
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <Footer type="default" />
    </S.Wrapper>
  );
};
