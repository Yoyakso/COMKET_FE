import styled, { keyframes } from 'styled-components';
import { color } from '@/styles/color';

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Card = styled.div`
  background-color: ${color.white};
  border: 1px solid ${color.textPlaceholder};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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

export const MainValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${color.textPrimary};
  margin-top: 8px;
`;

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

const shimmer = keyframes`
  0%   {opacity: .6;}
  50%  {opacity: 1;}
  100% {opacity: .6;}
`;

export const Skeleton = styled.div`
  width: 100%;
  height: 512px;
  border-radius: 12px;
  background: ${color.textPlaceholder08 ?? '#f5f5f7'};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;
