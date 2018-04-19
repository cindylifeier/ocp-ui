/**
 *
 * StyledIconButton
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'material-ui-next/IconButton';


const sizes = ['small', 'medium', 'large'];

function defineSvgIconSize(sizeProp) {
  switch (sizeProp) {
    case 'small':
      return '18px';
    case 'medium':
      return '20px';
    case 'large':
      return '24px';
    default:
      return 'default';
  }
}

const StyledIconButton = styled(({ size, disableIconHover, ...other }) => (
  <IconButton {...other} />
))`
  && svg {
    max-height: ${({ size }) => size && defineSvgIconSize(size)};
  }

  &&:hover {
    background-color: inherit;
  }

  &&:hover svg {
    background-color: ${({ disableIconHover }) => disableIconHover ? 'default' : '#91bdba'};
    border-radius: 5px;
  }
`;

StyledIconButton.propTypes = {
  size: PropTypes.oneOf(sizes),
  disableIconHover: PropTypes.bool,
};

StyledIconButton.defaultProps = {
  disableIconHover: false,
};

export default StyledIconButton;
