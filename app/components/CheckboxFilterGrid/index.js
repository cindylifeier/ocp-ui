/**
 *
 * CheckboxFilterGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGrid from './CheckboxGrid';

function CheckboxFilterGrid({ columns, children }) {
  return (
    <CheckboxGrid columns={columns || `70px repeat(${(React.Children.count(children) - 1)}, 120px)`}>
      {children}
    </CheckboxGrid>
  );
}

CheckboxFilterGrid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
};

export default CheckboxFilterGrid;
