/**
 *
 * Table
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

// import styled from 'styled-components';

function Table({ children }) {
  return (
    <div>
      <div className={styles.table}>
        {children}
      </div>
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
