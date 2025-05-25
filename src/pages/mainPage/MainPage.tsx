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
      title: "프로젝트 관리",
      description: "팀의 모든 프로젝트를 한 곳에서 체계적으로 관리하세요",
      image: "images/dummy-1.png",
    },
    {
      id: 2,
      title: "티겟 생성",
      description: "프로젝트 내에서 해결해야 할 이슈를 티켓으로 발행하세요.",
      image: "images/dummy-1.png",
    },
    {
      id: 3,
      title: "실시간 협업",
      description: "팀원들과 실시간으로 소통하며 효율적으로 협업하세요",
      image: "images/dummy-1.png",
    },
    {
      id: 4,
      title: "AI요약",
      description: "소통한 내용을 AI를 통해 요약하고, 액션아이템을 추출해보세요.",
      image: "images/dummy-1.png",
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
          <S.HeroTitle>COMKET과 함께 업무 흐름을 간소화하세요</S.HeroTitle>
          <S.HeroDescription>
            비즈니스 프로세스를 간소화하고 생산성을 향상시키기 위해 설계된 올인원 플랫폼입니다.
          </S.HeroDescription>
          <S.HeroButtons>
            <Link to="/signup">
              <S.GetStartedButton>시작하기</S.GetStartedButton>
            </Link>
            <Link to="#demo">
              <S.WatchDemoButton>데모 보기</S.WatchDemoButton>
            </Link>
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
            <S.FeatureTitle>빠르고 효율적</S.FeatureTitle>
            <S.FeatureDescription>
              최대 효율성을 위해 설계된 초고속 플랫폼으로 워크플로우를 최적화하세요.
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
            <S.FeatureTitle>안전하고 신뢰할 수 있음</S.FeatureTitle>
            <S.FeatureDescription>
              엔터프라이즈급 보안과 99.9% 가동 시간 보장으로 데이터를 보호합니다.
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
            <S.FeatureTitle>팀 협업</S.FeatureTitle>
            <S.FeatureDescription>실시간 협업 도구와 공유 작업 공간으로 원활하게 함께 작업하세요.</S.FeatureDescription>
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
