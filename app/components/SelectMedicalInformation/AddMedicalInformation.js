import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

function AddMedicalInformation(props) {
  const { arrayHelpers, medicalInformation, securityLabel, onCloseDialog } = props;
  const medicalInfoCodes = medicalInformation.map((medicalInfo) => medicalInfo.code);
  return (
    <Grid columns={1}>
      <Cell>
        {securityLabel.map((medicalInfo) => (
          <div key={medicalInfo.code}>
            <input
              name="medicalInfo"
              type="checkbox"
              value={medicalInfo.code}
              checked={medicalInfoCodes.includes(medicalInfo.code)}
              onChange={(e) => {
                if (e.target.checked) {
                  arrayHelpers.push({
                    code: medicalInfo.code,
                    display: medicalInfo.display,
                  });
                } else {
                  const idx = medicalInformation && medicalInformation.indexOf(medicalInfo.code);
                  arrayHelpers.remove(idx);
                }
              }}
            />{' '}
            {medicalInfo.display}
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

AddMedicalInformation.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  medicalInformation: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  securityLabel: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddMedicalInformation;
