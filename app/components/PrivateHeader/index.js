/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AccountBox from 'material-ui/svg-icons/action/account-box';

import Logout from 'containers/Logout';
import StyledBrandImage from 'components/StyledBrandImage';
import brandImg from 'images/omnibus-care-plan-logo.png';
import PrivateHeaderToolbar from './PrivateHeaderToolbar';
import messages from './messages';


function PrivateHeader(props) {
  return (
    <PrivateHeaderToolbar>
      <ToolbarGroup firstChild>
        <StyledBrandImage src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
      </ToolbarGroup>
      {props.auth.isAuthenticated &&
      <ToolbarGroup lastChild>
        <AccountBox />
        {props.context.patient.name ?
          <strong>{props.context.patient.name}</strong> :
          <strong>{props.context.patient.user_name}</strong>
        }
        <Logout />
      </ToolbarGroup>
      }
    </PrivateHeaderToolbar>
  );
}

PrivateHeader.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  context: PropTypes.shape({
    patient: PropTypes.shape({
      user_name: PropTypes.string,
      user_id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default PrivateHeader;
