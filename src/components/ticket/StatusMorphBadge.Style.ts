// StatusMorphBadge.Style.ts
import styled from 'styled-components';

const colorMap: Record<string, string> = {
  TODO: '#D9D9D9',
  IN_PROGRESS: '#FFE58F',
  DONE: '#B7EB8F',
  HOLD: '#FFCCC7',
  DROP: '#D3ADF7',
  BACKLOG: '#FFD8BF',
};

export const BadgeWrapper = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ $status }) => colorMap[$status]};
  border-radius: 999px;
  padding: 4px 10px;
  max-width: 32px;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.3s ease, padding 0.3s ease;
  cursor: default;

  .icon {
  padding: 3px 0px 0px 0px;
    flex-shrink: 0;
  }

  .text {
    opacity: 0;
    transition: opacity 0.3s ease;
    font-size: 12px;
    font-weight: 500;
    color: #333;
  }

  &:hover {
    max-width: 120px;
    padding: 4px 10px;

    .text {
      opacity: 1;
    }
  }
`;
