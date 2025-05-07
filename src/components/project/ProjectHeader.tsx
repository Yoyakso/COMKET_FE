import { useState } from "react"
import * as S from "./ProjectHeader.Style"
import { FilterIcon } from "@/assets/icons"
import { Search } from "../common/search/Search"

interface ProjectHeaderProps {
  projectCount: number
  onSearch: (query: string) => void
}

export const ProjectHeader = ({ projectCount, onSearch }: ProjectHeaderProps) => {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <S.HeaderContainer>
      <S.Title>프로젝트 관리</S.Title>
      <S.HeaderTop>
        <S.MemberCount>{projectCount}개</S.MemberCount>
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
                onChange={handleSearchChange}
                onClear={() => setSearchValue("")}
                disabled={false}
                value={searchValue}
              />
            </S.SearchInputWrapper>
          </S.SearchContainer>
          <S.Button>프로젝트 생성</S.Button>
        </S.RightSection>
      </S.HeaderTop>
    </S.HeaderContainer>
  )
}
