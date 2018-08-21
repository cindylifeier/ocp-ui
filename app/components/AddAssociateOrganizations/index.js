/**
 *
 * AddAssociateOrganizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import teal from 'material-ui-next/colors/teal';
import Close from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import AddPractitionerRole from './AddPractitionerRole';
import messages from './messages';


class AddAssociateOrganizations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
    });
  }

  render() {
    const { onSearch } = this.props;
    return (
      <div>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.addOrganizationButton} />
        </AddNewItemButton>
        <FieldArray
          name="practitionerRoles"
          render={() => (
            <div>
              <StyledDialog maxWidth="md" fullWidth open={this.state.dialogOpen}>
                <DialogTitle>
                  <Grid columns="95% 5%">
                    <Cell>
                      <FormattedMessage {...messages.title} />
                    </Cell>
                    <Cell>
                      <StyledTooltip placement="left" title={<FormattedMessage {...messages.closeButton} />}>
                        <StyledIconButton size="x-small" onClick={this.handleCloseDialog}>
                          <Close />
                        </StyledIconButton>
                      </StyledTooltip>
                    </Cell>
                  </Grid>
                </DialogTitle>
                <DialogContent>
                  <AddPractitionerRole
                    onSearch={onSearch}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

AddAssociateOrganizations.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default AddAssociateOrganizations;
