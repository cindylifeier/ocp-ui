import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { teal500, white } from 'material-ui/styles/colors';
import { FieldArray, Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { HOME_URL } from 'containers/App/constants';
import AddPractitionerRoleForOrganization from 'components/AddPractitionerRoleForOrganization';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import messages from './messages';
import styles from './styles.css';


const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
};

class ManagePractitionerForm extends React.PureComponent {

  static initialState = {
    searchOrganizationDialogOpen: false,
  };

  static addButtonStyle = { width: '150px' };
  static iconStyles = {
    iconButton: {
      position: 'relative',
    },
    icon: {
      width: '100%',
      height: 26,
      position: 'absolute',
      top: '0',
      right: '0',
    },
  };

  constructor(props) {
    super(props);
    this.state = { ...ManagePractitionerForm.initialState };
    this.handleDialogCallback = this.handleDialogCallback.bind(this);
    this.handleAddOrganizations = this.handleAddOrganizations.bind(this);
  }

  handleDialogCallback() {
    this.setState({ ...ManagePractitionerForm.initialState });
    this.props.initialSearchOrganizationResult();
  }

  handleAddOrganizations() {
    this.setState({ searchOrganizationDialogOpen: true });
  }

  render() {
    const {
      isSubmitting, dirty, isValid, values, errors,
      uspsStates, identifierSystems, telecomSystems, telecomUses, practitionerRoleCodes,
      organizations, currentPage, totalNumberOfPages, onSearch, onPageClick,
    } = this.props;

    const addAddressesProps = {
      uspsStates,
      errors,
      addresses: values.addresses,
    };
    const addTelecomsProps = {
      telecomSystems,
      telecomUses,
      errors,
      telecoms: values.telecoms,
    };
    return (
      <div>
        <div className={styles.title}>
          <FormattedMessage {...messages.title} />
        </div>
        <Form>
          <div className={styles.gridContainer}>
            <div className={`${styles.gridItem} ${styles.firstName}`}>
              <TextField
                fullWidth
                name="firstName"
                hintText={<FormattedMessage {...messages.hintText.firstName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.middleName}`}>
              <TextField
                fullWidth
                name="middleName"
                hintText={<FormattedMessage {...messages.hintText.middleName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.middleName} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.lastName}`}>
              <TextField
                fullWidth
                name="lastName"
                hintText={<FormattedMessage {...messages.hintText.lastName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.identifierGroup}`}>
              <SelectField
                fullWidth
                name="identifierType"
                hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
              >
                {identifierSystems && identifierSystems.map((identifierType) =>
                  <MenuItem key={identifierType.uri} value={identifierType.uri} primaryText={identifierType.display} />,
                )}
              </SelectField>
              <TextField
                fullWidth
                name="identifierValue"
                hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.addresses}`}>
              <AddMultipleAddresses{...addAddressesProps} />
            </div>
            <div className={`${styles.gridItem} ${styles.contacts}`}>
              <AddMultipleTelecoms {...addTelecomsProps} />
            </div>
            <div className={styles.associateOrganizationSection}>
              <div className={styles.title}>
                <FormattedMessage {...messages.associateOrganizations.subtitle} />
              </div>
              <div className={styles.addOrganizationssButton}>
                <RaisedButton
                  backgroundColor={teal500}
                  labelColor={white}
                  onClick={this.handleAddOrganizations}
                  style={ManagePractitionerForm.addButtonStyle}
                  label={<FormattedMessage {...messages.associateOrganizations.addButtonLabel} />}
                />
              </div>
              <div>
                <FieldArray
                  name="practitionerRoles"
                  render={(arrayHelpers) => (
                    <div>
                      <Dialog
                        open={this.state.searchOrganizationDialogOpen}
                        autoScrollBodyContent
                        contentStyle={customContentStyle}
                      >
                        <AddPractitionerRoleForOrganization
                          arrayHelpers={arrayHelpers}
                          onAddAssociateOrganization={arrayHelpers.push}
                          callback={this.handleDialogCallback}
                          roleType={practitionerRoleCodes}
                          specialtyType={practitionerRoleCodes}
                          existingOrganizations={values.practitionerRoles}
                          onSearch={onSearch}
                          onPageClick={onPageClick}
                          organizations={organizations}
                          currentPage={currentPage}
                          totalNumberOfPages={totalNumberOfPages}
                        />
                      </Dialog>
                      <Table>
                        <TableHeader>
                          <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnName} /></TableHeaderColumn>
                          <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnCode} /></TableHeaderColumn>
                          <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnSpecialty} /></TableHeaderColumn>
                          <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnActive} /></TableHeaderColumn>
                          <TableHeaderColumn><FormattedMessage {...messages.associateOrganizations.tableColumnRemove} /></TableHeaderColumn>
                        </TableHeader>
                        {errors && errors.practitionerRoles &&
                        <span className={styles.error}>{errors.practitionerRoles}</span>}
                        {values.practitionerRoles && values.practitionerRoles.map((pr, index) => {
                          const { organization, logicalId } = pr;
                          return (
                            <TableRow key={organization && organization.reference}>
                              <TableRowColumn>{organization.display}</TableRowColumn>
                              <TableRowColumn>
                                <SelectField
                                  fullWidth
                                  name={`practitionerRoles.${index}.code`}
                                  hintText={<FormattedMessage {...messages.hintText.roleType} />}
                                >
                                  {practitionerRoleCodes && practitionerRoleCodes.map((roleType) =>
                                    (<MenuItem
                                      key={roleType.code}
                                      value={roleType.code}
                                      primaryText={roleType.display}
                                    />),
                                  )}
                                </SelectField>
                              </TableRowColumn>
                              <TableRowColumn>
                                <SelectField
                                  fullWidth
                                  name={`practitionerRoles.${index}.specialty`}
                                  hintText={<FormattedMessage {...messages.hintText.specialty} />}
                                >
                                  {practitionerRoleCodes && practitionerRoleCodes.map((roleType) =>
                                    (<MenuItem
                                      key={roleType.code}
                                      value={roleType.code}
                                      primaryText={roleType.display}
                                    />),
                                  )}
                                </SelectField>
                              </TableRowColumn>
                              <TableRowColumn>
                                <SelectField
                                  fullWidth
                                  name={`practitionerRoles.${index}.active`}
                                  hintText={<FormattedMessage {...messages.hintText.active} />}
                                >
                                  <MenuItem
                                    value
                                    primaryText="Active"
                                  />
                                  <MenuItem
                                    value={false}
                                    primaryText="Inactive"
                                  />
                                </SelectField>
                              </TableRowColumn>
                              <TableRowColumn>
                                <StyledRaisedButton
                                  label="Remove"
                                  backgroundColor={teal500}
                                  labelColor={white}
                                  disabled={logicalId !== undefined}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                </StyledRaisedButton>
                              </TableRowColumn>
                            </TableRow>
                          );
                        })}
                      </Table>
                    </div>)}
                />
              </div>
            </div>
            <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
              <RaisedButton
                fullWidth
                type="submit"
                label="Save"
                backgroundColor={teal500}
                labelColor={white}
                disabled={!dirty || isSubmitting || !isValid}
              />
              <FlatButton
                fullWidth
                label="Cancel"
                default
                disabled={isSubmitting}
                containerElement={<Link to={HOME_URL} />}
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

ManagePractitionerForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  practitionerRoleCodes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  values: PropTypes.object,
  errors: PropTypes.object,
};

export default ManagePractitionerForm;
