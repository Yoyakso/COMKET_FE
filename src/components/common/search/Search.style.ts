import styled, { css } from 'styled-components'
import { color } from '@/styles/color'

export const Container = styled.div<{
  variant: string
  size: string
  state: string
}>`
  display: flex;
  flex-direction: column;
  width: 200px;
  opacity: ${({ state }) =>
    state === 'disable' || state === 'activated-disabled' ? 0.5 : 1};
`

const sizeStyles: Record<string, string> = {
  sm: `height: 40px; font-size: 14px;`,
  md: `height: 48px; font-size: 16px;`,
  lg: `height: 56px; font-size: 18px;`,
}

export const TextBox = styled.div<{
  variant: string
  size: string
  state: string
}>`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 3px;
    width: 100%;
    padding: 0 12px;
    gap: 4px;

  ${({ size }) => sizeStyles[size]}

  ${({ variant, state }) => {
    const isDisabled = state === 'disable' || state === 'activated-disabled'
    const isFocus = state === 'focus'
    const isTyping = state === 'typing'
    const isHover = state === 'hover'
    const isActivated = state === 'activated'

    if (variant === 'outlined') {
      return `
        background-color: ${isDisabled ? color.textPlaceholder32 : color.white};
    ${isDisabled 
    ? 'border: none;'  
    :`border: 1px solid ${
           isHover || isFocus || isTyping? color.basic1000  
          : color.textPlaceholder24
        };`}
    color: ${isDisabled ? color.textSecondary
            : isTyping || isActivated ? color.textPrimary
            : color.textPlaceholder70
            };`
    }

    if (variant === 'filled') {
      return `
        background-color: ${isDisabled ? color.textPlaceholder32 : color.  textPlaceholder16};
        border: none;
        color: ${isDisabled ? color.textSecondary
            : isTyping || isActivated ? color.textPrimary
            : color.textPlaceholder70
            };`
    }

    return ''
  }}
`

export const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;

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
   svg {
    width: ${({ size }) => (size === 's' ? '14px' : size === 'm' ? '18px' : '22px')};
    height: ${({ size }) => (size === 's' ? '14px' : size === 'm' ? '18px' : '22px')};
  }
`
