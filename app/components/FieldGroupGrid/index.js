/**
 *
 * IdentifierGroupGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledFieldGroupGrid from './StyledFieldGroupGrid';

function IdentifierGroupGrid({ children, gap, ...rest }) {
  return (
    <StyledFieldGroupGrid gap={gap} {...rest}>
      {children}
    </StyledFieldGroupGrid>
  );
}

IdentifierGroupGrid.propTypes = {
  ...StyledFieldGroupGrid.propTypes,
  children: PropTypes.node,
  gap: PropTypes.string,
};

IdentifierGroupGrid.defaultProps = {
  gap: '0',
};

export default IdentifierGroupGrid;
