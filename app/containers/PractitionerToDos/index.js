/**
 *
 * PractitionerToDos
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
import makeSelectPractitionerToDos from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PractitionerToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PractitionerToDos.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionertodos: makeSelectPractitionerToDos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerToDos', reducer });
const withSaga = injectSaga({ key: 'practitionerToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerToDos);
