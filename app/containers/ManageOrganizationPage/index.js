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
import Divider from 'material-ui/Divider';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { FlatButton, MenuItem, RaisedButton } from 'material-ui';
import find from 'lodash/find';
import { teal500, white } from 'material-ui/styles/colors';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import styles from './styles.css';
import { ORGANIZATIONIDENTIFIERSYSTEM, ORGANIZATIONSTATUS, TELECOMSYSTEM, USPSSTATES } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import {
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from '../App/selectors';
import { createOrganization, updateOrganization } from './actions';
import { makeSelectOrganizationsData } from '../Organizations/selectors';

export class ManageOrganizationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static zipPattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  static validationSchemaShape = {
    name: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierValue: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    line1: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    city: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    stateCode: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    postalCode: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />))
      .matches(ManageOrganizationPage.zipPattern, (<FormattedMessage {...messages.validation.zipPattern} />)),
    telecomSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    telecomValue: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  };
  static validationSchemaCreate = yup.object().shape(ManageOrganizationPage.validationSchemaShape);

  static validationSchemaUpdate = yup.object().shape({
    ...ManageOrganizationPage.validationSchemaShape,
    status: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  });

  constructor(props) {
    super(props);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
  }

  handleSubmitCreate(values, actions) {
    this.props.createOrganization(values, () => actions.setSubmitting(false));
  }

  handleSubmitUpdate(values, actions) {
    const { match: { params: { id } } } = this.props;
    this.props.updateOrganization(id, values, () => actions.setSubmitting(false));
  }

  render() {
    const { match: { url, params: { id } }, uspsStates, organizationIdentifierSystems, organizationStatuses, telecomSystems, history: { goBack, push }, organizations } = this.props;
    let initialValues = {};
    const editingOrganization = find(organizations, { logicalId: id });
    // if id in the route exists but no initial data to edit
    if (id && !editingOrganization) {
      // navigate back to create mode
      push(url.substring(0, url.lastIndexOf('/')));
    }
    if (editingOrganization) {
      const {
        name,
        identifiers: [{ system: identifierSystem, value: identifierValue }],
        addresses: [address],
        telecoms: [{ system: telecomSystem, value: telecomValue }],
        active,
      } = editingOrganization;
      initialValues = {
        name,
        status: active.toString(),
        identifierSystem,
        identifierValue,
        telecomSystem,
        telecomValue,
        ...address,
      };
    }

    return (
      <div className={styles.root}>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Description of ManageOrganizationPage" />
        </Helmet>
        <div className={styles.header}>
          {editingOrganization ? <FormattedMessage {...messages.updateMode} /> : <FormattedMessage {...messages.createMode} />} <FormattedMessage {...messages.header} />
        </div>
        <Divider />
        <div className={styles.title}>
          <FormattedMessage {...messages.title} />
        </div>
        <div>
          <Formik
            validationSchema={id ? ManageOrganizationPage.validationSchemaUpdate : ManageOrganizationPage.validationSchemaCreate}
            initialValues={initialValues}
            onSubmit={editingOrganization ? this.handleSubmitUpdate : this.handleSubmitCreate}
            render={(props) => {
              const { isSubmitting, dirty, isValid } = props;
              return (
                <Form>
                  <div className={styles.gridContainer}>
                    <div className={`${styles.gridItem} ${styles.name}`}>
                      <TextField
                        name="name"
                        floatingLabelText={<FormattedMessage {...messages.form.name} />}
                        fullWidth
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.identifierGroup}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.identifierSystem} />}
                        name="identifierSystem"
                        fullWidth
                      >
                        {organizationIdentifierSystems && organizationIdentifierSystems.map(({ uri, display }) => (
                          <MenuItem
                            key={uri}
                            value={uri}
                            primaryText={display}
                          />))}
                      </SelectField>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.identifierValue} />}
                        fullWidth
                        name="identifierValue"
                      />
                    </div>
                    {id &&
                    <div className={`${styles.gridItem} ${styles.status}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.status} />}
                        fullWidth
                        name="status"
                      >
                        {organizationStatuses && organizationStatuses.map(({ code, display }) => (
                          <MenuItem
                            key={code.toString()}
                            value={code.toString()}
                            primaryText={display}
                          />))}
                      </SelectField>
                    </div>}
                    <div className={`${styles.gridItem} ${styles.line1}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.line1} />}
                        fullWidth
                        name="line1"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.line2}`}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.line2} />}
                        fullWidth
                        name="line2"
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
                        floatingLabelText={<FormattedMessage {...messages.form.stateCode} />}
                        fullWidth
                        name="stateCode"
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
                        floatingLabelText={<FormattedMessage {...messages.form.postalCode} />}
                        fullWidth
                        name="postalCode"
                      />
                    </div>
                    <div className={`${styles.gridItem} ${styles.contactGroup}`}>
                      <SelectField
                        floatingLabelText={<FormattedMessage {...messages.form.telecomSystem} />}
                        fullWidth
                        name="telecomSystem"
                      >
                        {telecomSystems && telecomSystems.map((telSystem) => (
                          <MenuItem
                            key={telSystem.code}
                            value={telSystem.code}
                            primaryText={telSystem.display}
                          />))}
                      </SelectField>
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
  updateOrganization: PropTypes.func.isRequired,
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
  organizationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  organizations: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      stateCode: PropTypes.string,
      use: PropTypes.string,
    })),
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      display: PropTypes.string,
      oid: PropTypes.string,
      priority: PropTypes.number,
    })),
    logicalId: PropTypes.string,
    name: PropTypes.string,
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  })),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  organizationIdentifierSystems: makeSelectOrganizationIdentifierSystems(),
  organizationStatuses: makeSelectOrganizationStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  organizations: makeSelectOrganizationsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, TELECOMSYSTEM, ORGANIZATIONIDENTIFIERSYSTEM, ORGANIZATIONSTATUS])),
    createOrganization: (organization, callback) => dispatch(createOrganization(organization, callback)),
    updateOrganization: (id, organization, callback) => dispatch(updateOrganization(id, organization, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageOrganizationPage);
