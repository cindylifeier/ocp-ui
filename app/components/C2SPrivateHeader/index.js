/**
 *
 * C2SPrivateHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';

import GoBackButton from 'components/GoBackButton';
import PatientAvatar from 'components/PatientAvatar';
import StyledToolbar from 'components/StyledToolbar';
import StyledImage from 'components/StyledImage';
import c2sBrandImg from 'images/c2s-logo.png';
import messages from './messages';


class C2SPrivateHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { patient: { genderCode, name }, mapPatientName } = this.props;
    return (
      <StyledToolbar color={common.white} height="60px">
        <ToolbarGroup>
          <PatientAvatar genderCode={genderCode} />
          <ToolbarTitle text={mapPatientName(name)} />
        </ToolbarGroup>
        <ToolbarGroup>
          <StyledImage height="35px" width="35px" src={c2sBrandImg} alt={<FormattedMessage {...messages.brandImg} />} />
          <ToolbarSeparator />
          <GoBackButton label={<FormattedMessage {...messages.homeButton} />} />
        </ToolbarGroup>
      </StyledToolbar>
    );
  }
}

C2SPrivateHeader.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
    genderCode: PropTypes.string,
  }).isRequired,
  mapPatientName: PropTypes.func.isRequired,
};

export default C2SPrivateHeader;
