import { color } from '@/styles/color';
import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${color.basic0}; 
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;