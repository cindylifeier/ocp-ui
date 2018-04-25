/**
 *
 * AddArtifacts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import Dialog from 'material-ui/Dialog';

import Section from 'components/Section';
import InfoSection from 'components/InfoSection';
import FormSubtitle from 'components/FormSubtitle';
import AddArtifactsForm from './AddArtifactsForm';
import AddedArtifactsTable from './AddedArtifactsTable';
import AddArtifactsButton from './AddArtifactsButton';
import messages from './messages';


class AddArtifacts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isArtifactsDialogOpen: false,
      editingArtifact: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditArtifact = this.handleEditArtifact.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isArtifactsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isArtifactsDialogOpen: false,
      editingArtifact: null,
    });
  }

  handleEditArtifact(index, artifact) {
    this.setState((prevState) => ({
      isArtifactsDialogOpen: !prevState.isArtifactsDialogOpen,
      editingArtifact: { index, artifact },
    }));
  }

  render() {
    const { relatedArtifactTypes, errors, relatedArtifacts } = this.props;
    const addedArtifactsTableProps = {
      errors,
      relatedArtifacts,
    };
    return (
      <div>
        <Section padding="0 2px 5px 2px">
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
          <InfoSection margin="0 10px 10px 10px">
            <AddArtifactsButton onClick={this.handleOpenDialog}>
              <FormattedMessage {...messages.addArtifactsButton} />
            </AddArtifactsButton>
          </InfoSection>
          <FieldArray
            name="relatedArtifacts"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title="Add Artifacts"
                  modal={false}
                  open={this.state.isArtifactsDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddArtifactsForm
                    initialValues={this.state.editingArtifact}
                    onAddArtifact={arrayHelpers.push}
                    onRemoveArtifact={arrayHelpers.remove}
                    relatedArtifactTypes={relatedArtifactTypes}
                    handleCloseDialog={this.handleCloseDialog}
                  />
                </Dialog>
                <AddedArtifactsTable
                  handleEditArtifact={this.handleEditArtifact}
                  arrayHelpers={arrayHelpers}
                  {...addedArtifactsTableProps}
                />
              </div>
            )}
          />
        </Section>
      </div>
    );
  }
}

AddArtifacts.propTypes = {
  relatedArtifactTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  errors: PropTypes.object,
  relatedArtifacts: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default AddArtifacts;
