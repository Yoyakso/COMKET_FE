import { ChevronDown } from "@/assets/icons"
import * as S from "./WorkspaceSelector.Style"

export const WorkspaceSelector = () => {
  const workspaceName = localStorage.getItem("workspaceName")

  return (
    <S.Container>
      <S.LogoBox>
        <S.Logo />
      </S.LogoBox>
      <S.TextBox>
        <S.WorkspaceName>{workspaceName}</S.WorkspaceName>
        <ChevronDown />
      </S.TextBox>
    </S.Container>
  )
}
