/**
 *
 * StyledIconButton
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'material-ui-next/IconButton';


const StyledIconButton = styled(({ disableIconHover, ...other }) => (
  <IconButton {...other} />
))`
  &&:hover {
    background-color: inherit;
  }

  &&:hover svg {
    background-color: ${({ disableIconHover }) => disableIconHover ? 'default' : '#91bdba'};
    border-radius: 5px;
  }
`;

StyledIconButton.propTypes = {
  disableIconHover: PropTypes.bool,
};

StyledIconButton.defaultProps = {
  disableIconHover: false,
};

export default StyledIconButton;
