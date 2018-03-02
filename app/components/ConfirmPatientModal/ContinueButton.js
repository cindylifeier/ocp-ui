/**
 *
 * ContinueButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const ContinueButton = StyledRaisedButton.extend.attrs({
  backgroundColor: 'rgba(51, 102, 102, 1)',
  labelColor: 'white',
  style: {
    width: '140px',
  },
})('');

export default ContinueButton;
