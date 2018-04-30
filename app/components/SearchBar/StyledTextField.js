import styled from 'styled-components';
import TextField from 'components/TextField';

const StyledTextField = styled(TextField).attrs({
  // we can define static props
  hintStyle: {
    fontSize: '13px',
    bottom: '7px',
  },
  inputStyle: {
    fontSize: '13px',
    bottom: '4px',
  },
  style: {
    width: '150px',
    height: '30px',
  },
})('');

StyledTextField.propTypes = {};

export default StyledTextField;
