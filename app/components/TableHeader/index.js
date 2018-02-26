/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderGrid from './TableHeaderGrid';

function TableHeader({ children, columns }) {
  return (
    <TableHeaderGrid gap="5px" columns={columns || `repeat(${React.Children.count(children)}, 1fr)`}>
      {children}
    </TableHeaderGrid>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
};

export default TableHeader;
