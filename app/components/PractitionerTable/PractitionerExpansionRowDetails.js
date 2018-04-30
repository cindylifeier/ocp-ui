import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function PractitionerExpansionRowDetails({ practitioner }) {
  const { addresses, name, identifiers, telecoms, active } = practitioner;
  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.name} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.identifiers} />}
            text={identifiers}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.addresses} />}
            text={addresses}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.telecoms} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.status} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

PractitionerExpansionRowDetails.propTypes = {
  practitioner: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    practitionerRoles: PropTypes.array,
  }).isRequired,
};

export default PractitionerExpansionRowDetails;
