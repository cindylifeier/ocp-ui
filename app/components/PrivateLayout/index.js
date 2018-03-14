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
  const privateHeaderProps = {
    auth: props.auth,
    context: props.context,
  };
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <PrivateHeader {...privateHeaderProps} />
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
  context: PropTypes.shape({
    patient: PropTypes.shape({
      user_name: PropTypes.string,
      user_id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default PrivateLayout;
