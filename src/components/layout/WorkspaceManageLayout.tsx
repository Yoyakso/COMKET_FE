import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import * as S from './WorkspaceManageLayout.Style';

export const WorkspaceManageLayout: React.FC = () => {
  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" />
        </S.LNBContainer>

        <S.Content>
          <Outlet />
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};
