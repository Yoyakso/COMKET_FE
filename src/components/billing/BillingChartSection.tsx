'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Users, CreditCard } from 'lucide-react';
import * as S from './BillingChartSection.Style';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const labels = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const memberData = {
  labels,
  datasets: [
    {
      label: '팀 멤버',
      data: [15, 18, 22, 25, 28, 28, null, null, null, null, null, null],
      borderColor: '#3b82f6',
      backgroundColor: (ctx: any) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

const billingData = {
  labels,
  datasets: [
    {
      label: '사용 금액',
      data: [150000, 180000, 220000, 250000, 280000, 280000, null, null, null, null, null, null],
      borderColor: '#9333ea',
      backgroundColor: (ctx: any) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

const memberOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: context => `${context.parsed.y}명`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#888' },
    },
    y: {
      min: 10,
      max: 50,
      ticks: {
        stepSize: 5,
        callback: value => `${value}`,
        color: '#666',
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        tickBorderDash: [4, 4],
      },
    },
  },
};

const billingOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: context => `₩${context.parsed.y.toLocaleString('ko-KR')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#888' },
    },
    y: {
      min: 100000,
      max: 300000,
      ticks: {
        stepSize: 50000,
        callback: value => `₩${value.toLocaleString('ko-KR')}`,
        color: '#666',
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        tickBorderDash: [4, 4],
      },
    },
  },
};

export const BillingChartSection = () => {
  return (
    <S.SectionWrapper>
      {/* 팀 인원 현황 */}
      <S.Card>
        <S.TopRow>
          <S.LeftBlock>
            <S.TitleWrapper>
              <Users size={16} strokeWidth={1.5} />
              <S.CardTitle>팀 인원 현황</S.CardTitle>
            </S.TitleWrapper>
            <S.MainValue>28명</S.MainValue>
            {/* <S.BadgeGreen>프로페셔널 플랜 이용 중</S.BadgeGreen> */}
          </S.LeftBlock>
        </S.TopRow>
        <S.ChartArea>
          <Line data={memberData} options={memberOptions} />
        </S.ChartArea>
      </S.Card>

      {/* 요금제 사용 현황 */}
      <S.Card>
        <S.TopRow>
          <S.LeftBlock>
            <S.TitleWrapper>
              <CreditCard size={16} strokeWidth={1.5} />
              <S.CardTitle>요금제 사용 현황</S.CardTitle>
            </S.TitleWrapper>
            <S.MainValue>₩280,000</S.MainValue>
            {/* <S.BadgePurple>프로페셔널 플랜</S.BadgePurple> */}
          </S.LeftBlock>
        </S.TopRow>
        <S.ChartArea>
          <Line data={billingData} options={billingOptions} />
        </S.ChartArea>
      </S.Card>
    </S.SectionWrapper>
  );
};
