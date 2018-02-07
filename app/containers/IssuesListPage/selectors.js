import { createSelector } from 'reselect';

/**
 * Direct selector to the issuesListPage state domain
 */
const selectIssuesListPageDomain = (state) => state.get('issuesListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by IssuesListPage
 */

const makeSelectIssuesListPage = () => createSelector(
  selectIssuesListPageDomain,
  (substate) => substate.toJS()
);

const makeSelectIssuesList = () => createSelector(
  selectIssuesListPageDomain,
  (state) => state.getIn(['issuesListPage', 'page']),
  (state) => state.getIn(['issuesListPage', 'itemsPerPage']),
  (state) => state.getIn(['issuesListPage', 'showOpened']),
  (state) => state.getIn(['issuesListPage', 'showClosed']),
  (substate, page, itemsPerPage, showOpened, showClosed) => substate
    .get('list')
    .filter((issue) => (showClosed && issue.get('state') === 'closed') || (showOpened && issue.get('state') === 'open'))
    .slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage)
    .toJS()
);

export default {
  selectIssuesListPageDomain,
  makeSelectIssuesListPage,
  makeSelectIssuesList,
};
