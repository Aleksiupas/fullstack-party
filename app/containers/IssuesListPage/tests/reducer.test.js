
import { fromJS } from 'immutable';
import issuesListPageReducer from '../reducer';

describe('issuesListPageReducer', () => {
  it('returns the initial state', () => {
    expect(issuesListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
