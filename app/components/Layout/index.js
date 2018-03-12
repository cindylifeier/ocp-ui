/**
 *
 * Layout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import LayoutGrid from './LayoutGrid';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function Layout(props) {
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

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
