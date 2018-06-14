/**
 *
 * SmartApps
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Cell, Grid } from 'styled-css-grid';

import SmartAppsGallery from 'components/SmartAppsGallery';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledText from 'components/StyledText';
import c2sIcon from 'images/c2s-logo.png';
import LaunchButton from './LaunchButton';
import messages from './messages';

class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onCreateLaunch, smartApps, config, appShortcuts } = this.props;
    console.log(appShortcuts);
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
              <SmartAppsGallery
                smartApps={smartApps}
                onCreateLaunch={onCreateLaunch}
                config={config}
              />
            </Cell>
          </Grid>
        </Padding>
      </PanelSection>
    );
  }
}

SmartApps.propTypes = {
  onCreateLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })).isRequired,
  config: PropTypes.shape({
    oauth2: PropTypes.shape({
      authorizationServerEndpoint: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  appShortcuts: PropTypes.shape({
    clientIds: PropTypes.array,
  }),
};

export default SmartApps;
