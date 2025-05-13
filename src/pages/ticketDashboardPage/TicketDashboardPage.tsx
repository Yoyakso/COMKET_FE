import * as S from "./TicketDashboardPage.Style";
import { TicketTable } from "@/components/ticket/TicketTable";

export const TicketDashboardPage = () => {
    return (
        <S.Wrapper>
            {/* 헤더 */}
            <S.Header>
                <S.Title>COMKET_통합</S.Title>
                <S.Description>
                    프로젝트 설명입니다. 프로젝트 설명입니다. 프로젝트 설명입니다. 프로젝트 설명입니다. 프로젝트 설명입니다.
                </S.Description>
                <S.Actions>
                    <S.FilterBox>티켓 목록 | 멤버</S.FilterBox>
                    <S.CreateButton>+ 티켓 생성</S.CreateButton>
                </S.Actions>
            </S.Header>

            {/* 테이블 */}
            <TicketTable />
        </S.Wrapper>
    );
};
