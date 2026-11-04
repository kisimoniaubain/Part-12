const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = () => {
    deleteTodo(todo)
  }

  const onClickComplete = () => {
    completeTodo(todo)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        <img src="/todo-icon.svg" alt="Todo item" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        {todo.text}
      </span>
      {todo.done ? (
        <>
          <span>This todo is done</span>
          <span>
            <button onClick={onClickDelete}> Delete </button>
          </span>
        </>
      ) : (
        <>
          <span>
            This todo is not done
          </span>
          <span>
            <button onClick={onClickDelete}> Delete </button>
            <button onClick={onClickComplete}> Set as done </button>
          </span>
        </>
      )}
    </div>
  )
}

export default Todo
