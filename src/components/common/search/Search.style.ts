import styled, { css } from 'styled-components'
import { color } from '@/styles/color'

export const Container = styled.div<{
  variant: string
  size: string
  $state: string
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${({ $state }) =>
    $state === 'disable' || $state === 'activated-disabled' ? 0.5 : 1};
`

const sizeStyles: Record<string, ReturnType<typeof css>> = {
  sm: css`
    height: 40px;
    font-size: 14px;
    line-height: 1;
  `,
  md: css`
    height: 48px;
    font-size: 16px;
    line-height: 1;
  `,
  lg: css`
    height: 56px;
    font-size: 18px;
    line-height: 1;
  `,
}

export const TextBox = styled.div<{
  variant: string
  size: string
  $state: string
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  padding: 0 12px;
  gap: 4px;
  overflow: hidden;

  ${({ size }) => sizeStyles[size]}

  ${({ variant, $state }) => {
    const isDisabled = $state === 'disable' || $state === 'activated-disabled'
    const isFocus = $state === 'focused'
    const isTyping = $state === 'typing'
    const isHover = $state === 'hover'
    const isActivated = $state === 'activated'

    const baseColor = isDisabled
      ? color.textPlaceholder32
      : variant === 'filled'
      ? color.textPlaceholder16
      : color.white

    const borderColor = isDisabled
      ? 'none'
      : variant === 'outlined'
      ? `1px solid ${
          isHover || isFocus || isTyping
            ? color.basic1000
            : color.textPlaceholder24
        }`
      : 'none'

    const textColor = isDisabled
      ? color.textSecondary
      : isTyping || isActivated
      ? color.textPrimary
      : color.textPlaceholder70

    return `
      background-color: ${baseColor};
      border: ${borderColor};
      color: ${textColor};
    `
  }}
`

export const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  line-height: 1;
`

export const IconWrapper = styled.button<{
  size: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  svg {
    display: block;
    width: ${({ size }) => (size === 'sm' ? '14px' : size === 'md' ? '18px' : '22px')};
    height: ${({ size }) => (size === 'sm' ? '14px' : size === 'md' ? '18px' : '22px')};
  }
`
