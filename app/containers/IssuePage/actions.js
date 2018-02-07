/*
 *
 * IssuePage actions
 *
 */

import {
  LOADING,
  CLEAR,
} from './constants';

function getIssue(number) {
  return {
    type: LOADING,
    number,
  };
}

function clearState() {
  return {
    type: CLEAR,
  };
}

export default {
  getIssue,
  clearState,
};
