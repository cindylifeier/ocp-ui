/**
 *
 * AddNewItemButton
 *
 */

import styled from 'styled-components';
import StyledFlatButton from 'components/StyledFlatButton';

const AddNewItemButton = styled(StyledFlatButton)`
  && {
    color: #fff;
    font-size: 12px;
    padding-left: 0;
    max-height: 32px;
  }

  &&:hover {
    background-color: inherit;
  }
`;

AddNewItemButton.propTypes = {};

export default AddNewItemButton;
