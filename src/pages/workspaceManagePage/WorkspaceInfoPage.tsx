import React, { useState } from 'react';
import * as S from './WorkspaceInfoPage.Style';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';
import { Radio } from '@/components/common/radio/Radio';
import { color } from '@/styles/color';
import { ImageUpload } from '@components/workspace/ImageUpload';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg?react';

import { useParams } from 'react-router-dom';
import { updateWorkspace } from '@/api/WorkspaceInfo';

export const WorkspaceInfoPage = () => {

  const { workspaceId } = useParams();

  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileFileId, setProfileFileId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const name = 'YOYAKSO';
  const url = 'https://comket.co.kr/yoyakso';

  const handleOpenModal = () => setModalOpen(true);

  const isValid = description.trim() !== '';

  const handleImageSelect = ({
    file_id,
    file_url,
    file_name,
  }: {
    file_id: string;
    file_url: string;
    file_name: string;
  }) => {
    setImageUrl(file_url);
    setProfileFileId(file_id);
    setFileName(file_name);
  };

  const handleSave = async () => {
    if (!workspaceId || !description.trim()) return;

    const payload = {
      description,
      isPublic: visibility === 'public',
      profile_file_id: profileFileId,
      state: 'ACTIVE' as const,
    };

    try {
      await updateWorkspace(workspaceId, payload);
      alert('워크스페이스 정보가 저장되었습니다!');
    } catch (error) {
      console.error('워크스페이스 저장 실패:', error);
    }
  };

  return (
    <S.Container>
      <S.Title>워크스페이스 정보</S.Title>

      <S.InfoGroup>
        <S.Label>워크스페이스 이름</S.Label>
        <S.PlainText>{name}</S.PlainText>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>워크스페이스 주소</S.Label>
        <S.PlainText style={{ color: color.lightBlue600 }}>{url}</S.PlainText>
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
            <Button onClick={handleOpenModal} variant="neutralOutlined" size="xs" style={{ width: '120px' }}>
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
          <Button variant="neutralOutlined" size="xs">삭제하기</Button>
        </S.DeleteWrapper>
      </S.InfoGroup>

      <S.ButtonWrapper>
        <Button variant='neutralOutlined' size='sm'>워크스페이스 나가기</Button>
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
    </S.Container>
  );
};
