import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 720px;
  background-color: white;
  border-radius: 8px;
  border: 0.2px solid ${color.textPlaceholder24};
  padding: 40px 32px;
  box-shadow: 0px 4px 16px 16px rgba(219, 221, 233, 0.16);
`;

export const LogoWrapper = styled.div`
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

export const Description = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${color.textSecondary};
  margin-bottom: 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 32px;

  label {
    font-size: 14px;
    color: ${color.textPrimary};
  }
`;

export const Label = styled.div`
  display: flex;
  width: 116px;
  height: 48px;
  align-items: center;
`;
export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;
