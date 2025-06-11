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
  red500: "#ef4444",
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

// 연락처 정보 섹션
export const ContactInfoSection = styled.section`
  margin-bottom: 4rem;
`

export const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`

export const ContactInfoCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`

export const ContactIconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  flex-shrink: 0;
`

export const ContactInfoContent = styled.div`
  flex: 1;
`

export const ContactInfoTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.gray900};
  margin-bottom: 0.5rem;
`

export const ContactInfoMain = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.gray700};
  margin-bottom: 0.25rem;
`

export const ContactInfoDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray500};
`

export const ContactFormSection = styled.section`
  margin-bottom: 4rem;
`

export const ContactFormContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`

export const ContactFormHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.gray900};
  margin-bottom: 1rem;
`

export const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray600};
`

export const ContactForm = styled.form`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray700};
  margin-bottom: 0.5rem;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.teal400};
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
  
  &::placeholder {
    color: ${colors.gray400};
  }
`

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: ${colors.white};
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.teal400};
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
`

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.teal400};
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
  
  &::placeholder {
    color: ${colors.gray400};
  }
`

export const FormSubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: linear-gradient(135deg, ${colors.teal400} 0%, ${colors.cyan400} 100%);
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.875rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const FAQSection = styled.section`
  margin-bottom: 4rem;
  text-align: center;
`

export const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  max-width: 48rem;
  margin: 3rem auto 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const FAQCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: left;
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
