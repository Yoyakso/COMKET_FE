// ✅ Radio.style.ts (최종 - state 기반 단일 프롭 구조 대응)
import styled, { css } from 'styled-components'
import { color } from '@/styles/color'

export const Container = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const sizeStyles = {
  s: css`
    width: 20px;
    height: 20px;
  `,
  m: css`
    width: 24px;
    height: 24px;
  `,
}

const getBorderColor = (
  colorKey: 'black' | 'teal',
  checked: boolean,
  interactionState: 'default' | 'active' | 'disabled',
) => {
  if (interactionState === 'disabled') return color.textPlaceholder24
  if (interactionState === 'active') {
    return checked
      ? colorKey === 'black'
        ? color.basic1000
        : color.teal500
      : colorKey === 'black'
      ? color.basic1000
      : color.teal500
  }
  if (checked) {
    return colorKey === 'black' ? color.basic1000 : color.teal500
  }
  return color.textPlaceholder24
}

const getDotColor = (
  colorKey: 'black' | 'teal',
  checked: boolean,
  interactionState: 'default' | 'active' | 'disabled',
) => {
  if (!checked) return 'transparent'
  if (interactionState === 'disabled') return color.textPlaceholder24
  return colorKey === 'black' ? color.basic1000 : color.teal500
}

export const RadioButton = styled.div<{
  color: 'black' | 'teal'
  size: 'sm' | 'md'
  checked: boolean
  interactionState: 'default' | 'active' | 'disabled'
  disabled: boolean
}>`
  ${({ size }) => sizeStyles[size]};
  border-radius: 50%;
  border: 1px solid
    ${({ color: c, checked, interactionState }) =>
      getBorderColor(c, checked, interactionState)};
    background-color: ${({ disabled }) =>
  disabled ? color.textPlaceholder16 : color.white};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

export const InnerDot = styled.div<{
  visible: boolean
  color: 'black' | 'teal'
  interactionState: 'default' | 'active' | 'disabled'
  disabled: boolean
  checked: boolean
}>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: ${({ visible, color: c, interactionState, checked }) =>
    getDotColor(c, checked, interactionState)};
  transition: background-color 0.2s ease;
`

export const Label = styled.span<{ disabled: boolean; size: 'sm' | 'md' }>`
  font-size: ${({ size }) => (size === 'sm' ? '12px' : '14px')};
  color: ${({ disabled }) =>
    disabled ? color.textPlaceholder : color.basic1000};
`
