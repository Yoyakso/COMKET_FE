import { useState, useMemo } from 'react'
import SearchIcon from '@/assets/icons/SearchIcon.svg?react'
import ClearIcon from '@/assets/icons/ClearIcon.svg?react'
import * as S from './Search.style'

export type SearchState =
  | 'enable'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'activated'
  | 'disable'
  | 'activated-disabled'

interface SearchProps {
  variant: 'filled' | 'outlined'
  size: 'sm' | 'md' | 'lg'
  value: string
  onChange: (v: string) => void
  onClear?: () => void
  disabled?: boolean
  state?: SearchState // ← 직접 넘기면 강제 적용 / 없으면 자동 추론
}

export const Search = ({
  variant,
  size,
  value,
  onChange,
  onClear,
  disabled = false,
  state,
}: SearchProps) => {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  // 상태 자동 추론
  const computedState: SearchState = useMemo(() => {
    if (state) return state
    if (disabled) return 'disable'
    if (value && !focused) return 'activated'
    if (value && focused) return 'typing'
    if (focused) return 'focus'
    if (hovered) return 'hover'
    return 'enable'
  }, [state, value, focused, hovered, disabled])

  return (
    <S.Container variant={variant} size={size} state={computedState}>
      <S.TextBox
        variant={variant}
        size={size}
        state={computedState}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <S.StyledInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="텍스트"
          disabled={computedState === 'disable' || computedState === 'activated-disabled'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {['typing', 'activated'].includes(computedState) && value && (
          <S.IconWrapper size={size} onClick={onClear}>
            <ClearIcon />
          </S.IconWrapper>
        )}

        <S.IconWrapper size={size}>
          <SearchIcon />
        </S.IconWrapper>
      </S.TextBox>
    </S.Container>
  )
}
