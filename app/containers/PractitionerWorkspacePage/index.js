/**
 *
 * PractitionerWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import GoldenLayout from 'components/GoldenLayout';
import renderPatientsComponent from 'containers/Patients/render';
import renderLocationsComponent from 'containers/Locations/render';
import renderToDosComponent from 'containers/ToDos/render';
import renderHealthcareServicesComponent from 'containers/HealthcareServices/render';
import renderUpcomingTasksComponent from 'containers/UpcomingTasks/render';
import renderUpcomingAppointmentsComponent from 'containers/UpcomingAppointments/render';
import renderNotFound from 'containers/NotFoundPage/render';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectWorkflowRolesData } from 'containers/WorkspaceSelectionPage/selectors';
import makeSelectPractitionerWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class PractitionerWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static componentMetadata = [
    { name: 'patients', text: 'PATIENTS', factoryMethod: renderPatientsComponent },
    { name: 'locations', text: 'LOCATIONS', factoryMethod: renderLocationsComponent },
    { name: 'healthcareServices', text: 'HEALTHCARE SERVICES', factoryMethod: renderHealthcareServicesComponent },
    { name: 'upcomingTasks', text: 'TASKS', factoryMethod: renderUpcomingTasksComponent },
    {
      name: 'upcomingAppointments',
      text: 'APPOINTMENTS',
      factoryMethod: renderUpcomingAppointmentsComponent,
    },
    { name: 'toDos',
      text: 'MY TO DO',
      factoryMethod: renderToDosComponent,
    },
    { name: 'calendar', text: 'CALENDAR', factoryMethod: renderNotFound },
  ];

  static careManagerLayout = {
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
        type: 'stack',
        width: 100,
        height: 33.3333333333333,
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        content: [{
          title: 'PATIENTS',
          type: 'component',
          componentName: 'patients',
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
        height: 33.3333333333333,
        content: [{
          title: 'LOCATIONS',
          type: 'component',
          componentName: 'locations',
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
        height: 33.3333333333333,
        content: [{
          title: 'HEALTHCARE SERVICES',
          type: 'component',
          componentName: 'healthcareServices',
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

  static careCoordinatorLayout = {
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
        height: 25,
        content: [{
          type: 'stack',
          width: 50,
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'MY TO DO',
            type: 'component',
            componentName: 'toDos',
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
            title: 'CALENDAR',
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
        height: 25,
        content: [{
          title: 'PATIENTS',
          type: 'component',
          componentName: 'patients',
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
        height: 25,
        content: [{
          title: 'TASKS',
          type: 'component',
          componentName: 'upcomingTasks',
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
        height: 25,
        content: [{
          title: 'APPOINTMENTS',
          type: 'component',
          componentName: 'upcomingAppointments',
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

  constructor(props) {
    super(props);
    this.getStateMetadataForRole = this.getStateMetadataForRole.bind(this);
  }

  getStateMetadataForRole() {
    const CARE_MANAGER = this.props.workflowRoles.careManagerWorkflowRole.value;
    const CARE_COORDINATOR = this.props.workflowRoles.careCoordinatorWorkflowRole.value;
    const { user: { role } } = this.props;
    switch (role) {
      case CARE_MANAGER:
        return PractitionerWorkspacePage.careManagerLayout;
      case CARE_COORDINATOR:
        return PractitionerWorkspacePage.careCoordinatorLayout;
      default:
        return null;
    }
  }

  render() {
    const stateMetadata = this.getStateMetadataForRole();
    return (
      <div>
        <Helmet>
          <title>Practitioner Workspace</title>
          <meta name="description" content="Practitioner workspace page of Omnibus Care Plan application" />
        </Helmet>
        {stateMetadata &&
        <GoldenLayout
          containerHeight="200vh"
          containerId="golden-practitioner-workspace"
          componentMetadata={PractitionerWorkspacePage.componentMetadata}
          stateMetadata={stateMetadata}
        />
        }
      </div>
    );
  }
}

PractitionerWorkspacePage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  workflowRoles: PropTypes.shape({
    careManagerWorkflowRole: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
    careCoordinatorWorkflowRole: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  practitionerworkspacepage: makeSelectPractitionerWorkspacePage(),
  user: makeSelectUser(),
  workflowRoles: makeSelectWorkflowRolesData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'practitionerWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerWorkspacePage);
