import * as S from '@/components/billing/PlanSelectModal.Style';
import { Button } from '@/components/common/button/Button';
import { PLAN_DATA } from '@/constants/planData';
import { updateWorkspacePlan, checkPaymentStatus } from '@/api/Billing';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface PlanSelectModalProps {
  workspaceId: number;
  currentPlanId: string;
  onSelect: (planId: string) => void;
  onClose: () => void;
}

export const PlanSelectModal = ({
  workspaceId,
  currentPlanId,
  onSelect,
  onClose,
}: PlanSelectModalProps) => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleSelect = async (planId: string) => {
    if (planId === currentPlanId) return;

    try {
      setLoadingPlanId(planId);

      const { hasPaymentMethod } = await checkPaymentStatus(String(workspaceId));
      if (!hasPaymentMethod) {
        toast.warn('요금제 변경을 위해 먼저 결제 수단을 등록해주세요.');
        return;
      }

      await updateWorkspacePlan(workspaceId, planId.toUpperCase() as any);
      toast.success('요금제가 성공적으로 변경되었습니다.');
      onSelect(planId);
      onClose();
    } catch (err) {
      toast.error('요금제 변경 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.CloseIcon onClick={onClose}>
          <X size={20} />
        </S.CloseIcon>
        <S.TitleWrapper>
          <S.Title>요금제 선택</S.Title>
        </S.TitleWrapper>

        <S.PlanList>
          {Object.entries(PLAN_DATA).map(([planId, plan]) => {
            const isCurrent = planId === currentPlanId;
            const isLoading = planId === loadingPlanId;

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

                <Button
                  onClick={() => handleSelect(planId)}
                  $variant={isCurrent ? 'neutralOutlined' : 'tealFilled'}
                  size="sm"
                  disabled={isCurrent || isLoading}
                  style={{ marginTop: '20px', width: '100%' }}
                >
                  {isLoading ? '변경 중...' : isCurrent ? '현재 선택됨' : '이 플랜 선택'}
                </Button>
              </S.PlanCard>
            );
          })}
        </S.PlanList>
      </S.Modal>
    </>
  );
};
