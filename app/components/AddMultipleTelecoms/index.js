/**
 *
 * AddMultipleTelecoms
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import FormSubtitle from 'components/FormSubtitle';
import AddTelecomsButton from './AddTelecomsButton';
import messages from './messages';

class AddMultipleTelecoms extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isTelecomsDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isTelecomsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isTelecomsDialogOpen: false,
    });
  }

  render() {
    return (
      <div>
        <FormSubtitle subtitleMargin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddTelecomsButton
          onClick={this.handleOpenDialog}
          label={<FormattedMessage {...messages.addTelecomsButton} />}
        />
      </div>
    );
  }
}

AddMultipleTelecoms.propTypes = {};

export default AddMultipleTelecoms;
