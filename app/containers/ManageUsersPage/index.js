/**
 *
 * ManageUsersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import renderPermissionAssignmentsComponent from 'containers/PermissionAssignments/render';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import makeSelectManageUsersPage from './selectors';
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
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: true,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 10,
      borderGrabWidth: 15,
      minItemHeight: 200,
      minItemWidth: 450,
      headerHeight: 40,
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
      content: [
        {
          title: 'User Permission Management',
          type: 'component',
          componentName: 'practitionerPermissionAssignment',
          isClosable: true,
          reorderEnabled: true,
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'practitionerPermissionAssignment', text: 'practitionerPermissionAssignment', factoryMethod: renderPermissionAssignmentsComponent },
];

export class ManageUsersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page>
        <Helmet>
          <title>Admin Manage Permissions Page</title>
          <meta name="description" content="Admin Manage Permissions page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerHeight="85vh"
          containerWidth="90vw"
          containerId="golden-admin-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

ManageUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageuserspage: makeSelectManageUsersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageUsersPage', reducer });
const withSaga = injectSaga({ key: 'manageUsersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUsersPage);
