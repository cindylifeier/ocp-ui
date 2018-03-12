import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

const AddParticipantDialog = styled(Dialog).attrs({
  contentStyle: {
    width: '70%',
    maxWidth: 'none',
  },
})('');

AddParticipantDialog.propTypes = {};

export default AddParticipantDialog;
