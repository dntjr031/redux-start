import axios from 'axios';
import { put, delay, call, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// 액션 타입 정의
export const GET_USERS_START = 'redux-start/users/GET_USERS_START'; // github api 호출을 시작 하는 것을 의미
export const GET_USERS_SUCCESS = 'redux-start/users/GET_USERS_SUCCESS'; // github api 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_USERS_FAIL = 'redux-start/users/GET_USERS_FAIL'; // github api 호출에 대한 응답이 실패한 경우

const GET_USERS = 'redux-start/users/GET_USERS'; // redux-promise-middleware
export const GET_USERS_PENDING = 'redux-start/users/GET_USERS_PENDING';
export const GET_USERS_FULFILLED = 'redux-start/users/GET_USERS_FULFILLED';
export const GET_USERS_REJECTED = 'redux-start/users/GET_USERS_REJECTED';

// 액션 생성 함수
export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}

// 초기값
const initState = {
  loading: false,
  data: [],
  error: null,
};

export default function users(state = initState, action) {
  const { type, error, data, payload } = action;
  switch (type) {
    case GET_USERS_START || GET_USERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
      };
    case GET_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    case GET_USERS_REJECTED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// thunk
export function getUsersThunk() {
  return async (dispatch, getState, { history }) => {
    try {
      console.log(history);
      dispatch(getUsersStart());
      //sleep
      await sleep(2000);
      const response = await axios.get('https://api.github.com/users');
      dispatch(getUsersSuccess(response.data));
      // move
      history.push('/');
    } catch (e) {
      dispatch(getUsersFail(e));
    }
  };
}

// redux-promise-middleware
export function getUsersPromise() {
  return {
    type: GET_USERS,
    payload: async () => {
      const response = await axios.get('https://api.github.com/users');
      return response.data;
    },
  };
}

// redux-saga
const GET_USERS_SAGA_START = 'GET_USERS_SAGA_START';

function* getUsersSaga(action) {
  try {
    yield put(getUsersStart());
    //sleep
    yield delay(2000);
    const response = yield call(axios.get, 'https://api.github.com/users');
    yield put(getUsersSuccess(response.data));
    yield put(push('/'));
  } catch (e) {
    yield put(getUsersFail(e));
  }
}

export function getUsersSagaStart() {
  return {
    type: GET_USERS_SAGA_START,
  };
}

export function* usersSaga() {
  yield takeEvery(GET_USERS_SAGA_START, getUsersSaga);
}
