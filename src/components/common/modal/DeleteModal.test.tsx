import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DeleteModal } from './DeleteModal'
import '@testing-library/jest-dom'

describe('DeleteModal 컴포넌트', () => {
  const setup = (props?: Partial<React.ComponentProps<typeof DeleteModal>>) => {
    const onClose = vi.fn()
    const onConfirm = vi.fn().mockResolvedValue(undefined)

    render(
      <DeleteModal
        title="삭제 확인"
        message="정말 삭제하시겠습니까?"
        onClose={onClose}
        onConfirm={onConfirm}
        {...props}
      />
    )

    return { onClose, onConfirm }
  }

  it('타이틀과 메시지가 렌더링된다', () => {
    setup()
    expect(screen.getByText('삭제 확인')).toBeInTheDocument()
    expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
  })

  it('취소 버튼 클릭 시 onClose가 호출된다', () => {
    const { onClose } = setup()
    fireEvent.click(screen.getByText('취소'))
    expect(onClose).toHaveBeenCalled()
  })

  it('확인 버튼 클릭 시 onConfirm 후 onClose가 호출된다', async () => {
    const { onClose, onConfirm } = setup()
    fireEvent.click(screen.getByText('확인'))

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled()
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('Escape 키를 누르면 onClose가 호출된다', () => {
    const { onClose } = setup()
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('확인 버튼 클릭 시 로딩 스피너가 나타난다', async () => {
    const slowConfirm = vi.fn(() => new Promise(res => setTimeout(res, 200))) as () => Promise<void>
    setup({ onConfirm: slowConfirm })

    fireEvent.click(screen.getByText('확인'))
    expect(screen.getByRole('button', { name: /확인/ })).toBeDisabled()
    expect(screen.getByTestId('loader-svg')).toBeInTheDocument()

    await waitFor(() => {
      expect(slowConfirm).toHaveBeenCalled()
    })
  })
})
