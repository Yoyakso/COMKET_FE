import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 320px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  z-index: 1000;
  overflow: hidden;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f0f4f8;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f1f1f1;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  flex: 1;
  font-weight: 400;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
