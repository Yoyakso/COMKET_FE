import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { BillingInfo } from '@/types/billing';

export const useBillingInfo = (workspaceId?: number) =>
  useQuery({
    queryKey: ['billing', workspaceId],
    enabled: !!workspaceId,
    queryFn: async (): Promise<BillingInfo> => {
      const { data } = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing`);
      return data;
    },
  });
