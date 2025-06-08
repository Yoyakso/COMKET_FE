import * as S from './UpgradePlanModal.Style';
import { Button } from '@/components/common/button/Button';

interface UpgradePlanModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradePlanModal = ({ onClose, onUpgrade }: UpgradePlanModalProps) => {
  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.TitleWrapper>
          <S.Title>요금제 인원 초과</S.Title>
        </S.TitleWrapper>
        <S.Description>
          현재 요금제에서 허용된 최대 인원을 초과했습니다.
          <br />
          멤버 초대를 위해 플랜 관리에서 요금제를 업그레이드해 주세요.
        </S.Description>
        <S.ButtonRow>
          <Button onClick={onClose} $variant="neutralOutlined" size="md" style={{ flex: 1 }}>
            닫기
          </Button>
          <Button onClick={onUpgrade} $variant="tealFilled" size="md" style={{ flex: 1 }}>
            요금제 업그레이드
          </Button>
        </S.ButtonRow>
      </S.Modal>
    </>
  );
};
