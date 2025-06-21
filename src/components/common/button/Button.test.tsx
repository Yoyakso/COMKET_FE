import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'
import '@testing-library/jest-dom'

describe('Button 컴포넌트', () => {
  it('children 텍스트가 렌더링된다', () => {
    render(
      <Button $variant="primaryFilled" size="md">
        버튼입니다
      </Button>
    )
    expect(screen.getByText('버튼입니다')).toBeInTheDocument()
  })

  it('withIcon이 true일 때 아이콘이 2개 렌더링된다', () => {
    render(
      <Button $variant="primaryFilled" size="md" withIcon>
        아이콘버튼
      </Button>
    )
    const icons = screen.getAllByTestId('button-icon') // SVG 아이콘들
    expect(icons.length).toBe(2)
  })

  it('클릭 시 onClick 핸들러가 호출된다', () => {
    const handleClick = vi.fn()
    render(
      <Button $variant="primaryFilled" size="md" onClick={handleClick}>
        클릭
      </Button>
    )
    fireEvent.click(screen.getByText('클릭'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('disabled일 경우 클릭해도 onClick이 호출되지 않는다', () => {
    const handleClick = vi.fn()
    render(
      <Button $variant="primaryFilled" size="md" onClick={handleClick} disabled>
        비활성
      </Button>
    )
    fireEvent.click(screen.getByText('비활성'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
