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

const anchors = ['left', 'top', 'right', 'bottom'];

function OrganizationSlider(props) {
  const { anchor, open, onClose } = props;
  return (
    <div>
      <StyledDrawer margin="0 100px 0 0" anchor={anchor} open={open} transitionDuration={{ enter: 500, exit: 20 }}>
        <StyledIconButton onClick={onClose}>
          <Cancel />
        </StyledIconButton>
        Drawer content
      </StyledDrawer>
    </div>
  );
}

OrganizationSlider.propTypes = {
  anchor: PropTypes.oneOf(anchors),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

OrganizationSlider.defaultProps = {
  anchor: 'right',
};

export default OrganizationSlider;
