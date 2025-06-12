import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import { CreditCard } from 'lucide-react';

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
  onChangeCard?: () => void;
}

export const BillingPlanSection = ({
  billingInfo,
  creditCardInfo,
  onUpgrade,
  onChangeCard,
}: BillingPlanSectionProps) => {
  const planId = mapServerPlanToClientPlan(billingInfo.currentPlan);
  const plan = PLAN_DATA[planId];

  const atLimit = billingInfo.memberCount >= plan.maxUsers;
  const nextPlanId = plan.nextPlan;

  const renderActionButton = () => {
    return (
      <>
        {atLimit && (
          <S.UpgradeNotice>인원이 한도를 초과했습니다. 플랜을 업그레이드하세요.</S.UpgradeNotice>
        )}
        <Button $variant="tealFilled" size="lg" onClick={() => onUpgrade?.(nextPlanId!)}>
          플랜 변경하기
        </Button>
      </>
    );
  };

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Heading>현재 요금제</S.Heading>
          <S.Sub>{plan.name} 플랜의 상세 정보</S.Sub>
        </S.Header>

        <S.PlanRow>
          <S.PlanName>{plan.name}</S.PlanName>
          <S.PlanBadge>{plan.badge}</S.PlanBadge>
        </S.PlanRow>

        {plan.priceValue !== null && (
          <S.PriceRow>
            <S.Price>₩{plan.priceValue.toLocaleString('ko-KR')}</S.Price>
            <S.PriceUnit>/ 월 / 사용자</S.PriceUnit>
          </S.PriceRow>
        )}

        <S.Divider />

        <S.InfoList>
          <li>팀 인원: {plan.userRange}</li>
          <li>{plan.description}</li>
        </S.InfoList>

        <S.ExpectedPrice>
          <S.Title>예상 월 요금</S.Title>
          <S.ExpectedPriceContainer>
            <S.ExpectedPriceRow>
              <S.Label>요금제 단가</S.Label>
              <S.Value>₩{plan.priceValue.toLocaleString('ko-KR')}/월</S.Value>
            </S.ExpectedPriceRow>
            <S.ExpectedPriceRow>
              <S.Label> 워크스페이스 멤버</S.Label>
              <S.Value>{billingInfo.memberCount}명</S.Value>
            </S.ExpectedPriceRow>
            <S.RowDivider />
            <S.ExpectedPriceRow>
              <S.Label>총 예상 요금</S.Label>
              <S.Value strong>
                ₩{(plan.priceValue * billingInfo.memberCount).toLocaleString('ko-KR')}/월
              </S.Value>
            </S.ExpectedPriceRow>
          </S.ExpectedPriceContainer>
        </S.ExpectedPrice>

        <S.CardFooter>{renderActionButton()}</S.CardFooter>
      </S.Card>

      <S.Card>
        <S.Header>
          <S.Heading>결제 카드</S.Heading>
        </S.Header>

        <S.InfoLine>
          <CreditCard size={16} strokeWidth={1.5} />
          <S.InfoLabel>등록 상태</S.InfoLabel>
          <S.InfoValue>
            {creditCardInfo ? <S.BadgeRegistered>등록됨</S.BadgeRegistered> : '미등록'}
          </S.InfoValue>
        </S.InfoLine>

        <S.CardFooter>
          <Button
            $variant="neutralOutlined"
            size="md"
            onClick={onChangeCard}
            style={{ width: '100%' }}
          >
            카드 변경
          </Button>
        </S.CardFooter>
      </S.Card>
    </S.Container>
  );
};
