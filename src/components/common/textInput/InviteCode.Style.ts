import styled, { css } from 'styled-components'
import { color } from '@/styles/color'

export type InputState = 'enable' | 'activated' | 'error' | 'activated-disabled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputRowWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
`

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
`

const sizeStyles = {
  sm: css`
    width: 40px;
    height: 40px;
    font-size: 16px;
  `,
  md: css`
    width: 48px;
    height: 48px;
    font-size: 18px;
  `,
} as const

export const InputBox = styled.input<{ $state: InputState; $size: 'sm' | 'md' }>`
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  ${({ $size }) => sizeStyles[$size]}

  ${({ $state }) => {
    switch ($state) {
      case 'enable':
        return css`
          background-color: ${color.white};
          border: 1px solid ${color.textPlaceholder24};

          &:hover {
            border-color: ${color.teal500};
          }

          &:focus-visible {
            outline: none;
            border-color: ${color.teal500};
          }
        `
      case 'error':
        return css`
          background-color: ${color.white};
          border: 1px solid ${color.error};

          &:focus-visible {
            outline: none;
            border-color: ${color.error};
          }
        `
      case 'activated-disabled':
        return css`
          background-color: ${color.primaryDisabled};
          border: 1px solid ${color.textPlaceholder24};
        `
    }
  }}
`

export const HelperText = styled.p<{ $isError: boolean }>`
  font-size: 12px;
  min-height: 16px;
  margin-top: 4px;
  color: ${({ $isError }) => ($isError ? color.error : color.textSecondary)};
  transition: color 0.2s ease;

`
