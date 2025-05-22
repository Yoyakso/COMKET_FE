import styled from 'styled-components';
import { color } from '@/styles/color';
import { motion } from 'framer-motion';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MotionCard = styled(motion.div)`
  display: flex;
  width: 480px;
  background-color: ${color.white};
  border-radius: 8px;
  border: 0.2px solid ${color.textPlaceholder24};
  padding: 40px 32px 32px 32px;
  flex-direction: column;
  box-shadow: 0px 4px 8px 0px rgba(219, 221, 233, 0.5);
  gap: 20px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const Description = styled.div`
  background-color: ${color.textPlaceholder08};
  color: ${color.textPrimary};
  padding: 16px 0px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

export const DividerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${color.textTertiary};
  font-size: 12px;
`;

export const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: ${color.basic200};
`;

export const DividerText = styled.span`
  white-space: nowrap;
`;

export const WorkspaceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  gap: 10px;
`;

export const WorkspaceOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const WorkspaceIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${color.textPlaceholder24};
`;

export const WorkspaceName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textPrimary};
`;

export const SelectDropdown = styled.span`
  font-size: 14px;
  color: ${color.textTertiary};
`;
