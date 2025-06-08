import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: 32px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 720px;
  background-color: ${color.white};
  border-radius: 16px;
  border: 1px solid ${color.textPlaceholder24};
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

export const CardHeader = styled.header`
  padding: 32px;
  border-bottom: 1px solid ${color.textPlaceholder16};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlanIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    color: ${color.teal500};
  }
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${color.textPrimary};
`;

export const CardDescription = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${color.textSecondary};
`;

export const CardContent = styled.div`
  padding: 24px 32px;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceLabel = styled.span`
  font-size: 14px;
  color: ${color.textSecondary};
`;

export const PriceValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${color.textPrimary};
`;

export const PriceDetail = styled.span`
  font-size: 12px;
  color: ${color.textPlaceholder};
`;

export const CardFooter = styled.footer`
  padding: 24px 32px;
  border-top: 1px solid ${color.textPlaceholder16};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UpgradeNotice = styled.p`
  font-size: 12px;
  color: ${color.error};
  text-align: center;
`;

export const CardInfoBox = styled.div`
  margin-top: 24px;
  padding: 16px 20px;
  background-color: ${color.textPlaceholder08};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardInfoTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${color.textPrimary};
`;

export const CardInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  font-size: 13px;
  color: ${color.textSecondary};
`;

export const Value = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${color.textPrimary};
`;
