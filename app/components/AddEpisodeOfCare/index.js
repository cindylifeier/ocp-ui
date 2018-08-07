/**
 *
 * AddEpisodeOfCare
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
import AddEpisodeOfCareForm from 'components/AddEpisodeOfCare/AddEpisodeOfCareForm';
import messages from './messages';
import AddEpisodeOfCareTable from './AddEpisodeOfCareTable';


class AddEpisodeOfCare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEpisodeOFCareDialogOpen: false,
      editingEpisodeOfCare: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditEpisodeOfCare = this.handleEditEpisodeOfCare.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isEpisodeOFCareDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isEpisodeOFCareDialogOpen: false,
      editingEpisodeOfCare: null,
    });
  }

  handleEditEpisodeOfCare(index, episodeOfCare) {
    const { startDate, endDate, careManager, type, status } = episodeOfCare;
    const flattenedEpisodeOfCare = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      careManager: careManager.reference,
      type,
      status,
    };
    this.setState((prevState) => ({
      isEpisodeOFCareDialogOpen: !prevState.isEpisodeOFCareDialogOpen,
      editingEpisodeOfCare: { index, episodeOfCare: flattenedEpisodeOfCare },
    }));
  }

  render() {
    const { errors, patientName, practitioners, episodeOfCareType,
      episodeOfCareStatus, practitioner, episodeOfCares } = this.props;
    const addEpisodeOfCareFormProps = {
      patientName,
      practitioners,
      practitioner,
      episodeOfCareStatus,
      episodeOfCareType,
    };
    const addedEpisodeOfCareTableProps = {
      errors,
      episodeOfCares,
      episodeOfCareType,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.episodeOfCareButtton} />
          </AddNewItemButton>
          <FieldArray
            name="episodeOfCares"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={<H1> <FormattedMessage {...messages.addEpisodeOFCareDialogHeader} /> </H1>}
                  modal={false}
                  open={this.state.isEpisodeOFCareDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddEpisodeOfCareForm
                    initialValues={this.state.editingEpisodeOfCare}
                    onAddEpisodeOfCare={arrayHelpers.push}
                    onRemoveEpisodeOfCare={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    patientName={patientName}
                    {...addEpisodeOfCareFormProps}
                  />
                </Dialog>
                <AddEpisodeOfCareTable
                  handleEditEpisodeOfCare={this.handleEditEpisodeOfCare}
                  arrayHelpers={arrayHelpers}
                  {...addedEpisodeOfCareTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddEpisodeOfCare.propTypes = {
  errors: PropTypes.object,
  patientName: PropTypes.string,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.array,
  episodeOfCareType: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  episodeOfCares: PropTypes.array,
};

export default AddEpisodeOfCare;
