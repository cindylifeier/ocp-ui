/**
 *
 * WorkspaceSelectionPage
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
import { CARE_COORDINATOR } from 'containers/App/constants';
import WorkspaceSelection from 'components/WorkspaceSelection';
import makeSelectWorkspaceSelectionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // TODO: Will get context from props
    const context = {
      role: CARE_COORDINATOR,
    };
    return (
      <div>
        <Helmet>
          <title>Switch Role</title>
          <meta name="description" content="Switch role page of Omnibus Care Plan application" />
        </Helmet>
        <WorkspaceSelection context={context} />
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
