import { color } from '@/styles/color';
import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const Sidebar = styled.div`
  height: 100%;
  overflow-y: auto;

`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;    // 세로 방향 정렬 (column 기준)
  align-items: flex-start;        // 가로 정렬
  padding: 32px 48px;
  flex-direction: column;         // 콘텐츠가 세로로 쌓인다면 필수
`;