import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getUsers(action) {
  try {
    const response = yield axios.get('/api/user');
    yield put({
      type: 'SET_USERS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING USERS', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* updateUser(action) {
  console.log(action.payload);
  try {
    yield axios.put(`/api/user/update`, action.payload);
    yield put({
      type: 'GET_USERS',
    });
  } catch (err) {
    console.log('ERROR UPDATING USER', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('GET_USERS', getUsers);
  yield takeLatest('PUT_USER', updateUser);
}

export default userSaga;
