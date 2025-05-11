import { ChevronDown } from "@/assets/icons"
import * as S from "./WorkspaceSelector.Style"

export const WorkspaceSelector = () => {
  const workspaceName = localStorage.getItem("workspaceName");
  const workspaceImageUrl = localStorage.getItem("workspaceImageUrl");
  
  return (
    <S.Container>
      <S.LogoBox>
        {workspaceImageUrl ? (
          <img
            src={workspaceImageUrl}
            alt="워크스페이스 이미지"
            style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }}
          />
        ) : (
          <S.Logo />
        )}
      </S.LogoBox>

      <S.TextBox>
        <S.WorkspaceName>{workspaceName ?? "워크스페이스"}</S.WorkspaceName>
        <ChevronDown />
      </S.TextBox>
    </S.Container>
  );
};
