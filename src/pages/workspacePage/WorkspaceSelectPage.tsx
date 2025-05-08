// src/pages/workspace/WorkspaceSelectPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './WorkspacePage.Style';
import { Button } from '@/components/common/button/Button';
import { Dropdown, DropdownOption } from '@/components/common/dropdown/Dropdown';
import { fetchMyWorkspaces } from '@/api/Workspace';

export const WorkspaceSelectPage = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [selectedId, setSelectedId] = useState<string>('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // 🔹 테스트용 목업 데이터
    //             const mock = [
    //                 { workspaceId: '1', workspaceName: '목업 워크스페이스 A' },
    //                 { workspaceId: '2', workspaceName: '목업 워크스페이스 B' },
    //                 { workspaceId: '3', workspaceName: '목업 워크스페이스 C' },
    //             ];

    //             const formatted = mock.map((ws) => ({
    //                 label: ws.workspaceName,
    //                 value: ws.workspaceId,
    //             }));

    //             setOptions(formatted);
    //             setSelectedId(formatted[0]?.value ?? '');

    //             // 실제 API도 같이 호출할 수 있어
    //             // const data = await fetchMyWorkspaces();
    //             // const formatted = data.map((ws) => ({
    //             //   label: ws.workspaceName,
    //             //   value: ws.workspaceId,
    //             // }));
    //             // setOptions(formatted);
    //             // setSelectedId(formatted[0]?.value ?? '');
    //         } catch (err) {
    //             console.error('워크스페이스 목록 불러오기 실패:', err);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await fetchMyWorkspaces();
    //             const formatted = data.map((ws) => ({
    //                 label: ws.workspaceName,
    //                 value: ws.workspaceId,
    //             }));
    //             setOptions(formatted);
    //             setSelectedId(formatted[0]?.value ?? '');
    //         } catch (err) {
    //             console.error('워크스페이스 목록 불러오기 실패:', err);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const fetchData = async () => {
        try {
            const data: Workspace[] = await fetchMyWorkspaces();
            const formatted = data.map((ws) => ({
                label: ws.workspaceName,
                value: ws.workspaceSlug, // ✅ 슬러그를 value로
            }));
            setOptions(formatted);
            setSelectedId(formatted[0]?.value ?? '');
        } catch (err) {
            console.error('워크스페이스 목록 불러오기 실패:', err);
        }
    };

    const handleJoin = () => {
        if (selectedId) {
            navigate(`/workspace/${selectedId}`);
        }
    };

    return (
        <S.Container>
            <S.Card>
                <S.Title>워크스페이스 선택</S.Title>

                <S.WorkspaceRow>
                    <Dropdown
                        options={options}
                        value={selectedId}
                        onChange={(value) => {
                            if (typeof value === 'string') {
                                setSelectedId(value);
                            }
                        }}
                        placeholder="워크스페이스 선택"
                        size="md"
                        variant="activated"
                        iconLeft
                    />
                    <Button variant="neutralFilled" size="md" onClick={handleJoin}>
                        참여
                    </Button>
                </S.WorkspaceRow>

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
