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
import { FlatButton, MenuItem } from 'material-ui';
import find from 'lodash/find';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import StyledRaisedButton from 'components/StyledRaisedButton';
import PageContent from 'components/PageContent';
import FormSubtitle from 'components/FormSubtitle';
import { ORGANIZATIONIDENTIFIERSYSTEM, ORGANIZATIONSTATUS, TELECOMSYSTEM, USPSSTATES } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganizationsData } from 'containers/Organizations/selectors';
import saga from './saga';
import messages from './messages';
import { createOrganization, updateOrganization } from './actions';
import ManageOrganizationFormGrid from './ManageOrganizationFormGrid';
import ManageOrganizationFormCell from './ManageOrganizationFormCell';

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
      <Page>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Description of ManageOrganizationPage" />
        </Helmet>
        <PageHeader
          title={editingOrganization ?
            <FormattedMessage {...messages.updateModeTitle} /> :
            <FormattedMessage {...messages.createModeTitle} />}
        />
        <FormSubtitle>
          <FormattedMessage {...messages.subtitle} />
        </FormSubtitle>
        <PageContent>
          <Formik
            validationSchema={id ? ManageOrganizationPage.validationSchemaUpdate : ManageOrganizationPage.validationSchemaCreate}
            initialValues={initialValues}
            onSubmit={editingOrganization ? this.handleSubmitUpdate : this.handleSubmitCreate}
            render={(props) => {
              const { isSubmitting, dirty, isValid } = props;
              return (
                <Form>
                  <ManageOrganizationFormGrid columns={12}>
                    <ManageOrganizationFormCell top={1} left={1} width={4}>
                      <TextField
                        name="name"
                        floatingLabelText={<FormattedMessage {...messages.form.name} />}
                        fullWidth
                      />
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={1} left={5} width={3}>
                      <Grid columns="1fr 2fr" gap="">
                        <Cell>
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
                        </Cell>
                        <Cell>
                          <TextField
                            floatingLabelText={<FormattedMessage {...messages.form.identifierValue} />}
                            fullWidth
                            name="identifierValue"
                          />
                        </Cell>
                      </Grid>
                    </ManageOrganizationFormCell>
                    {id &&
                    <ManageOrganizationFormCell top={1} left={8} width={2}>
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
                    </ManageOrganizationFormCell>}
                    <ManageOrganizationFormCell top={2} left={1} width={4}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.line1} />}
                        fullWidth
                        name="line1"
                      />
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={2} left={5} width={4}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.line2} />}
                        fullWidth
                        name="line2"
                      />
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={3} left={1} width={4}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.city} />}
                        fullWidth
                        name="city"
                      />
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={3} left={5} width={3}>
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
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={3} left={8} width={2}>
                      <TextField
                        floatingLabelText={<FormattedMessage {...messages.form.postalCode} />}
                        fullWidth
                        name="postalCode"
                      />
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={4} left={1} width={5}>
                      <Grid columns="2fr 3fr" gap="">
                        <Cell>
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
                        </Cell>
                        <Cell>
                          <TextField
                            floatingLabelText={<FormattedMessage {...messages.form.telecomValue} />}
                            fullWidth
                            name="telecomValue"
                          />
                        </Cell>
                      </Grid>
                    </ManageOrganizationFormCell>
                    <ManageOrganizationFormCell top={5} left={1} width={2}>
                      <Grid columns="1fr 1fr" gap="1vw">
                        <Cell>
                          <StyledRaisedButton
                            fullWidth
                            type="submit"
                            label={isSubmitting ?
                              <FormattedMessage {...messages.form.savingButton} /> :
                              <FormattedMessage {...messages.form.saveButton} />}
                            disabled={!dirty || isSubmitting || !isValid}
                          />
                        </Cell>
                        <Cell>
                          <FlatButton
                            fullWidth
                            type="button"
                            default
                            label={<FormattedMessage {...messages.form.cancelButton} />}
                            onClick={goBack}
                          />
                        </Cell>
                      </Grid>
                    </ManageOrganizationFormCell>
                  </ManageOrganizationFormGrid>
                </Form>
              );
            }}
          >
          </Formik>
        </PageContent>
      </Page>
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
