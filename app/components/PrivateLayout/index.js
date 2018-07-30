/**
 *
 * PrivateLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import brandImg from 'images/omnibus-care-plan-logo.png';

import PrivateHeader from 'components/PrivateHeader';
import PrivateNavigation from 'components/PrivateNavigation';
import StyledImage from 'components/StyledImage';
import LayoutGrid from './LayoutGrid';
import HeaderGrid from './HeaderGrid';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function PrivateLayout(props) {
  const BRAND_IMAGE = 'Omnibus Care Plan Logo';
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <HeaderGrid columns={'100px 1fr'} alignContent="end">
          <Cell>
            <StyledImage height="55px" width="75px" src={brandImg} alt={BRAND_IMAGE} />
          </Cell>
          {props.user.role &&
          <Cell>
            <Grid columns={2}>
              <Cell top={2}>
                <PrivateNavigation
                  user={props.user}
                  getLinkUrlByRole={props.getLinkUrlByRole}
                />
              </Cell>
              <Cell left={3} top={2}>
                <PrivateHeader user={props.user} />
              </Cell>
            </Grid>
          </Cell>
          }
        </HeaderGrid>
      </HeaderContainer>
      <ContentContainer>
        <main>{props.children}</main>
      </ContentContainer>
    </LayoutGrid>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateLayout;
