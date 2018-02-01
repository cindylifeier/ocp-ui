/**
 *
 * TableRowColumn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

// import styled from 'styled-components';

function TableRowColumn({ children }) {
  return (
    <div className={styles.cellGridItem}>
      {children}
    </div>
  );
}

TableRowColumn.propTypes = {
  children: PropTypes.node,
};

export default TableRowColumn;
