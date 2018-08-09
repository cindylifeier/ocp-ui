import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import upperFirst from 'lodash/upperFirst';
import words from 'lodash/words';
import take from 'lodash/take';
import drop from 'lodash/drop';


import { Link } from 'react-router-dom';
import AddCircle from '@material-ui/icons/AddCircle';
import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import AdvisoryDetails from './AdvisoryDetails';
import messages from './messages';
import StyledFlatButton from '../StyledFlatButton';
import StyledIconButton from '../StyledIconButton';
import { MANAGE_PATIENT_URL } from '../../containers/App/constants';

function ExpansionDetails({ patient }) {
  const { addresses, name, genderCode, identifier, telecoms, birthDate, flags, mrn } = patient;
  const firstName = take(words(name));
  const lastNames = (drop(words(name)));
  const lastName = lastNames.join(' ');
  return (
    <Grid columns={'70% 30%'} justifyContent="space-between">
      <Cell>
        <InfoSection>
          <StyledFlatButton component={Link} to={`${MANAGE_PATIENT_URL}/${patient.id}`}>
            <StyledIconButton size="x-small" svgIconSize="small" disableIconHover aria-label={'Add icon'}>
              <AddCircle color={'#004747'} />
            </StyledIconButton>
            <FormattedMessage {...messages.edit} />
          </StyledFlatButton>
          <Grid columns={'repeat(4, 1fr)'} justifyContent="space-between">
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsFirstName} />}
                text={firstName}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsLastName} />}
                text={lastName}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.gender} />}
                text={upperFirst(genderCode)}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsIdentifiers} />}
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
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsMRN} />}
                text={mrn}
              />
            </Cell>
          </Grid>
        </InfoSection>
      </Cell>
      {flags.length > 0 &&
      <AdvisoryDetails flags={flags} />
      }
    </Grid>
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
    flags: PropTypes.array,
  }).isRequired,
};

export default ExpansionDetails;
