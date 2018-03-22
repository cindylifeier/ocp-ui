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
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { Link } from 'react-router-dom';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import { compose } from 'redux';
import { getTodos } from 'containers/Todos/actions';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { makeSelectSearchLoading, makeSelectTodos } from 'containers/Todos/selectors';
import TodoList from 'components/TodoList';
import { PATIENTS } from 'containers/Todos/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class Todos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      const definition = 'todo';
      this.props.getTodos(patientId, definition);
    }
  }
  render() {
    const { todos, selectedPatient, loading } = this.props;
    const patientId = selectedPatient.id;
    const MANAGE_TODO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}`;
    const isPatientWorkspace = window.location.href.includes(PATIENTS);
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_TODO_URL} />}
          />
        </CardHeader>
        {loading && <RefreshIndicatorLoading />}
        {!loading && isEmpty(todos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTodosFound} />
        </NoResultsFoundText>}
        {!isEmpty(todos) &&
        <div>
          <TodoList todos={todos} isPatientWorkspace={isPatientWorkspace} />
        </div>
        }
      </Card>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  getTodos: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  selectedPatient: makeSelectPatient(),
  loading: makeSelectSearchLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTodos: (patientId, definition) => dispatch(getTodos(patientId, definition)),
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
