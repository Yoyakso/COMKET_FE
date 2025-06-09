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
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.textPlaceholder24};
  padding: 40px 32px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: ${color.textPrimary};
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${color.textPlaceholder08};
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  color: ${color.textPrimary};
  margin-bottom: 32px;
`;

export const PlanList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
`;

export const PlanCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  border: ${({ $selected }) => ($selected ? `2px solid ${color.teal500}` : `1px solid #e2e8f0`)};
  border-radius: 16px;
  padding: 20px 16px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 460px;
`;

export const Badge = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${color.teal500};
  color: white;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

export const PlanHeader = styled.div`
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.4;
`;

export const PlanName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${color.textPrimary};
  margin-bottom: 4px;
`;

export const PlanInfo = styled.p`
  font-size: 13px;
  color: ${color.textSecondary};
`;

export const PlanPrice = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: ${color.textPrimary};
  margin: 8px 0;
`;

export const Section = styled.div`
  margin-top: 10px;
`;

export const SectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-bottom: 6px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${color.textPrimary};
  margin-bottom: 4px;
`;

export const CheckIcon = styled.span`
  color: ${color.teal500};
  font-weight: bold;
`;

export const XIcon = styled.span`
  color: #ef4444;
  font-weight: bold;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
