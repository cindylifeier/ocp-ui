/**
 *
 * SmartApps
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Cell, Grid } from 'styled-css-grid';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledText from 'components/StyledText';
import SmartAppsGallery from 'components/SmartAppsGallery';
import LaunchButton from './LaunchButton';


class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onCreateLaunch, smartApps, config, appShortcuts } = this.props;
    const registeredAppShortcuts = smartApps.filter((app) => appShortcuts.clientIds.includes(app.clientId));
    return (
      <PanelSection>
        <Padding left={5} right={5} top={5} bottom={5}>
          <Grid gap="10px" columns="repeat(auto-fit, minmax(100px,250px))">
            {registeredAppShortcuts && registeredAppShortcuts.map((app) => (
              <Cell key={app.clientId}>
                <LaunchButton component={Link} target="_blank" to={app.appLaunchUrl}>
                  <Avatar size={25} src={`data:image/png;base64,${app.appIcon}`} />
                  <StyledText fontWeight={600} whiteSpace>
                    {app.clientName}
                  </StyledText>
                </LaunchButton>
              </Cell>
            ))}
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
