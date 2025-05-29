import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  height: 813px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 40px 32px 32px 32px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${color.textPrimary};
  margin-bottom: 32px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  width: 100%;
`;

export const FormRow = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textPrimary};
  width: 120px;
`;

export const Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 15px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  color: ${color.textPrimary};

  &::placeholder {
    color: ${color.textTertiary};
  }

  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }
`;

export const EmailRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  flex: 1;
`;

export const EmailInput = styled(Input)`
  flex: 1;
`;

export const VerificationButton = styled.button`
  flex-shrink: 0;
  height: 48px;
  width: 120px;
  padding: 0 16px;
  background-color: #eff6ff;
  color: ${color.textPrimary};
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: ${color.primaryDisabled};
    color: ${color.textTertiary};
  }
`;

export const CheckboxContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:first-child {
    margin-bottom: 16px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${color.textPrimary};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`;

export const TermRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const TermLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${color.textPrimary};
  cursor: pointer;
`;

export const TermLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${color.lightBlue500};
  text-decoration: none;
  cursor: pointer;
  text-decoration: underline;
`;

export const SignupButton = styled.button`
  width: 100%;
  height: 56px;
  color: #6b7280;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 32px;
  background-color: ${color.teal500};
  color: ${color.white};

  &:disabled {
    background-color: ${color.primaryDisabled};
    cursor: none;
  }
`;

export const ErrorMessage = styled.div<{ show: boolean }>`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 136px;
  max-height: ${props => (props.show ? '50px' : '0')};
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translateY(${props => (props.show ? '0' : '-8px')});
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  padding-top: ${props => (props.show ? '0' : '0')};
`;
