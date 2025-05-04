import { useState } from "react";
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar";
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { MemberHeader } from "@/components/member/MemberHeader";
import { MemberData } from "@/types/member";
import * as S from "./MemberPage.Style";

export const MemberPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const members: MemberData[] = [
    {
      id: "tph00300",
      name: "이태희",
      email: "tph00300@ajou.co.kr",
      department: "워크스페이스 소유자",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "이",
      color: "#4dabf7",
    },
    {
      id: "simh3077",
      name: "조민혁",
      email: "simh3077@ajou.ac.kr",
      department: "워크스페이스 관리자",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "조",
      color: "#748ffc",
    },
    {
      id: "won980630",
      name: "원혜연",
      email: "won980630@ajou.co.kr",
      department: "워크스페이스 관리자",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "원",
      color: "#69db7c",
    },
    {
      id: "ka09023",
      name: "오유민",
      email: "ka09023@ajou.co.kr",
      department: "워크스페이스 관리자",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "오",
      color: "#4dabf7",
    },
    {
      id: "chito",
      name: "지토",
      email: "chito@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "지",
      color: "#ffa8a8",
    },
    {
      id: "yoojaeseok",
      name: "유재석",
      email: "yoojaeseok@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "유",
      color: "#ffa94d",
    },
    {
      id: "parkmyeongsu",
      name: "박명수",
      email: "parkmyeongsu@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "박",
      color: "#ffe066",
    },
    {
      id: "jhd",
      name: "정형돈",
      email: "jhd@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "정",
      color: "#63e6be",
    },
    {
      id: "norediron",
      name: "노홍철",
      email: "norediron@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "노",
      color: "#ff8787",
    },
    {
      id: "lavieenrose",
      name: "라비엔",
      email: "lavieenrose@ajou.co.kr",
      department: "일반 멤버",
      status: "활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "라",
      color: "#748ffc",
    },
    // More members with different statuses
    {
      id: "tph00300",
      name: "이태희",
      email: "tph00300@ajou.co.kr",
      department: "일반 멤버",
      status: "비활성",
      registrationDate: "YYYY-MM-DD",
      lastLoginDate: "YYYY-MM-DD",
      initial: "이",
      color: "#4dabf7",
    },
    // Add more members as needed
  ]

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
          <LocalNavBar variant="settings" />
        </S.LNBContainer>

        <S.Content>
          <MemberHeader memberCount={25} onSearch={handleSearch} />
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
}