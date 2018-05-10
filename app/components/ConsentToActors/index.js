/**
 *
 * ConsentToActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import messages from './messages';


class ConsentToActors extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isToActorsDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isToActorsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isToActorsDialogOpen: false,
    });
  }

  render() {
    return (
      <div>
        <StyledRaisedButton fullWidth onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.consentToActorsButton} />
        </StyledRaisedButton>
        <FieldArray
          name="consentToActors"
          render={() => (
            <div>
              <StyledDialog open={this.state.isToActorsDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.consentToActorsDialogTitle} />
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

ConsentToActors.propTypes = {};

export default ConsentToActors;
