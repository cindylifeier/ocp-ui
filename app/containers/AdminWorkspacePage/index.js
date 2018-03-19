/**
 *
 * AdminWorkspacePage
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
import { getOrganizations } from 'containers/Organizations/actions';
import renderOrganizations from 'containers/Organizations/render';
import renderPractitioners from 'containers/Practitioners/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import makeSelectAdminWorkspacePage from './selectors';
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
      type: 'row',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'stack',
        width: 50,
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        content: [{
          title: 'Organizations',
          type: 'component',
          componentName: 'organizations',
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
          title: 'Practitioners',
          type: 'component',
          componentName: 'practitioners',
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
  { name: 'organizations', text: 'Organizations', factoryMethod: renderOrganizations },
  { name: 'practitioners', text: 'Practitioners', factoryMethod: renderPractitioners },
];

export class AdminWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // TODO: Resolve delay issue
    // To delay to call dispatch getTasks in order to ensure goldenLayout instance get mount
    const initialCurrentPage = 1;
    setTimeout(() => this.props.getOrganizations(initialCurrentPage), 500);
  }

  render() {
    return (
      <Page>
        <Helmet>
          <title>Admin Workspace</title>
          <meta name="description" content="Admin workspace page of Omnibus Care Plan application" />
        </Helmet>
        <GoldenLayout
          containerId="golden-admin-workspace"
          componentMetadata={componentMetadata}
          stateMetadata={initialStateMetadata}
        />
      </Page>
    );
  }
}

AdminWorkspacePage.propTypes = {
  getOrganizations: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminworkspacepage: makeSelectAdminWorkspacePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrganizations: (showInactive, currentPage) => dispatch(getOrganizations(showInactive, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'adminWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminWorkspacePage);
