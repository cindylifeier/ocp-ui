/**
 *
 * BaseButton
 *
 */

import styled from 'styled-components';
import Button from 'material-ui-next/Button';
import teal from 'material-ui-next/colors/teal';
import common from 'material-ui-next/colors/common';

const BaseButton = styled(Button)`
  && {
    background-color: ${teal['500']};
    color: ${common.white};
    font-size: 13px;
    font-weight: 400;
    width: 85px;
  }
`;

BaseButton.propTypes = {};

export default BaseButton;
