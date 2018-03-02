/**
 *
 * ContinueButton
 *
 */
import StyledIconButton from 'components/StyledIconButton';

const CloseButton = StyledIconButton.extend.attrs({
  style: {
    position: 'absolute',
    right: 0,
  },
})('');

export default CloseButton;
