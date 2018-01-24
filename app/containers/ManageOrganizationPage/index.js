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
import yup from 'yup';
import { FlatButton, MenuItem, RaisedButton } from 'material-ui';
import { teal500, white } from 'material-ui/styles/colors';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import styles from './styles.css';
import { ORGANIZATIONIDENTIFIERSYSTEM, TELECOMSYSTEM, USPSSTATES } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import {
  makeSelectOrganizationIdentifierSystems,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from '../App/selectors';
import { createOrganization } from './actions';

export class ManageOrganizationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static zipPattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  static validationSchema = yup.object().shape({
    name: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierValue: yup.string()
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
      .matches(ManageOrganizationPage.zipPattern, (<FormattedMessage {...messages.validation.zipPattern} />)),
    telecomSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    telecomValue: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  });

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
  }

  handleSubmit(values, actions) {
    this.props.createOrganization(values, () => actions.setSubmitting(false));
  }

  render() {
    const { uspsStates, organizationIdentifierSystems, telecomSystems, history: { goBack } } = this.props;
    return (
      <div className={styles.root}>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Description of ManageOrganizationPage" />
        </Helmet>
        <div className={styles.title}>
          <h2><FormattedMessage {...messages.header} /></h2>
        </div>

        <div>
          <Formik
            validationSchema={ManageOrganizationPage.validationSchema}
            onSubmit={this.handleSubmit}
            render={(props) => {
              const { isSubmitting, dirty, isValid } = props;
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
                    <div className={`${styles.gridItem} ${styles.identifierSystem}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.identifierSystem} />}
                        name="identifierSystem"
                        fullWidth
                      >
                        {organizationIdentifierSystems && organizationIdentifierSystems.map((identifierSystem) => (
                          <MenuItem
                            key={identifierSystem.uri}
                            value={identifierSystem.uri}
                            primaryText={identifierSystem.display}
                          />))}
                      </SelectField>
                    </div>
                    <div className={`${styles.gridItem} ${styles.identifierValue}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.identifierValue} />}
                        fullWidth
                        name="identifierValue"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.status}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.status} />}
                        fullWidth
                        name="status"
                      >
                        <MenuItem value="true" primaryText="Active" />
                        <MenuItem value="false" primaryText="Inactive" />
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
                        {uspsStates && uspsStates.map((state) => (
                          <MenuItem
                            key={state.code}
                            value={state.code}
                            primaryText={state.display}
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
                    <div className={`${styles.gridItem} ${styles.telecomSystem}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.telecomSystem} />}
                        fullWidth
                        name="telecomSystem"
                      >
                        {telecomSystems && telecomSystems.map((telecomSystem) => (
                          <MenuItem
                            key={telecomSystem.code}
                            value={telecomSystem.code}
                            primaryText={telecomSystem.display}
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
                    <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
                      <RaisedButton
                        type="submit"
                        backgroundColor={teal500}
                        labelColor={white}
                        label={isSubmitting ?
                          <FormattedMessage {...messages.form.savingButton} /> :
                          <FormattedMessage {...messages.form.saveButton} />}
                        disabled={!dirty || isSubmitting || !isValid}
                      />
                      <FlatButton
                        type="button"
                        default
                        label={<FormattedMessage {...messages.form.cancelButton} />}
                        onClick={goBack}
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
  getLookups: PropTypes.func.isRequired,
  createOrganization: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  organizationIdentifierSystems: makeSelectOrganizationIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
});

function mapDispatchToProps(dispatch) {
  // TODO: add statuses for Organization when implemented
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, TELECOMSYSTEM, ORGANIZATIONIDENTIFIERSYSTEM])),
    createOrganization: (organization, callback) => dispatch(createOrganization(organization, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageOrganizationPage);
