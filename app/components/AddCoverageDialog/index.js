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
import DialogContent from 'material-ui-next/es/Dialog/DialogContent';
import AddCoverageForm from 'components/AddCoverageDialog/AddCoverageForm';
import messages from './messages';

class AddCoverageDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      open,
      handleDialogClose,
      handleSaveCoverage,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      patient,
      subscriptionOptions,
    } = this.props;

    const addCoverageFormProps = {
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      handleSaveCoverage,
      handleDialogClose,
      patient,
      subscriptionOptions,
    };

    return (
      <div>
        <Dialog
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <DialogTitle >{<FormattedMessage {...messages.addCoverageDialogTitle} />}</DialogTitle>
          <DialogContent>
            <AddCoverageForm {...addCoverageFormProps}></AddCoverageForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AddCoverageDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  handleSaveCoverage: PropTypes.func.isRequired,
  subscriptionOptions: PropTypes.array.isRequired,
  policyHolderRelationship: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  coverageType: PropTypes.array.isRequired,
  patient: PropTypes.object.isRequired,
};

export default AddCoverageDialog;
