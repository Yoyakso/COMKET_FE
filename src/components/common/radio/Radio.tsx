import React from 'react'
import * as S from './Radio.style'

export type RadioVisualState =
  | 'checked'
  | 'unchecked'
  | 'active-checked'
  | 'active-unchecked'
  | 'disabled-checked'
  | 'disabled-unchecked'

export type RadioProps = {
  color: 'black' | 'teal'
  size: 'sm' | 'md'
  label?: string
  state: RadioVisualState
  onChange?: () => void
}

const resolveState = (state: RadioVisualState): {
  checked: boolean
  disabled: boolean
  interactionState: 'default' | 'active' | 'disabled'
} => {
  const checked =
    state === 'checked' ||
    state === 'active-checked' ||
    state === 'disabled-checked'
  const disabled = state.includes('disabled')
  const interactionState: 'default' | 'active' | 'disabled' = disabled
    ? 'disabled'
    : state.includes('active')
    ? 'active'
    : 'default'
  return { checked, disabled, interactionState }
}

export const Radio = ({
  color,
  size,
  state,
  label,
  onChange,
}: RadioProps) => {
  const { checked, disabled, interactionState } = resolveState(state)

  return (
    <S.Container>
      <S.RadioButton
        color={color}
        size={size}
        checked={checked}
        disabled={disabled}
        interactionState={interactionState}
        onClick={!disabled ? onChange : undefined}
        role="radio-button"
        data-testid={`radio-${label?.replace(' ', '').toLowerCase()}`}
      >
        <S.InnerDot
          visible={checked}
          color={color}
          interactionState={interactionState}
          disabled={disabled}
          checked={checked}
          data-testid="inner-dot"
        />
      </S.RadioButton>
      {label && (
        <S.Label disabled={disabled} size={size}>
          {label}
        </S.Label>
      )}
    </S.Container>
  )
}
