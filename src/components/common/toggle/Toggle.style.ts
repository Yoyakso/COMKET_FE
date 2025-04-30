import styled, { css } from 'styled-components';
import { color } from '@styles/color';

const sizes = {
  sm: {
    width: 36,
    height: 20,
    circle: 16,
    padding: 2,
    translate: 16,
    fontSize: 14,
  },
  md: {
    width: 40,
    height: 24,
    circle: 20,
    padding: 2,
    translate: 16,
    fontSize: 16,
  },
};

type ToggleColor = 'teal' | 'black';

const getColor = (
  colorName: ToggleColor,
  checked: boolean,
  disabled: boolean
) => {
  if (disabled && !checked) return color.textPlaceholder32;
  if (checked) {
    return colorName === 'teal' ? color.teal500 : color.basic1000;
  }
  return color.basic200;
};

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleLabel = styled.span<{ size: 'sm' | 'md' }>`
  font-size: ${({ size }) => sizes[size].fontSize}px;
  color: ${color.basic1000};
`;

export const ToggleWrapper = styled.button<{
  $size: 'sm' | 'md';
  $color: ToggleColor;
  $checked: boolean;
  $disabled: boolean;
}>`
  ${({ $size, $color, $checked, $disabled }) => css`
    position: relative;
    width: ${sizes[$size].width}px;
    height: ${sizes[$size].height}px;
    border-radius: 9999px;
    background-color: ${getColor($color, $checked, $disabled)};
    padding: ${sizes[$size].padding}px;
    display: flex;
    align-items: center;
    cursor: ${$disabled ? 'not-allowed' : 'pointer'};
    outline: none;
    border: none;
    transition: background-color 0.2s ease;

    ${$disabled && $checked &&
      css`
        opacity: 0.5;
      `}

    &:hover::after,
    &:active::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: ${$checked ? color.white : 'transparent'};
      opacity: ${$checked ? 0.2 : 0};
      border-radius: 9999px;
      pointer-events: none;
    }
  `}
`;

export const ToggleCircle = styled.div<{
  $checked: boolean;
  $size: 'sm' | 'md';
}>`
  ${({ $checked, $size }) => css`
    width: ${sizes[$size].circle}px;
    height: ${sizes[$size].circle}px;
    border-radius: 50%;
    background-color: ${color.white};
    transform: translateX(${$checked ? `${sizes[$size].translate}px` : '0'});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  `}
`;
