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
import { getLookupsAction } from '../App/actions';
import { USPSSTATES } from '../App/constants';
import { makeSelectUspsStates } from '../App/selectors';

export class LocationCreateEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getUsStates();
  }
  render() {
    console.log(this.props.uspsStates);
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

LocationCreateEdit.propTypes = {
  getUsStates: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locationcreateedit: makeSelectLocationCreateEdit(),
  uspsStates: makeSelectUspsStates(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsStates: () => dispatch(getLookupsAction([USPSSTATES])),
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
