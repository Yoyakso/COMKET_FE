import * as S from './myTicketPage.Style';
import { useState } from 'react';
import { ListChecks, Rows2 } from 'lucide-react';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { TicketListView } from '@/components/ticketView/TicketListView';
import { TicketBoardView } from '@/components/ticketView/TicketBoardView';
import { Ticket } from '@/types/ticket';

const mockMyTickets: Ticket[] = [];

export const MyTicketPage = () => {
  const [viewType, setViewType] = useState<'list' | 'board'>('list');

  const handleTicketClick = (ticket: Ticket) => {
    console.log('티켓 클릭됨:', ticket);
  };

  const handleTicketDrop = (ticketId: number, newStatus: string) => {
    console.log('드래그 상태 변경:', ticketId, newStatus);
  };

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

          {viewType === 'list' ? (
            <TicketListView
              ticketList={mockMyTickets}
              onTicketClick={handleTicketClick}
              onDeleteTickets={() => {}}
              projectName="내 티켓"
            />
          ) : (
            <TicketBoardView
              ticketList={mockMyTickets}
              onTicketClick={handleTicketClick}
              onTicketDrop={handleTicketDrop}
            />
          )}
        </S.Wrapper>
      </S.MainContainer>
    </S.PageContainer>
  );
};
