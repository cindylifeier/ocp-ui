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
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import WorkspaceSelection from 'components/WorkspaceSelection';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { setUser } from 'containers/App/contextActions';
import saga from './saga';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSetWorkflowRole = this.onSetWorkflowRole.bind(this);
  }

  onSetWorkflowRole(role) {
    const { user } = this.props;
    this.props.setUser({ ...user, role });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Workspace Selection</title>
          <meta name="description" content="Workspace selection page of Omnibus Care Plan application" />
        </Helmet>
        <WorkspaceSelection
          {...this.props}
          onSetWorkflowRole={this.onSetWorkflowRole}
        />
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'workspaceSelectionPage', saga });

export default compose(
  withSaga,
  withConnect,
)(WorkspaceSelectionPage);
