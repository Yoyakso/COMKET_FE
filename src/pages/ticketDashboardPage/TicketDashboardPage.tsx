import * as S from "./TicketDashboardPage.Style";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TicketListView } from "@/components/ticketView/TicketListView";
import { TicketBoardView } from "@/components/ticketView/TicketBoardView";
import { ListChecks, Rows2, Plus } from 'lucide-react';
import { Button } from "@components/common/button/Button";
import { CreateTicketModal } from "@components/ticketModal/CreateTicketModal";
import { TicketDetailPanel } from "@components/ticketDetailPanel/TicketDetailPanel";
import { Ticket } from "@/types/ticket";
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar";
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar";
import { getProjectById } from "@/api/Project";
import { getTicketsByProjectName } from "@/api/Ticket"
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { TicketType } from "../../types/filter";
import { TicketDropdownStore } from "@/stores/ticketStore";

export const TicketDashboardPage = () => {
  const [viewType, setViewType] = useState<"list" | "board">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState<string>("");
  const workspaceName = useWorkspaceStore((state) => state.workspaceName)
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const { setTickets } = TicketDropdownStore();

  useEffect(() => {
    const fetchProjectName = async () => {
      if (!projectId) return;
      try {
        const response = await getProjectById(workspaceName, projectId);
        setProjectName(response.name);
        setProjectDescription(response.description);
      } catch (error) {
        console.error("프로젝트 이름 조회 실패:", error);
      }
    };
    fetchProjectName();
  }, [projectId]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!projectName) return;
      try {
        const tickets = await getTicketsByProjectName(projectName);
        console.log("담당자", tickets)
        const mappedTickets: Ticket[] = tickets.map((ticket: any) => ({
          id: ticket.id,
          title: ticket.ticket_name,
          type: ticket.ticket_type as TicketType,
          description: ticket.description,
          assignee: {
            name: ticket.assignee_member?.realName || "",
            nickname: "", // nickname은 API 응답에 없으므로 기본값 처리
            profileUrl: "",
            email: ticket.assignee_member?.email || "",
          },
          threadCount: 0, // API에서 제공되지 않으므로 기본값
          priority: ticket.ticket_priority, // 그대로 사용 가능
          status: ticket.ticket_state,      // 그대로 사용 가능
          startDate: ticket.start_date,
          endDate: ticket.end_date,
          subticketCount: ticket.sub_ticket_count,
          subtickets: [],
          parentId: ticket.parent_ticket_id ?? undefined,
          writer: {
            name: ticket.creator_member?.realName || "",
            nickname: "",
            profileUrl: "",
            email: ticket.creator_member?.email || "",
          }
        }));
        setTickets(mappedTickets);
        setTicketList(mappedTickets);
      } catch (e) {
        console.error("티켓 불러오기 실패:", e);
      }
    };

    fetchTickets();
  }, [projectName]);


  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketCreate = (newTicket: Ticket) => {
    setTicketList((prev) => [newTicket, ...prev])
    setIsModalOpen(false)
  }

  const handleClosePanel = () => {
    setSelectedTicket(null);
  };

  const handleNavigateTicket = (direction: "prev" | "next") => {
    if (!selectedTicket) return;

    const currentIndex = ticketList.findIndex((t) => t.id === selectedTicket.id);
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + ticketList.length) % ticketList.length
        : (currentIndex + 1) % ticketList.length;

    setSelectedTicket(ticketList[newIndex]);
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
                <S.Title>{projectName}</S.Title>
                <S.Description>
                  {projectDescription}
                </S.Description>
              </div>
              <Button size="md" $variant="tealFilled" onClick={() => setIsModalOpen(true)}>
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
            <TicketListView ticketList={ticketList} onTicketClick={handleTicketClick} />
          ) : (
            <TicketBoardView onTicketClick={handleTicketClick} />
          )}
        </S.Wrapper>

        {isModalOpen && projectName && (
          <CreateTicketModal
            projectId={Number(projectId)}
            projectName={projectName}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleTicketCreate}
          />
        )}

        {selectedTicket && projectName && (
          <TicketDetailPanel
            ticket={selectedTicket}
            projectName={projectName}
            onClose={handleClosePanel}
            onNavigate={handleNavigateTicket}
          />
        )}
      </S.MainContainer>
    </S.PageContainer>
  );
};
