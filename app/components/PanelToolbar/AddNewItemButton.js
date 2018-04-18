/**
 *
 * AddNewItemButton
 *
 */

import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';

const AddNewItemButton = styled(FlatButton).attrs({
  labelStyle: {
    color: '#ffffff',
    fontSize: '12px',
    paddingLeft: '0',
  },
})`
  && {
    max-height: 32px;
  }
`;

AddNewItemButton.propTypes = {};

export default AddNewItemButton;
