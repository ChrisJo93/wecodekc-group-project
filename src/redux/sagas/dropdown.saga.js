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

function* getRace(actions) {
  try {
    const response = yield axios.get('/api/dropdown/race');
    yield put({
      type: 'SET_RACE',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING RACE', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* getSex(actions) {
  try {
    const response = yield axios.get('/api/dropdown/sex');
    yield put({
      type: 'SET_SEX',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING SEX', err);
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

function* dropdownSaga() {
  yield takeLatest('GET_EDUCATION', getEducation);
  yield takeLatest('GET_RACE', getRace);
  yield takeLatest('GET_SEX', getSex);
  yield takeLatest('GET_SKILL', getSkill);
}

export default dropdownSaga;
