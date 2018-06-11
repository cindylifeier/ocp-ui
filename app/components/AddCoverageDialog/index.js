/**
*
* AddCoverageDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import StyledFlatButton from 'components/StyledFlatButton';
import DialogTitle from 'material-ui-next/es/Dialog/DialogTitle';
import messages from './messages';

class AddCoverageDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { open, handleDialogClose } = this.props;

    const actionsButtons = [
      <StyledFlatButton onClick={handleDialogClose}>
        <FormattedMessage {...messages.addCoverageDialogCancelBtnLabel} />
      </StyledFlatButton>,
    ];
    return (
      <div>
        <Dialog
          actions={actionsButtons}
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <DialogTitle > <FormattedMessage {...messages.addCoverageDialogTitle} /></DialogTitle>
        </Dialog>
      </div>
    );
  }
}

AddCoverageDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

export default AddCoverageDialog;
