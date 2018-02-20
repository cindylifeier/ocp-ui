/**
 *
 * RelatedPersons
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
import makeSelectRelatedPersons from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class RelatedPersons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

RelatedPersons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  relatedpersons: makeSelectRelatedPersons(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'relatedPersons', reducer });
const withSaga = injectSaga({ key: 'relatedPersons', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RelatedPersons);
