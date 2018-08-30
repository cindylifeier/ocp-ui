import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import Tabs from 'material-ui-next/Tabs/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';
import AppBar from 'material-ui-next/AppBar';
import { Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import ServiceTabContent from './ServiceTabContent';
import messages from './messages';

class AddParticipantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, index) {
    this.setState({ tabIndex: index });
  }

  render() {
    const {
      initialValues,
      onAddParticipant,
      onRemoveParticipant,
      onCloseDialog,
      healthcareServices,
      locations,
      practitioners,
      participantAttendance,
    } = this.props;
    const { tabIndex } = this.state;

    const serviceTabProps = {
      healthcareServices,
      locations,
      practitioners,
      participantAttendance,
    };

    function defineValidationSchema() {
      const inOrgFormValidationSchema = yup.object().shape({
        practitioner: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
        attendance: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
      });
      const outOfOrgFormValidationSchema = yup.object().shape({
        practitioner: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
        attendance: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
      });
      const locationFormValidationSchema = yup.object().shape({
        location: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
      });
      const serviceFormValidationSchema = yup.object().shape({
        service: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
        location: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
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

    return (
      <div>
        <Formik
          onSubmit={(values) => {
            if (initialValues) {
              onRemoveParticipant(initialValues.index);
            }
            onAddParticipant(values);
            onCloseDialog();
          }}
          validationSchema={defineValidationSchema()}
          render={({ isSubmitting, dirty, isValid, resetForm }) => (
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
              {tabIndex === 0 &&
              <ServiceTabContent {...serviceTabProps} />
              }
              {tabIndex === 1 &&
              <ServiceTabContent {...serviceTabProps} />
              }
              {tabIndex === 2 &&
              <ServiceTabContent {...serviceTabProps} />
              }
              {tabIndex === 3 &&
              <ServiceTabContent {...serviceTabProps} />
              }
              <InfoSection margin="20px 0 0 0">
                <Grid columns={4}>
                  <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                    <FormattedMessage {...messages.saveButton} />
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
  onAddParticipant: PropTypes.func.isRequired,
  onRemoveParticipant: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    participant: PropTypes.array.isRequired,
  }),
  healthcareServices: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  practitioners: PropTypes.array.isRequired,
  participantAttendance: PropTypes.array.isRequired,
};

export default AddParticipantForm;
