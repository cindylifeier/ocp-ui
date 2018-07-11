import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import StyledDialog from 'components/StyledDialog';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';

function ManageRelatedPersonDialog(props) {
  const { dialogOpen, onDialogClose } = props;
  return (
    <div>
      <StyledDialog open={dialogOpen} fullWidth>
        <DialogTitle>
          <FormattedMessage {...messages.manageRelatedPersonDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <h1>Test</h1>
        </DialogContent>
        <DialogActions>
          <StyledFlatButton onClick={onDialogClose}>
            <FormattedMessage {...messages.cancelButton} />
          </StyledFlatButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

ManageRelatedPersonDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
};

export default ManageRelatedPersonDialog;
