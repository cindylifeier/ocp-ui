/**
 *
 * OrganizationSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Cancel from '@material-ui/icons/Cancel';

import StyledDrawer from 'components/StyledDrawer';
import StyledIconButton from 'components/StyledIconButton';
import InfoSection from 'components/InfoSection';
import OrganizationSliderHeader from './OrganizationSliderHeader';
import OrganizationSliderServices from './OrganizationSliderServices';

const anchors = ['left', 'top', 'right', 'bottom'];

function OrganizationSlider(props) {
  const { anchor, open, onClose, organization } = props;
  return (
    <div>
      <StyledDrawer anchor={anchor} open={open} transitionDuration={{ enter: 500, exit: 20 }}>
        <StyledIconButton onClick={onClose}>
          <Cancel />
        </StyledIconButton>
        <InfoSection>
          <OrganizationSliderHeader organization={organization} />
        </InfoSection>
        <InfoSection>
          <OrganizationSliderServices organization={organization} />
        </InfoSection>
      </StyledDrawer>
    </div>
  );
}

OrganizationSlider.propTypes = {
  anchor: PropTypes.oneOf(anchors),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }).isRequired,
};

OrganizationSlider.defaultProps = {
  anchor: 'right',
};

export default OrganizationSlider;
