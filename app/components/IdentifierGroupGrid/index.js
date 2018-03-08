/**
 *
 * IdentifierGroupGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledIdentifierGroupGrid from './StyledIdentifierGroupGrid';

function IdentifierGroupGrid({ children, gap, ...rest }) {
  return (
    <StyledIdentifierGroupGrid gap={gap} {...rest}>
      {children}
    </StyledIdentifierGroupGrid>
  );
}

IdentifierGroupGrid.propTypes = {
  ...StyledIdentifierGroupGrid.propTypes,
  children: PropTypes.node,
  gap: PropTypes.string,
};

IdentifierGroupGrid.defaultProps = {
  gap: '0',
};

export default IdentifierGroupGrid;
