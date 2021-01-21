import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEthnicity(action) {
  try {
    const response = yield axios.get(`/api/demographics/graphEthnicity`);
    yield put({
      type: 'SET_GRAPH_ETHNICITY',
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

function* getSelection(action) {
  try {
    const response = yield axios.get(
      `/api/demographics/users/${action.payload}`
    );
    yield put({
      type: 'SET_SELECTION_DEMOGRAPHICS',
      payload: response.data,
    });
  } catch (err) {
    yield put({ type: 'GET_VOLUNTEER_ROLE_FAILED' });
  }
}

function* demographicsSaga() {
  yield takeLatest('GET_GRAPH_ETHNICITY', getEthnicity);
  yield takeLatest('GET_GENDER', getGender);
  yield takeLatest('GET_ROLE', getRole);
  yield takeLatest('GET_SELECTION_DEMOGRAPHICS', getSelection);
}

export default demographicsSaga;
