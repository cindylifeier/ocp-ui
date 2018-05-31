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
import CustomErrorText from 'components/CustomErrorText';
import StyledDialog from 'components/StyledDialog';
import AddMedicalInformation from './AddMedicalInformation';
import AddedMedicalInformation from './AddedMedicalInformation';
import { SHARE_ALL, SHARE_SPECIFIC } from './constants';
import messages from './messages';


class SelectMedicalInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      shareType: SHARE_ALL,
      isMedicalInfoDialogOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    this.state = {
      medicalInformation: this.props.securityLabels,
      sharedType: this.props.shareType,
    };
    if (this.props.isGeneralDesignation) {
      this.state.shareType = SHARE_ALL;
    }
  }
  handleChange(event) {
    this.setState({ shareType: event.target.value });
  }

  handleOpenDialog() {
    this.setState({ isMedicalInfoDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isMedicalInfoDialogOpen: false });
  }

  render() {
    const { shareType, errors, medicalInformation, securityLabels, isGeneralDesignation } = this.props;
    const addMedicalInfoProps = { shareType, medicalInformation, securityLabels };
    return (
      <div>
        <div><FormattedMessage {...messages.medicalInfoTitle} /></div>
        <RadioGroup
          name="shareType"
          value={this.state.shareType}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value={SHARE_ALL}
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedHTMLMessage {...messages.shareAll} />}
            disabled={isGeneralDesignation}
          />
          <FormControlLabel
            value={SHARE_SPECIFIC}
            control={<Radio color="primary" onClick={this.handleOpenDialog} />}
            label={<FormattedHTMLMessage {...messages.shareSpecific} />}
            disabled={isGeneralDesignation}
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
                  <FormattedMessage {...messages.medicalInfoDialogSubtitle} />
                  <AddMedicalInformation
                    shareType={this.state.shareType}
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                    {...addMedicalInfoProps}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
        <AddedMedicalInformation medicalInformation={medicalInformation} />
        {errors && errors.medicalInformation &&
        <CustomErrorText>{errors.medicalInformation}</CustomErrorText>
        }
      </div>
    );
  }
}

SelectMedicalInformation.propTypes = {
  errors: PropTypes.shape({
    medicalInformation: PropTypes.any,
  }),
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
  isGeneralDesignation: PropTypes.bool.isRequired,
  shareType: PropTypes.oneOf([SHARE_ALL, SHARE_SPECIFIC]),
};

export default SelectMedicalInformation;
