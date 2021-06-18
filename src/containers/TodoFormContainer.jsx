import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import TodoForm from '../components/TodoForm';
import { useCallback } from 'react';

function TodoFormContainer() {
  const dispatch = useDispatch();

  const add = useCallback(
    text => {
      dispatch(addTodo(text));
    },
    [dispatch],
  );
  return <TodoForm add={add} />;
}

export default TodoFormContainer;
