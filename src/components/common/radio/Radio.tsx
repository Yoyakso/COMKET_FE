import * as S from './Radio.Style'

export interface RadioProps {
  label: string
  checked: boolean
  disabled?: boolean
  color: 'black' | 'teal'
  onChange: () => void
}

export const Radio = ({
  label,
  checked,
  disabled = false,
  color,
  onChange,
}: RadioProps) => {
  const handleClick = () => {
    if (!disabled) onChange()
  }

  return (
    <S.Container>
      <S.RadioButton
        color={color}
        checked={checked}
        disabled={disabled}
        onClick={handleClick}
        aria-checked={checked}
        role="radio"
        tabIndex={0}
      >
        <S.InnerDot isChecked ={checked} color={color} />
      </S.RadioButton>
      <S.Label disabled={disabled}>{label}</S.Label>
    </S.Container>
  )
}
