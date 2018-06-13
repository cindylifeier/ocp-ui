/**
 *
 * SmartApps
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'styled-css-grid';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PanelSection>
        <Padding left={5}>
          <Grid rows={1}>
            <StyledRaisedButton>Test</StyledRaisedButton>
          </Grid>
          <FormattedMessage {...messages.header} />
        </Padding>
      </PanelSection>
    );
  }
}

SmartApps.propTypes = {};

export default SmartApps;
