import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MarkdownEditor } from './MarkdownEditor'
import '@testing-library/jest-dom'

describe('MarkdownEditor', () => {
  it('placeholder가 렌더링된다', () => {
    render(<MarkdownEditor />)
    const textarea = screen.getByPlaceholderText('상세 내용을 입력해주세요.')
    expect(textarea).toBeInTheDocument()
  })

  it('initialValue가 렌더링된다', () => {
    render(<MarkdownEditor initialValue="기존 값" />)
    const textarea = screen.getByDisplayValue('기존 값')
    expect(textarea).toBeInTheDocument()
  })

  it('값 변경 시 onChange가 호출된다', () => {
    const handleChange = vi.fn()
    render(<MarkdownEditor onChange={handleChange} />)

    const textarea = screen.getByPlaceholderText('상세 내용을 입력해주세요.')
    fireEvent.change(textarea, { target: { value: '새로운 입력' } })

    // 실제 useEffect 내부에서 호출되므로 next tick까지 기다림
    expect(handleChange).toHaveBeenCalledWith('새로운 입력')
  })
})
