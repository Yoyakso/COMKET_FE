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
  defaultValue?: string
  onSearch?: (value: string) => void
  placeholder?: string

  // ✅ 외부 상태 제어용 props
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
}

export const Search = ({
  variant,
  size,
  defaultValue = '',
  onSearch,
  disabled = false,
  state,
  className,
  placeholder,
  value,
  onChange,
  onClear,
}: SearchProps) => {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = value !== undefined
  const inputValue = isControlled ? value : internalValue

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (isControlled) {
      onChange?.(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleClear = () => {
    if (isControlled) {
      onClear?.()
    } else {
      setInternalValue('')
    }
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
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />

        <S.IconWrapper
          size={size}
          onClick={handleClear}
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
