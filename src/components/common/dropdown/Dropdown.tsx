import { useState, useRef, useEffect } from 'react'
import * as S from './Dropdown.style'

import ChevronDown from '@/assets/icons/ChevronDown.svg?react'
import ChevronUp from '@/assets/icons/ChevronUp.svg?react'
import DropdownIcon from '@/assets/icons/DropdownIcon.svg?react'

export type DropdownOption = {
  label: string
  value: string
}

export type DropdownSize = 'sm' | 'md' | 'lg'

export type DropdownVariant = 'activated' | 'invalid' | 'disabled' | 'none'

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange: (value: string) => void
  placeholder: string
  size: DropdownSize
  variant: DropdownVariant
  iconLeft?: boolean
}
export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder,
  size,
  variant,
  iconLeft,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDisabled = variant === 'disabled'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? placeholder

  return (
    <S.Wrapper ref={containerRef}>
      <S.Container
        size={size}
        variant={variant}
        isOpen={isOpen}
        onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
      >
        {iconLeft && (
          <S.IconLeft size={size} variant={variant}>
            <DropdownIcon />
          </S.IconLeft>
        )}
        <S.TextBox size={size} variant={variant}>
          {selectedLabel}
        </S.TextBox>
        <S.IconRight size={size} variant={variant}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </S.IconRight>
      </S.Container>

      {isOpen && (
        <S.OptionList size={size}>
          {options.map((opt) => (
            <S.OptionItem
              key={opt.value}
              size={size}
              selected={opt.value === value}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
            >
              {opt.label}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Wrapper>
  )
}
