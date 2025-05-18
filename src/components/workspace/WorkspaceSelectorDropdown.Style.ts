// WorkspaceSelectorDropdown.Style.ts
import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

export const Dropdown = styled.div`
  min-width: 224px;
  background: #fff;
  border: 1px solid ${color.basic200};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 6px 0;
  position: absolute;
  z-index: 9999;
`;

export const Item = styled.div`
  width: 100%;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
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
  min-width: 200px;
  background: #fff;
  border: 1px solid ${color.basic200};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  z-index: 10000;
`;

export const Divider = styled.hr`
  margin: 4px 0;
  height: 1px;
  background: ${color.basic200};
  border: none;
`;

interface Active {
  $active?: boolean;
}

export const SubItem = styled(Item)<Active>`
  gap: 10px;
  ${({ $active }) =>
    $active &&
    css`
      font-weight: 600;
      background: ${color.basic100};
    `}
`;

export const Img = styled.img`
  width: 18px;
  height: 18px;
  object-fit: cover;
  border-radius: 4px;
`;

export const Placeholder = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${color.basic200};
`;
