/*
 *
 * App actions
 *
 */

import {
  LOGIN_CHANGE,
} from './constants';

export function logIn(token) {
  const now = new Date();
  const expires = new Date(now.getFullYear(), now.getMonth() + 6);
  document.cookie = `isLogin=${token}; expires=${expires.toUTCString()}`;
  sessionStorage.setItem('isLogin', token);
  return {
    type: LOGIN_CHANGE,
    payload: token,
  };
}

export function logOut() {
  const now = new Date();
  const expires = new Date(now.getFullYear(), now.getMonth() - 1);
  document.cookie = `isLogin=; expires=${expires.toUTCString()}`;
  sessionStorage.removeItem('isLogin');
  return {
    type: LOGIN_CHANGE,
    payload: false,
  };
}
