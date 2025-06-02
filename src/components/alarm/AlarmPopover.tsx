import * as S from './AlarmPopover.Style';
import { TicketAlarm } from '@/api/Alarm';
import { MessageCircle, UserCheck } from 'lucide-react';

interface Props {
  alarms: TicketAlarm[];
  onClick: (ticketId: number) => void;
}

export const AlarmPopover = ({ alarms, onClick }: Props) => {
  return (
    <S.Wrapper>
      {alarms.map(alarm => {
        const icon =
          alarm.ticket_alarm_type === 'THREAD_TAGGING' ? (
            <MessageCircle size={16} />
          ) : (
            <UserCheck size={16} />
          );

        return (
          <S.Item key={alarm.ticket_id} onClick={() => onClick(alarm.ticket_id)}>
            <S.IconWrapper>{icon}</S.IconWrapper>
            <span>
              #{alarm.ticket_id} - {alarm.alarm_message}
            </span>
          </S.Item>
        );
      })}
    </S.Wrapper>
  );
};
