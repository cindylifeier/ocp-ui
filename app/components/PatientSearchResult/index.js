/**
 *
 * PatientSearchResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import RefreshIndicatorLoading from '../RefreshIndicatorLoading';
import styles from './styles.css';
import { MANAGE_CARE_TEAM_URL } from '../../containers/App/constants';

const iconStyles = {
  iconButton: {
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: 26,
    position: 'absolute',
    top: '0',
    right: '0',
  },
};

function displayPatientSearchResult(patients, onPatientClick) {
  return patients && patients.map((patient) => (
    <div
      key={`patient-${uniqueId()}`}
      className={styles.rowGridContainer}
      onClick={() => onPatientClick && onPatientClick(patient)}
      role="button"
      tabIndex="0"
    >
      <div className={styles.cellGridItem}>{patient.name[0] != null ? patient.name[0].firstName : null}</div>
      <div className={styles.cellGridItem}>{patient.name[0] != null ? patient.name[0].lastName : null}</div>
      <div className={styles.cellGridItem}>{patient.birthDate}</div>
      <div className={styles.cellGridItem}>{patient.genderCode}</div>
      <div className={styles.cellGridItem}>{getIdentifiers(patient.identifier)}</div>
      <div className={styles.cellGridItem}>{patient.active ? 'active' : 'inactive'}</div>
      <IconMenu
        iconButtonElement={
          (<IconButton
            className={styles.iconButton}
            iconStyle={iconStyles.icon}
            style={iconStyles.iconButton}
          >
            <NavigationMenu />
          </IconButton>)
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          className={styles.menuItem}
          primaryText="Add Care Team"
          containerElement={<Link
            to={{
              pathname: MANAGE_CARE_TEAM_URL,
              search: `?patientId=${patient.id}`,
            }}
          />}
        />
        <MenuItem
          className={styles.menuItem}
          primaryText="Edit"
          containerElement={<Link to={`/ocp-ui/manage-patient/${patient.id}`} />}
        />
        <MenuItem className={styles.menuItem} primaryText="Remove" disabled />
      </IconMenu>
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
    ),
  );
}

function PatientSearchResult({ loading, error, searchResult, onPatientClick }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    return (<p>Error!</p>);
  }

  if (error !== false) {
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length === 0) {
    return (<p>No patients found.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length !== 0) {
    return (
      <div className={styles.table}>
        <div className={styles.rowGridHeaderContainer}>
          <div className={styles.cellGridHeaderItem}>First Name</div>
          <div className={styles.cellGridHeaderItem}>Last Name</div>
          <div className={styles.cellGridHeaderItem}>DOB</div>
          <div className={styles.cellGridHeaderItem}>Gender</div>
          <div className={styles.cellGridHeaderItem}>Identifier</div>
          <div className={styles.cellGridHeaderItem}>Status</div>
          <div></div>
        </div>
        {displayPatientSearchResult(searchResult, onPatientClick)}
      </div>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
};

export default PatientSearchResult;
