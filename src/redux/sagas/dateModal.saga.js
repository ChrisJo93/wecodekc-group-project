import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getDates(action) {
  try {
    const response = yield axios.get(`/api/event/calendar/${action.payload}`);
    console.log('in the saga', action.payload);
    yield put({
      type: 'SET_DATES',
      payload: response.data,
    });
    console.log('in respoonse saga', response.data);
  } catch (err) {
    console.log('error getting all dates', err);
    yield put({ type: 'GET_DATES_FAILED' });
  }
}

function* dateSaga() {
  yield takeLatest('GET_DATES', getDates);
}

export default dateSaga;
