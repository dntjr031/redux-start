import { ADD_TODO, COMPLETE_TODO } from '../redux/actions';

const initialState = [];

export default function todos(previousState = initialState, action) {
  const { type, text } = action;
  switch (type) {
    case ADD_TODO:
      return [...previousState, { text, done: false }];
    case COMPLETE_TODO:
      return previousState.map((todo, index) => {
        if (index === action.index) {
          return { ...todo, done: true };
        }
        return todo;
      });
    default:
      return previousState;
  }
}
