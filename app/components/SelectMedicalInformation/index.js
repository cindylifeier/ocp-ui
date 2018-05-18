/**
 *
 * SelectMedicalInformation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import Radio, { RadioGroup } from 'material-ui-next/Radio';
import { FormControlLabel } from 'material-ui-next/Form';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledText from 'components/StyledText';
import StyledDialog from 'components/StyledDialog';
import AddMedicalInformation from './AddMedicalInformation';
import { SHARE_ALL, SHARE_SPECIFIC } from './constants';
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
    const { medicalInformation, securityLabels } = this.props;
    const addMedicalInfoProps = { medicalInformation, securityLabels };
    return (
      <div>
        <StyledText><FormattedMessage {...messages.medicalInfoTitle} /></StyledText>
        <RadioGroup
          name="medicalInfo"
          value={this.state.medicalInfo}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value={SHARE_ALL}
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedHTMLMessage {...messages.shareAll} />}
          />
          <FormControlLabel
            value={SHARE_SPECIFIC}
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedHTMLMessage {...messages.shareSpecific} />}
          />
        </RadioGroup>
        <FieldArray
          name="medicalInformation"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isMedicalInfoDialogOpen} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.medicalInfoDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddMedicalInformation
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                    {...addMedicalInfoProps}
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

SelectMedicalInformation.propTypes = {
  medicalInformation: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default SelectMedicalInformation;
