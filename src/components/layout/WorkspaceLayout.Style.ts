import { color } from '@/styles/color';
import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${color.basic0}; 
`;

export const ContentWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`;