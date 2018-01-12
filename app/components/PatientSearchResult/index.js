/**
*
* PatientSearchResult
*
*/

import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import RefreshIndicatorLoading from '../RefreshIndicatorLoading';
import styles from './PatientSearchResult.css';

function displayPatientSearchResult(patients) {
  return patients && patients.map((patient) => (
    <div key={`patient-${uniqueId()}`} className={styles.rowGridContainer}>
      <div className={styles.cellGridItem}>{patient.name[0] != null ? patient.name[0].firstName : null}</div>
      <div className={styles.cellGridItem}>{patient.name[0] != null ? patient.name[0].lastName : null}</div>
      <div className={styles.cellGridItem}>{getDOB(patient.birthDate)}</div>
      <div className={styles.cellGridItem}>{patient.genderCode}</div>
      <div className={styles.cellGridItem}>{getIdentifiers(patient.identifier)}</div>
      <div className={styles.cellGridItem}>{patient.active ? 'active' : 'inactive' }</div>
    </div>
  ));
}

function getIdentifiers(identifier) {
  return identifier.map((entry) =>
    (
      <div key={`patient-id-${uniqueId()}`}>
        {entry.system}: {entry.value}
        <br />
      </div>
    )
  );
}

function getDOB(birthDate) {
  return birthDate ? (<div>{ birthDate.monthValue}/{birthDate.dayOfMonth}/{birthDate.year}</div>) : '';
}

function PatientSearchResult({ loading, error, searchResult }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    console.log(error);
    return (<p>Error!</p>);
  }

  if (error !== false) {
    console.log(error);
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false && searchResult.length === 0) {
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false && searchResult.length !== 0) {
    return (
      <div className={styles.table}>
        <div className={styles.rowGridContainer}>
          <div className={styles.cellGridHeaderItem}>FirstName</div>
          <div className={styles.cellGridHeaderItem}>LastName</div>
          <div className={styles.cellGridHeaderItem}>DOB</div>
          <div className={styles.cellGridHeaderItem}>Gender</div>
          <div className={styles.cellGridHeaderItem}>Identifier</div>
          <div className={styles.cellGridHeaderItem}>Status</div>
        </div>
        {displayPatientSearchResult(searchResult)}
      </div>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
};

export default PatientSearchResult;
