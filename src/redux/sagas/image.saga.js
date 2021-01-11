import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getImageUrl(action) {
  try {
    const response = yield axios.get('/api/image');
    yield put({
      type: 'SET_IMAGES',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING IMAGE', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* postImageUrl(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.post('/api/image', action.payload, config);
    //do a get after successful post
    yield put({
      type: 'GET_IMAGE_URL',
    });
  } catch (err) {
    console.log('error posting image', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* imageSaga() {
  yield takeLatest('GET_IMAGE_URL', getImageUrl);
  yield takeLatest('POST_IMAGE_URL', postImageUrl);
}

export default imageSaga;
