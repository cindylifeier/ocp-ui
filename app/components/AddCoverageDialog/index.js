/**
*
* AddCoverageDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import DialogTitle from 'material-ui-next/es/Dialog/DialogTitle';


import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

class AddCoverageDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { open, handleDialogClose, handleSaveCoverage } = this.props;

    const actionsButtons = [
      <StyledFlatButton onClick={handleDialogClose}>
        <FormattedMessage {...messages.addCoverageDialogCancelBtnLabel} />
      </StyledFlatButton>,
      <StyledRaisedButton onClick={handleSaveCoverage}>
        <FormattedMessage {...messages.addCoverageDialogSaveBtnLabel} />
      </StyledRaisedButton>,
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
  handleSaveCoverage: PropTypes.func.isRequired,
};

export default AddCoverageDialog;
