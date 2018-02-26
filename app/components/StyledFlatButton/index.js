/**
 *
 * StyledFlatButton
 *
 */
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';


const StyledFlatButton = styled(FlatButton)`
  color: #366 !important;

  & svg {
    fill: #d2d2c3 !important;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  &:hover svg {
    fill: #366 !important;
  }
`;

StyledFlatButton.propTypes = {};

export default StyledFlatButton;
