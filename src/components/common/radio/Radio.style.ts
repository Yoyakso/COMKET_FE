import styled, { css } from 'styled-components'
import { color } from '@/styles/color'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

export const RadioButton = styled.button<{
  checked: boolean
  disabled: boolean
  color: 'black' | 'teal'
}>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid;
  padding: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${({ checked, color: c }) => {
    const borderColor = checked
      ? color[c === 'teal' ? 'teal500' : 'black']
      : color.basic300
    return css`
      border-color: ${borderColor};
    `
  }}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${color.basic100};
      border-color: ${color.basic200};
      cursor: not-allowed;
    `}

  &:hover {
    border-color: ${({ color: c, checked }) =>
      checked ? color[c === 'teal' ? 'teal500' : 'black'] : color.basic500};
  }
`

export const InnerDot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isChecked', 'color'].includes(prop),
})<{
  isChecked: boolean
  color: 'black' | 'teal'
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color: c }) => color[c === 'teal' ? 'teal500' : 'black']};
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
  transition: opacity 0.2s ease;
`

export const Label = styled.span<{
  disabled: boolean
}>`
  font-size: 14px;
  color: ${({ disabled }) =>
    disabled ? color.basic400 : color.basic900};
`
