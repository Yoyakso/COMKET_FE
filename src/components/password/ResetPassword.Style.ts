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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-right: 16px;
  label {
    font-size: 14px;
    color: ${color.textPrimary};
  }
`;

export const Label = styled.div`
  display: flex;
  width: 150px;
  height: 48px;
  align-items: center;
  margin-right: 40px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

export const CodeInputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: 8px;
  padding-left: 3px;
`;

export const CodeInput = styled.input<{ $error?: boolean }>`
  width: 48px;
  height: 56px;
  font-size: 20px;
  text-align: center;
  border: 1px solid ${({ $error }) => ($error ? '#FF5B56' : color.textPlaceholder)};
  border-radius: 8px;
  outline: none;
  background-color: ${color.white};

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(0, 160, 173, 0.2);
  }
`;

export const HelperText = styled.p<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ $error }) => ($error ? '#FF5B56' : color.textSecondary)};
  margin-top: 6px;
  text-align: center;
`;
