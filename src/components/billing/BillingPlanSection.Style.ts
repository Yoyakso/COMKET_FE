import styled from 'styled-components';
import PlanIconSvg from '@/assets/icons/PlanIcon.svg?react';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 24px 24px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PlanIcon = styled(PlanIconSvg)`
  width: 28px;
  height: 28px;
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

export const CardContent = styled.div`
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PriceLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

export const PriceValue = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 12px 0;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FeatureTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
`;

export const FeatureItem = styled.li`
  font-size: 14px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: #10b981;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

export const CardFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #f3f4f6;
`;
