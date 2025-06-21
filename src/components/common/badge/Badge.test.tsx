import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'
import '@testing-library/jest-dom'

describe('Badge 컴포넌트', () => {
  it('children 텍스트를 렌더링한다', () => {
    render(
      <Badge
        $variant="primary"
        $styleType="filled"
        size="md"
        shape="sqaure"
      >
        Hello Badge
      </Badge>
    )
    expect(screen.getByText('Hello Badge')).toBeInTheDocument()
  })

  it('size="lg"일 때 아이콘이 포함된다', () => {
    render(
      <Badge
        $variant="primary"
        $styleType="filled"
        size="lg"
        shape="sqaure"
      >
        Large Badge
      </Badge>
    )
    const icon = screen.getByTestId('icon-wrapper')
    expect(icon).toBeInTheDocument()
  })

  it('size="md"일 때 아이콘이 없다', () => {
    render(
      <Badge
        $variant="primary"
        $styleType="filled"
        size="md"
        shape="sqaure"
      >
        Medium Badge
      </Badge>
    )
    const icon = screen.queryByTestId('icon-wrapper')
    expect(icon).not.toBeInTheDocument()
  })
})
