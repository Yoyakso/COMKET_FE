import { ChevronDown } from "@/assets/icons"
import * as S from "./WorkspaceSelector.Style"

export const WorkspaceSelector = () => {
  return (
    <S.Container>
      <S.LogoBox>
        <S.Logo />
      </S.LogoBox>
      <S.TextBox>
        <S.WorkspaceName>YOYAKSO</S.WorkspaceName>
        <ChevronDown />
      </S.TextBox>
    </S.Container>
  )
}
