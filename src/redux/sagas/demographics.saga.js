import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEthnicity(action) {
  try {
    const response = yield axios.get(`/api/demographics/ethnicity`);
    yield put({
      type: 'SET_ETHNICITY',
      payload: response.data,
    });
  } catch (err) {
    yield put({ type: 'GET_ETHNICITY_FAILED' });
  }
}

function* getGender(action) {
  try {
    const response = yield axios.get(`/api/demographics/gender`);
    yield put({
      type: 'SET_GENDER',
      payload: response.data,
    });
  } catch (err) {
    yield put({ type: 'GET_GENDER_FAILED' });
  }
}

function* getRole(action) {
  try {
    const response = yield axios.get(`/api/demographics/volunteerRole`);
    yield put({
      type: 'SET_VOLUNTEER',
      payload: response.data,
    });
  } catch (err) {
    yield put({ type: 'GET_VOLUNTEER_ROLE_FAILED' });
  }
}

function* demographicsSaga() {
  yield takeLatest('GET_ETHNICITY', getEthnicity);
  yield takeLatest('GET_GENDER', getGender);
  yield takeLatest('GET_ROLE', getRole);
}

export default demographicsSaga;
