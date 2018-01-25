/**
 *
 * PractitionerSearchResult
 *
 */

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ImageFlashOn from 'material-ui/svg-icons/image/flash-on';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import RefreshIndicatorLoading from '../RefreshIndicatorLoading';
import styles from './styles.css';
import { EMPTY_STRING } from '../../containers/App/constants';

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
          <div></div>
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
        <div>
          <IconMenu
            iconButtonElement={
              (<IconButton
                className={styles.iconButton}
                iconStyle={iconStyles.icon}
                style={iconStyles.iconButton}
              >
                <ImageFlashOn />
              </IconButton>)
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem className={styles.menuItem} primaryText="Edit" />
            <MenuItem className={styles.menuItem} primaryText="Remove" disabled />
          </IconMenu>
        </div>
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
