/**
 *
 * AssignLocationToPractitionerPage
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
import makeSelectAssignLocationToPractitionerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AssignLocationToPractitionerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AssignLocationToPractitionerPage</title>
          <meta name="description" content="Description of AssignLocationToPractitionerPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AssignLocationToPractitionerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assignlocationtopractitionerpage: makeSelectAssignLocationToPractitionerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignLocationToPractitionerPage', reducer });
const withSaga = injectSaga({ key: 'assignLocationToPractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignLocationToPractitionerPage);
