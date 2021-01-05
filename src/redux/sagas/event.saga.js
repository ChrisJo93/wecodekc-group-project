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

function* updateEvent(action) {
  try {
    yield axios.put(
      `/api/events/update/${action.payload.eventId}`,
      action.payload
    );
    yield put({
      type: 'GET_EVENTS',
    });
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* deleteEvent(action) {
  try {
    yield axios.delete(
      `/api/events/delete/${action.payload.eventId}`,
      action.payload
    );
    yield put({
      type: 'GET_EVENTS',
    });
  } catch (err) {
    console.log('ERROR DELETING EVENT', err);
    yield put({ type: 'DELETE_FAILED' });
  }
}

function* eventSaga() {
  yield takeLatest('GET_EVENTS', getEvents);
  yield takeLatest('POST_EVENTS', postEvents);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventSaga;
