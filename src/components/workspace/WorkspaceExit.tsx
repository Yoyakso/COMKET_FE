import * as S from './WorkspaceExit.Style';
import { Button } from '@/components/common/button/Button';

interface Props {
    isOwner: boolean;
    onClose: () => void;
    onExit: () => void;
}

export const WorkspaceExit = ({ isOwner, onClose, onExit }: Props) => {

    return (
        <S.Overlay>
            <S.ModalBox>
                <S.TextGroup>
                    <S.Title>워크스페이스 나가기</S.Title>
                    <S.Message>
                        {isOwner ? (
                            <>
                                워크스페이스 소유자는 워크스페이스를 나갈 수 없습니다.
                                <br />
                                워크스페이스를 바로 삭제하거나,
                                <br />
                                다른 멤버에게 소유자 권한을 양도 후 다시 시도해 주세요.
                            </>
                        ) : (
                            <>
                                워크스페이스를 나가면 더 이상 해당 워크스페이스에 접근할 수 없습니다.
                                <br />
                                다시 워크스페이스에 참여하려면
                                <br />
                                워크스페이스 소유자 또는 관리자에게 멤버 초대를 요청해 주세요.
                            </>
                        )}
                    </S.Message>
                </S.TextGroup>

                <S.ButtonGroup>
                    {isOwner ? (
                        <Button onClick={onClose} variant='tealFilled' size='md' style={{ width: '496px' }}>
                            확인
                        </Button>
                    ) : (
                        <>
                            <Button onClick={onClose} variant="neutralOutlined" size="md" style={{ width: '244px' }} >
                                취소
                            </Button>
                            <Button onClick={onExit} variant='negativeFilled' size='md' style={{ width: '244px' }}>
                                나가기
                            </Button>
                        </>
                    )}
                </S.ButtonGroup>
            </S.ModalBox>
        </S.Overlay>
    );
};
