/**
 *
 * ConsentFromActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import isEmpty from 'lodash/isEmpty';

import CustomErrorText from 'components/CustomErrorText';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AddedConsentActorsTable from 'components/AddedConsentActorsTable';
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
    const { consentFromActors, addedActors, errors } = this.props;
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
                    addedActors={addedActors}
                    addedFromActors={consentFromActors}
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                  />
                </DialogContent>
              </StyledDialog>
              {!isEmpty(consentFromActors) &&
              <AddedConsentActorsTable arrayHelpers={arrayHelpers} actors={consentFromActors} />
              }
            </div>
          )}
        />
        {errors && errors.consentFromActors &&
        <CustomErrorText>{errors.consentFromActors}</CustomErrorText>
        }
      </div>
    );
  }
}

ConsentFromActors.propTypes = {
  consentFromActors: PropTypes.arrayOf(PropTypes.shape({
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
  errors: PropTypes.shape({
    consentFromActors: PropTypes.any,
  }),
};

export default ConsentFromActors;
