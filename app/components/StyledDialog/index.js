/**
 *
 * StyledDialog
 *
 */

import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

const StyledDialog = styled(Dialog).attrs({
  titleStyle: {
    position: 'absolute',
    right: '0px',
  },
  contentStyle: {
    borderRadius: '4px',
    border: '2px solid rgba(0, 51, 102, 1)',
    maxWidth: '550px',
  },
})('');

StyledDialog.propTypes = {};

export default StyledDialog;
