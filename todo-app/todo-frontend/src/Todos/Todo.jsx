const Todo = ({ todo, deleteTodo, completeTodo }) => (
  <div>
    <span>{todo.text}</span>
    <span>{todo.done ? 'This todo is done' : 'This todo is not done'}</span>
    <button onClick={() => deleteTodo(todo)}>Delete</button>
    {!todo.done && <button onClick={() => completeTodo(todo)}>Set as done</button>}
  </div>
)

export default Todo
