/**
 *
 * SelectCareTeam
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
import makeSelectSelectCareTeam from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SelectCareTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Select Care Team</title>
          <meta name="description" content="Select Care Team Dialog" />
        </Helmet>
        <FormattedMessage {...messages.selectCareTeamDialogTitle} />
      </div>
    );
  }
}

SelectCareTeam.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectcareteam: makeSelectSelectCareTeam(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'selectCareTeam', reducer });
const withSaga = injectSaga({ key: 'selectCareTeam', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectCareTeam);
