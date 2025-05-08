import { useState, useEffect } from "react";
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar";
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { MemberHeader } from "@/components/member/MemberHeader";
import { MemberTable } from "@/components/member/MemberTable";
import { MemberData } from "@/types/member";
import * as S from "./MemberPage.Style";
import { getWorkspaceMembers } from "@/api/Member";

export const MemberPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState<MemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await getWorkspaceMembers();
        setMembers(data);
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleNavigateMember = async () => {
    try {
      console.log('프로젝트 멤버 조회');
      setIsLoading(true);
      const data = await getWorkspaceMembers();

      console.log(data)
    } catch (error) {
      console.log("프로젝트 멤버 조회 실패:", error);
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.includes(searchQuery) || member.email.includes(searchQuery) || member.id.includes(searchQuery),
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" onNavigateMember={handleNavigateMember} />
        </S.LNBContainer>

        <S.Content>
          <MemberHeader memberCount={25} onSearch={handleSearch} />
          {/* <MemberTable members={filteredMembers} /> */}
          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <MemberTable members={filteredMembers} />
          )}
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
}