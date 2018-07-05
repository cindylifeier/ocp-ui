/**
 *
 * AddCoverages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import { FieldArray } from 'formik';

import FormSubtitle from 'components/FormSubtitle';
import H1 from 'components/H1';
import teal from 'material-ui-next/colors/teal';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import AddCoverageForm from 'components/AddCoverages/AddCoverageForm';
import messages from './messages';
import AddedCoverageTable from './AddedCoverageTable';


class AddCoverages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCoverageDialogOpen: false,
      editingCoverage: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditCoverage = this.handleEditCoverage.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isCoverageDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isCoverageDialogOpen: false,
      editingCoverage: null,
    });
  }

  handleEditCoverage(index, coverage) {
    const { beneficiary, startDate, endDate, relationship, subscriberId, type, status, subscriber } = coverage;
    const flattenedCoverage = {
      type,
      subscriberId,
      status,
      relationship,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      subscriber: subscriber && subscriber.reference,
      beneficiary: beneficiary && beneficiary.display,
    };
    this.setState((prevState) => ({
      isCoverageDialogOpen: !prevState.isCoverageDialogOpen,
      editingCoverage: { index, coverage: flattenedCoverage },
    }));
  }

  render() {
    const { errors, coverages, patientName, practitioner,
      policyHolderRelationship, coverageFmStatus, coverageType, subscriptionOptions, composePatientReference, patient, getPatientFullName } = this.props;
    const addCoverageFormProps = {
      patientName,
      practitioner,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      composePatientReference,
      getPatientFullName,
      patient,
    };
    const addedCoverageTableProps = {
      errors,
      coverages,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.addCoverageButton} />
          </AddNewItemButton>
          <FieldArray
            name="coverages"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={<H1> <FormattedMessage {...messages.addCoverageDialogHeader} /> </H1>}
                  modal={false}
                  open={this.state.isCoverageDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddCoverageForm
                    initialValues={this.state.editingCoverage}
                    onAddCoverage={arrayHelpers.push}
                    onRemoveCoverage={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    patientName={patientName}
                    {...addCoverageFormProps}
                  />
                </Dialog>
                <AddedCoverageTable
                  handleEditCoverage={this.handleEditCoverage}
                  arrayHelpers={arrayHelpers}
                  {...addedCoverageTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddCoverages.propTypes = {
  errors: PropTypes.object,
  coverages: PropTypes.array,
  patientName: PropTypes.string,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  subscriptionOptions: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageType: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  composePatientReference: PropTypes.func,
  getPatientFullName: PropTypes.func,
  patient: PropTypes.object,
};

export default AddCoverages;
