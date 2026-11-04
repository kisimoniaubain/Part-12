import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Todo from './Todo'

describe('Todo', () => {
  it('renders an incomplete todo and its actions', () => {
    render(
      <Todo
        todo={{ text: 'Learn Docker', done: false }}
        deleteTodo={vi.fn()}
        completeTodo={vi.fn()}
      />
    )

    expect(screen.getByText('Learn Docker')).toBeTruthy()
    expect(screen.getByText('This todo is not done')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Set as done' })).toBeTruthy()
  })
})
