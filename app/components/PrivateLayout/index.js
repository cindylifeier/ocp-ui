/**
 *
 * PrivateLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import LayoutGrid from './LayoutGrid';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function PrivateLayout(props) {
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <ContentContainer>
        <main>{props.children}</main>
      </ContentContainer>
    </LayoutGrid>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayout;
