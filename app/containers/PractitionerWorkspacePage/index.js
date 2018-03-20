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
import renderHealthcareServicesComponent from 'containers/HealthcareServices/render';
import renderUpcomingTasksComponent from 'containers/UpcomingTasks/render';
import renderUpcomingAppointmentsComponent from 'containers/UpcomingAppointments/render';
import renderNotFound from 'containers/NotFoundPage/render';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { CARE_COORDINATOR, CARE_MANAGER, ORGANIZATION_ADMIN, PCP } from 'containers/App/constants';
import makeSelectPractitionerWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class PractitionerWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static componentMetadata = [
    { name: 'patients', text: 'Patients', factoryMethod: renderPatientsComponent },
    { name: 'locations', text: 'Locations', factoryMethod: renderLocationsComponent },
    { name: 'healthcareServices', text: 'Healthcare Services', factoryMethod: renderHealthcareServicesComponent },
    { name: 'upcomingTasks', text: 'Upcoming Tasks', factoryMethod: renderUpcomingTasksComponent },
    { name: 'upcomingAppointments', text: 'Upcoming Appointments', factoryMethod: renderUpcomingAppointmentsComponent },
    { name: 'todos', text: 'TO DO', factoryMethod: renderNotFound },
    { name: 'calendar', text: 'Calendar', factoryMethod: renderNotFound },
    { name: 'consents', text: 'Consents', factoryMethod: renderNotFound },
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
      headerHeight: 20,
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
      headerHeight: 20,
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
        height: 80,
        content: [{
          type: 'column',
          isClosable: true,
          reorderEnabled: true,
          title: '',
          width: 100,
          content: [{
            type: 'stack',
            width: 100,
            height: 25,
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
            height: 25,
            content: [{
              title: 'UPCOMING TASKS',
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
              title: 'UPCOMING APPOINTMENTS',
              type: 'component',
              componentName: 'upcomingAppointments',
              isClosable: true,
              reorderEnabled: true,
            },
            ],
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
              // "height" : 32.5074466458406,
              width: 50,
              content: [{
                title: 'TO DO',
                type: 'component',
                componentName: 'todos',
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
        height: 20,
        content: [{
          title: 'CONSENTS',
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

  constructor(props) {
    super(props);
    this.getStateMetadataForRole = this.getStateMetadataForRole.bind(this);
  }

  getStateMetadataForRole() {
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
    return (
      <div>
        <Helmet>
          <title>Practitioner Workspace</title>
          <meta name="description" content="Practitioner workspace page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="200vh"
          containerId="golden-practitioner-workspace"
          componentMetadata={PractitionerWorkspacePage.componentMetadata}
          stateMetadata={this.getStateMetadataForRole()}
        />
      </div>
    );
  }
}

PractitionerWorkspacePage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.oneOf([CARE_MANAGER, CARE_COORDINATOR, ORGANIZATION_ADMIN, PCP]).isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionerworkspacepage: makeSelectPractitionerWorkspacePage(),
  user: makeSelectUser(),
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
