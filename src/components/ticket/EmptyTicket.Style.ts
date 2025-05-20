import styled from 'styled-components';
import { color } from '@styles/color';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  text-align: center;
`;

export const IconWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e8f5e9;
`;

export const TextContainer = styled.div`
  margin-bottom: 24px;
`;

export const Text = styled.p`
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
`;

export const CreateButton = styled.button`
  background-color: ${color.teal500};
  color: white;
  border: none;
  width: 107px;
  height: 40px;
  border-radius: 3px;
  padding: 9px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.teal600};
  }
`;
