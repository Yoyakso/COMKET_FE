import styled from 'styled-components';
import { color } from '@/styles/color';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9998;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 880px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.textPlaceholder24};
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  text-align: left;
  border-bottom: 1px solid ${color.textPlaceholder24};
  padding-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${color.textPrimary};
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  margin-top: 4px;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
`;

export const PlanSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid ${color.textPlaceholder24};
  padding-right: 24px;
`;

export const PlanName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${color.textPrimary};
`;

export const PlanDescription = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
`;

export const PriceBox = styled.div`
  background-color: ${color.white};
  border: 1px solid ${color.textPlaceholder24};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PriceLabel = styled.span`
  font-size: 14px;
  color: ${color.textSecondary};
`;

export const PriceValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${color.teal600};
`;

export const PriceSub = styled.span`
  font-size: 12px;
  color: ${color.textPlaceholder};
`;

export const FeatureList = styled.ul`
  padding-left: 16px;
  font-size: 14px;
  color: ${color.textPrimary};
`;

export const FeatureItem = styled.li`
  margin-bottom: 4px;
`;

export const SummaryBox = styled.div`
  background-color: #f0fdf4;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${color.textSecondary};
`;

export const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  color: ${color.textPrimary};
`;

export const PaymentForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  input,
  select {
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${color.textPlaceholder24};
    font-size: 14px;
    color: ${color.textPrimary};
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

export const InfoText = styled.p`
  font-size: 12px;
  color: ${color.textPlaceholder};
  text-align: center;
  margin-top: 18px;
`;
