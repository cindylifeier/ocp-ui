/**
 *
 * PatientToDos
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
import { CARE_COORDINATOR_ROLE_VALUE, MANAGE_TASK_URL } from 'containers/App/constants';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import { compose } from 'redux';
import { getPatientToDoMainTask, getPatientToDos } from 'containers/PatientToDos/actions';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar/index';
import { makeSelectSearchLoading, makeSelectPatientToDoMainTask, makeSelectPatientToDos } from 'containers/PatientToDos/selectors';
import ToDoList from 'components/ToDoList';
import { TO_DO_DEFINITION } from 'containers/PatientToDos/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PatientToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { selectedPatient } = this.props;
    const definition = TO_DO_DEFINITION;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const practitionerId = this.getPractitionerId();

    if (patientId && !practitionerId) {
      this.props.getPatientToDos(patientId, practitionerId, definition);
      this.props.getPatientToDoMainTask(patientId, definition);
    }
    if (patientId && practitionerId) {
      this.props.getPatientToDos(patientId, practitionerId, definition);
      this.props.getPatientToDoMainTask(patientId, definition);
    }
  }

  getPractitionerId() {
    const { user } = this.props;
    const practitionerId = user && (user.role === CARE_COORDINATOR_ROLE_VALUE) ? user.resource.logicalId : null;
    return practitionerId;
  }
  getToDoMainTaskId(toDoMainTask) {
    let toDoMintaskId = null;
    if (toDoMainTask && toDoMainTask.length > 0) {
      toDoMintaskId = toDoMainTask[0].reference.split('/')[1];
    }
    return toDoMintaskId;
  }
  render() {
    const { toDos, selectedPatient, loading, toDoMainTask } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const toDoMainTaskId = this.getToDoMainTaskId(toDoMainTask);
    const practitionerId = this.getPractitionerId();
    const CREATE_TO_DO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}&isMainTask=false&mainTaskId=${toDoMainTaskId}`;
    const taskBaseUrl = MANAGE_TASK_URL;
    const addNewItem = (practitionerId && patientId) ? {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_TO_DO_URL,
    } : undefined;
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar addNewItem={addNewItem} showFilter={false} />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            isPatient
            isPractitioner
            toDos={toDos}
            patientId={patientId}
            taskBaseUrl={taskBaseUrl}
          />
        </div>
        }
      </Card>
    );
  }
}

PatientToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getPatientToDos: PropTypes.func.isRequired,
  getPatientToDoMainTask: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object.isRequired,
  toDoMainTask: PropTypes.array.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectPatientToDos(),
  selectedPatient: makeSelectPatient(),
  toDoMainTask: makeSelectPatientToDoMainTask(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPatientToDos: (patientId, practitionerId, definition) => dispatch(getPatientToDos(patientId, practitionerId, definition)),
    getPatientToDoMainTask: (patientId, definition) => dispatch(getPatientToDoMainTask(patientId, definition)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientToDos', reducer });
const withSaga = injectSaga({ key: 'patientToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientToDos);
