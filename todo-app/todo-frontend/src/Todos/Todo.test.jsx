import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
afterEach(() => cleanup())
import Todo from './Todo'

describe('Todo', () => {
  it('renders an incomplete todo and its actions', () => {
    const deleteTodo = vi.fn()
    const completeTodo = vi.fn()
    const todo = { _id: '1', text: 'Learn Docker', done: false }

    render(
      <Todo
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    )

    expect(screen.getByText('Learn Docker')).toBeTruthy()
    expect(screen.getByText('This todo is not done')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Set as done' }))
    expect(completeTodo).toHaveBeenCalledWith(todo)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  it('does not show Set as done for a completed todo', () => {
    render(
      <Todo
        todo={{ _id: '2', text: 'Completed task', done: true }}
        deleteTodo={vi.fn()}
        completeTodo={vi.fn()}
      />
    )

    expect(screen.getByText('This todo is done')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Set as done' })).toBeNull()
  })
})
