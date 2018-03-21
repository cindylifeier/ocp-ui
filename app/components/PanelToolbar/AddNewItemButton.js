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
  },
})('');

AddNewItemButton.propTypes = {};

export default AddNewItemButton;
