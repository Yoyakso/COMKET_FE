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

  width: 600px;
  background-color: white;
  border-radius: 8px;
  border: 0.2px solid ${color.textPlaceholder24};
  padding: 40px 32px;
  box-shadow: 0px 4px 16px 16px rgba(219, 221, 233, 0.16);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

export const Description = styled.div`
  display: flex;
  padding: 24px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 5px;
  background-color: ${color.textPlaceholder08};
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  color: ${color.textPrimary};
  margin-bottom: 40px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;
