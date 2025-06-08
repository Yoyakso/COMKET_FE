import { Badge } from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';
import { PLAN_DATA, PlanId, PlanData } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';

export interface BillingPlanSectionProps {
  planId: PlanId;
  currentUserCount?: number;
  onUpgrade?: (target: PlanId) => void;
  billingInfo?: {
    currentPlan: string;
    memberCountHistory: Record<string, number>;
    billingAmountHistory: Record<string, number>;
  };
}

export const BillingPlanSection = ({
  planId = 'professional',
  currentUserCount,
  onUpgrade,
  billingInfo,
}: BillingPlanSectionProps) => {
  const resolvedPlanId: PlanId = mapServerPlanToClientPlan(billingInfo?.currentPlan ?? 'BASIC');

  const plan = PLAN_DATA[resolvedPlanId] ?? PLAN_DATA['personal'];

  const renderPriceSection = () => {
    if (planId === 'personal' || planId === 'enterprise') return null;

    const baseUsers = plan.maxUsers;
    const baseFee = typeof plan.priceValue === 'number' ? plan.priceValue : 0;
    const nextPlanId = plan.nextPlan as PlanId | null;
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
