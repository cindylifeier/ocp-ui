/**
 *
 * AddMultipleAddresses
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';

import FormSubtitle from 'components/FormSubtitle';
import AddAddressesButton from 'components/AddMultipleAddresses/AddAddressesButton';
import messages from './messages';

function AddMultipleAddresses() {
  // TODO: remove button color
  return (
    <div>
      <FormSubtitle subtitleMargin="1vh 0 0 0">
        <FormattedMessage {...messages.header} />
      </FormSubtitle>
      <AddAddressesButton
        backgroundColor={teal500}
        labelColor={white}
        label={<FormattedMessage {...messages.addAddressesButton} />}
      />
    </div>
  );
}

AddMultipleAddresses.propTypes = {};

export default AddMultipleAddresses;
