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
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getWorkspaceMembers();
        setMembers(data);
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      } finally {
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      const defaultRoles = ["owner", "admin", "member"]
      const defaultStates = ["active", "inactive", "removed"]

      handleFilter({ roles: defaultRoles, states: defaultStates })
    }
  }, [members])

  const handleNavigateMember = async () => {
    try {
      const data = await getWorkspaceMembers();
      console.log(data)
    } catch (error) {
      setMembers([]);
    } finally {
    }
  }

  const handleFilter = ({ roles, states }: { roles: string[], states: string[] }) => {
    const filtered = members.filter(member => {
      const roleMatch = roles.includes(member.positionType.toLowerCase())
      const stateMatch = states.includes(member.state.toLowerCase())
      return roleMatch && stateMatch
    })
    setFilteredMembers(filtered)
  }

  const finalFilteredMembers = filteredMembers.filter(member => {
    const nameMatch = member.name?.includes(searchQuery)
    const emailMatch = member.email?.includes(searchQuery)
    const idMatch = member.id !== undefined && member.id.toString().includes(searchQuery)

    return nameMatch || emailMatch || idMatch
  })

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
          <MemberHeader
            memberCount={finalFilteredMembers.length}
            onSearch={handleSearch}
            onFilter={handleFilter} />
          <MemberTable members={finalFilteredMembers} />
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
}