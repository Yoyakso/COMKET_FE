import { useState } from "react"
import * as S from "./MemberHeader.Style"
import { FilterIcon } from "@/assets/icons"
import { Search } from "../common/search/Search"
import { InviteModal } from "../workspace/InviteModal"

interface MemberHeaderProps {
  memberCount: number
  onSearch: (query: string) => void
}

export const MemberHeader = ({ memberCount, onSearch }: MemberHeaderProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [isInviteModalOpen, setInviteModalOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchValue(value); // 입력 값을 상태로 설정
    onSearch(value); // 부모 컴포넌트에 검색 쿼리 전달
  };

  const openInviteModal = () => {
    setInviteModalOpen(true)
  }
  const closeInviteModal = () => {
    setInviteModalOpen(false)
  }

  return (
    <S.HeaderContainer>
      <S.Title>멤버 관리</S.Title>
      <S.HeaderTop>
        <S.MemberCount>{memberCount}명</S.MemberCount>
        <S.RightSection>
          <S.SearchContainer>
            <S.FilterButton>
              필터 <FilterIcon />
            </S.FilterButton>
            <S.SearchInputWrapper>
              <Search
                state="enable"
                variant="outlined"
                size="sm"
                onSearch={handleSearchChange}
                defaultValue={searchValue}
                disabled={false}
              />
            </S.SearchInputWrapper>
          </S.SearchContainer>
          <S.InviteButton onClick={openInviteModal}>멤버 초대</S.InviteButton>
        </S.RightSection>
      </S.HeaderTop>

      {isInviteModalOpen && (
        <InviteModal onClose={closeInviteModal} />
      )}

    </S.HeaderContainer>
  )
}
