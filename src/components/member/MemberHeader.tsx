import { useState, useRef } from "react"
import * as S from "./MemberHeader.Style"
import { Search } from "../common/search/Search"
import { InviteModal } from "../workspace/InviteModal"
import { Dropdown, type DropdownOption } from "@/components/common/dropdown/Dropdown"

interface MemberHeaderProps {
  memberCount: number
  onSearch: (query: string) => void
  onFilter?: (selectedFilters: string[]) => void
}

export const MemberHeader = ({ memberCount, onSearch, onFilter }: MemberHeaderProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [isInviteModalOpen, setInviteModalOpen] = useState(false)
  // const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filterButtonRef = useRef<HTMLDivElement>(null)

  const filterOptions: DropdownOption[] = [
    { label: "워크스페이스 소유자", value: "owner", groupName: "역할" },
    { label: "워크스페이스 관리자", value: "admin", groupName: "역할" },
    { label: "일반 멤버", value: "member", groupName: "역할" },

    { label: "활성", value: "active", groupName: "계정 상태" },
    { label: "비활성", value: "inactive", groupName: "계정 상태" },
    { label: "제거", value: "removed", groupName: "계정 상태" },
  ]

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

  // const toggleFilterDropdown = () => {
  //   setIsFilterOpen(!isFilterOpen)
  // }

  const handleFilterChange = (values: string | string[]) => {
    if (Array.isArray(values)) {
      setSelectedFilters(values)
      if (onFilter) {
        onFilter(values)
      }
    }
  }

  return (
    <S.HeaderContainer>
      <S.Title>멤버 관리</S.Title>
      <S.HeaderTop>
        <S.MemberCount>{memberCount}명</S.MemberCount>
        <S.RightSection>
          <S.SearchContainer>
            <S.FilterButtonContainer ref={filterButtonRef}>
              <S.FilterDropdownWrapper>
                <Dropdown
                  options={filterOptions}
                  selectedValues={selectedFilters}
                  onChange={handleFilterChange}
                  placeholder="필터"
                  size="sm"
                  variant={selectedFilters.length > 0 ? "activated-chip" : "none"}
                  type="group-check"
                  iconLeft={true}
                />
              </S.FilterDropdownWrapper>
            </S.FilterButtonContainer>
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

      {isInviteModalOpen && <InviteModal onClose={closeInviteModal} />}
    </S.HeaderContainer>
  )
}
