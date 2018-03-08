/**
 *
 * AddTelecomsButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const AddTelecomsButton = StyledRaisedButton.extend.attrs({
  style: {
    minWidth: '10%',
  },
})`
   margin-top: 2vh;
`;

AddTelecomsButton.propTypes = {};

export default AddTelecomsButton;
