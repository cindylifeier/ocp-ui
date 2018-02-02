/**
 *
 * Layout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import styles from './styles.css';

function Layout(props) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <main>{props.children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
