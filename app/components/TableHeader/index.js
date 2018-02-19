/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderStyledGrid from './TableHeaderStyledGrid';

function TableHeader({ children }) {
  return (
    <TableHeaderStyledGrid gap="5px" columns={`repeat(${React.Children.count(children)}, 1fr)`}>
      {children}
    </TableHeaderStyledGrid>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node,
};

export default TableHeader;
