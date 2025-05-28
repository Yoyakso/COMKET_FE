import { useState } from "react"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import * as S from "./PlanPage.Style"
import { Footer } from "@/components/common/footer/Footer"

export const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("startup")

  const plans = [
    {
      id: "personal",
      name: "개인",
      userRange: "1~5명",
      price: "무료",
      priceValue: 0,
      description: "개인 사용자 및 소규모 팀",
      features: ["타켓 생성", "의견 작성", "AI 요약 (제한적)", "타켓 생성 및 관리", "타켓 내 커뮤니케이션"],
      limitations: ["하위 타켓 생성 불가", "커스터마이징 불가"],
      recommended: false,
    },
    {
      id: "startup",
      name: "스타트업",
      userRange: "6~20명",
      price: "$9.99",
      priceValue: 9.99,
      description: "스타트업 및 중소 규모 팀",
      features: ["AI 요약", "하위 타켓 생성", "사용자 맞춤 설정", "타켓 생성 및 관리", "타켓 내 커뮤니케이션"],
      limitations: ["커스터마이징 불가"],
      recommended: true,
    },
    {
      id: "professional",
      name: "프로페셔널",
      userRange: "21~50명",
      price: "$29.99",
      priceValue: 29.99,
      description: "중소기업 및 팀 단위 업무",
      features: [
        "AI 고급 요약",
        "커스터마이징",
        "트리 기반 업무 관리",
        "하위 타켓 생성",
        "타켓 생성 및 관리",
        "타켓 내 커뮤니케이션",
      ],
      limitations: [],
      recommended: false,
    },
    {
      id: "enterprise",
      name: "엔터프라이즈",
      userRange: "50명 이상",
      price: "맞춤형",
      priceValue: null,
      description: "대기업 및 대규모 팀",
      features: ["전체 기능 제공", "맞춤형 솔루션", "전담 지원팀", "고급 보안", "API 접근", "온프레미스 배포"],
      limitations: [],
      recommended: false,
    },
  ]

  const comparisonFeatures = [
    {
      category: "기본 기능",
      features: [
        {
          name: "타켓 생성 및 관리",
          personal: true,
          startup: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "타켓 내 커뮤니케이션",
          personal: true,
          startup: true,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "AI 기능",
      features: [
        {
          name: "AI 요약",
          personal: "제한적",
          startup: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "하위 타켓 생성",
          personal: false,
          startup: true,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "고급 기능",
      features: [
        {
          name: "커스터마이징",
          personal: false,
          startup: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "트리 기반 업무 관리",
          personal: false,
          startup: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "전담 지원",
          personal: false,
          startup: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
  ]

  const faqs = [
    {
      question: "무료 플랜에서 유료 플랜으로 언제든지 업그레이드할 수 있나요?",
      answer:
        "네, 언제든지 업그레이드가 가능합니다. 업그레이드 시 기존 데이터는 모두 유지되며, 추가 기능을 즉시 사용할 수 있습니다.",
    },
    {
      question: "팀 규모가 변경되면 어떻게 하나요?",
      answer: "팀 규모에 따라 자동으로 적절한 요금제를 추천해드립니다. 필요시 언제든지 플랜을 변경할 수 있습니다.",
    },
    {
      question: "엔터프라이즈 플랜의 맞춤형 가격은 어떻게 책정되나요?",
      answer:
        "팀 규모, 필요한 기능, 지원 수준 등을 종합적으로 고려하여 맞춤형 견적을 제공합니다. 영업팀에 문의해주세요.",
    },
    {
      question: "AI 요약 기능의 제한적 사용이란 무엇인가요?",
      answer: "개인 플랜에서는 월 50회까지 AI 요약을 사용할 수 있습니다. 유료 플랜에서는 무제한으로 사용 가능합니다.",
    },
  ]

  return (
    <S.Container>
      <S.HeaderWrapper>
        <GlobalNavBar variant="default" />
      </S.HeaderWrapper>

      <S.Main>
        <S.HeroSection>
          <S.HeroTitle>COMKET 요금제 안내</S.HeroTitle>
          <S.HeroDescription>
            팀 규모와 필요에 맞는 완벽한 요금제를 선택하세요.
            <br />
            개인부터 대기업까지, 모든 규모의 팀을 위한 솔루션을 제공합니다.
          </S.HeroDescription>
        </S.HeroSection>

        <S.PricingGrid>
          {plans.map((plan) => (
            <S.PricingCard
              key={plan.id}
              $featured={plan.recommended}
              onClick={() => setSelectedPlan(plan.id)}
              $selected={selectedPlan === plan.id}
            >
              {plan.recommended && <S.RecommendedBadge>추천</S.RecommendedBadge>}

              <S.PlanHeader>
                <S.PlanName>{plan.name}</S.PlanName>
                <S.UserRange>{plan.userRange}</S.UserRange>
                <S.PriceContainer>
                  <S.Price>{plan.price}</S.Price>
                  {plan.priceValue && <S.PricePeriod>/월</S.PricePeriod>}
                </S.PriceContainer>
                <S.PlanDescription>{plan.description}</S.PlanDescription>
              </S.PlanHeader>

              <S.FeatureSection>
                <S.FeatureTitle>주요 기능</S.FeatureTitle>
                <S.FeatureList>
                  {plan.features.map((feature, index) => (
                    <S.FeatureItem key={index}>
                      <S.CheckIcon>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </S.CheckIcon>
                      {feature}
                    </S.FeatureItem>
                  ))}
                </S.FeatureList>

                {plan.limitations.length > 0 && (
                  <>
                    <S.LimitationTitle>제한사항</S.LimitationTitle>
                    <S.LimitationList>
                      {plan.limitations.map((limitation, index) => (
                        <S.LimitationItem key={index}>
                          <S.XIcon>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </S.XIcon>
                          {limitation}
                        </S.LimitationItem>
                      ))}
                    </S.LimitationList>
                  </>
                )}
              </S.FeatureSection>

              <S.CTAButton $primary={plan.recommended} $free={plan.id === "personal"}>
                {plan.id === "personal"
                  ? "무료로 시작하기"
                  : plan.id === "enterprise"
                    ? "영업팀 문의"
                    : "14일 무료 체험"}
              </S.CTAButton>
            </S.PricingCard>
          ))}
        </S.PricingGrid>

        <S.ComparisonSection>
          <S.SectionTitle>플랜별 요금 비교</S.SectionTitle>
          <S.ComparisonTableWrapper>
            <S.ComparisonTable>
              <S.TableHeader>
                <S.FeatureColumn>항목</S.FeatureColumn>
                <S.PlanColumn>개인</S.PlanColumn>
                <S.PlanColumn>스타트업</S.PlanColumn>
                <S.PlanColumn>프로페셔널</S.PlanColumn>
                <S.PlanColumn>엔터프라이즈</S.PlanColumn>
              </S.TableHeader>

              {comparisonFeatures.map((category, categoryIndex) => (
                <S.CategorySection key={categoryIndex}>
                  <S.CategoryHeader>
                    <S.CategoryName>{category.category}</S.CategoryName>
                    <S.CategoryDivider />
                    <S.CategoryDivider />
                    <S.CategoryDivider />
                    <S.CategoryDivider />
                  </S.CategoryHeader>

                  {category.features.map((feature, featureIndex) => (
                    <S.TableRow key={featureIndex}>
                      <S.FeatureCell>{feature.name}</S.FeatureCell>
                      <S.PlanCell>
                        {typeof feature.personal === "boolean" ? (
                          feature.personal ? (
                            <S.CheckMark>✓</S.CheckMark>
                          ) : (
                            <S.XMark>✕</S.XMark>
                          )
                        ) : (
                          <S.LimitedText>{feature.personal}</S.LimitedText>
                        )}
                      </S.PlanCell>
                      <S.PlanCell>{feature.startup ? <S.CheckMark>✓</S.CheckMark> : <S.XMark>✕</S.XMark>}</S.PlanCell>
                      <S.PlanCell>
                        {feature.professional ? <S.CheckMark>✓</S.CheckMark> : <S.XMark>✕</S.XMark>}
                      </S.PlanCell>
                      <S.PlanCell>
                        {feature.enterprise ? <S.CheckMark>✓</S.CheckMark> : <S.XMark>✕</S.XMark>}
                      </S.PlanCell>
                    </S.TableRow>
                  ))}
                </S.CategorySection>
              ))}
            </S.ComparisonTable>
          </S.ComparisonTableWrapper>
        </S.ComparisonSection>

        <S.FAQSection>
          <S.SectionTitle>자주 묻는 질문</S.SectionTitle>
          <S.FAQList>
            {faqs.map((faq, index) => (
              <S.FAQItem key={index}>
                <S.FAQQuestion>{faq.question}</S.FAQQuestion>
                <S.FAQAnswer>{faq.answer}</S.FAQAnswer>
              </S.FAQItem>
            ))}
          </S.FAQList>
        </S.FAQSection>

        <S.CTASection>
          <S.CTATitle>지금 ComKet을 시작하세요</S.CTATitle>
          <S.CTADescription>무료 플랜으로 시작하거나 14일 무료 체험으로 모든 기능을 경험해보세요.</S.CTADescription>
          <S.CTAButtons>
            <S.CTAButton $primary={true}>무료로 시작하기</S.CTAButton>
            <S.CTAButton $primary={false}>영업팀 문의</S.CTAButton>
          </S.CTAButtons>
        </S.CTASection>
      </S.Main>

      <S.Footer>
        <Footer type="default" />
      </S.Footer>
    </S.Container>
  )
}
