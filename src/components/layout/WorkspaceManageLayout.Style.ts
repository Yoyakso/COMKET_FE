import { color } from '@/styles/color';
import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const Sidebar = styled.div`
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 48px;
`;