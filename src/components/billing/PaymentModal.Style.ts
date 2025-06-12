import styled from 'styled-components';
import { color } from '@/styles/color';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${color.textPrimary};
`;

export const IconWrapper = styled.div`
  margin-bottom: 24px;
`;

export const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 9999px;
  background: ${color.teal100};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${color.textPrimary};
  margin-bottom: 12px;
`;

export const SubText = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  text-align: center;
  line-height: 1.5;
  margin-bottom: 28px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;
