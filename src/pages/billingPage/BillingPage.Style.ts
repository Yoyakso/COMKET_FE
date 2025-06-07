import styled from 'styled-components';
import { color } from '@styles/color';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const GNBContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  padding-top: 72px;
`;

export const LNBContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 72px;
  left: 0;
  height: calc(100vh - 72px);
  z-index: 90;
  background-color: ${color.white};
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: 45px 48px;
  box-sizing: border-box;
  height: calc(100vh - 72px);
  overflow-y: auto;
  background-color: ${color.white};
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${color.textPrimary};
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textSecondary};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;
