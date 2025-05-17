import styled from 'styled-components';
import { color } from '@/styles/color';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 330px;
  width: 560px;
  padding: 40px 32px 32px 32px;
  gap: 40px;
  flex-shrink: 0;
  background: ${color.white};
  border: 0.2px solid ${color.textPlaceholder24};
  border-radius: 8px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: ${color.textPrimary};
`;

export const Message = styled.p`
  display: flex;
  padding: 24px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background-color: ${color.textPlaceholder08};
  color: ${color.textPrimary};
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  border-radius: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center; // ← 가운데 정렬
  gap: 12px;
  width: 100%;
`;
