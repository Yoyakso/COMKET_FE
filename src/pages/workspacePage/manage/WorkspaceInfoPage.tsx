import React, { useState } from 'react';
import * as S from './WorkspaceInfoPage.Style';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Button } from '@/components/common/button/Button';
import { Radio } from '@/components/common/radio/Radio';

export const WorkspaceInfoPage = () => {
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  return (
    <S.Container>
        <S.Title>워크스페이스 정보</S.Title>
        <S.ContentWrapper>

            <S.InfoGroup>
                <S.Label>워크스페이스 이름</S.Label>
                {/* 워크스페이스 이름 렌더링 */}
            </S.InfoGroup>

            <S.InfoGroup>
                <S.Label>워크스페이스 주소</S.Label>
                {/* 워크스페이스 주소 렌더링 */}
            </S.InfoGroup>

            <S.InfoGroup>
                <S.Label>워크스페이스 이름</S.Label>
                {/* 워크스페이스 설명 존재 시 렌더링 없을 시 텍스트 인풋*/}
            </S.InfoGroup>

            <S.PhotoGroup>
                <S.Label>대표 이미지</S.Label>
                <S.PhotoWrapper>
                    {/* <S.Photo>이미지 렌더링</S.Photo> */}
                    <Button variant="neutralOutlined" size="sm">사진 선택</Button>
                    {/* 버튼 옆 헬퍼 텍스트 어케할지 생각 - 파일 명 받아오는 거 */}
                </S.PhotoWrapper>
            </S.PhotoGroup>

            <S.InfoGroup>
              <S.Label>공개 여부</S.Label>
              <S.RadioWrapper>
                <Radio
                  label="공개"
                  color="teal"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')}
                  disabled={false}
                />
                <Radio
                 label="비공개"
                 color="black"
                 checked={visibility === 'private'}
                 onChange={() => setVisibility('private')}
                 disabled={false}
                />
                <Radio
                 label="비공개"
                 color="black"
                 checked={visibility === 'private'}
                 onChange={() => setVisibility('private')}
                 disabled={true}
                />
              </S.RadioWrapper>
            </S.InfoGroup>
        </S.ContentWrapper>


    </S.Container>
  );
}