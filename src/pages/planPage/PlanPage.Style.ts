import styled from "styled-components"
import { color } from "@/styles/color"

export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`

export const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
`

export const Main = styled.main`
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 32px;
`

export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 48px;
  padding-top: 32px;
`

export const HeroTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`

export const HeroDescription = styled.p`
  font-size: 18px;
  color: #64748b;
  max-width: 672px;
  margin: 0 auto;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const PricingCard = styled.div<{ $featured?: boolean; $selected?: boolean }>`
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  min-height: 600px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: ${(props) =>
    props.$featured
      ? `2px solid ${color.teal500}`
      : props.$selected
        ? `2px solid ${color.teal300}`
        : "1px solid #f1f5f9"};
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`

export const RecommendedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, ${color.teal500} 0%, ${color.teal600} 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

export const PlanName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`

export const UserRange = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
  font-weight: 500;
`

export const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 16px;
`

export const Price = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
`

export const PricePeriod = styled.span`
  font-size: 16px;
  color: #64748b;
  margin-left: 8px;
`

export const PlanDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
`

export const FeatureSection = styled.div`
  margin-bottom: 32px;
`

export const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
`

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
`

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: #0f172a;
`

export const CheckIcon = styled.div`
  color: ${color.teal500};
  flex-shrink: 0;
`

export const LimitationTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 12px
`

export const LimitationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const LimitationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px
  padding: 4px 0;
  font-size: 14px;
  color: #64748b;
`

export const XIcon = styled.div`
  color: #ef4444;
  flex-shrink: 0;
`

export const CTAButton = styled.button<{ $primary: boolean; $free?: boolean }>`
  width: 100%;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${(props) => (props.$primary ? "none" : `1px solid ${color.teal500}`)};
  background-color: ${(props) => (props.$free ? "#f8fafc" : props.$primary ? color.teal500 : "white")};
  color: ${(props) => (props.$free ? "#64748b" : props.$primary ? "white" : color.teal500)};

  &:hover {
    background-color: ${(props) => (props.$free ? "#f1f5f9" : props.$primary ? color.teal600 : "#f0fdfa")};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`

export const ComparisonSection = styled.section`
  margin-bottom: 64px;
`

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 32px;
`

export const ComparisonTableWrapper = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
`

export const ComparisonTable = styled.div`
  min-width: 600px;
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
`

export const FeatureColumn = styled.div`
  padding: 16px 24px;
  font-weight: 600;
  color: #0f172a;
  font-size: 14px;
`

export const PlanColumn = styled.div`
  padding: 16px 16px;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  font-size: 14px;
`

export const CategorySection = styled.div``

export const CategoryHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  background-color: #fafbfc;
  border-bottom: 1px solid #f1f5f9;
`

export const CategoryName = styled.div`
  padding: 12px 24px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`

export const CategoryDivider = styled.div`
  background-color: #f1f5f9;
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`

export const FeatureCell = styled.div`
  padding: 16px 24px;
  color: #0f172a;
  font-size: 14px;
`

export const PlanCell = styled.div`
  padding: 16px 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CheckMark = styled.span`
  color: ${color.teal500};
  font-weight: 600;
  font-size: 16px;
`

export const XMark = styled.span`
  color: #ef4444;
  font-weight: 600;
  font-size: 16px;
`

export const LimitedText = styled.span`
  color: #f59e0b;
  font-size: 12px;
  font-weight: 500;
`

export const FAQSection = styled.section`
  margin-bottom: 64px;
`

export const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export const FAQItem = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
`

export const FAQQuestion = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
`

export const FAQAnswer = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`

export const CTASection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%);
  border-radius: 16px;
  padding: 48px 32px;
  margin-bottom: 32px;
`

export const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
`

export const CTADescription = styled.p`
  font-size: 18px;
  color: #64748b;
  margin-bottom: 32px;
`

export const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  width: 750px;
`

export const Footer = styled.footer`
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  padding: 32px;
`