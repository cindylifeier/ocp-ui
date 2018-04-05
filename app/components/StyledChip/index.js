/**
 *
 * StyledChip
 *
 */

import Chip from 'material-ui/Chip';
import styled from 'styled-components';
import { teal500, white } from 'material-ui/styles/colors';

const StyledChip = styled(Chip).attrs({
  labelColor: white,
  backgroundColor: teal500,
  style: {
    borderRadius: '5px',
    margin: '4px',
  },
})('');

export default StyledChip;
