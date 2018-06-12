/**
*
* AddCoverageDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';

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
    } = this.props;

    const addCoverageFormProps = {
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      handleSaveCoverage,
      handleDialogClose,
    };

    return (
      <div>
        <Dialog
          title={<FormattedMessage {...messages.addCoverageDialogTitle} />}
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <AddCoverageForm {...addCoverageFormProps}></AddCoverageForm>
        </Dialog>
      </div>
    );
  }
}

AddCoverageDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  handleSaveCoverage: PropTypes.func.isRequired,
  policyHolderRelationship: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  coverageType: PropTypes.array.isRequired,
};

export default AddCoverageDialog;
