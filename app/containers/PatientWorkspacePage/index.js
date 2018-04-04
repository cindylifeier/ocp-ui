/**
 *
 * PatientWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import renderUnderConstruction from 'components/UnderConstruction/render';
import renderTasks from 'containers/Tasks/render';
import renderPatientToDosComponent from 'containers/PatientToDos/render';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderConsents from 'containers/Consents/render';
import { PATIENT_ROLE_CODE } from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import PatientDetails from 'components/PatientDetails';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import reducer from './reducer';
import saga from './saga';
import { flattenPatientData } from './helpers';

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
      width: 100,
      content: [{
        type: 'row',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        height: 60,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 60,
          width: 50,
          content: [{
            title: 'My To Do',
            type: 'component',
            componentName: 'toDo',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          width: 50,
          content: [{
            title: 'Calendar',
            type: 'component',
            componentName: 'calendar',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        ],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 60,
        content: [{
          title: 'Tasks',
          type: 'component',
          componentName: 'tasks',
          isClosable: true,
          reorderEnabled: true,
        },
        ],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 60,
        content: [{
          title: 'Communication',
          type: 'component',
          componentName: 'communication',
          isClosable: true,
          reorderEnabled: true,
        },
        ],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 60,
        content: [{
          title: 'My Appointments',
          type: 'component',
          componentName: 'appointments',
          isClosable: true,
          reorderEnabled: true,
        },
        ],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 60,
        content: [{
          title: 'Consents',
          type: 'component',
          componentName: 'consents',
          isClosable: true,
          reorderEnabled: true,
        },
        ],
      },
      ],
    },
    ],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'toDo', text: 'My to do', factoryMethod: renderPatientToDosComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderUnderConstruction },
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasks },
  { name: 'communication', text: 'Communication', factoryMethod: renderCommunicationsComponent },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'consents', text: 'Consents', factoryMethod: renderConsents },
];

export class PatientWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { patient, user } = this.props;
    return (
      <Page>
        <Helmet>
          <title>Patient Workspace</title>
          <meta name="description" content="Patient workspace page of Omnibus Care Plan application" />
        </Helmet>
        {patient &&
        <Grid columns={1}>
          <Cell>
            <PatientDetails
              patient={patient}
              isPatientUser={user.role === PATIENT_ROLE_CODE}
              flattenPatientData={flattenPatientData}
            />
          </Cell>
          <Cell>
            <GoldenLayout
              containerHeight="350vh"
              containerId="golden-patient-workspace"
              componentMetadata={componentMetadata}
              stateMetadata={initialStateMetadata}
            />
          </Cell>
        </Grid>}
      </Page>
    );
  }
}

PatientWorkspacePage.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'patientWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientWorkspacePage);
