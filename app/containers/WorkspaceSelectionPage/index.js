/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWorkspaceSelectionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>WorkspaceSelectionPage</title>
          <meta name="description" content="Description of WorkspaceSelectionPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
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
