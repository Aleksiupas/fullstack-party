import _ from 'lodash';
import { put } from 'redux-saga/effects';

export default function* (C, error, message) {
  // console.log(C, error);
  yield put({
    type: C,
    error: error ? (
      _.get(
        error,
        'response.data.error',
        _.get(error, 'response.data.message', error.error || error.message || 'Klaida')
      )
    ) : (message || 'Klaida'),
  });
}
