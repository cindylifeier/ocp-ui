import { createSelector } from 'reselect';

/**
 * Direct selector to the upcomingTasksPage state domain
 */
const selectUpcomingTasksPageDomain = (state) => state.get('upcomingTasksPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UpcomingTasksPage
 */

const makeSelectUpcomingTasksPage = () => createSelector(
  selectUpcomingTasksPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectUpcomingTasksPage;
export {
  selectUpcomingTasksPageDomain,
};
