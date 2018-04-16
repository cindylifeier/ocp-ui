/**
 *
 * StyledDialog
 *
 */

import React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui-next/Dialog';

const StyledDialog = styled(({ ...other }) => (
  <Dialog {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    border: 2px solid rgba(0, 51, 102, 1);
    border-radius: 4px;
  }
`;

StyledDialog.propTypes = {};

export default StyledDialog;
