/**
 *
 * Logout
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { MenuItem } from 'material-ui-next/Menu';

import injectSaga from 'utils/injectSaga';
import { clearAll } from 'containers/App/contextActions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { CARE_COORDINATOR_ROLE_CODE, PATIENT_ROLE_CODE } from 'containers/App/constants';
import { logout } from './actions';
import saga from './saga';
import messages from './messages';

export class Logout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { patient, onLogout } = this.props;
    return (
      <div>
        {patient &&
        <ShowHideWrapper allowedRoles={[PATIENT_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE]}>
          <MenuItem component={Link} to="/c2s-sof-ui/patient">
            Link to C2S Smart
          </MenuItem>
        </ShowHideWrapper>
        }
        <MenuItem onClick={onLogout}>
          <FormattedMessage {...messages.logoutButton} />
        </MenuItem>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(logout());
      dispatch(clearAll());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
