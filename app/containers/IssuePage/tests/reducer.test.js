
import { fromJS } from 'immutable';
import issuePageReducer from '../reducer';

describe('issuePageReducer', () => {
  it('returns the initial state', () => {
    expect(issuePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
