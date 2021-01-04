import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents(action) {
  try {
    const response = yield axios.get('/api/events');
    yield put({
      type: 'SET_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING EVENTS', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* postEvents(action) {
  try {
    const response = yield axios.get('/api/events', action.payload);
    console.log(response.data);
    yield put({
      type: 'GET_EVENTS',
    });
  } catch (err) {
    console.log('ERROR SAVING EVENT', err);
    yield put({ type: 'POST_FAILED' });
  }
}

function* eventSaga() {
  yield takeLatest('GET_EVENTS', getEvents);
  yield takeLatest('POST_EVENTS', postEvents);
}

export default eventSaga;
