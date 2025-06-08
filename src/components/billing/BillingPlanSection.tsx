import { Badge } from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';

interface BillingPlanSectionProps {
  billingInfo: {
    currentPlan: string;
    memberCount: number;
  };
  creditCardInfo?: {
    maskedCardNumber: string;
    cardholderName: string;
    expiryDate: string;
  };
  onUpgrade?: (target: PlanId) => void;
}

export const BillingPlanSection = ({
  billingInfo,
  creditCardInfo,
  onUpgrade,
}: BillingPlanSectionProps) => {
  const planId = mapServerPlanToClientPlan(billingInfo.currentPlan);
  const plan = PLAN_DATA[planId];

  const totalPrice = plan.priceValue !== null ? plan.priceValue * billingInfo.memberCount : null;

  const atLimit = billingInfo.memberCount >= plan.maxUsers;
  const nextPlanId = plan.nextPlan;

  const renderPriceSection = () => {
    if (planId === 'enterprise' || plan.priceValue === 0) return null;

    return (
      <S.PriceSection>
        <S.PriceRow>
          <S.PriceLabel>월 요금</S.PriceLabel>
          <S.PriceValue>₩{totalPrice!.toLocaleString('ko-KR')}</S.PriceValue>
        </S.PriceRow>
        <S.PriceDetail>
          (₩{plan.priceValue!.toLocaleString('ko-KR')} × {billingInfo.memberCount}명)
        </S.PriceDetail>
      </S.PriceSection>
    );
  };

  const renderCardInfo = () => {
    if (!creditCardInfo) return <S.CardInfoBox>등록된 결제 카드가 없습니다.</S.CardInfoBox>;

    return (
      <S.CardInfoBox>
        <S.CardInfoTitle>결제 카드 정보</S.CardInfoTitle>
        <S.CardInfoItem>
          <S.Label>카드번호</S.Label>
          <S.Value>{creditCardInfo.maskedCardNumber}</S.Value>
        </S.CardInfoItem>
        <S.CardInfoItem>
          <S.Label>소유자명</S.Label>
          <S.Value>{creditCardInfo.cardholderName}</S.Value>
        </S.CardInfoItem>
        <S.CardInfoItem>
          <S.Label>만료일</S.Label>
          <S.Value>{creditCardInfo.expiryDate}</S.Value>
        </S.CardInfoItem>
      </S.CardInfoBox>
    );
  };

  const renderActionButton = () => {
    if (planId === 'enterprise')
      return (
        <Button $variant="tealFilled" size="lg">
          영업팀 문의
        </Button>
      );

    return (
      <>
        {atLimit && nextPlanId && (
          <S.UpgradeNotice>
            인원이 한도를 초과했습니다.&nbsp;
            {PLAN_DATA[nextPlanId].name} 플랜으로 업그레이드하세요.
          </S.UpgradeNotice>
        )}
        <Button
          $variant="tealFilled"
          size="lg"
          disabled={!atLimit || !nextPlanId}
          onClick={() => nextPlanId && onUpgrade?.(nextPlanId)}
        >
          {atLimit && nextPlanId
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
            {plan.userRange} / {plan.description}
          </S.CardDescription>
        </S.CardHeader>

        <S.CardContent>
          {renderPriceSection()}
          {renderCardInfo()}
        </S.CardContent>

        <S.CardFooter>{renderActionButton()}</S.CardFooter>
      </S.Card>
    </S.Container>
  );
};
