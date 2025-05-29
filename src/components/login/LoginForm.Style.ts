import styled from 'styled-components';
import { color } from '@/styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 524px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 40px 32px 32px 32px;
`;

export const FormWrapper = styled.div`
  width: 416px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${color.textPrimary};
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const FormRow = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const RememberSignupRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FindPasswordLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${color.textSecondary};
  text-decoration: underline;

  &:hover {
    color: #4b5563;
  }
`;

export const SignupLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${color.textSecondary};
  text-decoration: underline;

  &:hover {
    color: #4b5563;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${color.teal500};
  color: white;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Divider = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5e7eb;
  }
`;

export const DividerText = styled.span`
  position: relative;
  display: inline-block;
  background-color: white;
  color: ${color.textTertiary};
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);
`;
