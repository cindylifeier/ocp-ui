/**
 *
 * OrganizationTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrganizationTableRow.css';

function OrganizationTableRow(props) {
  const { name, address, telephone, id, status } = props;
  return (
    <div className={styles.rowGridContainerOrganization}>
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
};

export default OrganizationTableRow;
