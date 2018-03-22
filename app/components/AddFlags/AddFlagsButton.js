/**
 *
 * AddFlagsButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const AddFlagsButton = StyledRaisedButton.extend.attrs({
  style: {
    minWidth: '10%',
  },
})`
   margin-top: 2vh;
`;

AddFlagsButton.propTypes = {};

export default AddFlagsButton;
