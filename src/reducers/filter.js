import { SHOW_ALL, SHOW_COMPLETE } from '../redux/actions';

const initialState = 'ALL';

export default function filter(previousState = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_ALL:
      return 'ALL';
    case SHOW_COMPLETE:
      return 'COMPLETE';
    default:
      return previousState;
  }
}
