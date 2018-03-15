/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import WorkspaceSelection from 'components/WorkspaceSelection';
import makeSelectWorkspaceSelectionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Switch Role</title>
          <meta name="description" content="Switch role page of Omnibus Care Plan application" />
        </Helmet>
        <WorkspaceSelection{...this.props} />
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  workspaceselectionpage: makeSelectWorkspaceSelectionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'workspaceSelectionPage', reducer });
const withSaga = injectSaga({ key: 'workspaceSelectionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkspaceSelectionPage);
