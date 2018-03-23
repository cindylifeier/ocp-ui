/**
 *
 * Todos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import Card from 'components/Card';
import { MANAGE_TASK_URL } from 'containers/App/constants';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import { compose } from 'redux';
import { getTodoMainTask, getTodos } from 'containers/Todos/actions';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar/index';
import { makeSelectSearchLoading, makeSelectTodoMainTask, makeSelectTodos } from 'containers/Todos/selectors';
import TodoList from 'components/TodoList';
import { PATIENTS } from 'containers/Todos/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class Todos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    // const patientId = this.props.selectedPatient.id;
    // if (patientId) {
    const definition = 'To-Do';
    const patientId = 3970;
    this.props.getTodos(patientId, definition);
    this.props.getTodoMainTask(patientId, definition);
    // }
  }
  handleSearch() {
  // handleSearch(searchValue, showInactive, searchType) {
    // this.props.searchTodo(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }
  render() {
    const { todos, selectedPatient, loading, todoMainTask } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    // const CREATE_TODO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}&isMainTask=false&mainTaskId=${todoMainTask.logicalId}`;
    // const EDIT_TODO_URL = `${MANAGE_TASK_URL}/(todo edit)?patientId=${patientId}&isMainTask=false`;
    const isPatientWorkspace = window.location.href.includes(PATIENTS);
    const taskBaseUrl = MANAGE_TASK_URL;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_TASK_URL,
    };
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        {!loading && isEmpty(todos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTodosFound} />
        </NoResultsFoundText>}
        {!isEmpty(todos) &&
        <div>
          <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} showFilter={false} />
          <TodoList
            todos={todos}
            patientId={patientId}
            taskBaseUrl={taskBaseUrl}
            todoMainTaskLogicalId={todoMainTask.logicalId}
            isPatientWorkspace={isPatientWorkspace}
          />
        </div>
        }
      </Card>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  getTodos: PropTypes.func.isRequired,
  getTodoMainTask: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object,
  todoMainTask: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  selectedPatient: makeSelectPatient(),
  todoMainTask: makeSelectTodoMainTask(),
  loading: makeSelectSearchLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTodos: (patientId, definition) => dispatch(getTodos(patientId, definition)),
    getTodoMainTask: (patientId, definition) => dispatch(getTodoMainTask(patientId, definition)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'todos', reducer });
const withSaga = injectSaga({ key: 'todos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Todos);
