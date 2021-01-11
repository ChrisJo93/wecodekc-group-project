import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* dataGrab(action) {
  try {
    const allUserGet = yield axios.get('/api/admin/allUserGet');
    // const noteGet = yield axios.get(`/api/user/notes/${action.payload}`);
    const eventGet = yield axios.get('/api/event');
    yield put({
      type: 'SET_ALL_USERS)',
      payload: allUserGet.data,
    });
    // yield put({
    //   type: 'SET_NOTES',
    //   payload: noteGet.data,
    // });
    yield put({
      type: 'SET_EVENTS',
      payload: eventGet.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING USER', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* adminSaga() {
  yield takeLatest('GET_ADMIN_DATA', dataGrab);
}

export default adminSaga;
