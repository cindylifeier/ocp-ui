/**
 *
 * PractitionerSearchResult
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import RefreshIndicatorLoading from '../RefreshIndicatorLoading';
import styles from './styles.css';

// import styled from 'styled-components';
function PractitionerSearchResult({ loading, error, searchResult }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false) {
    return (
      <div className={styles.table}>
        <div className={styles.rowGridContainer}>
          <div className={styles.cellGridHeaderItem}>First Name</div>
          <div className={styles.cellGridHeaderItem}>Last Name</div>
          <div className={styles.cellGridHeaderItem}>Status</div>
          <div className={styles.cellGridHeaderItem}>Telecoms</div>
          <div className={styles.cellGridHeaderItem}>Address</div>
        </div>
        {displayPractitionerSearchResult(searchResult.elements)}
      </div>
    );
  }

  return (<div />);
}

function displayPractitionerSearchResult(practitioners) {
  return (
    practitioners && practitioners.map((practitioner) => (
      <div key={uniqueId()} className={styles.rowGridContainer}>
        <div className={styles['cell-grid-item']}>{practitioner.name[0].firstName ? practitioner.name[0].firstName : ''}</div>
        <div className={styles['cell-grid-item']}>{practitioner.name[0].lastName ? practitioner.name[0].lastName : ''}</div>
        <div className={styles['cell-grid-item']}>{practitioner.active ? 'Active' : 'Inactive'}</div>
        <div className={styles['cell-grid-item']}>{getTelecom(practitioner)}</div>
        <div className={styles['cell-grid-item']}>{getAddress(practitioner)}</div>
      </div>
    )));
}

// Todo: Refactor to make reuseable
function getTelecom(practitioner) {
  const telecoms = practitioner.telecoms;
  let value;
  for (let i = 0; i < telecoms.length; i += 1) {
    if (telecoms[i].system === 'PHONE') {
      value = telecoms[i].value;
    }
  }
  return value;
}

function getAddress(practitioner) {
  const address = practitioner.address[0];
  let value;
  if (address != null) {
    value = `${address.line1} ${address.line2} ${address.city} ${address.stateCode} ${address.postalCode} ${address.countryCode}`;
  }
  return value;
}

PractitionerSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
};

export default PractitionerSearchResult;
