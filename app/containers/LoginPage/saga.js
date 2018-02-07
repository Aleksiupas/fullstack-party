import { takeLatest, call, put } from 'redux-saga/effects';
import { ApiLogin } from 'utils/api';
import _ from 'lodash';
import catchError from 'utils/catchError';
import { logIn } from 'containers/App/actions';
import * as C from './constants';

export function* login({ code }) {
  try {
    const response = yield call(ApiLogin.post, '/login/oauth/access_token', { code });

    // console.log(response.data);

    const error = _.get(response, 'data.error');

    if (!error) {
      const payload = yield call(logIn, response.data.access_token);
      yield put(payload);
      yield put({ type: C.SUCCESS });
    } else {
      yield put({
        type: C.ERROR,
        error: _.get(response, 'data.error_description', error),
      });
    }
  } catch (error) { yield catchError(C.ERROR, error); }
}

export default function* defaultSaga() {
  yield takeLatest(C.LOADING, login);
}
