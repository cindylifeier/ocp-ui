/**
 *
 * PatientPage
 *
 */

import renderPatientToDosComponent from 'containers/PatientToDos/render';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import GoldenLayout from 'components/GoldenLayout';
import renderUnderConstructionComponent from 'components/UnderConstruction/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderTasksComponent from 'containers/Tasks/render';
import renderConsentsComponent from 'containers/Consents/render';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import PatientDetails from 'components/PatientDetails';
import { flattenPatientData } from 'containers/PatientPage/helpers';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import PatientPageCell from './PatientPageCell';
import PatientPageGrid from './PatientPageGrid';


export const initialStateMetadata =
  {
    settings: {
      hasHeaders: true,
      constrainDragToContainer: false,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: true,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 5,
      borderGrabWidth: 15,
      minItemHeight: 10,
      minItemWidth: 10,
      headerHeight: 30,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window',
      popin: 'pop in',
      tabDropdown: 'additional tabs',
    },
    content: [{
      type: 'column',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'row',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        height: 50,
        content: [{
          type: 'column',
          isClosable: true,
          reorderEnabled: true,
          title: '',
          width: 50,
          content: [{
            type: 'stack',
            header: {},
            isClosable: true,
            reorderEnabled: true,
            title: '',
            activeItemIndex: 0,
            width: 50,
            height: 50,
            content: [{
              title: 'MY TO DO',
              type: 'component',
              componentName: 'toDos',
              isClosable: true,
              reorderEnabled: true,
            }],
          }, {
            type: 'stack',
            header: {},
            isClosable: true,
            reorderEnabled: true,
            title: '',
            activeItemIndex: 0,
            height: 50,
            content: [{
              title: 'Tasks',
              type: 'component',
              componentName: 'tasks',
              isClosable: true,
              reorderEnabled: true,
            }],
          }],
        }, {
          type: 'column',
          isClosable: true,
          reorderEnabled: true,
          title: '',
          width: 50,
          content: [{
            type: 'stack',
            width: 50,
            height: 50,
            isClosable: true,
            reorderEnabled: true,
            title: '',
            activeItemIndex: 0,
            content: [{
              title: 'CALENDAR',
              type: 'component',
              componentName: 'calendar',
              isClosable: true,
              reorderEnabled: true,
            }],
          }, {
            type: 'stack',
            header: {},
            isClosable: true,
            reorderEnabled: true,
            title: '',
            activeItemIndex: 0,
            height: 50,
            content: [{
              title: 'My Appointments',
              type: 'component',
              componentName: 'appointments',
              isClosable: true,
              reorderEnabled: true,
            }],
          }],
        }],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 25,
        content: [{
          title: 'Communications',
          type: 'component',
          componentName: 'communications',
          isClosable: true,
          reorderEnabled: true,
        }],
      }, {
        type: 'row',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        height: 25,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 25,
          width: 50,
          content: [{
            title: 'Consents',
            type: 'component',
            componentName: 'consents',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          width: 50,
          content: [{
            title: 'Care teams',
            type: 'component',
            componentName: 'careTeams',
            isClosable: true,
            reorderEnabled: true,
          }],
        }],
      }],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'communications', text: 'Communications', factoryMethod: renderCommunicationsComponent },
  { name: 'toDos', text: 'My To Do', factoryMethod: renderPatientToDosComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderUnderConstructionComponent },
  { name: 'consents', text: 'Consents', factoryMethod: renderConsentsComponent },
  { name: 'careTeams', text: 'Care teams', factoryMethod: renderCareTeamsComponent },
];

export class PatientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    const { patient } = this.props;
    if (patient && patient.id && patient.id === patientId) {
      this.props.refreshPatient();
    } else {
      this.props.getPatient(patientId);
    }
  }

  render() {
    const { patient } = this.props;
    const patientDetailsProps = { patient };
    return (
      <div>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>

        {patient &&
        <PatientPageGrid columns={1}>
          <PatientPageCell>
            <PatientDetails
              {...patientDetailsProps}
              flattenPatientData={flattenPatientData}
            />
          </PatientPageCell>
          <PatientPageCell>
            <GoldenLayout
              containerId="golden-patient"
              containerHeight="200vh"
              componentMetadata={componentMetadata}
              stateMetadata={initialStateMetadata}
            />
          </PatientPageCell>
        </PatientPageGrid>}
      </div>
    );
  }
}

PatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  refreshPatient: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PatientPage);
