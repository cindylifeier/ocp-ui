import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

const AddParticipantDialog = styled(Dialog).attrs({
  contentStyle: {
    width: '70%',
    maxWidth: 'none',
  },
})('');

AddParticipantDialog.propTypes = {};

export default AddParticipantDialog;
