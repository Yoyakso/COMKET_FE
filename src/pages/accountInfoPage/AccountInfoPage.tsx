import { useState } from "react"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import * as S from "./AccountInfoPage.Style"
import { GoogleIcon } from "@assets/icons"

interface AccountInfoProps {
  email: string
  loginMethod: "google" | "email" | "kakao"
}

export const AccountInfoPage = () => {
  const [accountInfo] = useState<AccountInfoProps>({
    email: "tph00300@ajou.co.kr",
    loginMethod: "google",
  })

  const handleLogout = () => {
    console.log("로그아웃 처리")
    //로그아웃 API 호출
  }

  const handleWithdraw = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
      console.log("회원 탈퇴 처리")
      //회원 탈퇴 API 호출
    }
  }

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
          <S.Title>계정 정보</S.Title>

          <S.Section>
            <S.SectionTitle>이메일</S.SectionTitle>
            <S.SectionContent>
              <S.EmailText>{accountInfo.email}</S.EmailText>
            </S.SectionContent>
          </S.Section>

          <S.Divider />

          <S.Section>
            <S.SectionTitle>로그인 정보</S.SectionTitle>
            <S.SectionContent>
              <S.LoginMethodContainer>
                <S.LoginMethodInfo>
                  {accountInfo.loginMethod === "google" && (
                    <>
                      <GoogleIcon width={16} height={16} />
                      <S.LoginMethodText>Google 계정으로 로그인</S.LoginMethodText>
                    </>
                  )}
                </S.LoginMethodInfo>
                <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
              </S.LoginMethodContainer>
            </S.SectionContent>
          </S.Section>

          <S.Divider />

          <S.Section>
            <S.SectionTitle>서비스 탈퇴</S.SectionTitle>
            <S.SectionContent>
              <S.WithdrawContainer>
                <S.WithdrawText>탈퇴 시 계정 및 이용 기록은 모두 삭제되며, 복구가 불가능합니다.</S.WithdrawText>
                <S.WithdrawButton onClick={handleWithdraw}>탈퇴하기</S.WithdrawButton>
              </S.WithdrawContainer>
            </S.SectionContent>
          </S.Section>
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  )
}
