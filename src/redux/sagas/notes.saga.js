import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getNotes(action) {
  try {
    const response = yield axios.get(`/api/user/notes/${action.payload}`);
    yield put({
      type: 'SET_NOTES',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING NOTES', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* postNotes(action) {
  try {
    const response = yield axios.post(
      `/api/user/notes/${action.payload}`,
      action.payload
    );
    console.log(response.data);
    yield put({
      type: 'GET_NOTES',
    });
  } catch (err) {
    console.log('ERROR SAVING NOTE', err);
    yield put({ type: 'POST_FAILED' });
  }
}

function* updateNotes(action) {
  try {
    yield axios.put(
      `/api/user/notes/update/${action.payload.noteId}`,
      action.payload
    );
    yield put({
      type: 'GET_NOTES',
    });
  } catch (err) {
    console.log('ERROR UPDATING NOTES', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* deleteNotes(action) {
  try {
    yield axios.delete(
      `/api/user/notes/delete/${action.payload.noteId}`,
      action.payload
    );
    yield put({
      type: 'GET_NOTES',
    });
  } catch (err) {
    console.log('ERROR DELETING NOTE', err);
    yield put({ type: 'DELETE_FAILED' });
  }
}

function* notesSaga() {
  yield takeLatest('GET_NOTES', getNotes);
  yield takeLatest('POST_NOTES', postNotes);
  yield takeLatest('PUT_NOTES', updateNotes);
  yield takeLatest('DELETE_NOTES', deleteNotes);
}

export default notesSaga;
