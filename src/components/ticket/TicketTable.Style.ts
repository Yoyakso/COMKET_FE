import styled from 'styled-components';
import { color } from '@/styles/color';

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  background-color: #ffffff;
  border-radius: 6px;
  border-top: 1px solid ${color.textPlaceholder24};
  border-bottom: 1px solid ${color.textPlaceholder24};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHeader = styled.thead`
  background-color: ${color.white};
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
`;

export const HeaderCell = styled.th<{ $width?: number; $align?: 'left' | 'center' }>`
  width: ${({ $width }) => ($width ? `${$width}px` : 'auto')};
  text-align: ${({ $align }) => $align ?? 'left'};
  min-width: 30px;
  max-width: 1000px;
  padding: 12px 8px;
  color: ${color.textLabel};
  font-weight: 500;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;

  &:hover {
    background-color: #f1f3f5;
  }
`;

export const TableBody = styled.tbody``;

export const HeaderContent = styled.div<{ $align?: 'left' | 'center' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

export const SortableHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  svg {
    transition: transform 0.2s ease;
  }
`;

export const Resizer = styled.div`
  position: absolute;
  right: -4px;
  top: 0;
  height: 100%;
  width: 12px;
  cursor: col-resize;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
