/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderStyledGrid from './TableHeaderStyledGrid';

function TableHeader({ children, columns }) {
  return (
    <TableHeaderStyledGrid gap="5px" columns={columns || `repeat(${React.Children.count(children)}, 1fr)`}>
      {children}
    </TableHeaderStyledGrid>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
};

export default TableHeader;
