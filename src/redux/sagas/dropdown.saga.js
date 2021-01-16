import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEducation(actions) {
  try {
    const response = yield axios.get('/api/dropdown/education');
    yield put({
      type: 'SET_EDUCATION',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING EDUCATION', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getethnicity(actions) {
  try {
    const response = yield axios.get('/api/dropdown/ethnicity');
    yield put({
      type: 'SET_ethnicity',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING ethnicity', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getgender(actions) {
  try {
    const response = yield axios.get('/api/dropdown/gender');
    yield put({
      type: 'SET_gender',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING gender', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getSkill(actions) {
  try {
    const response = yield axios.get('/api/dropdown/skill');
    yield put({
      type: 'SET_SKILL',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING SKILL', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getTime(actions) {
  try {
    const response = yield axios.get('/api/dropdown/time');
    yield put({
      type: 'SET_TIME',
      payload: response.data,
    });
  } catch (err) {
    console.log('error getting time', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getLanguage(actions) {
  try {
    const response = yield axios.get('/api/dropdown/language');
    yield put({
      type: 'SET_LANGUAGE',
      payload: response.data,
    });
  } catch (err) {
    console.log('error getting languages', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* dropdownSaga() {
  yield takeLatest('GET_EDUCATION', getEducation);
  yield takeLatest('GET_ethnicity', getethnicity);
  yield takeLatest('GET_gender', getgender);
  yield takeLatest('GET_SKILL', getSkill);
  yield takeLatest('GET_TIME', getTime);
  yield takeLatest('GET_LANGUAGE', getLanguage);
}

export default dropdownSaga;
