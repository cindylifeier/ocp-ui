/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

// import styled from 'styled-components';

function TableHeader({ children }) {
  return (
    <div
      className={styles.rowGridContainer}
      style={{ gridTemplateColumns: `repeat(${React.Children.count(children)}, 1fr)` }}
    >
      {children}
    </div>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node,
};

export default TableHeader;
