import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

export const pulse = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 0.9; }
  100% { opacity: 0.7; }
`

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`

export const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
`

export const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
`

export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
`

export const HeroTitle = styled.h1`
  font-size: 33px;
  font-weight: 800;
  color: ${color.textPrimary};
  margin-bottom: 24px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`

export const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${color.textSecondary};
  max-width: 36rem;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

export const GetStartedButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  background: linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`

export const WatchDemoButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  background: white;
  color: ${color.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    background-color: white;
    color: ${color.textPrimary};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`

export const OnboardingSlider = styled.section`
  margin-bottom: 4rem;
  padding: 2rem 0;
`

export const SliderContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

export const SliderWrapper = styled.div<{ $currentSlide: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => props.$currentSlide * 100}%);
`

export const Slide = styled.div`
  min-width: 100%;
  padding: 3rem 2rem;
`

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 3rem;
  }
`

export const SlideImage = styled.div`
  flex: 1;
  max-width: 600px;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const SlideTextContent = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`

export const SlideTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${color.textPrimary};
  margin-bottom: 1rem;
  animation: ${slideIn} 0.6s ease-out;
`

export const SlideDescription = styled.p`
  font-size: 1.125rem;
  color: ${color.textSecondary};
  line-height: 1.6;
  animation: ${slideIn} 0.6s ease-out 0.1s both;
`

export const SliderControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  pointer-events: none;
`

export const PrevButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  color: ${color.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background: white;
    color: ${color.textPrimary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const NextButton = styled(PrevButton)``

export const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
`

export const Dot = styled.button<{ $active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#22d3ee" : "#cbd5e1")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#0ea5e9" : "#94a3b8")};
    transform: scale(1.1);
  }
`

export const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FeatureCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid ${color.basic0};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const FeatureIconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #ccfbf1 0%, #cffafe 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${color.teal500};
`

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-bottom: 0.75rem;
`

export const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: ${color.textSecondary};
  line-height: 1.6;
`

export const LogoWrapper = styled.div<{ $small?: boolean }>`
  position: relative;
  width: ${(props) => (props.$small ? "2rem" : "2.5rem")};
  height: ${(props) => (props.$small ? "2rem" : "2.5rem")};
`

export const LogoText = styled.span<{ $small?: boolean }>`
  font-family: "Lexend";
  font-size: ${(props) => (props.$small ? "1.25rem" : "1.5rem")};
  font-weight: 700;
  color: ${color.textPrimary};
  margin-bottom: 10px;
`

export const Footer = styled.footer`
  background-color: ${color.basic0};
  border-top: 1px solid ${color.basic100};
  padding: 32px;
`

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`

export const SocialLink = styled.a`
  color: ${color.basic500};
  transition: color 0.2s ease;

  &:hover {
    color: ${color.textSecondary};
  }
`
