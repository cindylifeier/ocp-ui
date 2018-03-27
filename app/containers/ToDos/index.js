/**
 *
 * ToDos
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
import { getToDoMainTask, getToDos } from 'containers/ToDos/actions';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar/index';
import { makeSelectSearchLoading, makeSelectToDoMainTask, makeSelectToDos } from 'containers/ToDos/selectors';
import ToDoList from 'components/ToDoList';
import { TO_DO_DEFINITION } from 'containers/ToDos/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    const { user, selectedPatient } = this.props;
    const definition = TO_DO_DEFINITION;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const practitionerId = user && user.resource && user.resource.logicalId ? user.resource.logicalId : null;
    if (patientId) {
      this.props.getToDos(patientId, null, definition);
      this.props.getToDoMainTask(patientId, definition);
    } else if (practitionerId) {
      this.props.getToDos(null, practitionerId, definition);
    }
  }

  getToDoMainTaskId(toDoMainTask) {
    let toDoMintaskId = null;
    if (toDoMainTask && toDoMainTask.length > 0) {
      toDoMintaskId = toDoMainTask[0].reference.split('/')[1];
    }
    return toDoMintaskId;
  }

  handleSearch() {
  }
  render() {
    const { toDos, selectedPatient, loading, toDoMainTask } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const isPatient = !isEmpty(selectedPatient);
    const toDoMainTaskId = this.getToDoMainTaskId(toDoMainTask);
    let CREATE_TO_DO_URL = '';
    if (patientId && toDoMainTaskId) {
      CREATE_TO_DO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}&isMainTask=false&mainTaskId=${toDoMainTaskId}`;
    }
    const taskBaseUrl = MANAGE_TASK_URL;
    const addNewItem = isPatient ? {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_TO_DO_URL,
    } : undefined;
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} showFilter={false} />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            todos={toDos}
            patientId={patientId}
            isPatient={isPatient}
            taskBaseUrl={taskBaseUrl}
            todoMainTaskLogicalId={toDoMainTaskId}
          />
        </div>
        }
      </Card>
    );
  }
}

ToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getToDos: PropTypes.func.isRequired,
  getToDoMainTask: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object,
  toDoMainTask: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectToDos(),
  selectedPatient: makeSelectPatient(),
  toDoMainTask: makeSelectToDoMainTask(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getToDos: (patientId, practitionerId, definition) => dispatch(getToDos(patientId, practitionerId, definition)),
    getToDoMainTask: (patientId, definition) => dispatch(getToDoMainTask(patientId, definition)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'toDos', reducer });
const withSaga = injectSaga({ key: 'toDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ToDos);
