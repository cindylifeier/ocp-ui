import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import SelectField from 'components/SelectField';
import messages from './messages';

class ServiceTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHcServiceDisabled: true,
      isLocationDisabled: true,
      isPractitionerDisabled: true,
      isAttendanceDisabled: true,
      isRequiredSelected: false,
    };
    this.handleServiceChanged = this.handleServiceChanged.bind(this);
    this.handleLocationChanged = this.handleLocationChanged.bind(this);
    this.handlePractitionerChanged = this.handlePractitionerChanged.bind(this);
    this.handleRequiredChanged = this.handleRequiredChanged.bind(this);
  }

  handleServiceChanged(serviceReference) {
    const { handleSelectLocation } = this.props;
    if (serviceReference) {
      this.setState({
        isLocationDisabled: false,
        isHcServiceDisabled: false,
      });
    } else {
      this.setState({
        isLocationDisabled: true,
        isHcServiceDisabled: true,
      });
    }
    handleSelectLocation(serviceReference);
  }

  handleLocationChanged(locationReference) {
    const { handleSelectPractitioner } = this.props;
    if (locationReference) {
      this.setState({ isPractitionerDisabled: false });
    } else {
      this.setState({ isPractitionerDisabled: true });
    }
    handleSelectPractitioner(locationReference);
  }

  handlePractitionerChanged(practitionerReference) {
    if (practitionerReference) {
      this.setState({ isAttendanceDisabled: false });
    } else {
      this.setState({ isAttendanceDisabled: true });
    }
  }

  handleRequiredChanged(requiredReference) {
    if (requiredReference) {
      this.setState({ isRequiredSelected: true });
    } else {
      this.setState({ isRequiredSelected: false });
    }
  }

  render() {
    const {
      healthcareServices,
      locations,
      practitioners,
      appointmentParticipantRequired,
    } = this.props;

    return (
      <Grid columns={4}>
        <Cell>
          <SelectField
            fullWidth
            name="service"
            onChange={this.handleServiceChanged}
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
            disabled={this.state.isLocationDisabled}
            onChange={this.handleLocationChanged}
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
            disabled={this.state.isPractitionerDisabled}
            onChange={this.handlePractitionerChanged}
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
              disabled={this.state.isAttendanceDisabled}
              onChange={this.handleRequiredChanged}
              hintText={<FormattedMessage {...messages.hintText.selectPractitionerAttendance} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.selectPractitionerAttendance} />}
            >
              {appointmentParticipantRequired && appointmentParticipantRequired.map((entry) =>
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
}

ServiceTabContent.propTypes = {
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  appointmentParticipantRequired: PropTypes.array,
  handleSelectPractitioner: PropTypes.func,
  handleSelectLocation: PropTypes.func,
};

export default ServiceTabContent;
