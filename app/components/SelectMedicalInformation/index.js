/**
 *
 * SelectMedicalInformation
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import Radio, { RadioGroup } from 'material-ui-next/Radio';
import { FormControlLabel } from 'material-ui-next/Form';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledText from 'components/StyledText';
import StyledDialog from 'components/StyledDialog';
import messages from './messages';


class SelectMedicalInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      medicalInfo: null,
      isMedicalInfoDialogOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleChange(event) {
    this.setState({ medicalInfo: event.target.value });
  }

  handleOpenDialog() {
    this.setState({ isMedicalInfoDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isMedicalInfoDialogOpen: false });
  }

  render() {
    return (
      <div>
        <StyledText><FormattedMessage {...messages.medicalInfoTitle} /></StyledText>
        <RadioGroup
          name="medicalInfo"
          value={this.state.medicalInfo}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="shareAll"
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedMessage {...messages.shareAll} />}
          />
          <FormControlLabel
            value="shareSpecific"
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedMessage {...messages.shareSpecific} />}
          />
        </RadioGroup>
        <FieldArray
          name="medicalInformation"
          render={() => (
            <div>
              <StyledDialog open={this.state.isMedicalInfoDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.medicalInfoDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <h1>Test</h1>
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

SelectMedicalInformation.propTypes = {};

export default SelectMedicalInformation;
