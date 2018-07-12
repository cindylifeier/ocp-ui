/**
 *
 * ManageRelatedPersonDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledDialog from 'components/StyledDialog';
import StyledFlatButton from 'components/StyledFlatButton';
import SearchBar from 'components/SearchBar';
import messages from './messages';

function ManageRelatedPersonDialog(props) {
  const { dialogOpen, onDialogClose, onRelatedPersonsSearch } = props;
  return (
    <div>
      <StyledDialog open={dialogOpen} fullWidth>
        <DialogTitle>
          <FormattedMessage {...messages.manageRelatedPersonDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <SearchBar onSearch={onRelatedPersonsSearch} />
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
  onRelatedPersonsSearch: PropTypes.func.isRequired,
};

export default ManageRelatedPersonDialog;

