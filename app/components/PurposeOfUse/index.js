/**
 *
 * PurposeOfUse
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import messages from './messages';

// import styled from 'styled-components';

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
    return (
      <div>
        <StyledRaisedButton fullWidth onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.addPurposeOfUseButton} />
        </StyledRaisedButton>
        <FieldArray
          name="consentFromActors"
          render={() => (
            <div>
              <StyledDialog open={this.state.isPurposeOfUsesDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogPurposeOfUseTitle} />
                </DialogTitle>
                <DialogContent>
                  <p>Test</p>
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

PurposeOfUse.propTypes = {};

export default PurposeOfUse;
