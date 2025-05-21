import styled, { css } from 'styled-components';
import type { DropdownSize, DropdownVariant } from './Dropdown';
import { color } from '@/styles/color';

const sizeStyles = {
  sm: css`
    height: 40px;
    font-size: 12px;
    padding: 0 10px;
  `,
  md: css`
    height: 48px;
    font-size: 14px;
    padding: 0 12px;
  `,
};

const containerVariants = {
  none: css`
    background-color: ${color.white};
    border: 1px solid ${color.textPlaceholder24};
    &:hover {
      border-color: ${color.basic1000};
    }
  `,
  activated: css`
    background-color: ${color.white};
    border: 1px solid ${color.textPlaceholder24};
    &:hover {
      border-color: ${color.basic1000};
    }
  `,
  'activated-chip': css`
    background-color: ${color.white};
    border: 1px solid ${color.textPlaceholder24};
    &:hover {
      border-color: ${color.basic1000};
    }
  `,
  'activated-disabled': css`
    background-color: ${color.textPlaceholder16};
    border: 1px solid transparent;
    cursor: not-allowed;
  `,
  disabled: css`
    background-color: ${color.textPlaceholder16};
    border: 1px solid transparent;
    cursor: not-allowed;
  `,
  error: css`
    background-color: ${color.white};
    border: 1px solid ${color.error};
  `,
};

const textColors = {
  none: color.textTertiary,
  activated: color.textPrimary,
  'activated-chip': color.textPrimary,
  'activated-disabled': color.textPrimary,
  error: color.textPrimary,
  disabled: color.textTertiary,
};

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Container = styled.div<{
  $size: DropdownSize;
  $variant: DropdownVariant;
}>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => containerVariants[$variant]}
  cursor: ${({ $variant }) =>
    $variant === 'disabled' || $variant === 'activated-disabled' ? 'not-allowed' : 'pointer'};
`;

export const TextBox = styled.div<{
  $size: DropdownSize;
  $variant: DropdownVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-left: 2px;
  color: ${({ $variant }) => textColors[$variant]};
  ${({ $size }) => sizeStyles[$size]}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 26px;
`;

export const IconLeft = styled.span<{
  $size: DropdownSize;
  $variant: DropdownVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  width: ${({ $size }) => ($size === 'sm' ? '20px' : '24px')};
  height: ${({ $size }) => ($size === 'sm' ? '20px' : '24px')};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const IconRight = styled.span<{
  $size: DropdownSize;
  $variant: DropdownVariant;
}>`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  pointer-events: none;
  width: ${({ $size }) => ($size === 'sm' ? '16px' : '18px')};
  height: ${({ $size }) => ($size === 'sm' ? '16px' : '18px')};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const OptionList = styled.ul<{ $size: DropdownSize }>`
  position: absolute;
  top: calc(100% + 4px);
  width: 100%;
  padding: 6px;
  margin: 0;
  border: 1px solid ${color.textPlaceholder24};
  border-radius: 4px;
  background-color: ${color.white};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color.textPlaceholder16};
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;

    &:hover {
      background-color: ${color.textPlaceholder24};
    }
  }

  scrollbar-width: thin;
  scrollbar-color: ${color.textPlaceholder16} transparent;
`;

export const OptionItem = styled.li<{
  $size: DropdownSize;
  selected?: boolean;
}>`
  ${({ $size }) => sizeStyles[$size]};
  padding: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? color.basic100 : color.white)};
  border-radius: 4px;

  &:hover {
    background-color: ${color.basic100};
  }
`;

export const OptionItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const IconCircle = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

export const GroupLabel = styled.div`
  width: 100%;
  padding: 12px 12px 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${color.textLabel};
  background-color: ${color.textPlaceholder08};
`;

export const GroupBlock = styled.div`
  width: 100%;
  padding-bottom: 8px;
`;

export const ChipContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
`;
