/**
 *
 * TableHeaderColumn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

// import styled from 'styled-components';

function TableHeaderColumn({ children }) {
  return (
    <div className={styles.cellGridHeaderItem}>
      {children}
    </div>
  );
}

TableHeaderColumn.propTypes = {
  children: PropTypes.node,
};

export default TableHeaderColumn;
