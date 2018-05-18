/**
 *
 * SelectConsentMedicalInfo
 *
 */

import React from 'react';
import Radio, { RadioGroup } from 'material-ui-next/Radio';
import { FormControlLabel } from 'material-ui-next/Form';
import { FormattedMessage } from 'react-intl';
import StyledText from 'components/StyledText';
import messages from './messages';


class SelectConsentMedicalInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      medInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ medInfo: event.target.value });
  }

  render() {
    return (
      <div>
        <StyledText><FormattedMessage {...messages.medInfoTitle} /></StyledText>
        <RadioGroup
          name="medInfo"
          value={this.state.medInfo}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="shareAll"
            control={<Radio color="primary" />}
            label={<FormattedMessage {...messages.shareAll} />}
          />
          <FormControlLabel
            value="shareSpecific"
            control={<Radio color="primary" />}
            label={<FormattedMessage {...messages.shareSpecific} />}
          />
        </RadioGroup>
      </div>
    );
  }
}

SelectConsentMedicalInfo.propTypes = {};

export default SelectConsentMedicalInfo;
