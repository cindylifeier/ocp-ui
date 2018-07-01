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
      editingFlag: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditFlag = this.handleEditFlag.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isEpisodeOFCareDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isEpisodeOFCareDialogOpen: false,
      editingFlag: null,
    });
  }

  handleEditFlag(index, flag) {
    this.setState((prevState) => ({
      isEpisodeOFCareDialogOpen: !prevState.isEpisodeOFCareDialogOpen,
      editingFlag: { index, flag },
    }));
  }

  render() {
    const { errors, flags, flagStatuses, flagCategories, patientName, practitioners, episodeOfCareType,
      episodeOfCareStatus, practitioner } = this.props;
    const addEpisodeOfCareFormProps = {
      flagStatuses,
      flagCategories,
      flags,
      patientName,
      practitioners,
      practitioner,
      episodeOfCareStatus,
      episodeOfCareType,
    };
    const addedFlagTableProps = {
      errors,
      flags,
      flagStatuses,
      flagCategories,
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
            name="epidoseOfCare"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={<H1> <FormattedMessage {...messages.addEpisodeOFCareDialogHeader} /> </H1>}
                  modal={false}
                  open={this.state.isEpisodeOFCareDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddEpisodeOfCareForm
                    initialValues={this.state.editingFlag}
                    onAddFlag={arrayHelpers.push}
                    onRemoveFlag={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    patientName={patientName}
                    {...addEpisodeOfCareFormProps}
                  />
                </Dialog>
                <AddEpisodeOfCareTable
                  handleEditFlag={this.handleEditFlag}
                  arrayHelpers={arrayHelpers}
                  {...addedFlagTableProps}
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
  flags: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    code: PropTypes.string,
    status: PropTypes.string,
    author: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
  })),
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  patientName: PropTypes.string,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.array,
  episodeOfCareType: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
};

export default AddEpisodeOfCare;
