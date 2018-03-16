/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import WorkspaceSelection from 'components/WorkspaceSelection';
import { setWorkflowRole } from './actions';
import saga from './saga';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Switch Role</title>
          <meta name="description" content="Switch role page of Omnibus Care Plan application" />
        </Helmet>
        <WorkspaceSelection
          {...this.props}
          onSetWorkflowRole={this.props.onSetWorkflowRole}
        />
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {
  onSetWorkflowRole: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onSetWorkflowRole: (workflowRole) => dispatch(setWorkflowRole(workflowRole)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'workspaceSelectionPage', saga });

export default compose(
  withSaga,
  withConnect,
)(WorkspaceSelectionPage);
