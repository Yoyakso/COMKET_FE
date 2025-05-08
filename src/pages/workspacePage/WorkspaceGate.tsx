// src/pages/workspace/WorkspaceGate.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyWorkspaces } from '@/api/Workspace';

export const WorkspaceGate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkWorkspaces = async () => {
            try {
                const data = await fetchMyWorkspaces();
                if (data.length > 0) {
                    navigate('/workspace/select');
                } else {
                    navigate('/workspace/empty');
                }
            } catch (err) {
                console.error('워크스페이스 확인 실패:', err);
                navigate('/workspace/empty');
            }
        };

        checkWorkspaces();
    }, [navigate]);

    return null; // 이 컴포넌트는 화면을 렌더링하지 않음
};
