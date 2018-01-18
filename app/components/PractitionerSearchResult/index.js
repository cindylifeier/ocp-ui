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
import { EMPTY_STRING } from '../../containers/Practitioners/constants';

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
          <div className={styles.cellGridHeaderItem}>Role</div>
          <div className={styles.cellGridHeaderItem}>Identifier</div>
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
        <div className={styles['cell-grid-item']}>
          {practitioner.name[0].firstName ? practitioner.name[0].firstName : ''}
        </div>
        <div className={styles['cell-grid-item']}>
          {practitioner.name[0].lastName ? practitioner.name[0].lastName : ''}
        </div>
        <div className={styles['cell-grid-item']}>{practitioner.active ? 'Active' : 'Inactive'}</div>
        <div className={styles['cell-grid-item']}>{practitioner.role ? practitioner.role : ''}</div>
        <div className={styles['cell-grid-item']}>{mapToIdentifier(practitioner)}</div>
      </div>
    )));
}

// Todo: Refactor to make reuseable
function mapToIdentifier(practitioner) {
  const identifiers = practitioner.identifiers;
  return identifiers && identifiers
    .map((identifier) => {
      const system = identifier.system !== EMPTY_STRING ? identifier.system : 'No system found';
      const value = identifier.value !== EMPTY_STRING ? identifier.value : 'No value found';
      return `${system}: ${value}`;
    })
    .join(', ');
}

PractitionerSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
};

export default PractitionerSearchResult;
