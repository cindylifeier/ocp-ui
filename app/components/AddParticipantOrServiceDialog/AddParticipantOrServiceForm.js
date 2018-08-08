import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import { Tabs } from 'material-ui-next/es';
import { Tab } from 'material-ui-next/es/Tabs';

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
      practitioners,
    } = this.props;
    const { tabIndex } = this.state;

    const careTeams = [];

    function setInitialValues() {
      const initialValue = {};
      // if(serviceReference) {
      //   initialValue.service = serviceReference;
      // }
      return initialValue;
    }

    return (
      <div>
        <Formik
          onSubmit={(values, actions) => {
            console.log(actions);
            console.log(values);
          }}
          initialValues={setInitialValues()}
          validationSchema={yup.object().shape({
            service: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={({ isSubmitting, dirty, isValid }) => (
            <Form>
              <AddParticipantORServiceFormGrid gap="1vw">
                <Cell area="dialogTitle">
                  <DialogHeader>
                    {<FormattedMessage {...messages.addParticipantOrServiceDialogTitle} />}
                  </DialogHeader>
                </Cell>
                <Cell area="serviceCareTeamNonCareTeamTab">
                  <Tabs value={tabIndex} onChange={this.handleTabChange}>
                    <Tab label={<FormattedMessage {...messages.serviceTabLabel} />} />
                    <Tab label={<FormattedMessage {...messages.careTeamTabLabel} />} />
                    <Tab label={<FormattedMessage {...messages.nonCareTeamTabLabel} />} disabled />
                  </Tabs>
                  {tabIndex === 0 &&
                    <TabContainer>
                      <Grid columns={3}>
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
                            {practitioners && practitioners.map((practitioner) =>
                              (<MenuItem
                                key={practitioner.reference}
                                value={practitioner.reference}
                                primaryText={practitioner.display}
                              />),
                            )}
                          </SelectField>
                        </Cell>
                      </Grid>
                    </TabContainer>
                  }
                  {tabIndex === 1 &&
                    <TabContainer>
                      <Grid columns={3}>
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
                            {practitioners && practitioners.map((practitioner) =>
                              (<MenuItem
                                key={practitioner.reference}
                                value={practitioner.reference}
                                primaryText={practitioner.display}
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
  healthcareServices: PropTypes.array,
  handleSelectLocation: PropTypes.func,
  handleSelectPractitioner: PropTypes.func,
  locations: PropTypes.array,
  practitioners: PropTypes.array,

};

export default AddParticipantOrServiceForm;

