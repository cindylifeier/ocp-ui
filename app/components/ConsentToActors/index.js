/**
 *
 * ConsentToActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import isEmpty from 'lodash/isEmpty';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AddedConsentActorsTable from 'components/AddedConsentActorsTable';
import AddToActors from './AddToActors';
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
    const { consentToActors, addedActors } = this.props;
    return (
      <div>
        <StyledRaisedButton fullWidth onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.consentToActorsButton} />
        </StyledRaisedButton>
        <FieldArray
          name="consentToActors"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isToActorsDialogOpen} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.consentToActorsDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddToActors
                    addedActors={addedActors}
                    addedToActors={consentToActors}
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                  />
                </DialogContent>
              </StyledDialog>
              {!isEmpty(consentToActors) &&
              <AddedConsentActorsTable arrayHelpers={arrayHelpers} actors={consentToActors} />
              }
            </div>
          )}
        />
      </div>
    );
  }
}

ConsentToActors.propTypes = {
  consentToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  addedActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
};

export default ConsentToActors;
