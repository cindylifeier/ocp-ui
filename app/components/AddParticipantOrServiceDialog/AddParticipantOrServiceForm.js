import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import Tabs from 'material-ui-next/Tabs/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

import TabContainer from 'components/AddParticipantOrServiceDialog/TabContainer';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import AddParticipantORServiceFormGrid from 'components/AddParticipantOrServiceDialog/AddParticipantOrServiceDialogGrid';
import DialogHeader from 'components/DialogHeader';
import messages from './messages';

class AddParticipantOrServiceForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      // serviceReference: null,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleServiceChanged = this.handleServiceChanged.bind(this);
    this.handleLocationChanged = this.handleLocationChanged.bind(this);
  }

  handleTabChange(event, index) {
    this.setState({ tabIndex: index });
  }
  handleServiceChanged(serviceReference) {
    const { handleSelectLocation } = this.props;
    handleSelectLocation(serviceReference);
  }

  handleLocationChanged(locationReference) {
    const { handleSelectPractitioner } = this.props;
    handleSelectPractitioner(locationReference);
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
          validationSchema={yup.object().shape({
            service: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={({ isSubmitting, dirty, isValid, resetForm }) => (
            <Form>
              <AddParticipantORServiceFormGrid gap="1vw">
                <Cell area="dialogTitle">
                  <DialogHeader>
                    {<FormattedMessage {...messages.addParticipantOrServiceDialogTitle} />}
                  </DialogHeader>
                </Cell>
                <Cell area="serviceCareTeamNonCareTeamTab">
                  <Tabs
                    value={tabIndex}
                    onChange={(event, index) => {
                      resetForm();
                      this.handleTabChange(event, index);
                    }}
                  >
                    <Tab label={<FormattedMessage {...messages.serviceTabLabel} />} />
                    <Tab label={<FormattedMessage {...messages.careTeamTabLabel} />} />
                    <Tab label={<FormattedMessage {...messages.nonCareTeamTabLabel} />} disabled />
                  </Tabs>
                  {tabIndex === 0 &&
                    <TabContainer>
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
                              hintText={<FormattedMessage {...messages.hintText.selectPractitionerRequired} />}
                              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectPractitionerRequired} />}
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
                    </TabContainer>
                  }
                  {tabIndex === 1 &&
                    <TabContainer>
                      <Grid columns={4}>
                        <Cell>
                          <SelectField
                            fullWidth
                            name="careTeam"
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
                            hintText={<FormattedMessage {...messages.hintText.selectPractitionerRequired} />}
                            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.selectPractitionerRequired} />}
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
                      </Grid>
                    </TabContainer>
                  }
                  {tabIndex === 2 &&
                    <TabContainer>
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
                    </TabContainer>
                  }
                </Cell>
                <Cell area="actionButtons">
                  <Grid columns={2}>
                    <Cell>
                      <StyledRaisedButton
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <FormattedMessage {...messages.saveButton} />
                      </StyledRaisedButton>
                    </Cell>
                    <Cell>
                      <StyledFlatButton type="reset" onClick={handleDialogClose}>
                        <FormattedMessage {...messages.cancelButton} />
                      </StyledFlatButton>
                    </Cell>
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

