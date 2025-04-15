import styled, { css } from 'styled-components'
import type { DropdownSize, DropdownVariant } from './Dropdown'
import {color}  from '../../../styles/color' 
// Props 타입 정의
type ContainerProps = {
  size: DropdownSize
  variant: DropdownVariant
  isOpen: boolean
}

type IconProps = {
  size: DropdownSize
  variant: DropdownVariant
}

type SelectedProps = {
  size: DropdownSize
  variant: DropdownVariant
}

type OptionItemProps = {
  size: DropdownSize
  selected?: boolean
}

// size별 공통 스타일
const sizeStyles = {
  sm: css`
    height: 40px;
    padding: 0 10px;
    align-items: center;
  `,
  md: css`
    height: 48px;
    padding: 0 12px;
    align-items: center;
  `,
  lg: css`
    height: 56px;
    padding: 0 14px;
    align-items: center;
  `,
}

// 상태별 variant 스타일 (테두리, 배경 등)
const containerVariantStyles = {
  activated: css`
    background-color: ${color.white};
    border: 1px solid ${color.textPlaceholder24};
    border-radius: 3px;
    &:hover {
      border-color: ${color.basic1000};
    }
  `,
  invalid: css`
    background-color: ${color.white};
    border: 1px solid ${color.error};
    border-radius: 3px;
  `,
  disabled: css`
    background-color: ${color.textPlaceholder32};
    border-radius: 3px;
    opacity: 0.5;
  `,
  none: css`
    background-color: ${color.white};
    border: 1px solid ${color.textPlaceholder24};
    border-radius: 3px;
  `,
}

// 텍스트 색상만 분리 정의
const textVariantColor = {
  activated: css`color: ${color.textPrimary};`,
  invalid: css`color: ${color.textPlaceholder};`,
  disabled: css`color: ${color.textTertiary};`,
  none: css`color: ${color.textTertiary};`,
}

// 전체 드롭다운 박스 너비
export const Wrapper = styled.div`
  position: relative;
  width: 200px;
`

// 드롭다운 본체
export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  ${({ size }) => sizeStyles[size]}
  ${({ variant }) => containerVariantStyles[variant]}
`
//텍스트 박스
export const TextBox = styled.div<SelectedProps>`
  flex: 1;
  display: flex;
  align-items: center;

  ${({ size }) => {
    switch (size) {
      case 'sm': return css`padding-left: 36px; font-size: 12px;`;
      case 'md': return css`padding-left: 40px; font-size: 14px;`;
      case 'lg': return css`padding-left: 44px; font-size: 16px;`;
    }
  }}

  ${({ variant }) => textVariantColor[variant]}

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`


// 왼쪽 아이콘
export const IconLeft = styled.span<IconProps>`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;

  ${({ size }) => {
    switch (size) {
      case 'sm': return css`width: 24px; height: 24px;`;
      case 'md': return css`width: 28px; height: 28px;`;
      case 'lg': return css`width: 32px; height: 32px;`;
    }
  }}

  ${({ variant }) => variant === 'disabled' && css`
     color: ${color.textPlaceholder32};
      svg {
        fill: currentColor;
      }
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`

// 오른쪽 아이콘
export const IconRight = styled.span<IconProps>`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  pointer-events: none;

  ${({ size }) => {
    switch (size) {
      case 'sm': return css`width: 16px; height: 16px;`;
      case 'md': return css`width: 18px; height: 18px;`;
      case 'lg': return css`width: 20px; height: 20px;`;
    }
  }}

  ${({ variant }) => variant === 'disabled' && css`
    filter: grayscale(100%);
    opacity: 0.4;
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`

// 옵션 리스트 박스
export const OptionList = styled.ul<{ size: DropdownSize }>`
  position: absolute;
  top: calc(100% + 2px);
  
  width: 100%;
  margin: 0;
  padding: 6px;
  border: 1px solid ${color.textPlaceholder};
  border-radius: 4px;
  background-color: ${color.white};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  z-index: 10;
`

// 개별 옵션 항목
export const OptionItem = styled.li<OptionItemProps>`
  ${({ size }) => sizeStyles[size]}
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ selected}) =>
    selected ? color.basic100 : color.white};

  padding:0 12px;
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '40px';
      case 'md': return '48px';
      case 'lg': return '56px';
    }
  }};

  &:hover {
    background-color: ${color.basic100};
    border-radius: 3px;

  }
`
