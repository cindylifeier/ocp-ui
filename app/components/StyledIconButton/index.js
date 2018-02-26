/**
 *
 * StyledIconButton
 *
 */
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';

const StyledIconButton = styled(IconButton).attrs({
  style: { position: 'relative' },
  iconStyle: {
    width: '100%',
    height: 26,
    position: 'absolute',
    top: '0',
    right: '0',
  },
})`
  & svg {
    fill: rgb(51, 51, 51) !important;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  &:hover svg {
    fill: #26a69a !important;
  }
`;

StyledIconButton.propTypes = {};

export default StyledIconButton;
