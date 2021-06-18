function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.text}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
