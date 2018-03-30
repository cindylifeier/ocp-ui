import { createSelector } from 'reselect';

/**
 * Direct selector to the todos state domain
 */
const selectTodosDomain = (state) => state.get('toDos');

/**
 * Other specific selectors
 */

const makeSelectToDos = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('data').toJS()
);

const makeSelectToDoMainTask = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('toDoMainTask').toJS()
);


const makeSelectSearchLoading = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('loading'),
);
export default makeSelectToDos;
export {
  makeSelectToDos,
  makeSelectSearchLoading,
  makeSelectToDoMainTask,
};
