import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react"
import * as S from "./ContactPage.Style"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 폼 제출 로직
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // 성공 메시지 표시 로직
    alert("문의가 성공적으로 전송되었습니다!")

    // 폼 초기화
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "이메일",
      content: "contact@comket.com",
      description: "24시간 내 답변드립니다",
    },
    {
      icon: Phone,
      title: "전화",
      content: "02-1234-5678",
      description: "평일 09:00 - 18:00",
    },
    {
      icon: MapPin,
      title: "주소",
      content: "서울시 강남구 테헤란로 123",
      description: "COMKET 본사",
    },
    {
      icon: Clock,
      title: "운영시간",
      content: "평일 09:00 - 18:00",
      description: "주말 및 공휴일 휴무",
    },
  ]

  const faqs = [
    {
      question: "무료 체험은 어떻게 시작하나요?",
      answer:
        "5명 이하의 워크스페이스를 생성하실 경우, COMKET을 무료로 사용하실 수 있습니다.",
    },
    {
      question: "요금제 변경은 언제든 가능한가요?",
      answer:
        "네, 언제든지 요금제를 업그레이드하거나 다운그레이드할 수 있습니다. 변경사항은 다음 결제일부터 적용됩니다.",
    },
  ]

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <S.Container>
      <S.Header>
        <GlobalNavBar variant="default" />
      </S.Header>

      <S.Main>
        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroBadge>
            <MessageSquare size={12} />
            언제든 문의하세요
          </S.HeroBadge>
          <S.HeroTitle>
            궁금한 점이 있으시면
            <br />
            <S.GradientText>언제든 연락주세요</S.GradientText>
          </S.HeroTitle>
          <S.HeroDescription>
            COMKET 팀이 여러분의 성공을 위해 최선을 다해 도와드리겠습니다. <br />
            제품 문의부터 기술 지원까지, 무엇이든 편하게 문의해주세요.
          </S.HeroDescription>
        </S.HeroSection>

        {/* Contact Info Section */}
        <S.ContactInfoSection>
          <S.ContactInfoGrid>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <S.ContactInfoCard key={index}>
                  <S.ContactIconContainer>
                    <IconComponent size={24} />
                  </S.ContactIconContainer>
                  <S.ContactInfoContent>
                    <S.ContactInfoTitle>{info.title}</S.ContactInfoTitle>
                    <S.ContactInfoMain>{info.content}</S.ContactInfoMain>
                    <S.ContactInfoDescription>{info.description}</S.ContactInfoDescription>
                  </S.ContactInfoContent>
                </S.ContactInfoCard>
              )
            })}
          </S.ContactInfoGrid>
        </S.ContactInfoSection>

        {/* Contact Form Section */}
        <S.ContactFormSection>
          <S.ContactFormContainer>
            <S.ContactFormHeader>
              <S.SectionTitle>문의하기</S.SectionTitle>
              <S.SectionDescription>아래 양식을 작성해주시면 빠른 시일 내에 답변드리겠습니다.</S.SectionDescription>
            </S.ContactFormHeader>

            <S.ContactForm onSubmit={handleSubmit}>
              <S.FormRow>
                <S.FormGroup>
                  <S.FormLabel htmlFor="name">이름 *</S.FormLabel>
                  <S.FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="홍길동"
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel htmlFor="email">이메일 *</S.FormLabel>
                  <S.FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="hong@example.com"
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <S.FormLabel htmlFor="subject">문의 유형 *</S.FormLabel>
                  <S.FormSelect
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">문의 유형을 선택해주세요</option>
                    <option value="product">제품 문의</option>
                    <option value="pricing">요금제 문의</option>
                    <option value="technical">기술 지원</option>
                    <option value="partnership">파트너십</option>
                    <option value="other">기타</option>
                  </S.FormSelect>
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <S.FormLabel htmlFor="message">메시지 *</S.FormLabel>
                <S.FormTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="문의 내용을 자세히 작성해주세요..."
                />
              </S.FormGroup>

              <S.FormSubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>전송 중...</>
                ) : (
                  <>
                    문의 보내기
                    <Send size={16} />
                  </>
                )}
              </S.FormSubmitButton>
            </S.ContactForm>
          </S.ContactFormContainer>
        </S.ContactFormSection>

        {/* FAQ Section */}
        <S.FAQSection>
          <S.SectionTitle>자주 묻는 질문</S.SectionTitle>
          <S.SectionDescription>빠른 답변이 필요하시다면 아래 FAQ를 먼저 확인해보세요</S.SectionDescription>
          <S.FAQGrid>
            {faqs.map((faq, index) => (
              <S.FAQCard key={index}>
                <S.FAQQuestion>{faq.question}</S.FAQQuestion>
                <S.FAQAnswer>{faq.answer}</S.FAQAnswer>
              </S.FAQCard>
            ))}
          </S.FAQGrid>
        </S.FAQSection>

        {/* CTA Section */}
        <S.CTASection>
          <S.CTATitle>지금 ComKet을 시작하세요</S.CTATitle>
          <S.CTADescription>무료 플랜으로 시작하여 모든 기능을 경험해보세요.</S.CTADescription>
          <S.CTAButtonGroup>
            <S.CTAWhiteButton onClick={handleStart}>
              무료로 시작하기
              <ArrowRight size={16} />
            </S.CTAWhiteButton>
          </S.CTAButtonGroup>
          <S.CTASubtext>효율적인 협업을 시작해보세요.</S.CTASubtext>
        </S.CTASection>
      </S.Main>
    </S.Container>
  )
}
