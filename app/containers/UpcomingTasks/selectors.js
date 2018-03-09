import { createSelector } from 'reselect';

/**
 * Direct selector to the upcomingTasks state domain
 */
const selectUpcomingTasksDomain = (state) => state.get('upcomingTasks');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UpcomingTasks
 */

const makeSelectUpcomingTasks = () => createSelector(
  selectUpcomingTasksDomain,
  (substate) => substate.toJS()
);

export default makeSelectUpcomingTasks;
export {
  selectUpcomingTasksDomain,
};
