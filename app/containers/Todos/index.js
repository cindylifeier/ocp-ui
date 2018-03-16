/**
 *
 * Todos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Card from 'components/Card';
import { MANAGE_TASK_URL } from 'containers/App/constants';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { Link } from 'react-router-dom';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import { compose } from 'redux';
import { getTodos } from 'containers/Todos/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTodos from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Todos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      const definition = 'todo';
      const pageNumber = 1;
      this.props.getTodos(patientId, definition, pageNumber);
    }
  }

  handlePageClick(pageNumber) {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      const definition = 'todo';
      this.props.getTodos(patientId, definition, pageNumber);
    }
  }
  render() {
    const { todos, selectedPatient } = this.props;
    const patientId = selectedPatient.id;
    const MANAGE_TODO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}`;
    console.log(todos);
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_TODO_URL} />}
          />
        </CardHeader>
      </Card>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.object.isRequired,
  getTodos: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  selectedPatient: makeSelectSelectedPatient(),
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
