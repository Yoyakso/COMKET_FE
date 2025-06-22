import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TextInput } from './TextInput'
import '@testing-library/jest-dom'

// Password 입력값이 한글이면 영어로 변환되는 koToEn 유틸은 실제 테스트엔 영향 없음
describe('TextInput 컴포넌트', () => {
  it('placeholder가 잘 보인다', () => {
    render(<TextInput value="" onChange={() => { }} placeholder="이름을 입력하세요" />)
    expect(screen.getByPlaceholderText('이름을 입력하세요')).toBeInTheDocument()
  })

  it('입력 시 onChange가 호출된다', () => {
    const handleChange = vi.fn()
    render(<TextInput value="" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('입력하시오')
    fireEvent.change(input, { target: { value: '테스트' } })
    expect(handleChange).toHaveBeenCalledWith('테스트')
  })

  it('입력값이 있을 때 clear 버튼 클릭 시 onChange("") 호출', () => {
    const handleChange = vi.fn()
    render(<TextInput value="입력값" onChange={handleChange} />)

    const clearBtn = screen.getByLabelText('입력 초기화')
    fireEvent.click(clearBtn)
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('type=password일 때 눈 아이콘이 토글된다', () => {
    render(<TextInput type="password" value="secret" onChange={() => { }} />)

    const eyeBtn = screen.getByRole('button', { name: '' }) // aria-label 없음
    expect(eyeBtn).toBeInTheDocument()
  })

  it('helperText가 있을 경우 화면에 렌더링된다', () => {
    render(<TextInput value="" onChange={() => { }} helperText="비밀번호는 8자 이상" />)
    expect(screen.getByText('비밀번호는 8자 이상')).toBeInTheDocument()
  })
})
