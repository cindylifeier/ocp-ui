/**
 *
 * Todos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
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
import { TODO_DEFINITION } from 'containers/Todos/constants';
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
    const { user, selectedPatient } = this.props;
    const definition = TODO_DEFINITION;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const practitionerId = user && user.resource && user.resource.logicalId ? user.resource.logicalId : null;
    if (patientId) {
      this.props.getTodos(patientId, null, definition);
      this.props.getTodoMainTask(patientId, definition);
    } else if (practitionerId) {
      this.props.getTodos(null, practitionerId, definition);
    }
  }

  getTodoMainTaskId(todoMainTask) {
    let todoMintaskId = null;
    if (todoMainTask && todoMainTask.length > 0) {
      todoMintaskId = todoMainTask[0].reference.split('/')[1];
    }
    return todoMintaskId;
  }

  handleSearch() {
  }
  render() {
    const { todos, selectedPatient, loading, todoMainTask } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const todoMainTaskId = this.getTodoMainTaskId(todoMainTask);
    let CREATE_TODO_URL = '';
    if (patientId && todoMainTaskId) {
      CREATE_TODO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}&isMainTask=false&mainTaskId=${todoMainTaskId}`;
    }
    const taskBaseUrl = MANAGE_TASK_URL;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_TODO_URL,
    };
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} showFilter={false} />
        {!loading && isEmpty(todos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTodosFound} />
        </NoResultsFoundText>}
        {!isEmpty(todos) &&
        <div>
          <TodoList
            todos={todos}
            patientId={patientId}
            taskBaseUrl={taskBaseUrl}
            todoMainTaskLogicalId={todoMainTaskId}
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
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  selectedPatient: makeSelectPatient(),
  todoMainTask: makeSelectTodoMainTask(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTodos: (patientId, practitionerId, definition) => dispatch(getTodos(patientId, practitionerId, definition)),
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
