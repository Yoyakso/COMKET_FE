import { TicketRow } from "./TicketRow";
import * as S from "./TicketTable.Style";
import { Ticket } from "@/types/ticket";

interface TicketTableProps {
    tickets: Ticket[];
}

export const TicketTable = ({ tickets }: TicketTableProps) => {
    return (
        <S.TableWrapper>
            <S.Table>
                <S.TableHeader>
                    <S.HeaderRow>
                        <S.HeaderCell></S.HeaderCell>
                        <S.HeaderCell></S.HeaderCell>
                        <S.HeaderCell>티켓 ID</S.HeaderCell>
                        <S.HeaderCell>티켓</S.HeaderCell>
                        <S.HeaderCell>유형</S.HeaderCell>
                        <S.HeaderCell>담당자</S.HeaderCell>
                        <S.HeaderCell>우선순위</S.HeaderCell>
                        <S.HeaderCell>상태</S.HeaderCell>
                        <S.HeaderCell>시작일</S.HeaderCell>
                        <S.HeaderCell>마감일</S.HeaderCell>
                        <S.HeaderCell>하위 티켓</S.HeaderCell>
                        <S.HeaderCell>작성자</S.HeaderCell>
                    </S.HeaderRow>
                </S.TableHeader>

                <S.TableBody>
                    {tickets.map((ticket) => (
                        <TicketRow key={ticket.id} ticket={ticket} />
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableWrapper>
    );
};
