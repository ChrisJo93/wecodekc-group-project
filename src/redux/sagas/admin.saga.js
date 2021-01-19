import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* dataGrab(action) {
  try {
    const allUserGet = yield axios.get('/api/admin/allUserGet');
    // const noteGet = yield axios.get(`/api/user/notes/${action.payload}`);
    const unverifiedGet = yield axios.get('/api/admin/unverifiedGet');
    const eventGet = yield axios.get('/api/event');
    // const ethnicityGet = yield axios.get(`/api/demographics/ethnicity`);
    const genderGet = yield axios.get(`/api/demographics/gender`);
    const roleGet = yield axios.get(`/api/demographics/volunteerRole`);
    yield put({
      type: 'SET_ALL_USERS',
      payload: allUserGet.data,
    });
    // yield put({
    //   type: 'SET_NOTES',
    //   payload: noteGet.data,
    // });
    yield put({
      type: 'SET_UNVERIFIED_USERS',
      payload: unverifiedGet.data,
    });
    yield put({
      type: 'SET_EVENTS',
      payload: eventGet.data,
    });
    yield put({
      type: 'SET_GENDER',
      payload: genderGet.data,
    });
    yield put({
      type: 'SET_VOLUNTEER',
      payload: roleGet.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING USER', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* verify(action) {
  try {
    yield axios.put(`/api/admin/verify`, action.payload);
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* getNewUserDetail(action) {
  try {
    const response = yield axios.get(
      `/api/user/newUserDetail/${action.payload}`
    );

    yield put({
      type: 'SET_NEW_USER_DETAIL',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* verifiedUserDetailReducer(action) {
  try {
    const response = yield axios.get(
      `/api/user/verifiedUserDetail/${action.payload}`
    );

    yield put({
      type: 'SET_VERIFIED_USER_DETAIL',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING EVENT', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* allIdGet(action) {
  try {
    const response = yield axios.get(`/api/user/allIdGet`);
    yield put({
      type: 'SET_ALL_ID',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING ALL ID', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* verifiedUserDetailReducerAll(action) {
  try {
    const response = yield axios.get(`/api/user/verifiedUserDetailAll`);
    yield put({
      type: 'SET_VERIFIED_USER_ALL_DETAIL',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR UPDATING SET_VERIFIED_USER_ALL_DETAIL', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* adminSaga() {
  yield takeLatest('GET_ADMIN_DATA', dataGrab);
  yield takeLatest('VERIFY_USER', verify);
  yield takeLatest('GET_NEW_USER_DETAIL', getNewUserDetail);
  yield takeLatest('GET_VERIFIED_USER_DETAIL', verifiedUserDetailReducer);
  yield takeLatest(
    'GET_VERIFIED_USER_ALL_DETAIL',
    verifiedUserDetailReducerAll
  );
  yield takeLatest('GET_ALL_ID', allIdGet);
}

export default adminSaga;
