/**
 *
 * StyledChip
 *
 */

import Chip from 'material-ui/Chip';
import styled from 'styled-components';
import teal from 'material-ui-next/colors/teal';
import common from 'material-ui-next/colors/common';

const teal500 = teal['500'];
const white = common.white;

const StyledChip = styled(Chip).attrs({
  labelColor: white,
  backgroundColor: teal500,
  style: {
    borderRadius: '5px',
    margin: '4px',
  },
})('');

export default StyledChip;
