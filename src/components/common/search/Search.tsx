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
  disabled?: boolean
  state?: SearchState
  className?: string
  defaultValue?: string // 내부 상태 초기값
  onSearch?: (value: string) => void // 검색 실행 콜백
}

export const Search = ({
  variant,
  size,
  defaultValue = '',
  onSearch,
  disabled = false,
  state,
  className,
}: SearchProps) => {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)

  const computedState: SearchState = useMemo(
    () =>
      state
        ? state
        : disabled
        ? 'disable'
        : inputValue && focused
        ? 'typing'
        : inputValue && !focused
        ? 'activated'
        : focused
        ? 'focus'
        : hovered
        ? 'hover'
        : 'enable',
    [state, inputValue, focused, hovered, disabled]
  )

  const isClearVisible = ['typing', 'activated'].includes(computedState) && inputValue
  const isDisabled = computedState === 'disable' || computedState === 'activated-disabled'

  const handleSearch = () => {
    if (onSearch) onSearch(inputValue)
  }

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력하세요"
          disabled={isDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />

        <S.IconWrapper
          size={size}
          onClick={() => setInputValue('')}
          aria-label="clear"
          style={{ visibility: isClearVisible ? 'visible' : 'hidden' }}
        >
          <ClearIcon />
        </S.IconWrapper>

        <S.IconWrapper
          size={size}
          onClick={handleSearch}
          aria-label="search"
        >
          <SearchIcon />
        </S.IconWrapper>
      </S.TextBox>
    </S.Container>
  )
}
