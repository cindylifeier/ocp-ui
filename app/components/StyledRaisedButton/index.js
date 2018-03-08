/**
 *
 * StyledRaisedButton
 *
 */

import { RaisedButton } from 'material-ui';
import styled from 'styled-components';
import { teal500, white } from 'material-ui/styles/colors';

const StyledRaisedButton = styled(RaisedButton).attrs({
  backgroundColor: teal500,
  labelColor: white,
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    width: '150px',
  },
})('');

export default StyledRaisedButton;
