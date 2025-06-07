import styled from 'styled-components';
import { color } from '@/styles/color';

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px; // 조금 더 시각적으로 여유 있게
`;

export const Card = styled.div`
  background-color: ${color.white};
  border: 1px solid ${color.textPlaceholder};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); // 살짝 그림자 줘서 입체감
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 32px;
`;

export const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 15px;
  color: ${color.textPrimary};
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${color.textSecondary};
  margin-top: 4px;
`;
export const MainValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${color.textPrimary};
  margin-top: 8px;
`;

// export const BadgeGreen = styled.div`
//   display: inline-block;
//   background-color: #dcfce7;
//   color: #15803d;
//   font-size: 12px;
//   font-weight: 500;
//   padding: 4px 10px;
//   margin-top: 4px;
//   border-radius: 9999px;
// `;

// export const BadgePurple = styled.div`
//   display: inline-block;
//   background-color: #f3e8ff;
//   color: #9333ea;
//   font-size: 12px;
//   font-weight: 500;
//   padding: 4px 10px;
//   margin-top: 4px;
//   border-radius: 9999px;
// `;

export const ChartArea = styled.div`
  width: 100%;
  height: 240px;
  position: relative;
  padding-top: 8px;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;
