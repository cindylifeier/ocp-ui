import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function ExpansionDetails({ patient }) {
  const { addresses, name, genderCode, identifier, telecoms, birthDate } = patient;
  return (
    <InfoSection>
      <Grid columns={'80% 20%'} justifyContent="space-between">
        <Cell>
          <Grid columns={'repeat(4, 1fr)'} justifyContent="space-between">
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsFirstName} />}
                text={name}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsLastName} />}
                text={name}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.gender} />}
                text={genderCode}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsSSN} />}
                text={identifier}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsAddresses} />}
                text={addresses}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.contacts} />}
                text={telecoms}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsDOB} />}
                text={birthDate}
              />
            </Cell>
          </Grid>
        </Cell>
        <Cell />
      </Grid>
    </InfoSection>
  );
}

ExpansionDetails.propTypes = {
  patient: PropTypes.shape({
    identifier: PropTypes.string,
    genderCode: PropTypes.string,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    birthDate: PropTypes.string,
  }).isRequired,
};

export default ExpansionDetails;
