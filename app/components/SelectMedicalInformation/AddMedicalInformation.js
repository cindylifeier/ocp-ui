import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

class AddMedicalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, medicalInfo, medicalInfoCodes) {
    if (event.target.checked) {
      this.props.arrayHelpers.push({
        code: medicalInfo.code,
        display: medicalInfo.display,
      });
    } else {
      const index = medicalInfoCodes.indexOf(medicalInfo.code);
      this.props.arrayHelpers.remove(index);
    }
  }

  render() {
    const { medicalInformation, securityLabels, onCloseDialog } = this.props;
    const medicalInfoCodes = medicalInformation.map((medicalInfo) => medicalInfo.code);
    return (
      <Grid columns={1}>
        <Cell>
          {securityLabels.map((securityLabel) => (
            <div key={securityLabel.code}>
              <input
                name="medicalInfo"
                type="checkbox"
                value={securityLabel.code}
                checked={medicalInfoCodes.includes(securityLabel.code)}
                onChange={(event) => this.handleChange(event, securityLabel, medicalInfoCodes)}
              />{' '}
              {securityLabel.display}
            </div>
          ))}
        </Cell>
        <Cell>
          <HorizontalAlignment position="end">
            <StyledRaisedButton fullWidth onClick={onCloseDialog}>
              <FormattedMessage {...messages.confirmButton} />
            </StyledRaisedButton>
          </HorizontalAlignment>
        </Cell>
      </Grid>
    );
  }
}

AddMedicalInformation.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.shape({
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
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

export default AddMedicalInformation;
