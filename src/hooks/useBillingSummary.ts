import { useQuery } from '@tanstack/react-query';
import { fetchBillingSummary } from '@/api/Billing';

export const useBillingSummary = (workspaceId: number) =>
  useQuery({
    queryKey: ['billing', workspaceId],
    queryFn: () => fetchBillingSummary(workspaceId),
    enabled: !!workspaceId,
    staleTime: 1000 * 60,
  });
