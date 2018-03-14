/**
 *
 * PrivateLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import PrivateHeader from 'components/PrivateHeader';
import LayoutGrid from './LayoutGrid';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function PrivateLayout(props) {
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <PrivateHeader auth={props.auth} />
      </HeaderContainer>
      <ContentContainer>
        <main>{props.children}</main>
      </ContentContainer>
    </LayoutGrid>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

export default PrivateLayout;
