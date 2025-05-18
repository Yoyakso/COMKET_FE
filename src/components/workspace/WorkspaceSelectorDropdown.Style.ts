import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

export const Dropdown = styled.div`
  min-width: 232px;
  background: #ffffff;
  border: 1px solid ${color.basic100};
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 8px 0;
  position: absolute;
  z-index: 9999;
`;

export const Item = styled.div`
  width: 100%;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.12s;
  &:hover {
    background: ${color.basic100};
  }
`;

export const SubWrapper = styled.div`
  position: relative;
`;

export const SubDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 4px;
  min-width: 208px;
  background: #ffffff;
  border: 1px solid ${color.basic100};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  z-index: 10000;
  padding: 8px 0;
`;

export const Divider = styled.hr`
  margin: 6px 0;
  height: 1px;
  background: ${color.basic100};
  border: none;
`;

interface Active {
  $active?: boolean;
}

export const SubItem = styled(Item)<Active>`
  gap: 12px;
  ${({ $active }) =>
    $active &&
    css`
      font-weight: 600;
      background: ${color.teal100}50;
      color: ${color.textPrimary};
    `}
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 6px;
`;

export const Placeholder = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: ${color.basic100};
`;
