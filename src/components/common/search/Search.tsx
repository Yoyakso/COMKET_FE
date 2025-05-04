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
  state?: SearchState
  className?: string
}

export const Search = ({
  variant,
  size,
  value,
  onChange,
  onClear,
  disabled = false,
  state,
  className,
}: SearchProps) => {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const computedState: SearchState = useMemo(
    () =>
      state
        ? state : disabled
        ? 'disable': value && focused
        ? 'typing' : value && !focused
        ? 'activated' : focused
        ? 'focus' : hovered
        ? 'hover' : 'enable',
    [state, value, focused, hovered, disabled]
  )

  const isClearVisible = ['typing', 'activated'].includes(computedState) && value
  const isDisabled = computedState === 'disable' || computedState === 'activated-disabled'

  return (
    <S.Container
      variant={variant}
      size={size}
      state={computedState}
      className={className}
    >
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
          disabled={isDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* ✅ 항상 자리는 차지하고, 조건부로 보여주기 */}
        <S.IconWrapper
          size={size}
          onClick={onClear}
          aria-label="clear"
          style={{ visibility: isClearVisible ? 'visible' : 'hidden' }}
        >
          <ClearIcon />
        </S.IconWrapper>

        <S.IconWrapper size={size} aria-hidden>
          <SearchIcon />
        </S.IconWrapper>
      </S.TextBox>
    </S.Container>
  )
}
