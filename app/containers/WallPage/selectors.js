import { createSelector } from 'reselect';

/**
 * Direct selector to the wallPage state domain
 */
const selectWallPageDomain = (state) => state.get('wallPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WallPage
 */

const makeSelectWallPage = () => createSelector(
  selectWallPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectWallPage;
export {
  selectWallPageDomain,
};
