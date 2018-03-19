/**
*
* AddFlags
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import { FieldArray } from 'formik';

import Section from 'components/Section';
import FormSubtitle from 'components/FormSubtitle';
import H1 from 'components/H1';
import AddFlagsButton from './AddFlagsButton';
import messages from './messages';
import AddFlagForm from './AddFlagForm';
import AddedFlagsTable from './AddedFlagsTable';

class AddFlags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFlagDialogOpen: false,
      editingFlag: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditFlag = this.handleEditFlag.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isFlagDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isFlagDialogOpen: false,
      editingFlag: null,
    });
  }

  handleEditFlag(index, flag) {
    this.setState((prevState) => ({
      isFlagDialogOpen: !prevState.isFlagDialogOpen,
      editingFlag: { index, flag },
    }));
  }

  render() {
    const { errors, flags, flagStatuses, flagCategories } = this.props;
    const addFlagFormProps = {
      flagStatuses,
      flagCategories,
    };
    const addedFlagTableProps = {
      errors,
      flags,
      flagStatuses,
      flagCategories,
    };
    return (
      <div>
        <Section>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddFlagsButton
            onClick={this.handleOpenDialog}
            label={<FormattedMessage {...messages.addFlagButton} />}
          />
          <FieldArray
            name="flags"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title={<H1> <FormattedMessage {...messages.addFlagDialogHeader} /> </H1>}
                  modal={false}
                  open={this.state.isFlagDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddFlagForm
                    initialValues={this.state.editingFlag}
                    onAddFlag={arrayHelpers.push}
                    onRemoveFlag={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    {...addFlagFormProps}
                  />
                </Dialog>
                <AddedFlagsTable
                  handleEditFlag={this.handleEditFlag}
                  arrayHelpers={arrayHelpers}
                  {...addedFlagTableProps}
                />
              </div>
            )}
          />
        </Section>
      </div>
    );
  }
}

AddFlags.propTypes = {
  errors: PropTypes.object,
  flags: PropTypes.array,
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default AddFlags;
