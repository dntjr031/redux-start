import { createActions, handleActions } from 'redux-actions';

export const { showAll, showComplete } = createActions('SHOW_ALL', 'SHOW_COMPLETE', { prefix: 'redux-start/filter' });

//초기값
const initialState = 'ALL';

const reducer = handleActions(
  {
    SHOW_ALL: () => 'ALL',
    SHOW_COMPLETE: () => 'COMPLETE',
  },
  initialState,
  { prefix: 'redux-start/filter' },
);

export default reducer;
