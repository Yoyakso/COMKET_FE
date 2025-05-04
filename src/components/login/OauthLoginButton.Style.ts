import styled from 'styled-components';
import { color } from '@/styles/color';

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 416px;
  heiht: 40px;
  padding: 9px 12px;
  border-radius: 4px;
  border: 1px solid #E7EAF1;
  cursor: pointer;
  background-color: white;
  gap: 10px;

  &:hover {
    background-color: #F2F2F2;
  }
`
export const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textPrimary};
  line-height: 22px;
  white-space: nowrap;
  cursor: pointer;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
