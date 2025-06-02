import * as S from './MyTicketPage.Style';
import { useEffect, useState } from 'react';
import { ListChecks, Rows2, User } from 'lucide-react';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { TicketListView } from '@/components/ticketView/TicketListView';
import { TicketBoardView } from '@/components/ticketView/TicketBoardView';
import { Ticket } from '@/types/ticket';
import { getMyTickets } from '@/api/Ticket';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useUserStore } from '@/stores/userStore';

export const MyTicketPage = () => {
  const workspaceName = useWorkspaceStore(s => s.workspaceName);
  const userEmail = useUserStore(s => s.email);
  const [viewType, setViewType] = useState<'list' | 'board'>('list');
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTickets = async () => {
    if (!workspaceName) return;
    try {
      setIsLoading(true);
      const data = await getMyTickets(workspaceName);

      const normalized = data
        .map(
          (t: any): Ticket => ({
            ...t,
            id: t.id ?? t.ticket_id ?? Math.floor(Math.random() * 1000000), // fallback 처리
            title: t.ticket_name,
            type: t.ticket_type,
            description: t.description,
            priority: t.ticket_priority,
            status: t.ticket_state,
            startDate: t.start_date,
            endDate: t.end_date,
            subticketCount: t.subticket_count,
            threadCount: t.thread_count,
            parentId: t.parent_ticket_id,
            subtickets: t.subtickets,
            assignee_member: t.assignee_member,
            creator_member: t.creator_member,
          }),
        )
        .filter(
          (t: Ticket) => t.assignee_member?.email === userEmail, // ✅ 이메일로 필터링
        );

      setMyTickets(normalized);
    } catch (err) {
      console.error('내 티켓 조회 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
    console.log('티켓 클릭됨:', ticket);
  };

  const handleTicketDrop = (ticketId: number, newStatus: string) => {
    console.log('드래그 상태 변경:', ticketId, newStatus);
  };

  useEffect(() => {
    fetchTickets();
  }, [workspaceName, userEmail]);

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="project" />
        </S.LNBContainer>

        <S.Wrapper>
          <S.Header>
            <S.TitleGroup>
              <S.Title>내 티켓 모아보기</S.Title>
              <S.Description>
                워크스페이스 전체에서 나에게 할당된 티켓을 확인해보세요.
              </S.Description>
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

          {isLoading ? (
            <div>로딩 중...</div>
          ) : viewType === 'list' ? (
            <>
              {console.log('내 티켓 목록:', myTickets)}
              <TicketListView
                ticketList={myTickets}
                onTicketClick={handleTicketClick}
                onDeleteTickets={() => {}}
                projectName="내 티켓"
              />
            </>
          ) : (
            <TicketBoardView
              ticketList={myTickets}
              onTicketClick={handleTicketClick}
              onTicketDrop={handleTicketDrop}
            />
          )}
        </S.Wrapper>
      </S.MainContainer>
    </S.PageContainer>
  );
};
