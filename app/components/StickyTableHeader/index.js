/**
 *
 * StickyTableHeader
 *
 */

import React from 'react';
import StickyDiv from 'components/StickyDiv';
import PropTypes from 'prop-types';
import TableHeader from 'components/TableHeader';


function StickyTableHeader({ children, columns, top }) {
  return (
    <StickyDiv top={top}>
      <TableHeader columns={columns}>
        {children}
      </TableHeader>
    </StickyDiv>
  );
}

StickyTableHeader.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
  top: PropTypes.string,
};

StickyTableHeader.defaultProps = {
  top: '0',
};

export default StickyTableHeader;
