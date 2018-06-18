/**
 *
 * AddNewItemButton
 *
 */

import styled from 'styled-components';
import StyledFlatButton from 'components/StyledFlatButton';
import teal from 'material-ui-next/colors/teal';

function defineTextColor(colorPros) {
  switch (colorPros) {
    case 'primary':
      return teal['500'];
    case 'secondary':
      return '#666';
    default:
      return 'default';
  }
}

const AddNewItemButton = styled(StyledFlatButton)`
  && {
    color: ${({ color }) => defineTextColor(color)};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    padding-left: 5px;
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
};
export default AddNewItemButton;
