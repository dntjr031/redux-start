// 액션 타입 정의
export const ADD_TODO = 'start/todos/ADD_TODO';
export const COMPLETE_TODO = 'start/todos/COMPLETE_TODO';

// 액션 생성 함수
// { type: ADD_TODO, text: '할일' }
export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

// { type: COMPLETE_TODO, index: 1 }
export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

//초기값
const initialState = [];

// reducer
export default function reducer(previousState = initialState, action) {
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
