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
import PurposeOfUseForm from './PurposeOfUseForm';


class PurposeOfUse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPurposeOfUsesDialogOpen: false,
      editingPurposeOfUse: null,
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
      editingPurposeOfUse: null,
    });
  }

  render() {
    const { purposeOfUse, values } = this.props;
    console.log('values', values);
    const addedPurposeOfUsesFormProps = {
      purposeOfUse,
      values,
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
                  <PurposeOfUseForm {...addedPurposeOfUsesFormProps} arrayHelpers={arrayHelpers} values={values} />
                </DialogContent>
              </StyledDialog>
            </div>
            )}
        />
        <pre>{JSON.stringify(values, null, 2)}</pre>
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
  values: PropTypes.object,
};

export default PurposeOfUse;
