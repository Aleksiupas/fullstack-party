/*
 *
 * IssuesListPage reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import moment from 'moment';

import {
  LOADING,
  ERROR,
  SUCCESS,
  CHANGE_PAGE,
  CHANGE_FILTER_OPENED,
  CHANGE_FILTER_CLOSED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  openCount: 0,
  closedCount: 0,
  list: [],
  listCount: 0,
  page: 0,
  itemsPerPage: 4,
  showOpened: true,
  showClosed: true,
});

function issuesListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: return state
      .set('loading', true);
    case ERROR: return state
      .set('loading', false)
      .set('error', action.error);
    case SUCCESS: return state
      .set('loading', false)
      .set('openCount', _.filter(action.payload, (o) => o.state === 'open').length)
      .set('closedCount', _.filter(action.payload, (o) => o.state === 'closed').length)
      .set('listCount', action.payload.length)
      .set('list', fromJS(_.map(action.payload, (o) => _.update(o, 'created_at', (d) => moment(d).fromNow()))));
    case CHANGE_PAGE: return state
      .set('page', action.page);
    case CHANGE_FILTER_OPENED: return state
      .set('page', 0)
      .set('showOpened', !state.get('showOpened'));
    case CHANGE_FILTER_CLOSED: return state
      .set('page', 0)
      .set('showClosed', !state.get('showClosed'));
    default:
      return state;
  }
}

export default issuesListPageReducer;
