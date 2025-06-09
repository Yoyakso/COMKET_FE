'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Users, CreditCard } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useBillingInfo } from '@/hooks/useBillingInfo';
import { parseHistoryToMonthlyArray } from '@/types/billing';
import { PLAN_DATA } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import * as S from './BillingChartSection.Style';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const BillingChartSection = () => {
  const workspaceId = useWorkspaceStore(s => s.workspaceId);
  const { data, isLoading } = useBillingInfo(workspaceId);

  if (isLoading || !data) return <S.Skeleton />;

  const planId = mapServerPlanToClientPlan(data.currentPlan);
  const plan = PLAN_DATA[planId];

  const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const memberArray = parseHistoryToMonthlyArray(data.memberCountHistory);
  const pricePerMember = plan.priceValue;

  const amountArray = memberArray.map(count => {
    if (count === null || pricePerMember === null) return null;
    return pricePerMember * count;
  });

  const memberDataset = {
    label: '팀 멤버',
    data: memberArray,
    borderColor: '#3b82f6',
    backgroundColor: (ctx: any) => {
      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
      g.addColorStop(0, 'rgba(59,130,246,.15)');
      g.addColorStop(1, 'rgba(59,130,246,0)');
      return g;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 4,
  };

  const billingDataset = {
    label: '사용 금액',
    data: amountArray,
    borderColor: '#9333ea',
    backgroundColor: (ctx: any) => {
      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
      g.addColorStop(0, 'rgba(147,51,234,.15)');
      g.addColorStop(1, 'rgba(147,51,234,0)');
      return g;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 4,
  };

  const memberValues = memberArray.filter((v): v is number => v !== null);
  const amountValues = amountArray.filter((v): v is number => v !== null);
  const memberMax = Math.max(...memberValues, 5);
  const amountMax = Math.max(...amountValues, 10_000);

  const memberOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: memberMax + 5, ticks: { stepSize: 5 } },
    },
    plugins: { legend: { display: false } },
  };

  const billingOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: amountMax * 1.2,
        ticks: {
          callback: v => `₩${(+v).toLocaleString('ko-KR')}`,
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  const currentTotal = plan.priceValue !== null ? plan.priceValue * data.memberCount : null;

  return (
    <S.SectionWrapper>
      <S.Card>
        <S.TopRow>
          <S.LeftBlock>
            <S.TitleWrapper>
              <Users size={16} strokeWidth={1.5} />
              <S.CardTitle>팀 인원 현황</S.CardTitle>
            </S.TitleWrapper>
            <S.MainValue>{data.memberCount}명</S.MainValue>
          </S.LeftBlock>
        </S.TopRow>
        <S.ChartArea>
          <Line data={{ labels, datasets: [memberDataset] }} options={memberOptions} />
        </S.ChartArea>
      </S.Card>

      <S.Card>
        <S.TopRow>
          <S.LeftBlock>
            <S.TitleWrapper>
              <CreditCard size={16} strokeWidth={1.5} />
              <S.CardTitle>요금제 사용 현황</S.CardTitle>
            </S.TitleWrapper>
            <S.MainValue>
              {currentTotal !== null ? `₩${currentTotal.toLocaleString('ko-KR')}` : '맞춤형'}
            </S.MainValue>
          </S.LeftBlock>
        </S.TopRow>
        <S.ChartArea>
          <Line data={{ labels, datasets: [billingDataset] }} options={billingOptions} />
        </S.ChartArea>
      </S.Card>
    </S.SectionWrapper>
  );
};
