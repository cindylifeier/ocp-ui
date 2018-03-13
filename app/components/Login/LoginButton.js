import styled from 'styled-components';
import Button from 'material-ui-next/Button';
import teal from 'material-ui-next/colors/teal';
import common from 'material-ui-next/colors/common';


const LoginButton = styled(Button)`
  && {
    background-color: ${teal['500']};
    color: ${common.white};
  }
`;

LoginButton.propTypes = {};

export default LoginButton;
