import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ModeEdit from '@material-ui/icons/ModeEdit';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledImage from 'components/StyledImage';
import brandImg from 'images/omnibus-care-plan-logo.png';
import SliderHeaderSection from './SliderHeaderSection';
import messages from './messages';

function OrganizationSliderHeader(props) {
  const { organization: { logicalId, name, identifiers, active, addresses } } = props;
  return (
    <SliderHeaderSection padding="15px 20px">
      <Grid columns={'20% 1fr 10%'}>
        <Cell>
          <StyledImage height="120px" width="110px" src={brandImg} alt={<FormattedMessage {...messages.orgImg} />} />
        </Cell>
        <Cell>
          <InfoSection margin="0 0 20px 0">
            <StyledText fontSize="16px" fontWeight="700" color="primary">
              {name}
            </StyledText>
          </InfoSection>
          <Grid columns={'60% 40%'} justifyContent="space-between">
            <Cell>ID
              <StyledText whiteSpace fontWeight="700">
                {identifiers}
              </StyledText>
            </Cell>
            <Cell>
              Status
              <StyledText whiteSpace fontWeight="700">
                {active ?
                  <FormattedMessage {...messages.active} /> :
                  <FormattedMessage {...messages.inactive} />
                }
              </StyledText>
            </Cell>
          </Grid>
          <InfoSection margin="20px 0 0 0">
            <div>Address
              <StyledText whiteSpace fontWeight="700">
                {addresses}
              </StyledText>
            </div>
          </InfoSection>
        </Cell>
        <Cell>
          <StyledFlatButton
            component={Link}
            to={`/ocp-ui/manage-organization/${logicalId}`}
          >
            <ModeEdit />
            <FormattedMessage {...messages.edit} />
          </StyledFlatButton>
        </Cell>
      </Grid>
    </SliderHeaderSection>
  );
}

OrganizationSliderHeader.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }).isRequired,
};

export default OrganizationSliderHeader;
