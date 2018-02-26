/**
 *
 * StyledDivider
 *
 */

import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import { teal500 } from 'material-ui/styles/colors';


const StyledDivider = styled(Divider).attrs({
  style: {
    backgroundColor: teal500,
    height: '3px',
  },
})('');

StyledDivider.propTypes = {};

export default StyledDivider;
