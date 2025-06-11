import { Link } from "react-router-dom"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { Footer } from "@/components/common/footer/Footer"
import * as S from "./NotFoundPage.Style"

export const NotFoundPage = () => {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <GlobalNavBar variant="default" />
      </S.HeaderWrapper>

      <S.Main>
        <S.Content>
          <S.IllustrationContainer>
            <S.NumberContainer>
              <S.Number>4</S.Number>
              <S.FloatingBubble $delay="0s" $size="large">
                <S.BubbleLarge />
                <S.Number>0</S.Number>
                <S.BubbleMedium />
                <S.BubbleSmall />
              </S.FloatingBubble>
              <S.Number>4</S.Number>
            </S.NumberContainer>

            <S.DecorationElements>
              <S.FloatingElement $position="top-left" $delay="1s">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="#22d3ee"
                    opacity="0.6"
                  />
                </svg>
              </S.FloatingElement>

              <S.FloatingElement $position="top-right" $delay="2s">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#5eead4" opacity="0.7" />
                </svg>
              </S.FloatingElement>

              <S.FloatingElement $position="bottom-left" $delay="1.5s">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12,2 22,20 2,20" fill="#67e8f9" opacity="0.6" />
                </svg>
              </S.FloatingElement>

              <S.FloatingElement $position="bottom-right" $delay="0.5s">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="3" fill="#99f6e4" opacity="0.5" />
                </svg>
              </S.FloatingElement>
            </S.DecorationElements>
          </S.IllustrationContainer>

          <S.TextContent>
            <S.Title>페이지를 찾을 수 없습니다</S.Title>
            <S.Description>
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              <br />
              아래 버튼을 통해 다른 페이지로 이동해보세요.
            </S.Description>

            <S.ActionButtons>
              <Link to="/main">
                <S.PrimaryButton>홈으로 돌아가기</S.PrimaryButton>
              </Link>
              <Link to="/plan">
                <S.SecondaryButton>요금제 보기</S.SecondaryButton>
              </Link>
            </S.ActionButtons>

            <S.HelpSection>
              <S.HelpTitle>도움이 필요하신가요?</S.HelpTitle>
              <S.HelpLinks>
                <S.HelpLink href="/contact">문의하기</S.HelpLink>
                {/* <S.HelpDivider>•</S.HelpDivider>
                <S.HelpLink href="/support">고객지원</S.HelpLink>
                <S.HelpDivider>•</S.HelpDivider>
                <S.HelpLink href="/docs">도움말</S.HelpLink> */}
              </S.HelpLinks>
            </S.HelpSection>
          </S.TextContent>
        </S.Content>

        <S.SuggestedPages>
          <S.SuggestedTitle>추천 페이지</S.SuggestedTitle>
          <S.PageGrid>
            <S.PageCard>
              <S.PageIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.PageIcon>
              <S.PageTitle>홈페이지</S.PageTitle>
              <S.PageDescription>COMKET의 메인 페이지로 이동</S.PageDescription>
              <Link to="/main">
                <S.PageLink>바로가기</S.PageLink>
              </Link>
            </S.PageCard>

            <S.PageCard>
              <S.PageIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.PageIcon>
              <S.PageTitle>요금제</S.PageTitle>
              <S.PageDescription>다양한 요금제 옵션 확인</S.PageDescription>
              <Link to="/plan">
                <S.PageLink>바로가기</S.PageLink>
              </Link>
            </S.PageCard>

            <S.PageCard>
              <S.PageIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </S.PageIcon>
              <S.PageTitle>로그인</S.PageTitle>
              <S.PageDescription>계정에 로그인하기</S.PageDescription>
              <Link to="/login">
                <S.PageLink>바로가기</S.PageLink>
              </Link>
            </S.PageCard>
          </S.PageGrid>
        </S.SuggestedPages>
      </S.Main>

      <Footer type="default" />
    </S.Container>
  )
}
