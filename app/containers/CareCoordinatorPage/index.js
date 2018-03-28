/**
 *
 * CareCoordinatorPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import renderUpcomingTasksComponent from 'containers/UpcomingTasks/render';
import renderUpcomingAppointmentsComponent from 'containers/UpcomingAppointments/render';

import GoldenLayout from 'components/GoldenLayout';
import CareCoordinatorPageGrid from './CareCoordinatorPageGrid';
import CareCoordinatorPageCell from './CareCoordinatorPageCell';

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
      responsiveMode: onload,
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
        type: 'stack',
        header: {

        },
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 50,
        content: [{
          title: 'Upcoming Tasks',
          type: 'component',
          componentName: 'upcomingTasks',
          isClosable: true,
          reorderEnabled: true,
        }],
      },
      {
        type: 'stack',
        header: {

        },
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        width: 100,
        height: 50,
        content: [{
          title: 'Upcoming Appointments',
          type: 'component',
          componentName: 'upcomingAppointments',
          isClosable: true,
          reorderEnabled: true,
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
  { name: 'upcomingTasks', text: 'Upcoming Tasks', factoryMethod: renderUpcomingTasksComponent },
  { name: 'upcomingAppointments', text: 'Upcoming Appointments', factoryMethod: renderUpcomingAppointmentsComponent },
];


export class CareCoordinatorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Care Coordinator</title>
          <meta name="description" content="Care Coordinator page of Omnibus Care Plan application" />
        </Helmet>
        <CareCoordinatorPageGrid columns={1}>
          <CareCoordinatorPageCell>
            <GoldenLayout
              containerId="golden-patient"
              containerHeight="150vh"
              componentMetadata={componentMetadata}
              stateMetadata={initialStateMetadata}
            />
          </CareCoordinatorPageCell>
        </CareCoordinatorPageGrid>
      </div>
    );
  }
}

CareCoordinatorPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(CareCoordinatorPage);
