import * as S from '@/components/billing/PlanSelectModal.Style';
import { Button } from '@/components/common/button/Button';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { updateWorkspacePlan, isPaymentRegistered } from '@/api/Billing';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { PaymentModal } from '@/components/billing/PaymentModal';

interface PlanSelectModalProps {
  workspaceId: number;
  currentPlanId: string;
  user: { name: string; email: string };
  onSelect: (planId: string) => void;
  onClose: () => void;
}

export const PlanSelectModal = ({
  workspaceId,
  currentPlanId,
  user,
  onSelect,
  onClose,
}: PlanSelectModalProps) => {
  const [workingPlan, setWorkingPlan] = useState<PlanId | null>(null);
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isSame = (planId: PlanId) => planId === currentPlanId;
  const isLoading = (planId: PlanId) => planId === workingPlan;

  const handleSelect = async (planId: PlanId) => {
    if (isSame(planId) || workingPlan) return;

    try {
      setWorkingPlan(planId);

      const registered = await isPaymentRegistered(workspaceId);
      if (!registered && planId !== 'basic') {
        // BASIC 은 결제 필요 없음
        setPendingPlan(planId);
        setShowPaymentModal(true);
        return;
      }

      await applyPlanChange(planId);
    } catch (e) {
      toast.error('요금제 변경에 실패했습니다.');
      console.error(e);
    } finally {
      setWorkingPlan(null);
    }
  };

  const applyPlanChange = async (planId: PlanId) => {
    await updateWorkspacePlan(
      workspaceId,
      planId.toUpperCase() as 'BASIC' | 'STARTUP' | 'PROFESSIONAL' | 'ENTERPRISE',
    );
    toast.success('요금제가 변경되었습니다.');
    onSelect(planId);
    onClose();
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
            const id = planId as PlanId;
            const current = isSame(id);
            const loading = isLoading(id);

            return (
              <S.PlanCard key={id} $selected={current}>
                {current && <S.Badge>현재 플랜</S.Badge>}

                <S.PlanHeader>
                  <S.PlanName>{plan.name}</S.PlanName>
                  <S.PlanInfo>
                    {plan.userRange}
                    <br /> {plan.description}
                  </S.PlanInfo>
                  <S.PlanPrice>{plan.price}</S.PlanPrice>
                </S.PlanHeader>

                <Button
                  onClick={() => handleSelect(id)}
                  $variant={current ? 'neutralOutlined' : 'tealFilled'}
                  size="sm"
                  disabled={current || loading}
                  style={{ marginTop: 20, width: '100%' }}
                >
                  {loading ? '변경 중...' : current ? '현재 선택됨' : '이 플랜 선택'}
                </Button>
              </S.PlanCard>
            );
          })}
        </S.PlanList>
      </S.Modal>

      {/* 결제 등록 모달 */}
      {showPaymentModal && pendingPlan && (
        <PaymentModal
          workspaceId={workspaceId}
          selectedPlan={PLAN_DATA[pendingPlan]}
          cardholderName={user.name}
          email={user.email}
          onClose={() => {
            setShowPaymentModal(false);
            setPendingPlan(null);
          }}
          onSuccess={async () => {
            await applyPlanChange(pendingPlan);
          }}
        />
      )}
    </>
  );
};
