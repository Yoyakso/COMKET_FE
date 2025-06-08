import styled from "styled-components"

const colors = {
  teal400: "#2dd4bf",
  cyan400: "#22d3ee",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
  orange400: "#fb923c",
  orange200: "#fed7aa",
}

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.gray50};
`

export const Header = styled.header`
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray100};
  position: sticky;
  top: 0;
  z-index: 50;
`

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const LogoBadge = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    color: ${colors.white};
    font-weight: 700;
    font-size: 0.875rem;
  }
`

export const LogoText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.gray900};
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const GhostButton = styled.button`
  background: transparent;
  color: ${colors.gray600};
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: ${colors.gray900};
  }
`

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  color: ${colors.white};
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

// 히어로 섹션
export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  color: ${colors.white};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
`

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.gray900};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

export const GradientText = styled.span`
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`

export const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray600};
  max-width: 36rem;
  margin: 0 auto;
  line-height: 1.6;
`

// 플랜 선택기
export const PlanSelectorSection = styled.section`
  margin-bottom: 3rem;
`

export const PlanTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 32rem;
  margin: 0 auto;
  background-color: ${colors.gray100};
  border-radius: 0.375rem;
  overflow: hidden;
`

export const PlanTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${(props) => (props.$active ? colors.white : "transparent")};
  color: ${(props) => (props.$active ? colors.gray900 : colors.gray500)};
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${(props) => (props.$active ? colors.gray900 : colors.gray700)};
  }
  
  @media (max-width: 640px) {
    span {
      display: none;
    }
  }
`

// 선택된 플랜 하이라이트
export const SelectedPlanSection = styled.section`
  margin-bottom: 4rem;
`

export const PlanCard = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  background-color: ${colors.white};
  border: 2px solid ${colors.gray200};
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
`

export const PopularBadge = styled.div`
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  color: ${colors.white};
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`

export const PlanCardHeader = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
`

export const PlanIconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${colors.white};
`

export const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.gray900};
  margin-bottom: 0.5rem;
`

export const PlanUserRange = styled.div`
  font-size: 0.875rem;
  color: ${colors.gray500};
  margin-bottom: 1rem;
`

export const PlanPriceContainer = styled.div`
  margin-bottom: 1rem;
`

export const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.gray900};
  display: flex;
  align-items: baseline;
  justify-content: center;
`

export const PlanPricePeriod = styled.span`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${colors.gray500};
  margin-left: 0.25rem;
`

export const PlanPricePerUser = styled.div`
  font-size: 0.75rem;
  color: ${colors.gray400};
`

export const PlanDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray600};
  line-height: 1.5;
`

export const PlanCardContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`

export const PlanButton = styled.button<{ $popular: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  
  ${(props) =>
    props.$popular
      ? `
    background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
    color: ${colors.white};
    border: none;
    
    &:hover {
      opacity: 0.9;
    }
  `
      : `
    background-color: ${colors.white};
    color: ${colors.gray700};
    border: 1px solid ${colors.gray300};
    
    &:hover {
      border-color: ${colors.gray400};
    }
  `}
`

export const PlanButtonSubtext = styled.p`
  font-size: 0.75rem;
  color: ${colors.gray500};
  margin-top: 0.5rem;
`

// 기능 비교 섹션
export const FeatureComparisonSection = styled.section`
  margin-bottom: 4rem;
`

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.gray900};
  text-align: center;
  margin-bottom: 1rem;
`

export const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray600};
  text-align: center;
  margin-bottom: 3rem;
`

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const FeatureCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`

export const FeatureCardHeader = styled.div`
  background-color: ${colors.gray50};
  border-bottom: 1px solid ${colors.gray200};
  padding: 1rem 1.5rem;
`

export const FeatureCardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.gray900};
`

export const FeatureIconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`

export const FeatureCardContent = styled.div`
  padding: 1.5rem;
`

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const FeatureItem = styled.div`
  padding: 0.5rem 0;
  
  span {
    font-size: 0.875rem;
    color: ${colors.gray700};
    font-weight: 500;
    line-height: 1.5;
  }
`

// FAQ 섹션
export const FAQSection = styled.section`
  margin-bottom: 4rem;
`

export const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  max-width: 48rem;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const FAQCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`

export const FAQQuestion = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.gray900};
  margin-bottom: 0.75rem;
`

export const FAQAnswer = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray600};
  line-height: 1.5;
`

// CTA 섹션
export const CTASection = styled.section`
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  color: ${colors.white};
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
`

export const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export const CTADescription = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`

export const CTAButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`

export const CTAWhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${colors.white};
  color: ${colors.teal400};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.gray100};
  }
`

export const CTAOutlineButton = styled.button`
  background-color: transparent;
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: 2px solid ${colors.white};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${colors.white};
    color: ${colors.teal400};
  }
`

export const CTASubtext = styled.p`
  font-size: 0.875rem;
  opacity: 0.75;
`
