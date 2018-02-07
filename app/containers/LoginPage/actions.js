/*
 *
 * LoginPage actions
 *
 */

import * as C from './constants';

export function login(code) {
  return {
    type: C.LOADING,
    code,
  };
}

export function resetRedirect() {
  return {
    type: C.RESET_REDIRECT,
  };
}
