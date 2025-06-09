import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import { CreditCard, Calendar } from 'lucide-react';

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
    if (planId === 'enterprise') {
      return (
        <Button $variant="tealFilled" size="lg" onClick={() => onUpgrade?.(plan.nextPlan!)}>
          플랜 변경하기
        </Button>
      );
    }

    return (
      <>
        {atLimit && (
          <S.UpgradeNotice>인원이 한도를 초과했습니다. 플랜을 업그레이드하세요.</S.UpgradeNotice>
        )}
        <Button $variant="tealFilled" size="lg" onClick={() => onUpgrade?.(plan.nextPlan!)}>
          플랜 변경하기
        </Button>
      </>
    );
  };

  const getNextBillingDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 20);
    return nextMonth.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          <li>팀 인원 · {plan.userRange}</li>
          <li>{plan.description}</li>
        </S.InfoList>

        <S.CardFooter>{renderActionButton()}</S.CardFooter>
      </S.Card>

      <S.Card>
        <S.Header>
          <S.Heading>결제 정보</S.Heading>
        </S.Header>

        <S.InfoLine>
          <Calendar size={16} strokeWidth={1.5} />
          <S.InfoLabel>다음 결제일</S.InfoLabel>
          <S.InfoValue>{getNextBillingDate()}</S.InfoValue>
        </S.InfoLine>

        <S.InfoLine>
          <CreditCard size={16} strokeWidth={1.5} />
          <S.InfoLabel>결제 방법</S.InfoLabel>
          <S.InfoValue>{creditCardInfo ? creditCardInfo.maskedCardNumber : '미등록'}</S.InfoValue>
        </S.InfoLine>

        <S.CardFooter>
          <Button $variant="tealFilled" size="md" onClick={onChangeCard} style={{ width: '100%' }}>
            결제 방법 변경
          </Button>
        </S.CardFooter>
      </S.Card>
    </S.Container>
  );
};
