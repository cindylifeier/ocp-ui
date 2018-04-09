/**
 *
 * StyledRaisedButton
 *
 */

import styled from 'styled-components';
import Button from 'material-ui-next/Button';
import common from 'material-ui-next/colors/common';
import teal from 'material-ui-next/colors/teal';

const StyledRaisedButton = styled(Button).attrs({
  variant: 'raised',
})`
  && {
    background-color: ${teal['500']};
    color: ${common.white};
    font-size: 13px;
    font-weight: bold;
    width: ${(props) => props.width || '150px'};
  }

  &&:hover {
    background-color: ${teal['700']};
  }

  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

export default StyledRaisedButton;
