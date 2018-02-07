import { createSelector } from 'reselect';

/**
 * Direct selector to the issuePage state domain
 */
const selectIssuePageDomain = (state) => state.get('issuePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by IssuePage
 */

const makeSelectIssuePage = () => createSelector(
  selectIssuePageDomain,
  (substate) => substate.toJS()
);

const makeSelectIssue = () => createSelector(
  selectIssuePageDomain,
  (substate) => substate.get('issue').toJS()
);

const makeSelectComments = () => createSelector(
  selectIssuePageDomain,
  (substate) => substate.get('comments').toJS()
);

export default {
  selectIssuePageDomain,
  makeSelectIssuePage,
  makeSelectIssue,
  makeSelectComments,
};
