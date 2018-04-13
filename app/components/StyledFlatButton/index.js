/**
 *
 * StyledFlatButton
 *
 */
import styled from 'styled-components';
import Button from 'material-ui-next/Button/index';


const StyledFlatButton = styled(Button)`
  && {
    color: #366;
  }

  && svg {
    fill: #d2d2c3;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }
 
  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

StyledFlatButton.propTypes = {};

export default StyledFlatButton;
