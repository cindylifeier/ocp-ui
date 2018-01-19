/**
 *
 * LocationCreateEdit
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
import makeSelectLocationCreateEdit from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getUsStateAction } from '../App/actions';
import { US_STATES } from '../App/constants';
import { makeSelectUsStates } from '../App/selectors';

export class LocationCreateEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getUsStates();
  }
  render() {
    console.log(this.props.usStates);
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

LocationCreateEdit.propTypes = {
  getUsStates: PropTypes.func.isRequired,
  usStates: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locationcreateedit: makeSelectLocationCreateEdit(),
  usStates: makeSelectUsStates(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsStates: () => dispatch(getUsStateAction([US_STATES])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'locationCreateEdit', reducer });
const withSaga = injectSaga({ key: 'locationCreateEdit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LocationCreateEdit);
