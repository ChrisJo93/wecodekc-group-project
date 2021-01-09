import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postImageUrl() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
  } catch (err) {
    console.log('error posting iimage', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* imageSaga() {
  yield takeLatest('POST_IMAGE_URL', postImageUrl);
}

export default imageSaga;
