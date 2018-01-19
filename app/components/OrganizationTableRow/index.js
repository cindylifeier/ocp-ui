/**
 *
 * OrganizationTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { ENTER_KEY } from '../../containers/App/constants';

function OrganizationTableRow(props) {
  const { name, address, telephone, id, status, onRowClick } = props;
  return (
    <div
      className={styles.rowGridContainer}
      onClick={() => onRowClick && onRowClick(props)}
      onKeyPress={(e) => {
        if (e.key === ENTER_KEY) {
          if (onRowClick) {
            onRowClick(props);
          }
        }
        e.preventDefault();
      }}
      role="button"
      tabIndex="0"
    >
      <div className={styles.cellGridItem}>{name}</div>
      <div className={styles.cellGridItem}>{address}</div>
      <div className={styles.cellGridItem}>{telephone}</div>
      <div className={styles.cellGridItem}>{id}</div>
      <div className={styles.cellGridItem}>{status}</div>
    </div>
  );
}

OrganizationTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string,
  telephone: PropTypes.string,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
};

export default OrganizationTableRow;
