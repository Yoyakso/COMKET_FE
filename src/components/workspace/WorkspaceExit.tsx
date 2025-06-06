import * as S from './WorkspaceExit.Style';
import { Button } from '@/components/common/button/Button';

interface Props {
  onClose: () => void;
  onExit: () => void;
}

export const WorkspaceExit = ({ onClose, onExit }: Props) => {
  return (
    <S.Overlay>
      <S.ModalBox>
        <S.TextGroup>
          <S.Title>워크스페이스 나가기</S.Title>
          <S.Message>
            워크스페이스를 나가면 더 이상 해당 워크스페이스에 접근할 수 없습니다.
            <br />
            다시 참여하려면 워크스페이스 관리자에게 초대를 요청해 주세요.
          </S.Message>
        </S.TextGroup>

        <S.ButtonGroup>
          <Button onClick={onClose} $variant="neutralOutlined" size="md" style={{ width: '244px' }}>
            취소
          </Button>
          <Button onClick={onExit} $variant="negativeFilled" size="md" style={{ width: '244px' }}>
            나가기
          </Button>
        </S.ButtonGroup>
      </S.ModalBox>
    </S.Overlay>
  );
};
