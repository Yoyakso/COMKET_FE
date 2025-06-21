import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './Toggle'
import '@testing-library/jest-dom'

describe('Toggle 컴포넌트', () => {
  it('좌우 라벨이 잘 렌더링된다', () => {
    render(<Toggle labelLeft="OFF" labelRight="ON" />)
    expect(screen.getByText('OFF')).toBeInTheDocument()
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('초기 checked 상태가 반영된다', () => {
    render(<Toggle checked={true} />)
    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveAttribute('aria-checked', 'true')
  })

  it('클릭 시 onChange가 호출되고 상태가 반전된다', () => {
    const handleChange = vi.fn()
    render(<Toggle checked={false} onChange={handleChange} />)

    const toggle = screen.getByRole('switch')
    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('disabled일 때 클릭해도 onChange가 호출되지 않는다', () => {
    const handleChange = vi.fn()
    render(<Toggle disabled={true} checked={true} onChange={handleChange} />)

    const toggle = screen.getByRole('switch')
    fireEvent.click(toggle)

    expect(handleChange).not.toHaveBeenCalled()
    expect(toggle).toHaveAttribute('aria-disabled', 'true')
  })
})
