import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #666;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;
