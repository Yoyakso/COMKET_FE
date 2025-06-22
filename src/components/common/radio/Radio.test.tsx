import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Radio } from './Radio'
import '@testing-library/jest-dom'

describe('Radio 컴포넌트', () => {
  it('라벨이 렌더링된다', () => {
    render(
      <Radio
        label="테스트 라디오"
        checked={false}
        color="black"
        onChange={() => { }}
      />
    )
    expect(screen.getByText('테스트 라디오')).toBeInTheDocument()
  })

  it('checked 상태일 때 aria-checked가 true이다', () => {
    render(
      <Radio
        label="선택됨"
        checked={true}
        color="teal"
        onChange={() => { }}
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('aria-checked', 'true')
  })

  it('클릭 시 onChange가 호출된다', () => {
    const handleChange = vi.fn()
    render(
      <Radio
        label="선택하세요"
        checked={false}
        color="black"
        onChange={handleChange}
      />
    )
    const radio = screen.getByRole('radio')
    fireEvent.click(radio)
    expect(handleChange).toHaveBeenCalled()
  })

  it('disabled 상태일 때 클릭해도 onChange가 호출되지 않는다', () => {
    const handleChange = vi.fn()
    render(
      <Radio
        label="비활성화됨"
        checked={false}
        disabled={true}
        color="black"
        onChange={handleChange}
      />
    )
    const radio = screen.getByRole('radio')
    fireEvent.click(radio)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
