import * as S from '@/components/billing/PlanSelectModal.Style';
import { Button } from '@/components/common/button/Button';
import { PLAN_DATA } from '@/constants/planData';

interface PlanSelectModalProps {
  currentPlanId: string;
  onSelect: (planId: string) => void;
  onClose: () => void;
}

export const PlanSelectModal = ({ currentPlanId, onSelect, onClose }: PlanSelectModalProps) => {
  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.TitleWrapper>
          <S.Title>요금제 선택</S.Title>
        </S.TitleWrapper>

        <S.PlanList>
          {Object.entries(PLAN_DATA).map(([planId, plan]) => {
            const isCurrent = planId === currentPlanId;
            return (
              <S.PlanCard key={planId} $selected={isCurrent}>
                {isCurrent && <S.Badge>현재 플랜</S.Badge>}

                <S.PlanHeader>
                  <S.PlanName>{plan.name}</S.PlanName>
                  <S.PlanInfo>
                    {plan.userRange} <br /> {plan.description}
                  </S.PlanInfo>
                  <S.PlanPrice>{plan.price}</S.PlanPrice>
                </S.PlanHeader>

                <S.Section>
                  <S.SectionTitle>주요 기능</S.SectionTitle>
                  <S.FeatureList>
                    {plan.features.map((feature, i) => (
                      <S.FeatureItem key={i}>
                        <S.CheckIcon>✓</S.CheckIcon>
                        {feature}
                      </S.FeatureItem>
                    ))}
                  </S.FeatureList>
                </S.Section>

                {plan.limitations.length > 0 && (
                  <S.Section>
                    <S.SectionTitle>제한사항</S.SectionTitle>
                    <S.FeatureList>
                      {plan.limitations.map((lim, i) => (
                        <S.FeatureItem key={i}>
                          <S.XIcon>✕</S.XIcon>
                          {lim}
                        </S.FeatureItem>
                      ))}
                    </S.FeatureList>
                  </S.Section>
                )}

                <Button
                  onClick={() => onSelect(planId)}
                  $variant={isCurrent ? 'neutralOutlined' : 'tealFilled'}
                  size="md"
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  {isCurrent ? '현재 선택됨' : '이 플랜 선택'}
                </Button>
              </S.PlanCard>
            );
          })}
        </S.PlanList>

        <S.ButtonRow>
          <Button onClick={onClose} $variant="neutralOutlined" size="md" style={{ flex: 1 }}>
            닫기
          </Button>
        </S.ButtonRow>
      </S.Modal>
    </>
  );
};
