// src/pages/workspace/WorkspaceEmptyPage.tsx
import { useNavigate } from 'react-router-dom';
import * as S from './WorkspacePage.Style';
import { Button } from '@/components/common/button/Button';

export const WorkspaceEmptyPage = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.Card>
                <S.Title>워크스페이스 선택</S.Title>
                <S.Description>
                    아직 참여하고 있는 워크스페이스가 없습니다.
                    <br />
                    워크스페이스를 새로 생성하거나, 초대 코드로 입장해 보세요!
                </S.Description>

                <S.DividerBox>
                    <S.Line />
                    <S.DividerText>또는</S.DividerText>
                    <S.Line />
                </S.DividerBox>

                <S.FullWidthButton variant="tealFilled" size="lg" onClick={() => navigate('/workspace/create')}>
                    워크스페이스 생성
                </S.FullWidthButton>
                <S.FullWidthButton variant="neutralOutlined" size="lg">
                    초대 코드로 입장
                </S.FullWidthButton>
            </S.Card>
        </S.Container>
    );
};
