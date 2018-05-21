/**
 *
 * PurposeOfUse
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import PropTypes from 'prop-types';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';
import AddPurposeOfUse from './AddPurposeOfUse';
import AddedPurposeOfUse from './AddedPurposeOfUse';


class PurposeOfUse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPurposeOfUsesDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isPurposeOfUsesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isPurposeOfUsesDialogOpen: false,
    });
  }

  render() {
    const { purposeOfUse, purposeOfUseCodes } = this.props;
    console.log('purposeOfUseCodes', purposeOfUseCodes);
    const addPurposeOfUsesFormProps = {
      purposeOfUse,
      purposeOfUseCodes,
    };
    return (
      <div>
        <StyledRaisedButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.addPurposeOfUseButton} />
        </StyledRaisedButton>
        <FieldArray
          name="purposeOfUseCodes"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isPurposeOfUsesDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogPurposeOfUseTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddPurposeOfUse {...addPurposeOfUsesFormProps} arrayHelpers={arrayHelpers} onCloseDialog={this.handleCloseDialog} />
                </DialogContent>
              </StyledDialog>
            </div>
            )}
        />
        <AddedPurposeOfUse purposeOfUseCodes={purposeOfUseCodes} />
      </div>
    );
  }
}

PurposeOfUse.propTypes = {
  purposeOfUse: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })).isRequired,
  purposeOfUseCodes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
  ),
};

export default PurposeOfUse;
