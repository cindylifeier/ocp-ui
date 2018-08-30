import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import SelectField from 'components/SelectField';
import messages from './messages';

function ServiceTabContent(props) {
  const {
    healthcareServices,
    locations,
    practitioners,
    participantAttendance,
    onGetAvailableLocations,
    onGetAvailablePractitioners,
  } = props;

  return (
    <Grid columns={4}>
      <Cell>
        <SelectField
          fullWidth
          name="service"
          onChange={(service) => onGetAvailableLocations(service)}
          hintText={<FormattedMessage {...messages.hintText.selectService} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectService} />}
        >
          {healthcareServices && healthcareServices.map((service) =>
            (<MenuItem
              key={service.reference}
              value={service.reference}
              primaryText={service.display}
            />),
          )}
        </SelectField>
      </Cell>
      <Cell>
        <SelectField
          fullWidth
          name="location"
          onChange={(location) => onGetAvailablePractitioners(location)}
          hintText={<FormattedMessage {...messages.hintText.selectLocation} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectLocation} />}
        >
          {locations && locations.map((location) =>
            (<MenuItem
              key={location.reference}
              value={location.reference}
              primaryText={location.display}
            />),
          )}
        </SelectField>
      </Cell>
      <Cell>
        <SelectField
          fullWidth
          name="practitioner"
          hintText={<FormattedMessage {...messages.hintText.selectPractitioner} />}
          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectPractitioner} />}
        >
          {practitioners && practitioners.map((entry) =>
            (<MenuItem
              key={entry.reference}
              value={entry.reference}
              primaryText={entry.display}
            />),
          )}
        </SelectField>
      </Cell>
      <Cell>
        <Cell>
          <SelectField
            fullWidth
            name="attendance"
            hintText={<FormattedMessage {...messages.hintText.selectPractitionerAttendance} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.selectPractitionerAttendance} />}
          >
            {participantAttendance && participantAttendance.map((entry) =>
              (<MenuItem
                key={entry.code}
                value={entry.code}
                primaryText={entry.display}
              />),
            )}
          </SelectField>
        </Cell>
      </Cell>
    </Grid>
  );
}

ServiceTabContent.propTypes = {
  healthcareServices: PropTypes.array.isRequired,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  participantAttendance: PropTypes.array.isRequired,
  onGetAvailableLocations: PropTypes.func.isRequired,
  onGetAvailablePractitioners: PropTypes.func.isRequired,
};

export default ServiceTabContent;
