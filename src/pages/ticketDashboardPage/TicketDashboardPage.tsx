import * as S from './TicketDashboardPage.Style';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TicketListView } from '@/components/ticketView/TicketListView';
import { TicketBoardView } from '@/components/ticketView/TicketBoardView';
import { ListChecks, Rows2, Plus } from 'lucide-react';
import { Button } from '@components/common/button/Button';
import { CreateTicketModal } from '@components/ticketModal/CreateTicketModal';
import { TicketDetailPanel } from '@components/ticketDetailPanel/TicketDetailPanel';
import { Ticket } from '@/types/ticket';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { getProjectById } from '@/api/Project';
import { getTicketsByProjectName } from '@/api/Ticket';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { TicketType } from '../../types/filter';
import { TicketDropdownStore } from '@/stores/ticketStore';
import { EmptyTicket } from '@/components/ticket/EmptyTicket';
import { deleteTickets, deleteTicket } from '@/api/Ticket';
import { DeleteModal } from '@/components/common/modal/DeleteModal';
import { TicketSelectionStore } from '@/components/ticket/TicketSelectionStore';

export const TicketDashboardPage = () => {
  const [viewType, setViewType] = useState<'list' | 'board'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState<string>('');
  const workspaceName = useWorkspaceStore(state => state.workspaceName);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const { setTickets } = TicketDropdownStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { selectedIds, clearSelection } = TicketSelectionStore();
  const [hoveredTicket, setHoveredTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectName = async () => {
      if (!projectId) return;
      try {
        const response = await getProjectById(workspaceName, projectId);
        setProjectName(response.name);
        setProjectDescription(response.description);
      } catch (error) {
        console.error('프로젝트 이름 조회 실패:', error);
      }
    };
    fetchProjectName();
  }, [projectId]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!projectName) return;
      try {
        const tickets = await getTicketsByProjectName(projectName);
        console.log('담당자', tickets);
        const mappedTickets: Ticket[] = tickets.map((ticket: any) => ({
          id: ticket.id,
          title: ticket.ticket_name,
          type: ticket.ticket_type as TicketType,
          description: ticket.description,
          assignee: {
            name: ticket.assignee_member?.realName || '',
            nickname: '', // nickname은 API 응답에 없으므로 기본값 처리
            profileUrl: '',
            email: ticket.assignee_member?.email || '',
          },
          threadCount: 0, // API에서 제공되지 않으므로 기본값
          priority: ticket.ticket_priority, // 그대로 사용 가능
          status: ticket.ticket_state, // 그대로 사용 가능
          startDate: ticket.start_date,
          endDate: ticket.end_date,
          subticketCount: ticket.sub_ticket_count,
          subtickets: [],
          parentId: ticket.parent_ticket_id ?? undefined,
          writer: {
            name: ticket.creator_member?.realName || '',
            nickname: '',
            profileUrl: '',
            email: ticket.creator_member?.email || '',
          },
        }));
        setTickets(mappedTickets);
        setTicketList(mappedTickets);
      } catch (e) {
        console.error('티켓 불러오기 실패:', e);
      }
    };

    fetchTickets();
  }, [projectName]);

  const handleTicketClick = (ticket: Ticket) => {
    if (!projectId) return;
    console.log('이동 경로:', `/${projectId}/tickets/${ticket.id}/thread`);

    navigate(`/${projectId}/tickets/${ticket.id}/thread`, {
      state: {
        ticket,
        projectName,
      },
    });
  };

  const handleTicketCreate = (newTicket: Ticket) => {
    setTicketList(prev => [newTicket, ...prev]);
    setIsModalOpen(false);
  };

  const handleClosePanel = () => {
    setSelectedTicket(null);
  };

  const handleTicketHover = (ticket: Ticket | null) => {
    setHoveredTicket(ticket);
  };

  const handleNavigateTicket = (direction: 'prev' | 'next') => {
    if (!selectedTicket) return;

    const currentIndex = ticketList.findIndex(t => t.id === selectedTicket.id);
    if (currentIndex === -1) return;

    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + ticketList.length) % ticketList.length
        : (currentIndex + 1) % ticketList.length;

    setSelectedTicket(ticketList[newIndex]);
  };

  const handleBulkDelete = async () => {
    if (!projectName || selectedIds.length === 0) return;
    try {
      await deleteTickets(selectedIds, projectName);

      setTicketList(prev => prev.filter(t => !selectedIds.includes(t.id)));

      clearSelection();
      setShowDeleteModal(false);
    } catch (e) {
      console.error(e);
    }
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
              <div style={{ width: 'calc(100% - 100px)' }}>
                <S.Title>{projectName}</S.Title>
                <S.Description>{projectDescription}</S.Description>
              </div>
              <Button size="md" $variant="tealFilled" onClick={() => setIsModalOpen(true)}>
                <span style={{ marginRight: '4px' }}>
                  <Plus width="14px" height="14px" />
                </span>
                티켓 생성
              </Button>
            </S.TitleGroup>

            <S.ViewTabBar>
              <S.ViewTab $active={viewType === 'list'} onClick={() => setViewType('list')}>
                <ListChecks size={16} />
                <span>목록</span>
              </S.ViewTab>
              <S.ViewTab $active={viewType === 'board'} onClick={() => setViewType('board')}>
                <Rows2 size={16} />
                <span>보드</span>
              </S.ViewTab>
            </S.ViewTabBar>
          </S.Header>

          {ticketList.length === 0 ? (
            <EmptyTicket onCreateTicket={() => setIsModalOpen(true)} />
          ) : viewType === 'list' ? (
            <TicketListView
              ticketList={ticketList}
              onTicketClick={handleTicketClick}
              onTicketHover={handleTicketHover}
              onDeleteTickets={() => setShowDeleteModal(true)}
            />
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

        {/* {selectedTicket && projectName && (
          <TicketDetailPanel
            ticket={selectedTicket}
            projectName={projectName}
            onClose={handleClosePanel}
            onNavigate={handleNavigateTicket}
          />
        )} */}
        {hoveredTicket && !selectedTicket && projectName && (
          <S.PanelWrapper
            onMouseEnter={() => setHoveredTicket(hoveredTicket)} // 유지
            onMouseLeave={() => setHoveredTicket(null)} // 패널 영역 나갈 때만 닫힘
          >
            <TicketDetailPanel
              ticket={hoveredTicket}
              projectName={projectName}
              onClose={() => setHoveredTicket(null)}
              onNavigate={handleNavigateTicket}
            />
          </S.PanelWrapper>
        )}

        {showDeleteModal && (
          <DeleteModal
            title="티켓 삭제"
            message={
              <>
                선택한 티켓 {selectedIds.length}개를 삭제하시겠습니까?
                <br />
                삭제 시 관련 데이터가 모두 제거되며 복구할 수 없습니다.
              </>
            }
            confirmText="삭제"
            cancelText="취소"
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleBulkDelete}
          />
        )}
      </S.MainContainer>
    </S.PageContainer>
  );
};
