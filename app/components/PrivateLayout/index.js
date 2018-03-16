/**
 *
 * PrivateLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import PrivateHeader from 'components/PrivateHeader';
import PrivateNavigation from 'components/PrivateNavigation';
import LayoutGrid from './LayoutGrid';
import HeaderGrid from './HeaderGrid';
import HeaderCell from './HeaderCell';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function PrivateLayout(props) {
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <HeaderGrid columns={1}>
          <HeaderCell>
            <PrivateHeader context={props.context} />
          </HeaderCell>
          {props.context.role &&
          <Cell>
            <PrivateNavigation context={props.context} />
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
  context: PropTypes.shape({
    role: PropTypes.string,
    patient: PropTypes.shape({
      user_name: PropTypes.string,
      user_id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default PrivateLayout;
