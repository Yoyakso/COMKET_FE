import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Search } from './Search'
import '@testing-library/jest-dom'

describe('Search 컴포넌트', () => {
  it('placeholder가 렌더링된다', () => {
    render(
      <Search
        $variant="outlined"
        size="md"
        placeholder="검색어를 입력하세요"
      />
    )
    expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument()
  })

  it('입력 시 onChange가 호출된다 (controlled)', () => {
    const handleChange = vi.fn()
    render(
      <Search
        $variant="outlined"
        size="md"
        value=""
        onChange={handleChange}
      />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '테스트' } })
    expect(handleChange).toHaveBeenCalledWith('테스트')
  })

  it('엔터 입력 시 onSearch가 호출된다', () => {
    const handleSearch = vi.fn()
    render(
      <Search
        $variant="outlined"
        size="md"
        value="검색어"
        onChange={() => { }}
        onSearch={handleSearch}
      />
    )
    const input = screen.getByDisplayValue('검색어')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(handleSearch).toHaveBeenCalledWith('검색어')
  })

  it('clear 아이콘 클릭 시 onClear가 호출된다 (controlled)', () => {
    const handleClear = vi.fn()
    render(
      <Search
        $variant="outlined"
        size="md"
        value="초기값"
        onChange={() => { }}
        onClear={handleClear}
      />
    )
    const clearButton = screen.getByLabelText('clear')
    // visibility는 실제로 렌더링되었는지만 확인
    fireEvent.click(clearButton)
    expect(handleClear).toHaveBeenCalled()
  })

  it('입력 값 없을 땐 clear 아이콘이 숨겨진다', () => {
    render(
      <Search
        $variant="outlined"
        size="md"
        value=""
        onChange={() => { }}
      />
    )
    const clearButton = screen.getByLabelText('clear')
    expect(clearButton).toHaveStyle('visibility: hidden')
  })

  it('입력 값 있을 땐 clear 아이콘이 보인다', () => {
    render(
      <Search
        $variant="outlined"
        size="md"
        value="내용"
        onChange={() => { }}
      />
    )
    const clearButton = screen.getByLabelText('clear')
    expect(clearButton).toHaveStyle('visibility: visible')
  })
})
