/*
 *
 * IssuesListPage actions
 *
 */

import {
  LOADING,
  CHANGE_PAGE,
  CHANGE_FILTER_OPENED,
  CHANGE_FILTER_CLOSED,
} from './constants';

function getIssues() {
  return {
    type: LOADING,
  };
}

function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

function toggleOpened() {
  return {
    type: CHANGE_FILTER_OPENED,
  };
}

function toggleClosed() {
  return {
    type: CHANGE_FILTER_CLOSED,
  };
}

export default {
  getIssues,
  changePage,
  toggleOpened,
  toggleClosed,
};
