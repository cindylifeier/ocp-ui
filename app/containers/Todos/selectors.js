import { createSelector } from 'reselect';

/**
 * Direct selector to the todos state domain
 */
const selectTodosDomain = (state) => state.get('todos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Todos
 */

const makeSelectTodos = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('data').toJS()
);

const makeSelectTodoMainTask = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('todoMainTask').toJS()
);


const makeSelectSearchLoading = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('loading'),
);
export default makeSelectTodos;
export {
  makeSelectTodos,
  makeSelectSearchLoading,
  makeSelectTodoMainTask,
};
