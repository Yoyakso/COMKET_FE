import { useState } from "react";
import * as S from "./WorkspacePage.Style";
import { Button } from "@/components/common/button/Button";
import { Dropdown, DropdownOption } from "@/components/common/dropdown/Dropdown";
import { CheckBox } from "@/components/common/checkbox/CheckBox";
import { useNavigate } from "react-router-dom";
import { Search } from "@/components/common/search/Search";

export const WorkspacePage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");


  const options: DropdownOption[] = [
    { value: "workspace-1", label: "YOYAKSO" },
    { value: "workspace-2", label: "COMKET" },
    { value: "workspace-3", label: "TEAM42" },
  ];

  const [selectedId, setSelectedId] = useState<string>(options[0].value); // 기본 선택

  const handleJoin = () => {
    if (selectedId) {
      navigate(`/workspace/${selectedId}`);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>워크스페이스 선택</S.Title>
    <CheckBox variant="indigo" size="sm" interactionState="default" label="선택박스"/>
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
      </S.Card>


      <div>   <Search variant="filled" size="md"  value={searchValue}
  onChange={setSearchValue}
  onClear={() => setSearchValue('')}></Search></div>
    </S.Container>
  );
};
