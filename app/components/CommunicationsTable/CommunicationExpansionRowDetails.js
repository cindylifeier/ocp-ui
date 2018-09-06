import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';


function CommunicationExpansionRowDetails({ communication }) {
  const { payloadContent, note, notDoneReasonValue } = communication;
  return (
    <div>
      <InfoSection>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.noCommunicatonReason} />}
              text={notDoneReasonValue}
            />
          </Cell>
        </Grid>
        <Grid columns={'50% 50%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.message} />}
              text={payloadContent}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.note} />}
              text={note}
            />
          </Cell>
        </Grid>
      </InfoSection>
    </div>
  );
}

CommunicationExpansionRowDetails.propTypes = {
  communication: PropTypes.object.isRequired,
};

export default CommunicationExpansionRowDetails;
