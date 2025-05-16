import { useState, useEffect } from "react";
import * as S from "./WorkspacePage.Style";
import { Button } from "@/components/common/button/Button";
import { Dropdown, DropdownOption } from "@/components/common/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { fetchMyWorkspaces } from "@/api/Workspace";

export const WorkspacePage = () => {

  const navigate = useNavigate();
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  interface Workspace {
    id: string;
    name: string;
    slug: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Workspace[] = await fetchMyWorkspaces();

        const formatted = data.map((ws: Workspace) => ({
          label: ws.name,
          value: ws.slug,
        }));
        const slugSet = new Set();
        const duplicated = [];

        formatted.forEach((opt) => {
          if (slugSet.has(opt.value)) {
            duplicated.push(opt.value);
          }
          slugSet.add(opt.value);
        });

        console.log("duplicated slugs:", duplicated);

        setOptions(formatted);
        if (formatted.length > 0) {
          setSelectedSlug(formatted[0].value);
          console.log("selected slug:", formatted[0].value);
        }
        console.log(data);
      } catch (err) {
        console.error("워크스페이스 목록 불러오기 실패:", err);
        setOptions([]);
        setSelectedSlug('');
      }
    };

    fetchData();
  }, []);


  const handleJoin = () => {
    if (selectedSlug) {
      navigate(`/${selectedSlug}/project`);
    }
  };


  return (

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

            <S.FullWidthButton variant="tealFilled" size="lg" onClick={() => navigate("/workspace/create")}>
              워크스페이스 생성
            </S.FullWidthButton>
            <S.FullWidthButton variant="neutralOutlined" size="lg" onClick={() => navigate("/invitecode")}>
              초대 코드로 입장
            </S.FullWidthButton>
          </>
        ) : (
          <>
            <S.WorkspaceRow>
              <Dropdown
                options={options}
                value={selectedSlug}
                onChange={(value) => {
                  if (typeof value === "string") {
                    setSelectedSlug(value);
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


            <S.FullWidthButton variant="tealFilled" size="lg" onClick={() => navigate("/workspace/create")}>
              워크스페이스 생성
            </S.FullWidthButton>
            <S.FullWidthButton variant="neutralOutlined" size="lg" onClick={() => navigate("/invitecode")}>
              초대 코드로 입장
            </S.FullWidthButton>
          </>
        )}
      </S.Card>
    </S.Container>
  );
};

