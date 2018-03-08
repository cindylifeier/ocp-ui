/**
 *
 * AddAddressesButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const AddAddressesButton = StyledRaisedButton.extend.attrs({
  style: {
    minWidth: '10%',
  },
})`
   margin-top: 2vh;
`;

AddAddressesButton.propTypes = {};

export default AddAddressesButton;
