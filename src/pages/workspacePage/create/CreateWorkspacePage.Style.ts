import { color } from '@/styles/color';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 720px;
    padding: 40px 32px 32px 32px;
    margin: 300px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    border-radius: 8px;
    border: 0.2px solid ${color.textPlaceholder24};
    background: color.white;
    box-shadow: 0px 4px 8px 0px rgba(219, 221, 233, 0.50);
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: 40px; 
  align-items: center;
  margin-bottom: 24px;
`;

export const StepTextWrapper = styled.div`
    display: flex;
    justify-content: right;
    gap: 3px
`;

export const Title = styled.h2`
   position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 600;
`;

export const StepTextHighlight = styled.span`
    display: flex;
    justify-content: right;    
    font-size: 14px;
    color: ${color.teal500};

`;

export const StepText = styled.span`
    display: flex;
    justify-content: right;
    font-size: 14px;
    color: ${color.textTertiary};
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px
`;

export const InputWrapper = styled.div`
  width: 420px;
    display: flex;
    flex-direction: row;
`;
  
export const DomainText = styled.span`
    color: ${color.textTertiary};
    font-size: 16px;
    display:flex;
    align-items: center;
    padding: 0px 0px 21px 0px;


`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    width: 116px;
    height: 48px;
    font-size: 14px;
    font-weight: 500;

`;

export const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 16px;
`;
