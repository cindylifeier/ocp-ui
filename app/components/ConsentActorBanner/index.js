/**
 *
 * ConsentActorBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';

import StyledText from 'components/StyledText';
import Padding from 'components/Padding';
import Banner from './Banner';
import BannerHeaderCell from './BannerHeaderCell';


function ConsentActorBanner({ name, identifiers, addresses, telecoms }) {
  return (
    <Banner>
      <Grid columns={1}>
        <BannerHeaderCell>
          <StyledText fontWeight={600}>
            {name}
            <StyledText whiteSpace fontWeight={600}>[ {identifiers} ]</StyledText>
          </StyledText>
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
  name: PropTypes.string.isRequired,
  identifiers: PropTypes.string.isRequired,
  addresses: PropTypes.string,
  telecoms: PropTypes.string,
};

export default ConsentActorBanner;
