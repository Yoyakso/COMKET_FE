import * as S from "./TicketDashboardPage.Style";
import { useState } from "react";
import { TicketListView } from "@/components/ticketView/TicketListView";
import { TicketBoardView } from "@/components/ticketView/TicketBoardView";
import { ListChecks, Rows2, Plus } from 'lucide-react';
import { Button } from "@components/common/button/Button";
import { CreateTicketModal } from "@components/ticketModal/CreateTicketModal";
import { TicketDetailPanel } from "@components/ticketDetailPanel/TicketDetailPanel";
import { Ticket } from "@/types/ticket";
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar";

export const TicketDashboardPage = () => {
  const [viewType, setViewType] = useState<"list" | "board">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleCreateTicket = () => {
    setIsModalOpen(true);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleClosePanel = () => {
    setSelectedTicket(null);
  };

  const handleNavigateTicket = (direction: "prev" | "next") => {
    if (!selectedTicket) return;
    // TODO: 이 부분은 실제 티켓 배열을 받아서 처리해야 합니다.
    const MOCK_TICKETS: Ticket[] = []; // 임시
    const currentIndex = MOCK_TICKETS.findIndex((t) => t.id === selectedTicket.id);
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + MOCK_TICKETS.length) % MOCK_TICKETS.length
        : (currentIndex + 1) % MOCK_TICKETS.length;
    setSelectedTicket(MOCK_TICKETS[newIndex]);
  };

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" />
        </S.LNBContainer>
        <S.Wrapper>
          <S.Header>
            <S.TitleGroup>
              <div style={{ width: "calc(100% - 100px)" }}>
                <S.Title>COMKET_통합</S.Title>
                <S.Description>
                  프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다
                </S.Description>
              </div>
              <Button size="md" $variant="tealFilled" onClick={handleCreateTicket}>
                <span style={{ marginRight: "4px" }}>
                  <Plus width="14px" height="14px" />
                </span>
                티켓 생성
              </Button>
            </S.TitleGroup>

            <S.ViewTabBar>
              <S.ViewTab $active={viewType === "list"} onClick={() => setViewType("list")}>
                <ListChecks size={16} />
                <span>목록</span>
              </S.ViewTab>
              <S.ViewTab $active={viewType === "board"} onClick={() => setViewType("board")}>
                <Rows2 size={16} />
                <span>보드</span>
              </S.ViewTab>
            </S.ViewTabBar>
          </S.Header>

          {viewType === "list" ? (
            <TicketListView onTicketClick={(ticket) => setSelectedTicket(ticket)} />
          ) : (
            <TicketBoardView onTicketClick={handleTicketClick} />
          )}
        </S.Wrapper>

        {isModalOpen && (
          <CreateTicketModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
              console.log("등록된 티켓:", data);
              setIsModalOpen(false);
            }}
          />
        )}

        {selectedTicket && (
          <TicketDetailPanel
            ticket={selectedTicket}
            onClose={handleClosePanel}
            onNavigate={handleNavigateTicket}
          />
        )}
      </S.MainContainer>
    </S.PageContainer>
  );
};
