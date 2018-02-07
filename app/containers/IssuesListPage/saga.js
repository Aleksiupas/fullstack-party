import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import Api from 'utils/api';
import {
  LOADING,
  ERROR,
  SUCCESS,
} from './constants';
import { logOut } from '../App/actions';

function* getIssues() {
  try {
    const token = yield select((state) => state.get('isLogin'));
    const url = 'https://api.github.com/repos/tesonet';
    const response = yield call(Api.get, `${url}/fullstack-party/issues?access_token=${token}&state=all&page=1`);

    yield put({
      type: SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (_.get(error, 'response.status') === 401) {
      yield put(logOut());
    } else {
      yield put({
        type: ERROR,
        error: error.message,
      });
    }
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOADING, getIssues);
}
