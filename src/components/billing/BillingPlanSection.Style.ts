import styled from 'styled-components';
import PlanIconSvg from '@/assets/icons/PlanIcon.svg?react';
import { color } from '@/styles/color';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: 32px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 720px;
  min-height: 600px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 12px;
    max-width: 100%;
  }
`;

export const CardHeader = styled.div`
  padding: 32px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  font-size: 18px;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  font-size: 13px;
  color: #666;
`;

export const CardContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  gap: 12px;

  ul {
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
`;

export const FeatureItem = styled.li`
  font-size: 14px;
  color: #444;
  margin-left: 16px;
  list-style: disc;
`;

export const LimitationItem = styled.li`
  font-size: 14px;
  color: #b91c1c;
  margin-left: 16px;
  list-style: disc;
`;

export const CardFooter = styled.div`
  padding: 24px 32px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UpgradeNotice = styled.p`
  font-size: 13px;
  color: ${color.textPlaceholder};
  padding: 10px 12px;
  margin-bottom: 4px;
`;
