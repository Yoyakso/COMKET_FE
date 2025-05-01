import { useState } from 'react';
import { TextInput } from '@/components/common/textInput/TextInput';
import { Radio } from '@/components/common/radio/Radio';
import { Button } from '@/components/common/button/Button';
import * as S from './CreateWorkspacePage.Style';

export const CreateWorkspacePage = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const isNameValid = workspaceName.trim().length > 0;
  const isURLValid = /^[a-z0-9]+$/.test(workspaceURL);
  const isFormValid = isNameValid && isURLValid;

  return (

    <S.Container>
       <S.Header>
        <S.Title>워크스페이스 생성</S.Title>
        <S.StepTextWrapper>
        <S.StepTextHighlight>1</S.StepTextHighlight>
        <S.StepText> / 2 단계</S.StepText>
        </S.StepTextWrapper>
        
        </S.Header>

        <S.FormSection>
            <S.InputGroup>
                <S.Label>워크스페이스 이름</S.Label>
                <S.InputWrapper>
                    <TextInput
                    placeholder="워크스페이스 이름을 입력해 주세요."
                    value={workspaceName}
                    onChange={(value: string) => setWorkspaceName(value)}/>
                </S.InputWrapper>        
            </S.InputGroup>
            <S.InputGroup>
                <S.Label>워크스페이스 주소</S.Label>
                <S.InputWrapper>
                    <TextInput
                    placeholder="워크스페이스 주소를 입력해 주세요."
                    value={workspaceURL}
                    onChange={(value: string) => setWorkspaceURL(value)}
                    helperText='영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가'/>
                </S.InputWrapper>
                <S.DomainText>.comket.com</S.DomainText>
            </S.InputGroup>

            <S.RadioGroup>
                <S.Label>공개 여부</S.Label>
                <S.RadioWrapper>
                <Radio label="공개" color="black" size="sm"   state={visibility === 'public' ? 'checked' : 'unchecked'}
  onChange={() => setVisibility('public')}
 />
                <Radio label="비공개" color="black" size="sm"  state={visibility === 'private' ? 'checked' : 'unchecked'}
  onChange={() => setVisibility('private')}/>
                </S.RadioWrapper>
            </S.RadioGroup>
            {/* radio 추후에 보완작업하기  */}
        </S.FormSection>
        <S.ButtonWrapper>
            <Button variant="tealFilled" size="lg" disabled={!isFormValid}>다음</Button>
        </S.ButtonWrapper>
    </S.Container>




    // <S.Container>
    //   <S.Header>
    //     <S.Title>워크스페이스 생성</S.Title>
    //     <S.StepText>1 / 2 단계</S.StepText>
    //   </S.Header>

    //   <S.FormSection>
    //     <S.InputGroup>
    //         <S.Label>워크스페이스 생성</S.Label>
    //         <TextInput
    //         placeholder="워크스페이스 이름을 입력해 주세요."
    //         value={workspaceName}
    //         onChange={(value: string) => setWorkspaceName(value)}
    //         />
    //     </S.InputGroup>

    //     <S.InputGroup>
    //         <S.Label>워크스페이스 생성</S.Label>
    //         <TextInput
    //         placeholder="워크스페이스 주소를 입력해 주세요."
    //         value={workspaceURL}
    //         onChange={(value: string) => setWorkspaceURL(value)}
    //         />
    //       <S.DomainText>.comket.com</S.DomainText>
    //       <S.HelperText>영어 소문자와 숫자만 입력 가능 / 공백 및 특수문자 입력 불가</S.HelperText>
    //     </S.InputGroup>

    //     <S.RadioGroup>
    //       <S.Label>공개 여부</S.Label>
    //       <Radio label="공개" color="black" size="sm"
    //         state={visibility === 'public' ? 'checked' : 'unchecked'}
    //         onChange={() => setVisibility('public')}/>
    //     <Radio label="비공개" color="black" size="sm"
    //         state={visibility === 'private' ? 'checked' : 'unchecked'}
    //         onChange={() => setVisibility('private')}/>
    //     </S.RadioGroup>
    //   </S.FormSection>

    //   <S.ButtonWrapper>
    //     <Button variant="tealFilled" size="lg" disabled={!isFormValid}>다음</Button>
    //   </S.ButtonWrapper>
    // </S.Container>
 );
};
