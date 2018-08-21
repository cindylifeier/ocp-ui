import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import ExpansionRowDetailsGrid from './ExpansionRowDetailsGrid';
import { flattenFirstContact } from './helpers';
import messages from './messages';

function OrganizationExpansionRowDetails({ organization }) {
  const { addresses, name, identifiers, telecoms, contacts, active } = organization;
  const contact = flattenFirstContact(contacts);
  return (
    <InfoSection>
      <ExpansionRowDetailsGrid>
        <Cell area="name">
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderOrganization} />}
            text={name}
          />
        </Cell>
        <Cell area="identifier">
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderId} />}
            text={identifiers}
          />
        </Cell>
        <Cell area="addresses">
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderAddress} />}
            text={addresses}
          />
        </Cell>
        <Cell area="telecoms">
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderTelecom} />}
            text={telecoms}
          />
        </Cell>
        <Cell area="status">
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderStatus} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
      </ExpansionRowDetailsGrid>
      {contact &&
      <Grid columns={4}>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.contactPeople.name} />}
            text={contact.name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.contactPeople.purpose} />}
            text={contact.purposeDisplay}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.contactPeople.address} />}
            text={contact.address}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.contactPeople.telecoms} />}
            text={contact.telecoms}
          />
        </Cell>
      </Grid>
      }
    </InfoSection>
  );
}

OrganizationExpansionRowDetails.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.object,
      purposeDisplay: PropTypes.string,
      telecoms: PropTypes.array,
      address: PropTypes.object,
    })),
  }).isRequired,
};

export default OrganizationExpansionRowDetails;
