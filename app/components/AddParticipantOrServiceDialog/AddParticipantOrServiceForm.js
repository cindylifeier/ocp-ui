import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import Tabs from 'material-ui-next/Tabs/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';
import AppBar from 'material-ui-next/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import AddParticipantORServiceFormGrid from './AddParticipantOrServiceDialogGrid';
import messages from './messages';

class AddParticipantOrServiceForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      isHcServiceDisabled: true,
      isLocationDisabled: true,
      isPractitionerDisabled: true,
      isCareTeamDisabled: true,
      isRequiredDisabled: true,
      isRequiredSelected: false,
      isLocationSelected: false,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleServiceChanged = this.handleServiceChanged.bind(this);
    this.handleLocationChanged = this.handleLocationChanged.bind(this);
    this.handlePractitionerChanged = this.handlePractitionerChanged.bind(this);
    this.canAddParticipant = this.canAddParticipant.bind(this);
    this.handleRequiredChanged = this.handleRequiredChanged.bind(this);
    this.handleCareTeamTabCareTeamChanged = this.handleCareTeamTabCareTeamChanged.bind(this);
    this.handleCareTeamTabRequiredChanged = this.handleCareTeamTabRequiredChanged.bind(this);
    this.handleCareTeamTabServiceChanged = this.handleCareTeamTabServiceChanged.bind(this);
    this.handleCareTeamTabLocationChanged = this.handleCareTeamTabLocationChanged.bind(this);
  }

  handleTabChange(event, index) {
    this.setState({ tabIndex: index });
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
      this.setState({ isRequiredDisabled: false });
    } else {
      this.setState({ isRequiredDisabled: true });
    }
  }

  handleRequiredChanged(requiredReference) {
    if (requiredReference) {
      this.setState({ isRequiredSelected: true });
    } else {
      this.setState({ isRequiredSelected: false });
    }
  }

  handleCareTeamTabCareTeamChanged(careTeamReference) {
    if (careTeamReference) {
      this.setState({
        isRequiredDisabled: false,
        isCareTeamDisabled: false,
      });
    } else {
      this.setState({
        isRequiredDisabled: true,
        isCareTeamDisabled: true,
      });
    }
  }

  handleCareTeamTabRequiredChanged(requiredReference) {
    if (requiredReference) {
      this.setState({
        isHcServiceDisabled: false,
      });
    } else {
      this.setState({
        isHcServiceDisabled: true,
      });
    }
  }

  handleCareTeamTabServiceChanged(serviceReference) {
    if (serviceReference) {
      this.setState({
        isLocationDisabled: false,
      });
    } else {
      this.setState({
        isLocationDisabled: true,
      });
    }
  }

  handleCareTeamTabLocationChanged(serviceReference) {
    if (serviceReference) {
      this.setState({
        isLocationSelected: true,
      });
    } else {
      this.setState({
        isLocationSelected: false,
      });
    }
  }

  canAddParticipant() {
    const {
      isHcServiceDisabled,
      isLocationDisabled,
      isPractitionerDisabled,
      isCareTeamDisabled,
      isRequiredDisabled,
      isRequiredSelected,
      isLocationSelected,
    } = this.state;

    let disabled = true;
    if (this.state.tabIndex === 0) {
      disabled = isHcServiceDisabled || isLocationDisabled || isPractitionerDisabled || isRequiredDisabled || !isRequiredSelected;
    } else if (this.state.tabIndex === 1) {
      disabled = isCareTeamDisabled || isRequiredDisabled || isLocationDisabled || isHcServiceDisabled || !isLocationSelected;
    }
    return disabled;
  }

  render() {
    const {
      handleDialogClose,
      healthcareServices,
      locations,
      careTeams,
      practitioners,
      appointmentParticipantRequired,
      handleAddParticipant,
    } = this.props;
    const { tabIndex } = this.state;

    function setInitialValues() {
      return {};
    }

    return (
      <div>
        <Formik
          onSubmit={(values) => {
            handleDialogClose();
            handleAddParticipant(values);
          }}
          initialValues={setInitialValues()}
          validationSchema={() =>
            yup.object().shape({})
          }
          render={({ isSubmitting, dirty, isValid, resetForm }) => (
            <Form>
              <AddParticipantORServiceFormGrid gap="1vw">
                <Cell area="serviceCareTeamNonCareTeamTab">
                  <AppBar position="sticky" color="default">
                    <Tabs
                      value={tabIndex}
                      onChange={(event, index) => {
                        resetForm();
                        this.handleTabChange(event, index);
                      }}
                      indicatorColor="primary"
                      textColor="primary"
                      fullWidth
                    >
                      <Tab label={<FormattedMessage {...messages.serviceTabLabel} />} />
                      <Tab label={<FormattedMessage {...messages.careTeamTabLabel} />} />
                      <Tab label={<FormattedMessage {...messages.nonCareTeamTabLabel} />} disabled />
                    </Tabs>
                  </AppBar>
                  {tabIndex === 0 &&
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
                          name="required"
                          disabled={this.state.isRequiredDisabled}
                          onChange={this.handleRequiredChanged}
                          hintText={<FormattedMessage {...messages.hintText.selectPractitionerRequired} />}
                          floatingLabelText={
                            <FormattedMessage {...messages.floatingLabelText.selectPractitionerRequired} />}
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
                  }
                  {tabIndex === 1 &&
                  <Grid columns={4}>
                    <Cell>
                      <SelectField
                        fullWidth
                        name="careTeam"
                        onChange={this.handleCareTeamTabCareTeamChanged}
                        hintText={<FormattedMessage {...messages.hintText.selectedCareTeam} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectedCareTeam} />}
                      >
                        {careTeams && careTeams.map((careTeam) =>
                          (<MenuItem
                            key={careTeam.reference}
                            value={careTeam.reference}
                            primaryText={careTeam.display}
                          />),
                        )}
                      </SelectField>
                    </Cell>
                    <Cell>
                      <SelectField
                        fullWidth
                        name="required"
                        disabled={this.state.isRequiredDisabled}
                        onChange={this.handleCareTeamTabRequiredChanged}
                        hintText={<FormattedMessage {...messages.hintText.selectPractitionerRequired} />}
                        floatingLabelText={
                          <FormattedMessage {...messages.floatingLabelText.selectPractitionerRequired} />}
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
                    <Cell>
                      <SelectField
                        fullWidth
                        name="service"
                        disabled={this.state.isHcServiceDisabled}
                        onChange={this.handleCareTeamTabServiceChanged}
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
                        onChange={this.handleCareTeamTabLocationChanged}
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
                  </Grid>
                  }
                  {tabIndex === 2 &&
                  <Grid columns={3}>
                    <Cell>
                      <TextField
                        fullWidth
                        name="practitionerName"
                        hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                      />
                    </Cell>
                    <Cell>
                      <TextField
                        fullWidth
                        name="locationName"
                        hintText={<FormattedMessage {...messages.hintText.locationName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.locationName} />}
                      />
                    </Cell>
                    <Cell>
                      <TextField
                        fullWidth
                        name="serviceName"
                        hintText={<FormattedMessage {...messages.hintText.serviceName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.serviceName} />}
                      />
                    </Cell>
                  </Grid>
                  }
                </Cell>
                <Cell area="buttonGroup">
                  <Grid columns={2}>
                    <StyledRaisedButton
                      type="submit"
                      disabled={!dirty || isSubmitting || !isValid || this.canAddParticipant()}
                    >
                      <FormattedMessage {...messages.saveButton} />
                    </StyledRaisedButton>
                    <StyledFlatButton type="reset" onClick={handleDialogClose}>
                      <FormattedMessage {...messages.cancelButton} />
                    </StyledFlatButton>
                  </Grid>
                </Cell>
              </AddParticipantORServiceFormGrid>
            </Form>
          )}
        />
      </div>
    );
  }
}

AddParticipantOrServiceForm.propTypes = {
  handleDialogClose: PropTypes.func,
  handleAddParticipant: PropTypes.func,
  healthcareServices: PropTypes.array,
  handleSelectLocation: PropTypes.func,
  handleSelectPractitioner: PropTypes.func,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  appointmentParticipantRequired: PropTypes.array,
  careTeams: PropTypes.array,

};

export default AddParticipantOrServiceForm;
