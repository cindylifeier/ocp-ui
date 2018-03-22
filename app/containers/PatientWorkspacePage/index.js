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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import renderFactory from 'utils/goldenLayout/renderFactory';
import renderTasks from 'containers/Tasks/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import Card from 'components/Card';
import PanelToolbar from 'components/PanelToolbar';
import makeSelectPatientWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';

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
      showPopoutIcon: true,
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
            componentName: 'todo',
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

// TODO: will replace with particular render components
function renderEmptyGoldenLayoutComponent() {
  return (
    <Card>
      <PanelToolbar
        showNewItem={false}
        showUploadIcon={false}
      />
    </Card>
  );
}

export const componentMetadata = [
  { name: 'todo', text: 'My to do', factoryMethod: renderFactory(renderEmptyGoldenLayoutComponent) },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderFactory(renderEmptyGoldenLayoutComponent) },
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasks },
  { name: 'communication', text: 'Communication', factoryMethod: renderFactory(renderEmptyGoldenLayoutComponent) },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderFactory(renderEmptyGoldenLayoutComponent) },
  { name: 'consents', text: 'Consents', factoryMethod: renderFactory(renderEmptyGoldenLayoutComponent) },
];

export class PatientWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page>
        <Helmet>
          <title>Patient Workspace</title>
          <meta name="description" content="Patient workspace page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="330vh"
          containerId="golden-patient-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

PatientWorkspacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patientworkspacepage: makeSelectPatientWorkspacePage(),
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
