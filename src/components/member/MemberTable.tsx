import { useState } from "react"
import * as S from "./MemberTable.Style"
import { MemberRow } from "./MemberRow"
import type { MemberData } from "@/types/member"
import { ChevronDown, ChevronUp } from "@/assets/icons"

interface MemberTableProps {
  members: MemberData[]
}

type SortField = "name" | "email" | "department" | "status" | "eliminateDate" | "lastLoginDate"
type SortDirection = "asc" | "desc"

export const MemberTable = ({ members }: MemberTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 같은 필드를 다시 클릭하면 정렬 방향 전환
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // 다른 필드를 클릭하면 해당 필드로 오름차순 정렬
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown />
    }
    return sortDirection === "asc" ? <ChevronUp width='16px' height='16px' /> : <ChevronDown />
  }

  const sortedMembers = [...members].sort((a, b) => {
    if (!sortField) return 0

    let valueA: string | number = ""
    let valueB: string | number = ""

    switch (sortField) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "email":
        valueA = a.email
        valueB = b.email
        break
      case "department":
        valueA = a.department
        valueB = b.department
        break
      case "status":
        valueA = a.status
        valueB = b.status
        break
      case "eliminateDate":
        valueA = a.registrationDate
        valueB = b.registrationDate
        break
      case "lastLoginDate":
        valueA = a.lastLoginDate
        valueB = b.lastLoginDate
        break
      default:
        return 0
    }

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <S.TableContainer>
      <S.Table>
        <S.TableHeader>
          <S.HeaderRow>
            <S.HeaderCell onClick={() => handleSort("name")}>
              <S.HeaderContent>
                <span>성명</span>
                {getSortIcon("name")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("email")}>
              <S.HeaderContent>
                <span>이메일</span>
                {getSortIcon("email")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("department")}>
              <S.HeaderContent>
                <span>역할</span>
                {getSortIcon("department")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("status")}>
              <S.HeaderContent>
                <span>계정 상태</span>
                {getSortIcon("status")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("eliminateDate")}>
              <S.HeaderContent>
                <span>비활성/제거 일자</span>
                {getSortIcon("eliminateDate")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("lastLoginDate")}>
              <S.HeaderContent>
                <span>참여 일자</span>
                {getSortIcon("lastLoginDate")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell>관리</S.HeaderCell>
          </S.HeaderRow>
        </S.TableHeader>
        <S.TableBody>
          {sortedMembers.map((member, index) => (
            <MemberRow key={`${member.id}-${index}`} member={member} />
          ))}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  )
}
