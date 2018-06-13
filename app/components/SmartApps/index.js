/**
 *
 * SmartApps
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Avatar from 'material-ui/Avatar';
import { Cell, Grid } from 'styled-css-grid';

import SmartAppLauncher from 'containers/SmartAppLauncher';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledText from 'components/StyledText';
import c2sIcon from 'images/c2s-logo.png';
import LaunchButton from './LaunchButton';
import messages from './messages';

class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PanelSection>
        <Padding left={5} right={5} top={5} bottom={5}>
          <Grid gap="10px" columns="repeat(5, 1fr)">
            <Cell>
              <LaunchButton component={Link} target="_blank" to="http://localhost:9000/c2s-sof-ui">
                <Avatar size={25} src={c2sIcon} />
                <StyledText fontWeight={600} whiteSpace><FormattedMessage {...messages.c2sLaunchButton} /></StyledText>
              </LaunchButton>
            </Cell>
            <Cell center />
            <Cell center />
            <Cell center />
            <Cell>
              <SmartAppLauncher />
            </Cell>
          </Grid>
        </Padding>
      </PanelSection>
    );
  }
}

SmartApps.propTypes = {};

export default SmartApps;
