import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Shield, Headphones, Star, ArrowRight, Crown, Gem, Rocket } from 'lucide-react';
import * as S from './PlanPage.Style';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';

export const PlanPage = () => {
  const [selectedUserRange, setSelectedUserRange] = useState<string>('startup');
  const navigate = useNavigate();

  const plans = {
    basic: {
      id: 'basic',
      name: '개인',
      userRange: '1~5명',
      price: '무료',
      monthlyPrice: null,
      description: '개인 사용자 및 소규모 팀을 위한 기능',
      icon: Users,
      popular: false,
    },
    startup: {
      id: 'startup',
      name: '스타트업',
      userRange: '6~20명',
      price: '₩7,500',
      monthlyPrice: 7500,
      description: '성장하는 팀을 위한 완전한 기능',
      icon: Rocket,
      popular: true,
    },
    professional: {
      id: 'professional',
      name: '프로페셔널',
      userRange: '21~50명',
      price: '₩8,500',
      monthlyPrice: 8500,
      description: '중소기업을 위한 기능',
      icon: Gem,
      popular: false,
    },
    enterprise: {
      id: 'enterprise',
      name: '엔터프라이즈',
      userRange: '50명 이상',
      price: '₩9,900',
      monthlyPrice: 9900,
      description: '기업을 위한 기능',
      icon: Crown,
      popular: false,
    },
  };

  const features = [
    {
      category: '핵심 기능',
      icon: Users,
      items: [
        '타켓 생성 및 관리',
        '타켓 내 커뮤니케이션',
        '티켓 대시보드',
        '티켓 칸반보드',
        '실시간 협업',
        '프로젝트 관리',
        '파일 공유',
      ],
    },
    {
      category: 'AI 기능',
      icon: Zap,
      items: [
        'AI 요약',
        '직군별 눈높이 요약',
        '액션 아이템 추출',
        '액션 아이템 기반 하위 티켓 생성',
      ],
    },
  ];

  const faqs = [
    {
      question: '무료 플랜에서 유료 플랜으로 언제든지 업그레이드할 수 있나요?',
      answer:
        '네, 언제든지 업그레이드가 가능합니다. 기존 데이터는 모두 유지되며, 추가 기능을 즉시 사용할 수 있습니다.',
    },
    {
      question: '팀 규모가 변경되면 어떻게 하나요?',
      answer: '팀 규모에 따라 언제든지 플랜을 변경할 수 있습니다.',
    },
  ];

  const currentPlan = plans[selectedUserRange as keyof typeof plans];
  const IconComponent = currentPlan.icon;

  const handlePlanChange = (planId: string) => {
    setSelectedUserRange(planId);
  };

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        {/* <S.HeaderContent>
          <S.LogoContainer>
            <S.LogoBadge>
              <span>C</span>
            </S.LogoBadge>
            <S.LogoText>COMKET</S.LogoText>
          </S.LogoContainer>
          <S.HeaderActions>
            <S.PrimaryButton onClick={handleStart}>로그인</S.PrimaryButton>
          </S.HeaderActions>
        </S.HeaderContent> */}
        <GlobalNavBar variant='default' />
      </S.Header>

      <S.Main>
        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroBadge>
            <Star size={12} />팀 규모에 맞는 완벽한 솔루션
          </S.HeroBadge>
          <S.HeroTitle>
            성장하는 팀을 위한
            <br />
            <S.GradientText>스마트한 요금제</S.GradientText>
          </S.HeroTitle>
          <S.HeroDescription>
            모든 플랜에서 핵심 기능을 제공합니다. 팀의 성장 단계와 필요한 고급 기능에 따라 최적의
            요금제를 선택하세요.
          </S.HeroDescription>
        </S.HeroSection>

        {/* Plan Selector */}
        <S.PlanSelectorSection>
          <S.PlanTabs>
            {Object.entries(plans).map(([key, plan]) => {
              const PlanIcon = plan.icon;
              return (
                <S.PlanTab
                  key={key}
                  $active={selectedUserRange === key}
                  onClick={() => handlePlanChange(key)}
                >
                  <PlanIcon size={16} />
                  <span>{plan.name}</span>
                </S.PlanTab>
              );
            })}
          </S.PlanTabs>
        </S.PlanSelectorSection>

        {/* Selected Plan Highlight */}
        <S.SelectedPlanSection>
          <S.PlanCard>
            {currentPlan.popular && <S.PopularBadge>가장 인기 있는 플랜</S.PopularBadge>}
            <S.PlanCardHeader>
              <S.PlanIconContainer>
                <IconComponent size={24} />
              </S.PlanIconContainer>
              <S.PlanName>{currentPlan.name}</S.PlanName>
              <S.PlanUserRange>{currentPlan.userRange}</S.PlanUserRange>
              <S.PlanPriceContainer>
                <S.PlanPrice>
                  {currentPlan.price}
                  {currentPlan.monthlyPrice && <S.PlanPricePeriod>/월</S.PlanPricePeriod>}
                </S.PlanPrice>
                {/* {currentPlan.monthlyPrice && (
                  <S.PlanPricePerUser>사용자당 {Math.round(currentPlan.monthlyPrice / 10)}원</S.PlanPricePerUser>
                )} */}
              </S.PlanPriceContainer>
              <S.PlanDescription>{currentPlan.description}</S.PlanDescription>
            </S.PlanCardHeader>
            <S.PlanCardContent>
              <S.PlanButton $popular={currentPlan.popular} onClick={handleStart}>
                {currentPlan.id === 'basic' ? '무료로 시작하기' : '시작하기'}
                <ArrowRight size={16} />
              </S.PlanButton>
            </S.PlanCardContent>
          </S.PlanCard>
        </S.SelectedPlanSection>

        {/* Feature Comparison */}
        <S.FeatureComparisonSection>
          <S.SectionTitle>상세 기능</S.SectionTitle>
          <S.SectionDescription>COMKET의 상세 기능을 자세히 확인해보세요.</S.SectionDescription>

          {/* Feature List */}
          <S.FeatureList>
            {features.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <S.FeatureCard key={categoryIndex}>
                  <S.FeatureCardHeader>
                    <S.FeatureCardTitle>
                      <S.FeatureIconContainer>
                        <CategoryIcon size={16} />
                      </S.FeatureIconContainer>
                      <span>{category.category}</span>
                    </S.FeatureCardTitle>
                  </S.FeatureCardHeader>
                  <S.FeatureCardContent>
                    <S.FeatureGrid>
                      {category.items.map((item, itemIndex) => (
                        <S.FeatureItem key={itemIndex}>
                          <span>• {item}</span>
                        </S.FeatureItem>
                      ))}
                    </S.FeatureGrid>
                  </S.FeatureCardContent>
                </S.FeatureCard>
              );
            })}
          </S.FeatureList>
        </S.FeatureComparisonSection>

        {/* FAQ Section */}
        <S.FAQSection>
          <S.SectionTitle>자주 묻는 질문</S.SectionTitle>
          <S.SectionDescription>궁금한 점이 있으시면 언제든 문의해주세요</S.SectionDescription>
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
  );
};

export default PlanPage;
