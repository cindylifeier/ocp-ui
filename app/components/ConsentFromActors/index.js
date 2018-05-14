/**
 *
 * ConsentFromActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AddFromActors from './AddFromActors';
import messages from './messages';


class ConsentFromActors extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isFromActorsDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isFromActorsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isFromActorsDialogOpen: false,
    });
  }

  render() {
    return (
      <div>
        <StyledRaisedButton fullWidth onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.consentFromActorsButton} />
        </StyledRaisedButton>
        <FieldArray
          name="consentFromActors"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isFromActorsDialogOpen} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.consentFromActorsDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddFromActors
                    onAddFromActors={arrayHelpers.push}
                    onCloseDialog={this.handleCloseDialog}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

ConsentFromActors.propTypes = {};

export default ConsentFromActors;
