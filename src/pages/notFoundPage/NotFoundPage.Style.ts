import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #ecfeff 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

export const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
`

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

export const Content = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

export const IllustrationContainer = styled.div`
  position: relative;
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 2;
`

export const Number = styled.div`
  font-size: 128px;
  font-weight: 900;
  color: #0f172a;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${bounce} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 96px;
  }

  &:first-child {
    animation-delay: 0.1s;
  }

  &:last-child {
    animation-delay: 0.3s;
  }
`

export const FloatingBubble = styled.div<{ $delay: string; $size: string }>`
  position: relative;
  width: ${(props) => (props.$size === "large" ? "64px" : "48px")};
  height: ${(props) => (props.$size === "large" ? "64px" : "48px")};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay};
`

export const BubbleLarge = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  background: linear-gradient(135deg, #5eead4 0%, #22d3ee 100%);
  border-radius: 50%;
  opacity: 0.8;
  top: 0;
  left: 0;
  animation: ${pulse} 3s ease-in-out infinite;
`

export const BubbleMedium = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  background: linear-gradient(135deg, #99f6e4 0%, #67e8f9 100%);
  border-radius: 50%;
  opacity: 0.8;
  bottom: 25%;
  left: 25%;
  animation: ${pulse} 3s ease-in-out infinite 0.5s;
`

export const BubbleSmall = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  background: linear-gradient(135deg, #ccfbf1 0%, #cffafe 100%);
  border-radius: 50%;
  opacity: 0.8;
  bottom: 0;
  left: 0;
  animation: ${pulse} 3s ease-in-out infinite 1s;
`

export const DecorationElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

export const FloatingElement = styled.div<{ $position: string; $delay: string }>`
  position: absolute;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay};
  
  ${(props) => {
    switch (props.$position) {
      case "top-left":
        return "top: 10%; left: 10%;"
      case "top-right":
        return "top: 20%; right: 15%;"
      case "bottom-left":
        return "bottom: 15%; left: 20%;"
      case "bottom-right":
        return "bottom: 10%; right: 10%;"
      default:
        return ""
    }
  }}

  @media (max-width: 768px) {
    display: none;
  }
`

export const TextContent = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`

export const Description = styled.p`
  font-size: 18px;
  color: #64748b;
  max-width: 512px;
  margin: 0 auto 40px;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
`

export const PrimaryButton = styled.button`
  padding: 14px 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const SecondaryButton = styled.button`
  padding: 14px 32px;
  border-radius: 8px;
  background: white;
  color: #64748b;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const HelpSection = styled.div`
  margin-top: 32px;
`

export const HelpTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
`

export const HelpLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`

export const HelpLink = styled.a`
  color: ${color.teal600};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${color.teal700};
    text-decoration: underline;
  }
`

export const HelpDivider = styled.span`
  color: #d1d5db;
  font-size: 14px;
`

export const SuggestedPages = styled.section`
  width: 100%;
  max-width: 800px;
`

export const SuggestedTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 32px;
`

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`

export const PageCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const PageIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ccfbf1 0%, #cffafe 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: ${color.teal600};
`

export const PageTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 8px;
`

export const PageDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.5;
`

export const PageLink = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background-color: ${color.teal500};
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.teal600};
    transform: translateY(-1px);
  }
`
