import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Locations from 'containers/Locations';
import ControlledAccordion from 'components/ControlledAccordion';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledText from 'components/StyledText';
import FullWidthPanelDetails from './FullWidthPanelDetails';
import messages from './messages';


function OrganizationSliderLocations() {
  return (
    <div>
      <ControlledAccordion
        accordionTitle={
          <StyledText whiteSpace>
            <FormattedMessage {...messages.locationsPanel.panelSummary} />
          </StyledText>
        }
        expandIcon={
          <StyledTooltip title={<FormattedMessage {...messages.addNew} />}>
            <StyledIconButton component={Link} to={'/ocp-ui/manage-location'} disableIconHover>
              <AddCircleIcon color={teal['500']} />
            </StyledIconButton>
          </StyledTooltip>
        }
      >
        <FullWidthPanelDetails>
          <Locations showActionSection={false} />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </div>
  );
}

OrganizationSliderLocations.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
};

export default OrganizationSliderLocations;
