import { useParams } from 'react-router-dom';
import { ThreadPage } from './ThreadPage';

export const ThreadPageWrapper = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  return <ThreadPage key={ticketId} />;
};
