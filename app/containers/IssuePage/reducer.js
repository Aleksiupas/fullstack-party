/*
 *
 * IssuePage reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';
import _ from 'lodash';
import {
  LOADING,
  ERROR,
  SUCCESS,
  CLEAR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  issue: {},
  comments: [],
});

function issuePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: return state
      .set('loading', true);
    case ERROR: return state
      .set('loading', false)
      .set('error', action.error);
    case SUCCESS: return state
      .set('loading', false)
      .set('comments', fromJS(_.map(action.payload.comments, (o) => _.update(o, 'created_at', (d) => moment(d).fromNow()))))
      .set('issue', fromJS(_.update(action.payload.issue, 'created_at', (d) => moment(d).fromNow())));

    case CLEAR: return initialState;
    default: return state;
  }
}

export default issuePageReducer;
