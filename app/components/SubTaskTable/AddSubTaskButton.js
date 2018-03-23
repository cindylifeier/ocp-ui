/**
 *
 * AddSubTaskButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const AddSubTaskButton = StyledRaisedButton.extend.attrs({
  style: {
    minWidth: '10%',
  },
})`
   margin-top: 2vh;
`;

AddSubTaskButton.propTypes = {};

export default AddSubTaskButton;
