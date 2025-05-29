import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const HoverList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  padding: 8px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  white-space: nowrap;
`;

export const HoverItem = styled.div`
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0;
  }
`;
