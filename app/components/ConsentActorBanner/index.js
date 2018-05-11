/**
 *
 * ConsentActorBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import teal from 'material-ui-next/colors/teal';

import Padding from 'components/Padding';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import StyledText from 'components/StyledText';
import Banner from './Banner';
import BannerHeaderCell from './BannerHeaderCell';
import messages from './messages';


function ConsentActorBanner({ actor, flattenActorData, onSelectActor }) {
  const flattenedActor = flattenActorData(actor);
  const { name, identifiers, addresses, telecoms } = flattenedActor;
  return (
    <Banner>
      <Grid columns={1}>
        <BannerHeaderCell>
          <Grid columns="93% 7%">
            <Cell>
              <StyledText fontWeight={600}>
                {name}
                <StyledText whiteSpace fontWeight={600}>[ {identifiers} ]</StyledText>
              </StyledText>
            </Cell>
            <Cell>
              <StyledTooltip title={<FormattedMessage {...messages.selectButton} />}>
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                  onClick={() => onSelectActor && onSelectActor(actor)}
                >
                  <AddCircleIcon color={teal['500']} />
                </StyledIconButton>
              </StyledTooltip>
            </Cell>
          </Grid>
        </BannerHeaderCell>
        <Padding left="2px" right="2px">
          <Cell>
            {addresses}
          </Cell>
          <Cell>
            {telecoms}
          </Cell>
        </Padding>
      </Grid>
    </Banner>
  );
}

ConsentActorBanner.propTypes = {
  onSelectActor: PropTypes.func.isRequired,
  flattenActorData: PropTypes.func.isRequired,
  actor: PropTypes.shape({
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
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

export default ConsentActorBanner;
