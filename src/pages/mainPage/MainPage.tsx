import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import * as S from "./MainPage.Style"
import { Footer } from '@/components/common/footer/Footer';
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { COMKET } from "@/assets/icons";

export const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const onboardingSlides = [
    {
      id: 1,
      title: "프로젝트 전반 관리",
      description: "워크스페이스부터 프로젝트, 티켓까지 하나의 흐름으로 체계적으로 관리하세요.",
      image: "images/demo-1.png",
    },
    {
      id: 2,
      title: "티켓 기반 업무 분배",
      description: "해야 할 업무는 티켓으로 빠르게 생성하고, 우선순위와 담당자를 설정하세요.",
      image: "images/demo-2.png",
    },
    {
      id: 3,
      title: "칸반보드로 한눈에 보기",
      description: "티켓을 칸반보드에서 드래그하며 상태를 변경하고, 전체 흐름을 직관적으로 관리하세요.",
      image: "images/demo-3.png",
    },
    {
      id: 4,
      title: "스레드 & AI 요약 & 액션 아이템",
      description: "티켓 안에서 스레드로 대화를 주고받고, AI 요약과 액션아이템으로 다음 업무까지 연결하세요.",
      image: "images/demo-4.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [onboardingSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingSlides.length) % onboardingSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <S.Container>
      <S.HeaderWrapper>
        <GlobalNavBar variant="default" />
      </S.HeaderWrapper>

      <S.Main>
        <S.HeroSection>
          <S.HeroTitle>COMKET과 함께, 협업의 흐름을 단순하게</S.HeroTitle>
          <S.HeroDescription>
            티켓 중심의 업무 관리와 AI 기반 자동화로 <br />
            더 빠르게, 더 똑똑하게 협업하세요.
          </S.HeroDescription>
          <S.HeroButtons>
            <Link to="/signup">
              <S.GetStartedButton>시작하기</S.GetStartedButton>
            </Link>
            {/* <Link to="#demo">
              <S.WatchDemoButton>데모 보기</S.WatchDemoButton>
            </Link> */}
          </S.HeroButtons>
        </S.HeroSection>

        <S.OnboardingSlider>
          <S.SliderContainer>
            <S.SliderWrapper $currentSlide={currentSlide}>
              {onboardingSlides.map((slide, index) => (
                <S.Slide key={slide.id}>
                  <S.SlideContent>
                    <S.SlideImage>
                      <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
                    </S.SlideImage>
                    <S.SlideTextContent>
                      <S.SlideTitle>{slide.title}</S.SlideTitle>
                      <S.SlideDescription>{slide.description}</S.SlideDescription>
                    </S.SlideTextContent>
                  </S.SlideContent>
                </S.Slide>
              ))}
            </S.SliderWrapper>

            <S.SliderControls>
              <S.PrevButton onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.PrevButton>
              <S.NextButton onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.NextButton>
            </S.SliderControls>

            <S.SliderDots>
              {onboardingSlides.map((_, index) => (
                <S.Dot key={index} $active={index === currentSlide} onClick={() => goToSlide(index)} />
              ))}
            </S.SliderDots>
          </S.SliderContainer>
        </S.OnboardingSlider>

        <S.FeaturesSection id="features">
          <S.FeatureCard>
            <S.FeatureIconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </S.FeatureIconWrapper>
            <S.FeatureTitle>더 빠르고 효율적인 협업</S.FeatureTitle>
            <S.FeatureDescription>
              복잡한 커뮤니케이션과 업무 관리를 하나로! <br />
              실시간 티켓 중심 워크플로우로 <br /> 생산성과 속도를 모두 잡아보세요.
            </S.FeatureDescription>
          </S.FeatureCard>
          <S.FeatureCard>
            <S.FeatureIconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </S.FeatureIconWrapper>
            <S.FeatureTitle>놓치지 않는 핵심, 자동 정리</S.FeatureTitle>
            <S.FeatureDescription>
              회의 끝나자마자 AI가 요약과 액션 아이템을 자동 추출해줍니다. <br />
              중요한 논의가 흘러가지 않도록, 다음 행동으로 바로 이어지세요.
            </S.FeatureDescription>
          </S.FeatureCard>
          <S.FeatureCard>
            <S.FeatureIconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </S.FeatureIconWrapper>
            <S.FeatureTitle>진짜 팀워크를 위한 협업</S.FeatureTitle>
            <S.FeatureDescription>단순 채팅을 넘어,
              티켓과 스레드를 중심으로 <br />실시간 협업이 이어지는 공간입니다. <br />
              모든 팀원이 하나의 흐름 속에서 일할 수 있어요.</S.FeatureDescription>
          </S.FeatureCard>
        </S.FeaturesSection>
      </S.Main>

      <S.Footer>
        <S.FooterTop>
          <S.FooterLogo>
            <S.LogoWrapper $small={true}>
              <COMKET />
            </S.LogoWrapper>
            <S.LogoText $small={true}>COMKET</S.LogoText>
          </S.FooterLogo>
          <S.SocialLinks>
            <S.SocialLink href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </S.SocialLink>
            <S.SocialLink href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </S.SocialLink>
            <S.SocialLink href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </S.SocialLink>
            <S.SocialLink href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </S.SocialLink>
          </S.SocialLinks>
        </S.FooterTop>
        <Footer type='default' />
      </S.Footer>
    </S.Container>
  )
}
