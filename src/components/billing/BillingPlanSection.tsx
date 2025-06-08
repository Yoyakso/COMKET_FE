import { Badge } from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';

export interface BillingPlanSectionProps {
  planId: 'personal' | 'startup' | 'professional' | 'enterprise';
  currentUserCount?: number;
  onUpgrade?: (target: string) => void;
}

const PLAN_DATA = {
  personal: {
    name: '개인',
    range: '1~5명',
    maxUsers: 5,
    price: '무료',
    priceValue: 0,
    description: '개인 사용자 및 소규모 팀',
    features: [
      '티켓 생성',
      '의견 작성',
      'AI 요약 (제한적)',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: ['하위 티켓 생성 불가', '커스터마이징 불가'],
    badge: '무료',
    nextPlan: 'startup',
  },
  startup: {
    name: '스타트업',
    range: '6~20명',
    maxUsers: 20,
    price: '$9.99',
    priceValue: 9990,
    description: '스타트업 및 중소 규모 팀',
    features: [
      'AI 요약',
      '하위 티켓 생성',
      '사용자 맞춤 설정',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: ['커스터마이징 불가'],
    badge: '추천',
    nextPlan: 'professional',
  },
  professional: {
    name: '프로페셔널',
    range: '21~50명',
    maxUsers: 50,
    price: '$29.99',
    priceValue: 29990,
    description: '중소기업 및 팀 단위 업무',
    features: [
      'AI 고급 요약',
      '커스터마이징',
      '트리 기반 업무 관리',
      '하위 티켓 생성',
      '티켓 생성 및 관리',
      '티켓 내 커뮤니케이션',
    ],
    limitations: [],
    badge: 'Pro',
    nextPlan: 'enterprise',
  },
  enterprise: {
    name: '엔터프라이즈',
    range: '50명 이상',
    maxUsers: Infinity,
    price: '맞춤형',
    priceValue: null,
    description: '대기업 및 대규모 팀',
    features: [
      '전체 기능 제공',
      '맞춤형 솔루션',
      '전담 지원팀',
      '고급 보안',
      'API 접근',
      '온프레미스 배포',
    ],
    limitations: [],
    badge: 'Enterprise',
    nextPlan: null,
  },
};

export const BillingPlanSection = ({
  planId = 'professional',
  currentUserCount = 50,
  onUpgrade,
}: BillingPlanSectionProps) => {
  const plan = PLAN_DATA[planId];

  const renderPriceSection = () => {
    if (planId === 'personal' || planId === 'enterprise') return null;

    const baseUsers = plan.maxUsers;
    const baseFee = plan.priceValue || 0;
    const additionalUsers = Math.max(0, currentUserCount - baseUsers);
    const unitFee = baseFee / baseUsers;
    const additionalFee = Math.round(unitFee * additionalUsers);
    const totalFee = baseFee + additionalFee;

    return (
      <S.PriceSection>
        <S.PriceRow>
          <S.PriceLabel>월 기본 요금 (최대 {baseUsers}명)</S.PriceLabel>
          <S.PriceValue>₩{baseFee.toLocaleString()}</S.PriceValue>
        </S.PriceRow>
        {additionalUsers > 0 && (
          <S.PriceRow>
            <S.PriceLabel>추가 인원 요금 ({additionalUsers}명)</S.PriceLabel>
            <S.PriceValue>₩{additionalFee.toLocaleString()}</S.PriceValue>
          </S.PriceRow>
        )}
        <S.Separator />
        <S.TotalRow>
          <span>총 월 요금</span>
          <span>₩{totalFee.toLocaleString()}</span>
        </S.TotalRow>
      </S.PriceSection>
    );
  };

  const renderActionButton = () => {
    if (planId === 'enterprise') {
      return (
        <Button $variant="tealFilled" size="lg">
          영업팀 문의
        </Button>
      );
    }

    const needUpgrade = currentUserCount >= plan.maxUsers;
    const nextPlanId = plan.nextPlan as keyof typeof PLAN_DATA | null;

    return (
      <>
        {needUpgrade && nextPlanId && (
          <S.UpgradeNotice>
            멤버를 더 초대하고 싶으시다면 {PLAN_DATA[nextPlanId].name} 플랜으로 업그레이드해주세요.
          </S.UpgradeNotice>
        )}
        <Button
          $variant="tealFilled"
          size="lg"
          disabled={!needUpgrade || !nextPlanId}
          onClick={() => onUpgrade?.(nextPlanId!)}
        >
          {needUpgrade && nextPlanId
            ? `${PLAN_DATA[nextPlanId].name} 플랜으로 업그레이드`
            : '현재 사용 중인 플랜입니다'}
        </Button>
      </>
    );
  };

  return (
    <S.Container>
      <S.Card>
        <S.CardHeader>
          <S.HeaderTop>
            <S.TitleWrapper>
              <S.PlanIcon />
              <S.CardTitle>현재 요금제</S.CardTitle>
            </S.TitleWrapper>
            <Badge $variant="teal" $styleType="filled" size="md" shape="sqaure">
              {plan.badge}
            </Badge>
          </S.HeaderTop>
          <S.CardDescription>
            {plan.range} / {plan.description}
          </S.CardDescription>
        </S.CardHeader>

        <S.CardContent>
          {renderPriceSection()}
          <S.FeatureList>
            <S.FeatureTitle>주요 기능</S.FeatureTitle>
            <ul>
              {plan.features.map((f, i) => (
                <S.FeatureItem key={i}>{f}</S.FeatureItem>
              ))}
            </ul>

            {plan.limitations.length > 0 && (
              <>
                <S.FeatureTitle style={{ marginTop: '16px' }}>제한사항</S.FeatureTitle>
                <ul>
                  {plan.limitations.map((l, i) => (
                    <S.LimitationItem key={i}>{l}</S.LimitationItem>
                  ))}
                </ul>
              </>
            )}
          </S.FeatureList>
        </S.CardContent>

        <S.CardFooter>{renderActionButton()}</S.CardFooter>
      </S.Card>
    </S.Container>
  );
};
