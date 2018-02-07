/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  redirectToReferrer: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case C.LOADING: return state
      .set('loading', true)
      .set('redirectToReferrer', false)
      .set('error', '');
    case C.ERROR: return state
      .set('loading', false)
      .set('error', action.error);
    case C.SUCCESS: return state
      .set('loading', false)
      .set('redirectToReferrer', true);
    case C.RESET_REDIRECT: return state
      .set('redirectToReferrer', false);
    default: return state;
  }
}

export default loginPageReducer;
