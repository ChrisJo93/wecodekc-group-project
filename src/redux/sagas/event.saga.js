import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents(action) {
  try {
    const response = yield axios.get('/api/event');
    yield put({
      type: 'SET_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING EVENTS', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getEventDetails(action) {
  try {
    const response = yield axios.get(`/api/event/details/${action.payload}`);
    yield put({
      type: 'SET_EVENT_DETAILS',
      payload: response.data,
    });
  } catch (err) {
    console.log('error getting event details', err);
    yield put({ type: 'GET_DETAIL_FAILED' });
  }
}

function* getUserEvents(action) {
  try {
    const response = yield axios.get(`/api/event/user`);
    yield put({
      type: 'SET_USER_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('error getting event for specific users', err);
    yield put({ type: 'GET_USER_EVENT_FAILED' });
  }
}

function* postEvents(action) {
  try {
    yield axios.post('/api/event', action.payload);

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
      `/api/event/update/${action.payload.eventId}`,
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
      `/api/event/delete/${action.payload.eventId}`,
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
  yield takeLatest('GET_EVENT_DETAILS', getEventDetails);
  yield takeLatest('GET_USER_EVENTS', getUserEvents);
  yield takeLatest('POST_EVENTS', postEvents);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventSaga;
