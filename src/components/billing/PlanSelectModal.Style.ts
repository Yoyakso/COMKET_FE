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

export const PlanList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
`;

export const PlanCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  border: ${({ $selected }) =>
    $selected ? `2px solid ${color.teal500}` : `1px solid ${color.basic200}`};
  border-radius: 16px;
  padding: 24px 20px;
  background-color: ${color.white};
  box-shadow: ${({ $selected }) =>
    $selected ? '0 0 0 3px rgba(45, 212, 191, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.06)'};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${color.teal500};
  color: white;
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 999px;
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
  font-size: 22px;
  font-weight: 900;
  color: ${color.textPrimary};
  margin: 12px 0 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: ${color.textSecondary}; // 원하는 색상 변수로 교체
`;
