import React, { useState } from 'react';
import * as S from './WorkspaceDelete.Style';
import { Button } from '@/components/common/button/Button';

interface WorkspaceDeleteProps {
    onClose: () => void;
    onDelete: () => Promise<void>;
}

export const WorkspaceDelete = ({ onClose, onDelete }: WorkspaceDeleteProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        await onDelete();
        setIsLoading(false);
    };

    return (
        <S.Overlay>
            <S.ModalBox>
                <S.Title>워크스페이스 삭제</S.Title>
                <S.Message>
                    정말로 워크스페이스를 삭제하시겠습니까?
                    <br />
                    삭제 시 워크스페이스의 모든 데이터가 영구적으로 삭제되며,
                    <br />
                    이 작업은 복구할 수 없습니다.
                </S.Message>
                <S.ButtonGroup>
                    <Button
                        style={{ width: '224px' }}
                        $variant="neutralOutlined"
                        size="md"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        취소
                    </Button>
                    <Button
                        style={{ width: '224px' }}
                        $variant="negativeFilled"
                        size="md"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        삭제
                    </Button>
                </S.ButtonGroup>
            </S.ModalBox>
        </S.Overlay>
    );
};
