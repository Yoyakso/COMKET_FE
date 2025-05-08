import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  padding: 40px 32px 32px;
  gap: 32px;
  background: ${color.white};
  border: 1px solid ${color.textPlaceholder24};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(219, 221, 233, 0.5);
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: 27px;
  letter-spacing: -0.036px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const Label = styled.label`
  width: 116px;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  line-height: 48px;
`;

export const CustomInput = styled.input`
  width: 520px;
  height: 48px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid ${color.textPlaceholder24};
  border-radius: 4px;
  outline: none;
  color: ${color.textPrimary};

  &::placeholder {
    color: ${color.textPlaceholder70};
  }
`;

export const URLInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CustomInputBox = styled.div<{ $isError: boolean }>`
  display: flex;
  height: 48px;
  width: 520px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ $isError }) => ($isError ? color.error : color.textPlaceholder24)};
`;

export const Prefix = styled.div`
  display: flex;
  align-items: center;
  width: 163px;
  padding: 8px 16px;
  font-size: 14px;
  background: ${color.textPlaceholder08};
  color: ${color.textPlaceholder70};
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 0 12px;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${color.textPrimary};

  &::placeholder {
    color: ${color.textPlaceholder70};
  }
`;

export const HelperText = styled.span<{ $isError: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $isError }) => ($isError ? color.error : color.textTertiary)};
  white-space: pre-wrap;
  line-height: 22px;
  letter-spacing: -0.028px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
