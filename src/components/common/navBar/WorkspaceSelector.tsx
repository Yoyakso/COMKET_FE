import React, { useRef, useState } from 'react';
import { ChevronDown } from '@/assets/icons';
import * as S from './WorkspaceSelector.Style';
import { WorkspaceSelectorDropdown } from '@/components/workspace/WorkspaceSelectorDropdown';
import { useWorkspaceStore } from '@/stores/workspaceStore';

export const WorkspaceSelector = () => {
  const workspaceName = useWorkspaceStore(s => s.workspaceName);
  const profileFileUrl = useWorkspaceStore(s => s.profileFileUrl);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <S.Container>
      <S.SelectorButton onClick={() => setOpen(!open)} ref={triggerRef}>
        <S.LogoBox>
          {profileFileUrl ? (
            <img
              src={profileFileUrl}
              alt="워크스페이스 이미지"
              style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }}
            />
          ) : (
            <S.Logo />
          )}
        </S.LogoBox>

        <S.TextBox>
          <S.WorkspaceName>{workspaceName ?? 'workspace'}</S.WorkspaceName>
          <ChevronDown />
        </S.TextBox>

        {open && <WorkspaceSelectorDropdown triggerRef={triggerRef} close={() => setOpen(false)} />}
      </S.SelectorButton>
    </S.Container>
  );
};
