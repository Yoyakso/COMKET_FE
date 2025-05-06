import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar'; 
import { LocalNavBar } from '../common/navBar/LocalNavBar';

import * as S from './WorkspaceManageLayout.Style';


export const WorkspaceManageLayout = () => {
    
    return(    
    <S.Wrapper>

        <GlobalNavBar variant="workspace" />
        
      <S.Body>
        <S.Sidebar>
          <LocalNavBar variant="settings" />
        </S.Sidebar>
        <S.ContentWrapper>
          <Outlet/>
        </S.ContentWrapper>
      </S.Body>
    </S.Wrapper>
    );
};