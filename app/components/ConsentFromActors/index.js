/**
 *
 * ConsentFromActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';

import Organizations from 'containers/Organizations';
import Practitioners from 'containers/Practitioners';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import FromOrganizationActors from './FromOrganizationActors';
import FromPractitionerActors from './FromPractitionerActors';
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
          render={() => (
            <div>
              <StyledDialog open={this.state.isFromActorsDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.consentFromActorsDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <Grid columns={1}>
                    <Cell>
                      <Organizations component={FromOrganizationActors} pageSize={3} />
                    </Cell>
                    <Cell>
                      <Practitioners component={FromPractitionerActors} pageSize={3} />
                    </Cell>
                  </Grid>
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
