import { ChevronDown } from "@/assets/icons"
import * as S from "./WorkspaceSelector.Style"
import { useWorkspaceStore } from "@/stores/workspaceStore"

export const WorkspaceSelector = () => {
  const workspaceName = useWorkspaceStore((s) => s.workspaceName)
  const profileFileUrl = useWorkspaceStore((s) => s.profileFileUrl)

  return (
    <S.Container>
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
        <S.WorkspaceName>{workspaceName ?? "workspace"}</S.WorkspaceName>
        <ChevronDown />
      </S.TextBox>
    </S.Container>
  );
};
