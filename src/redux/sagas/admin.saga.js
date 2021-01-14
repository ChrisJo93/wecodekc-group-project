import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* dataGrab(action) {
  try {
    const allUserGet = yield axios.get('/api/admin/allUserGet');
    // const noteGet = yield axios.get(`/api/user/notes/${action.payload}`);
    const unverifiedGet = yield axios.get('/api/admin/unverifiedGet');
    const eventGet = yield axios.get('/api/event');
    yield put({
      type: 'SET_ALL_USERS',
      payload: allUserGet.data,
    });
    // yield put({
    //   type: 'SET_NOTES',
    //   payload: noteGet.data,
    // });
    yield put({
      type: 'SET_UNVERIFIED_USERS',
      payload: unverifiedGet.data,
    });
    yield put({
      type: 'SET_EVENTS',
      payload: eventGet.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING USER', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* verify(action) {
  try {
    yield axios.put(`/api/admin/verify`, action.payload);
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* getAll(action) {
  try {
    const response = yield axios.get(`/api/user/all/${action.payload}`);
    console.log('look here <<<<<<', response.data);
    yield put({
      type: 'SET_USER_DETAIL',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* adminSaga() {
  yield takeLatest('GET_ADMIN_DATA', dataGrab);
  yield takeLatest('VERIFY_USER', verify);
  yield takeLatest('GET_USER_DETAIL', getAll);
}

export default adminSaga;
