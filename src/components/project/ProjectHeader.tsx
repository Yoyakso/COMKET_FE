import { useState, useRef } from "react"
import * as S from "./ProjectHeader.Style"
import { Search } from "../common/search/Search"
import { Dropdown, type DropdownOption } from "@/components/common/dropdown/Dropdown"

interface ProjectHeaderProps {
  projectCount: number
  onSearch: (query: string) => void
  onCreateProject?: () => void
  onFilter?: (selectedFilters: string[]) => void
}

export const ProjectHeader = ({ projectCount, onSearch, onCreateProject, onFilter }: ProjectHeaderProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filterButtonRef = useRef<HTMLDivElement>(null)

  const filterOptions: DropdownOption[] = [
    { label: "전체 공개", value: "public", groupName: "공개 범위" },
    { label: "멤버 공개", value: "private", groupName: "공개 범위" },
  ]

  const handleFilterChange = (values: string | string[]) => {
    if (Array.isArray(values)) {
      setSelectedFilters(values)
      if (onFilter) {
        onFilter(values)
      }
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <S.HeaderContainer>
      <S.Title>프로젝트 관리</S.Title>
      <S.HeaderTop>
        <S.ProjectCount>{projectCount}개</S.ProjectCount>
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
                  $variant={selectedFilters.length > 0 ? "activated" : "none"}
                  type="group-check"
                  iconLeft={true}
                />
              </S.FilterDropdownWrapper>
            </S.FilterButtonContainer>
            <S.SearchInputWrapper>
              <Search
                $state="enable"
                $variant="outlined"
                size="sm"
                onSearch={handleSearchChange}
                defaultValue={searchValue}
                disabled={false}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </S.SearchInputWrapper>
          </S.SearchContainer>
          <S.Button onClick={onCreateProject}>프로젝트 생성</S.Button>
        </S.RightSection>
      </S.HeaderTop>
    </S.HeaderContainer>
  )
}
