import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Chip } from './Chip'
import CloseIcon from '@/assets/icons/CloseIcon.svg?react'
import '@testing-library/jest-dom'

describe('Chip 컴포넌트', () => {
  it('children 텍스트를 렌더링한다', () => {
    render(<Chip $styleType="filled" size="md">테스트칩</Chip>)
    expect(screen.getByText('테스트칩')).toBeInTheDocument()
  })

  it('onClose가 클릭되면 호출된다', () => {
    const handleClose = vi.fn()
    render(
      <Chip $styleType="filled" size="md" onClose={handleClose}>
        닫기칩
      </Chip>
    )
    const closeButton = screen.getByLabelText("'닫기칩' 칩 닫기")
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalled()
  })

  it('disabled 상태일 때 onClose가 호출되지 않는다', () => {
    const handleClose = vi.fn()
    render(
      <Chip $styleType="disabled" size="md" onClose={handleClose}>
        비활성칩
      </Chip>
    )
    const closeButton = screen.getByLabelText("'비활성칩' 칩 닫기")
    fireEvent.click(closeButton)
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('아이콘이 있을 때 렌더링된다', () => {
    render(
      <Chip
        $styleType="filled"
        size="md"
        icon={<CloseIcon />}
      >
        아이콘칩
      </Chip>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
