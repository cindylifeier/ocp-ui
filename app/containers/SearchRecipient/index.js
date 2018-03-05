/**
 *
 * SearchRecipient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchRecipient from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SearchRecipient extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SearchRecipient.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchrecipient: makeSelectSearchRecipient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchRecipient', reducer });
const withSaga = injectSaga({ key: 'searchRecipient', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchRecipient);
