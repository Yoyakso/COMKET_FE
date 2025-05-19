import * as S from "./TicketBoardView.Style";
import { Ticket } from "@/types/ticket";

interface TicketBoardViewProps {
    onTicketClick: (ticket: Ticket) => void
}

export const TicketBoardView = ({ onTicketClick }: TicketBoardViewProps) => {
    return (
        <S.Wrapper>
            보드뷰 창
        </S.Wrapper>
    );
}   