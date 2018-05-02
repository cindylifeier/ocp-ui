/**
 *
 * AddNewItemButton
 *
 */

import styled from 'styled-components';
import StyledFlatButton from 'components/StyledFlatButton';
import teal from 'material-ui-next/colors/teal';
import common from 'material-ui-next/colors/common';

function defineTextColor(colorPros) {
  switch (colorPros) {
    case 'primary':
      return teal['500'];
    case 'secondary':
      return common.white;
    default:
      return 'default';
  }
}

const AddNewItemButton = styled(StyledFlatButton)`
  && {
    color: ${({ color }) => defineTextColor(color)};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    padding-left: ${({ paddingLeft }) => paddingLeft};
    max-height: ${({ maxHeight }) => maxHeight};
  }

  &&:hover {
    background-color: inherit;
  }
`;

AddNewItemButton.propTypes = {};

AddNewItemButton.defaultProps = {
  color: 'secondary',
  fontSize: '12px',
  fontWeight: 'normal',
  paddingLeft: '5px',
  maxHeight: '32px',
};
export default AddNewItemButton;
