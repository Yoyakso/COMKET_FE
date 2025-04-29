import { ChevronDown, COMKET, InfoIcon, QuestionIcon } from "@assets/icons"
import * as S from "./GlobalNavBar.Style"
import { WorkspaceSelector } from "./WorkspaceSelector"

type GNBVariant = "default" | "white" | "workspace"

interface GNBProps {
  variant?: GNBVariant
}

export const GlobalNavBar = ({ variant = 'default' }: GNBProps) => {
  return (
    <S.NavbarContainer>
      {variant !== "workspace" && (
        <S.LogoContainer>
          <COMKET />
          <S.LogoText>COMKET</S.LogoText>
        </S.LogoContainer>
      )}
      {variant === "workspace" && (
        <WorkspaceSelector />
      )}

      {variant === "default" && (
        <S.NavLinks>
          <S.NavLink href="#">서비스 소개</S.NavLink>
          <S.NavLink href="#">이용 요금</S.NavLink>
          <S.NavLink href="#">
            고객 지원
            <ChevronDown style={{ marginLeft: '8px' }} />
          </S.NavLink>
        </S.NavLinks>
      )}
      {variant === "default" && (
        <S.AuthContainer>
          <S.LoginButton>로그인</S.LoginButton>
          <S.StartButton>시작하기</S.StartButton>
        </S.AuthContainer>
      )}

      {variant === "workspace" && (
        <S.SearchContainter>
          <S.StyledSearch variant="filled" size="sm" value="" state="enable" onChange={() => { }} />
        </S.SearchContainter>
      )}

      {variant !== "default" && (
        <S.IconContainer>
          <InfoIcon />
          <QuestionIcon />
        </S.IconContainer>
      )}

    </S.NavbarContainer>
  )
}
