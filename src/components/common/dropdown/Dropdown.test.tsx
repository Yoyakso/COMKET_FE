import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Dropdown } from './Dropdown'
import '@testing-library/jest-dom'

const mockOptions = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' },
]

describe('Dropdown 컴포넌트', () => {
  it('placeholder가 렌더링된다', () => {
    render(
      <Dropdown
        options={mockOptions}
        onChange={() => { }}
        placeholder="선택하세요"
      />
    )
    expect(screen.getByText('선택하세요')).toBeInTheDocument()
  })

  it('클릭하면 옵션 리스트가 나타난다', () => {
    render(
      <Dropdown
        options={mockOptions}
        onChange={() => { }}
        placeholder="열기"
      />
    )

    const toggle = screen.getByText('열기')
    fireEvent.click(toggle)

    expect(screen.getByText('옵션 1')).toBeInTheDocument()
    expect(screen.getByText('옵션 2')).toBeInTheDocument()
    expect(screen.getByText('옵션 3')).toBeInTheDocument()
  })

  it('옵션 클릭 시 onChange가 호출된다', () => {
    const onChange = vi.fn()

    render(
      <Dropdown
        options={mockOptions}
        onChange={onChange}
        placeholder="옵션 선택"
      />
    )

    fireEvent.click(screen.getByText('옵션 선택'))
    fireEvent.click(screen.getByText('옵션 2'))

    expect(onChange).toHaveBeenCalledWith('option2')
  })

  it('selectedValues가 있을 때 텍스트가 렌더링된다 (multi-check)', () => {
    render(
      <Dropdown
        options={mockOptions}
        selectedValues={['option1', 'option3']}
        onChange={() => { }}
        placeholder="선택"
        type="multi-check"
      />
    )

    expect(screen.getByText('옵션 1, 옵션 3')).toBeInTheDocument()
  })
})
