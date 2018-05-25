import React from 'react';
import { FormattedMessage } from 'react-intl';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function ConsentPanel() {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText whiteSpace>
            <FormattedMessage {...messages.consentPanel.panelSummary} />
          </StyledText>
        }
      >
        <FullWidthPanelDetails>
          <FormattedMessage {...messages.header} />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

ConsentPanel.propTypes = {};

export default ConsentPanel;
