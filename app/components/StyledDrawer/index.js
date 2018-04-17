/**
 *
 * StyledDrawer
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from 'material-ui-next/Drawer';

const StyledDrawer = styled(({ width, margin, ...other }) => (
  <Drawer {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    border: 1px solid rgba(121, 121, 121, 1);
    background-color: rgba(242, 242, 242, 1);
  }
`;

StyledDrawer.propTypes = {
  width: PropTypes.string,
  margin: PropTypes.string,
};

StyledDrawer.defaultProps = {
  width: '768px',
  margin: '0px',
};

export default StyledDrawer;
