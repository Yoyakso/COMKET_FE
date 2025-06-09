export interface BillingInfo {
  workspaceId: number;
  currentPlan: 'BASIC' | 'STARTUP' | 'PRO' | 'ENTERPRISE';
  memberCount: number;
  confirmedAmount: number;
  memberCountHistory: Record<string, number>;
  billingAmountHistory: Record<string, number>;
  displayAmount: number;
}

export const parseHistoryToMonthlyArray = (
  history: Record<string, number>,
  year = new Date().getFullYear().toString(),
): (number | null)[] => {
  const arr = Array(12).fill(null) as (number | null)[];
  Object.entries(history).forEach(([key, value]) => {
    const [y, m] = key.split('-');
    if (y === year) arr[Number(m) - 1] = value;
  });
  return arr;
};
