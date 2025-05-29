import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 40px 48px;
  width: 480px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${color.textSecondary};
  margin-bottom: 32px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;

  label {
    font-size: 14px;
    color: ${color.textPrimary};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
