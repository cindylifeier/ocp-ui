/**
 *
 * RefreshIndicatorLoading
 *
 */

import React from 'react';
import { RefreshIndicator } from 'material-ui';
import styles from './styles.css';

function RefreshIndicatorLoading() {
  return (
    <RefreshIndicator
      size={50}
      left={-25}
      top={0}
      loadingColor="#FF9800"
      status={'loading'}
      className={styles.center}
    />
  );
}

RefreshIndicatorLoading.propTypes = {};

export default RefreshIndicatorLoading;
