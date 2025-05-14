import { CheckBox } from "@/components/common/checkbox/CheckBox";
import { PriorityBadge } from "@components/ticket/PriorityBadge";
import { StatusBadge } from "@/components/ticket/StatusBadge";
import { TypeBadge } from "@/components/ticket/TypeBadge";
import * as S from "@/components/common/dropdown/Filter.Style";
import { PRIORITY, STATUS, TYPE } from "@/constants/filterData";
import { TicketFilterStore } from "@/components/ticket/Ticket";
import { RefreshCcwDot } from "lucide-react"

export const Filter = () => {

  const {
    selectedPriorities,
    selectedStatuses,
    selectedTypes,
    toggleSelectedPriorities,
    toggleSelectedStatuses,
    toggleSelectedTypes,
    reset,
  } = TicketFilterStore();

  return (

    <S.Wrapper>

      <S.FilterGroup>
        <S.Title>유형</S.Title>
        <S.FilterSection>
          {TYPE.map((type) => (
            <S.FilterItem key={type}>
              <CheckBox
                checked={selectedTypes.includes(type)}
                onChange={() => toggleSelectedTypes(type)}
                size="sm"
              />
              <TypeBadge type={type} />
            </S.FilterItem>
          ))}
        </S.FilterSection>
      </S.FilterGroup>



      <S.FilterGroup>
        <S.Title>우선순위</S.Title>
        <S.FilterSection>
          {PRIORITY.map((priority) => (
            <S.FilterItem key={priority}>
              <CheckBox
                checked={selectedPriorities.includes(priority)}
                onChange={() => toggleSelectedPriorities(priority)}
                size="sm"
              />
              <PriorityBadge priority={priority as any} />
            </S.FilterItem>
          ))}
        </S.FilterSection>
      </S.FilterGroup>



      <S.FilterGroup>
        <S.Title>상태</S.Title>
        <S.FilterSection>
          {STATUS.map((status) => (
            <S.FilterItem key={status}>
              <CheckBox
                checked={selectedStatuses.includes(status)}
                onChange={() => toggleSelectedStatuses(status)}
                size="sm"
              />
              <StatusBadge status={status as any} />
            </S.FilterItem>
          ))}
        </S.FilterSection>
      </S.FilterGroup>

      <S.ButtonBox>
        <S.ResetButton onClick={reset}><RefreshCcwDot width={'14px'} height={'14px'} />초기화</S.ResetButton>
      </S.ButtonBox>

    </S.Wrapper>
  );
};
