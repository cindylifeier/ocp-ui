/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableRowStyledGrid from './TableRowStyledGrid';

function TableRow({ children }) {
  return (
    <TableRowStyledGrid gap="5px" columns={`repeat(${React.Children.count(children)}, 1fr)`}>
      {children}
    </TableRowStyledGrid>
  );
}

TableRow.propTypes = {
  children: PropTypes.node,
};

export default TableRow;
