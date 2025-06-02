import * as S from './AlarmPopover.Style';
import { TicketAlarm } from '@/api/Alarm';
import { MessageCircle, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  alarms: TicketAlarm[];
  onClick: (ticketId: number) => void;
}

export const AlarmPopover = ({ alarms, onClick }: Props) => {
  const getAlarmInfo = (alarm: TicketAlarm) => {
    switch (alarm.ticket_alarm_type) {
      case 'THREAD_TAGGING':
        return {
          icon: <MessageCircle size={16} color="#3b82f6" />,
          text: `#${alarm.ticket_id}에서 당신이 멘션되었습니다.`,
        };
      case 'ASSIGNEE_SETTING':
        return {
          icon: <UserCheck size={16} color="#10b981" />,
          text: `#${alarm.ticket_id} 티켓의 담당자로 배정되었습니다.`,
        };
      default:
        return {
          icon: <MessageCircle size={16} color="#9ca3af" />,
          text: `#${alarm.ticket_id} 관련 알림이 도착했습니다.`,
        };
    }
  };

  return (
    <AnimatePresence>
      <S.Wrapper
        as={motion.div}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {alarms.map((alarm, index) => {
          const { icon, text } = getAlarmInfo(alarm);
          return (
            <S.Item key={`${alarm.ticket_id}-${index}`} onClick={() => onClick(alarm.ticket_id)}>
              <S.IconWrapper>{icon}</S.IconWrapper>
              <S.Text>{text}</S.Text>
            </S.Item>
          );
        })}
      </S.Wrapper>
    </AnimatePresence>
  );
};
