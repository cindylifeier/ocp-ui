/**
*
* PurposeOfUse
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import { FieldArray } from 'formik';
import Dialog from 'material-ui-next/es/Dialog/Dialog';
import PurposeOfUseForm from 'components/PurposeOfUse/PurposeOfUseForm';
import PurposeOfUseTable from 'components/PurposeOfUse/PurposeOfUseTable';
import PropTypes from 'prop-types';
import messages from './messages';

class PurposeOfUse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPurposeOfUsesDialogOpen: false,
      editingPurposeOfUse: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditPurposeOfUse = this.handleEditPurposeOfUse.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isPurposeOfUsesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isPurposeOfUsesDialogOpen: false,
      editingPurposeOfUse: null,
    });
  }

  handleEditPurposeOfUse(index, telecom) {
    this.setState((prevState) => ({
      isPurposeOfUsesDialogOpen: !prevState.isPurposeOfUsesDialogOpen,
      editingPurposeOfUse: { index, telecom },
    }));
  }
  render() {
    const { purposeOfUse } = this.props;
    const pouFormProps = {
      purposeOfUse,
    };
    const pouTableProps = {
      purposeOfUse,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.addPurposeOfUseButton} />
          </AddNewItemButton>
          <FieldArray
            name="pous"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={<FormattedMessage {...messages.dialogPurposeOfUseTitle} />}
                  modal={false}
                  open={this.state.isPurposeOfUseDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <PurposeOfUseForm
                    initialValues={this.state.editingPurposeOfUse}
                    onAddPurposeOfUse={arrayHelpers.push}
                    onRemovePurposeOfUse={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    {...pouFormProps}
                  />
                </Dialog>
                <PurposeOfUseTable
                  handleEditPurposeOfUse={this.handleEditPurposeOfUse}
                  arrayHelpers={arrayHelpers}
                  {...pouTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

PurposeOfUse.propTypes = {
  purposeOfUse: PropTypes.array,

};

export default PurposeOfUse;
