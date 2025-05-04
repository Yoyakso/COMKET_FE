import { useState } from "react";
import * as S from "./WorkspacePage.Style";
import { Button } from "@/components/common/button/Button";
import { Dropdown, DropdownOption } from "@/components/common/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import {WorkspaceLayout} from "@/components/layout/WorkspaceLayout";

export const WorkspacePage = () => {
  const navigate = useNavigate();

  const options: DropdownOption[] = [
    // 주석 풀면 기존 워크스페이스 드롭다운 화면 나옴옴
    // { value: "workspace-1", label: "YOYAKSO" },
    // { value: "workspace-2", label: "COMKET" },
    // { value: "workspace-3", label: "TEAM42" },
  ];

  const [selectedId, setSelectedId] = useState<string>(options[0]?.value ?? "");

  const handleJoin = () => {
    if (selectedId) {
      navigate(`/workspace/${selectedId}`);
    }
  };

  return (
    <WorkspaceLayout>
      <S.Container>
        <S.Card>
          <S.Title>워크스페이스 선택</S.Title>

          {options.length === 0 ? (
            <>
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

              <S.FullWidthButton variant="tealFilled" size="lg">
                워크스페이스 생성
              </S.FullWidthButton>
              <S.FullWidthButton variant="neutralOutlined" size="lg">
                초대 코드로 입장
              </S.FullWidthButton>
            </>
          ) : (
            <>
              <S.WorkspaceRow>
                <Dropdown
                  options={options}
                  value={selectedId}
                  onChange={setSelectedId}
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

              <S.FullWidthButton variant="tealFilled" size="lg">
                워크스페이스 생성
              </S.FullWidthButton>
              <S.FullWidthButton variant="neutralOutlined" size="lg">
                초대 코드로 입장
              </S.FullWidthButton>
            </>
          )}
        </S.Card>
      </S.Container>
    </WorkspaceLayout>
  );
};

