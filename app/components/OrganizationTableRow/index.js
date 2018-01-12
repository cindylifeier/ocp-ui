/**
 *
 * OrganizationTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrganizationTableRow.css';

function OrganizationTableRow(props) {
  const { name, address, telephone, id, status, striped, onRowClick } = props;
  return (
    <div
      className={`${styles.rowGridContainerOrganization} ${striped ? styles.striped : ''}`}
      onClick={() => onRowClick && onRowClick(props)}
      role="button"
      tabIndex="-1"
    >
      <div className={styles.cellGridItem}>&gt;</div>
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
  striped: PropTypes.bool,
  onRowClick: PropTypes.func,
};

export default OrganizationTableRow;
