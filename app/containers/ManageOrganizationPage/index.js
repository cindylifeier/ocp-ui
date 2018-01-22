/**
 *
 * ManageOrganizationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Formik } from 'formik';
import { MenuItem, RaisedButton } from 'material-ui';
import yup from 'yup';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageOrganizationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import styles from './styles.css';

const initialValues = {
  name: '',
  idType: '',
  idValue: '',
  status: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

const emailPattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');

const uspsStatesLookup = [{ code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, {
  code: 'AS',
  name: 'American Samoa',
}, { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, {
  code: 'CO',
  name: 'Colorado',
}, { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, {
  code: 'DC',
  name: 'District of Columbia',
}, { code: 'FM', name: 'Federated States of Micronesia' }, { code: 'FL', name: 'Florida' }, {
  code: 'GA',
  name: 'Georgia',
}, { code: 'GU', name: 'Guam' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' }, {
  code: 'IL',
  name: 'Illinois',
}, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' }, {
  code: 'KY',
  name: 'Kentucky',
}, { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' }, {
  code: 'MH',
  name: 'Marshall Islands',
}, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' }, {
  code: 'MI',
  name: 'Michigan',
}, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' }, {
  code: 'MO',
  name: 'Missouri',
}, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' }, {
  code: 'NH',
  name: 'New Hampshire',
}, { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' }, {
  code: 'NY',
  name: 'New York',
}, { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, {
  code: 'MP',
  name: 'Northern Mariana Islands',
}, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, {
  code: 'PW',
  name: 'Palau',
}, { code: 'PA', name: 'Pennsylvania' }, { code: 'PR', name: 'Puerto Rico' }, {
  code: 'RI',
  name: 'Rhode Island',
}, { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, {
  code: 'TN',
  name: 'Tennessee',
}, { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, {
  code: 'VI',
  name: 'Virgin Islands',
}, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, {
  code: 'WV',
  name: 'West Virginia',
}, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }];

const countriesLookup = [{ code: 'us', name: 'Unites States' }, { code: 'ca', name: 'Canada' }];

const telecomSystemsLookup = [{ code: 'PHONE', name: 'Phone' }, { code: 'EMAIL', name: 'Email Address' }];

export class ManageOrganizationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.root}>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Description of ManageOrganizationPage" />
        </Helmet>
        <h2><FormattedMessage {...messages.header} /></h2>

        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={yup.object().shape({
              name: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              idType: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              idValue: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              address1: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              city: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              state: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              zip: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .matches(emailPattern, (<FormattedMessage {...messages.validation.zipPattern} />)),
              country: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            })}
            onSubmit={(values, actions) => {
              console.log('submitted', values);
              actions.setSubmitting(false);
            }}
            render={(props) => {
              const { isSubmitting, dirty, isValid } = props;
              // TODO: remove console.log
              console.log(isSubmitting, dirty, isValid);
              return (
                <Form>
                  <div className={styles.gridContainer}>
                    <div className={`${styles.gridItem} ${styles.name}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.name} />}
                        name="name"
                        fullWidth
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.idtype}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.idType} />}
                        name="idType"
                        fullWidth
                      >
                        <MenuItem value="npi" primaryText="NPI" />
                        <MenuItem value="tax" primaryText="Tax ID" />
                        <MenuItem value="local" primaryText="Local ID" />
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.id}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.idValue} />}
                        fullWidth
                        name="idValue"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.status}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.status} />}
                        fullWidth
                        name="status"
                      >
                        <MenuItem value="active" primaryText="Active" />
                        <MenuItem value="inactive" primaryText="Inactive" />
                        <MenuItem value="suspended" primaryText="Suspended" />
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.address1}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.address1} />}
                        fullWidth
                        name="address1"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.address2}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.address2} />}
                        fullWidth
                        name="address2"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.city}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.city} />}
                        fullWidth
                        name="city"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.state}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.state} />}
                        fullWidth
                        name="state"
                      >
                        {uspsStatesLookup.map((state) => (
                          <MenuItem
                            key={state.code}
                            value={state.code}
                            primaryText={state.name}
                          />))}
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.zip}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.zip} />}
                        fullWidth
                        name="zip"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.country}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.country} />}
                        fullWidth
                        name="country"
                      >
                        {countriesLookup.map((country) => (
                          <MenuItem
                            key={country.code}
                            value={country.code}
                            primaryText={country.name}
                          />))}
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.telecomSystem}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.telecomSystem} />}
                        fullWidth
                        name="telecomSystem"
                      >
                        {telecomSystemsLookup.map((telecomSystem) => (
                          <MenuItem
                            key={telecomSystem.code}
                            value={telecomSystem.code}
                            primaryText={telecomSystem.name}
                          />))}
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.telecomValue}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.telecomValue} />}
                        fullWidth
                        name="telecomValue"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.save}`}>
                      <RaisedButton
                        type="submit"
                        primary
                        label={<FormattedMessage {...messages.form.saveButton} />}
                        //  disabled={!dirty || isSubmitting || !isValid}
                      />
                    </div>
                  </div>

                </Form>
              );
            }}
          >
          </Formik>
        </div>
      </div>
    );
  }
}

ManageOrganizationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageorganizationpage: makeSelectManageOrganizationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageOrganizationPage', reducer });
const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageOrganizationPage);
