import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './WorkspaceInfoPage.Style';
import { Button } from '@/components/common/button/Button';
import { Radio } from '@/components/common/radio/Radio';
import { color } from '@/styles/color';
import { ImageUpload } from '@components/workspace/ImageUpload';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg?react';
import { WorkspaceDelete } from '@/components/workspace/WorkspaceDelete';
import { WorkspaceExit } from '@/components/workspace/WorkspaceExit';
import { useParams } from 'react-router-dom';
import { updateWorkspace } from '@/api/WorkspaceInfo';
import { deleteWorkspace } from '@/api/DeleteWorkspace';
import { ExitWorkspace } from '@/api/ExitWorkspace';
import { useNavigate } from 'react-router-dom';

export const WorkspaceInfoPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  const [workspaceId, setWorkspaceId] = useState<string>(''); // id 저장용
  const [workspace, setWorkspace] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileFileId, setProfileFileId] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  const isValid = description.trim() !== '';
  const navigate = useNavigate();

  useEffect(() => {

    const fetchWorkspaceInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspaces?includePublic=false`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const all = res.data;
        const target = all.find((ws: any) => ws.slug === workspaceSlug);

        if (!target) {
          alert("해당 슬러그의 워크스페이스를 찾을 수 없습니다.");
          return;
        }

        setWorkspace(target);
        setWorkspaceId(target.id);
        setDescription(target.description);
        setVisibility(target.isPublic ? 'public' : 'private');
        setImageUrl(target.profileFileUrl);

        localStorage.setItem("workspaceId", target.id);
        localStorage.setItem("workspaceSlug", target.slug);
        localStorage.setItem("workspaceName", target.name);

      } catch (err) {
        console.error("워크스페이스 정보 불러오기 실패:", err);
      }
    };

    if (workspaceSlug) fetchWorkspaceInfo();
  }, [workspaceSlug]);

  const handleImageSelect = ({
    file_id,
    file_url,
    file_name,
  }: {
    file_id: number;
    file_url: string;
    file_name: string;
  }) => {
    setImageUrl(file_url);
    setProfileFileId(file_id);
    setFileName(file_name);
  };

  const handleSave = async () => {

    if (!workspaceId || !description.trim()) return;
    try {
      const token = localStorage.getItem("accessToken");
      await updateWorkspace(workspaceId, {
        name: workspace?.name,
        description,
        isPublic: visibility === "public",
        profile_file_id: profileFileId,
        state: "ACTIVE",
      });
      console.log("profileFileId", profileFileId);
      alert("저장되었습니다.");

    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      if (!workspaceId) return;

      await deleteWorkspace(workspaceId);
      alert('워크스페이스가 삭제되었습니다.');

      localStorage.removeItem('workspaceId');
      localStorage.removeItem('workspaceSlug');
      localStorage.removeItem('workspaceName');

      setDeleteModalOpen(false);

      navigate('/workspace'); // 삭제 후 워크스페이스 목록 페이지로 이동
    } catch (error: any) {
      console.error('삭제 실패:', error);
      if (error?.response?.status === 403) {
        alert('삭제 권한이 없습니다. OWNER만 삭제할 수 있습니다.');
      } else {
        alert('워크스페이스 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <S.Container>
      <S.Title>워크스페이스 정보</S.Title>

      <S.InfoGroup>
        <S.Label>워크스페이스 이름</S.Label>
        <S.PlainText>{workspace?.name}</S.PlainText>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>워크스페이스 주소</S.Label>
        {workspace ? (
          <S.PlainText style={{ color: color.lightBlue600 }}>
            {`http://comket.co.kr/${workspace.slug}`}
          </S.PlainText>
        ) : (
          <S.PlainText style={{ color: color.lightBlue600 }}>
            로딩 중...
          </S.PlainText>
        )}

      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>워크스페이스 설명</S.Label>
        <S.DescriptionInput
          placeholder="워크스페이스 설명 입력"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </S.InfoGroup>

      <S.PhotoGroup>
        <S.Label>대표 이미지</S.Label>
        <S.PhotoWrapper>
          <S.Photo>
            {imageUrl ? <img src={imageUrl} alt="대표 이미지" width={120} height={120} /> : <S.ImagePlaceholder><DropdownIcon /></S.ImagePlaceholder>}
          </S.Photo>
          <S.PhotoUploader>
            <Button onClick={() => setModalOpen(true)} variant="neutralOutlined" size="xs" style={{ width: '120px' }}>
              사진 선택
            </Button>
            {isModalOpen && (
              <ImageUpload
                onClose={() => setModalOpen(false)}
                onImageSelect={handleImageSelect}
              />
            )}
            <span style={{ color: color.textTertiary, fontSize: '14px' }}>{fileName || '선택된 파일 없음'}</span>
          </S.PhotoUploader>
        </S.PhotoWrapper>
      </S.PhotoGroup>

      <S.InfoGroup>
        <S.Label>공개 여부</S.Label>
        <S.RadioWrapper>
          <Radio label="공개" color="black" checked={visibility === 'public'} onChange={() => setVisibility('public')} disabled={false} />
          <Radio label="비공개" color="black" checked={visibility === 'private'} onChange={() => setVisibility('private')} disabled={false} />
        </S.RadioWrapper>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>워크스페이스 삭제</S.Label>
        <S.DeleteWrapper>
          <S.DeleteText>삭제 시 워크스페이스의 프로젝트와 티켓, 파일 등 모든 데이터가 삭제됩니다.</S.DeleteText>
          <Button variant="neutralOutlined" size="xs" onClick={() => setDeleteModalOpen(true)}>삭제하기</Button>
        </S.DeleteWrapper>
      </S.InfoGroup>

      {isDeleteModalOpen && (
        <WorkspaceDelete
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteWorkspace}
        />
      )}

      <S.ButtonWrapper>
        <Button variant='neutralOutlined' size='sm' onClick={() => setExitModalOpen(true)}>워크스페이스 나가기</Button>
        <S.SubButtonWrapper>
          <Button variant='neutralOutlined' size='sm'>취소</Button>
          <Button
            variant={isValid ? 'tealFilled' : 'neutralFilled'}
            size="sm"
            disabled={!isValid}
            onClick={handleSave}
          >
            저장
          </Button>
        </S.SubButtonWrapper>
      </S.ButtonWrapper>

      {isExitModalOpen && (
        <WorkspaceExit
          isOwner={workspace?.role === 'OWNER'}
          onClose={() => setExitModalOpen(false)}
          onExit={async () => {

            try {
              const email = localStorage.getItem('email');
              if (!email || !workspaceId) {
                throw new Error('이메일 또는 워크스페이스 ID가 없습니다.');
              }

              await ExitWorkspace({ workspaceId, email }); // ← API 요청

              localStorage.removeItem('workspaceId');
              localStorage.removeItem('workspaceSlug');
              localStorage.removeItem('workspaceName');

              setExitModalOpen(false);
              navigate('/workspace', {
                replace: true,
              });
              window.location.reload();
            } catch (err) {
              console.error('워크스페이스 나가기 실패:', err);
              alert('워크스페이스 나가기에 실패했습니다.');
            }
          }}
        />
      )}
    </S.Container>
  );
};
function long(profileFileId: string): string {
  throw new Error('Function not implemented.');
}

