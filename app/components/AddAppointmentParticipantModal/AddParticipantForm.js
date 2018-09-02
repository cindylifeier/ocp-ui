import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import Tabs from 'material-ui-next/Tabs/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';
import AppBar from 'material-ui-next/AppBar';
import { Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

import InfoSection from 'components/InfoSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import InsideOrgTabContent from './InsideOrgTabContent';
import LocationTabContent from './LocationTabContent';
import ServiceTabContent from './ServiceTabContent';
import { mapToParticipantReference, mapToPractitionerParticipantReference } from './helpers';
import messages from './messages';


class AddParticipantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleAddParticipants = this.handleAddParticipants.bind(this);
  }

  handleTabChange(event, index) {
    this.setState({ tabIndex: index });
  }

  handleAddParticipants(formValue) {
    const { healthcareServices, locations, practitioners, participantAttendance } = this.props;
    const serviceParticipant = mapToParticipantReference(formValue.service, healthcareServices);
    const locationParticipant = mapToParticipantReference(formValue.location, locations);
    const practitionerParticipant = mapToPractitionerParticipantReference(formValue.practitioner, formValue.attendance, practitioners, participantAttendance);
    const participants = Array.of(serviceParticipant, locationParticipant, practitionerParticipant);
    const fieldName = this.props.arrayHelpers.name;
    // Remove all falsey values from array
    this.props.arrayHelpers.form.setFieldValue(fieldName, compact(participants));
    this.props.onCloseDialog();
  }

  render() {
    const {
      onCloseDialog,
      healthcareServices,
      locations,
      practitioners,
      participantAttendance,
      onGetAvailableLocations,
      onGetAvailableHealthcareServices,
      onGetAvailablePractitioners,
    } = this.props;
    const { tabIndex } = this.state;

    const tabProps = {
      healthcareServices,
      locations,
      practitioners,
      participantAttendance,
      onGetAvailableLocations,
      onGetAvailableHealthcareServices,
      onGetAvailablePractitioners,
    };

    function defineValidationSchema() {
      const inOrgFormValidationSchema = yup.object().shape({
        practitioner: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
        attendance: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      const outOfOrgFormValidationSchema = yup.object().shape({
        practitioner: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
        attendance: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      const locationFormValidationSchema = yup.lazy((values) => {
        if (isEmpty(values.practitioner)) {
          return yup.object().shape({
            location: yup.string()
              .required(<FormattedMessage {...messages.validation.required} />),
          });
        }
        return yup.object().shape({
          location: yup.string()
            .required(<FormattedMessage {...messages.validation.required} />),
          attendance: yup.string()
            .required(<FormattedMessage {...messages.validation.required} />),
        });
      });
      const serviceFormValidationSchema = yup.object().shape({
        service: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
        location: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      switch (tabIndex) {
        case 0:
          return inOrgFormValidationSchema;
        case 1:
          return outOfOrgFormValidationSchema;
        case 2:
          return locationFormValidationSchema;
        default:
          return serviceFormValidationSchema;
      }
    }

    function renderParticipantDetailsForm(values, resetForm, setFieldTouched) {
      switch (tabIndex) {
        case 0:
          return (
            <InsideOrgTabContent
              formValues={values}
              resetForm={resetForm}
              setFieldTouched={setFieldTouched}
              {...tabProps}
            />
          );
        case 1:
          return (<div>Inside Organization</div>);
        case 2:
          return (
            <LocationTabContent
              formValues={values}
              resetForm={resetForm}
              setFieldTouched={setFieldTouched}
              {...tabProps}
            />
          );
        default:
          return (
            <ServiceTabContent
              formValues={values}
              resetForm={resetForm}
              setFieldTouched={setFieldTouched}
              {...tabProps}
            />
          );
      }
    }

    return (
      <div>
        <Formik
          onSubmit={(values) => this.handleAddParticipants(values)}
          validationSchema={defineValidationSchema()}
          render={({ touched, errors, values, resetForm, setFieldTouched }) => (
            <Form>
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
                  <Tab label={<FormattedMessage {...messages.inOrgTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.outOfOrgTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.locationTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.serviceTabLabel} />} />
                </Tabs>
              </AppBar>
              {renderParticipantDetailsForm(values, resetForm, setFieldTouched)}
              <InfoSection margin="20px 0 0 0">
                <Grid columns={4}>
                  <StyledRaisedButton type="submit" disabled={isEmpty(touched) || !isEmpty(errors)}>
                    <FormattedMessage {...messages.addButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton type="reset" onClick={onCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
                  </StyledFlatButton>
                </Grid>
              </InfoSection>
            </Form>
          )}
        />
      </div>
    );
  }
}

AddParticipantForm.propTypes = {
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array.isRequired,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  participantAttendance: PropTypes.array.isRequired,
  onGetAvailableLocations: PropTypes.func.isRequired,
  onGetAvailableHealthcareServices: PropTypes.func.isRequired,
  onGetAvailablePractitioners: PropTypes.func.isRequired,
};

export default AddParticipantForm;
