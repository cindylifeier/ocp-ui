/**
 *
 * StyledRaisedButton
 *
 */

import { RaisedButton } from 'material-ui';
import styled from 'styled-components';

const StyledRaisedButton = styled(RaisedButton).attrs({
  backgroundColor: '#006666',
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    width: '50px',
  },
})`
`;

export default StyledRaisedButton;
