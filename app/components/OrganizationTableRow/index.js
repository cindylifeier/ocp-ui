/**
 *
 * OrganizationTableRow
 *
 */

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionList from 'material-ui/svg-icons/action/list';

import PropTypes from 'prop-types';
import styles from './styles.css';
import { ENTER_KEY } from '../../containers/App/constants';

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
      <div>
        <IconMenu
          iconButtonElement={
            (<IconButton
              className={styles.iconButton}
              iconStyle={iconStyles.icon}
              style={iconStyles.iconButton}
            >
              <ActionList />
            </IconButton>)
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem className={styles.menuItem} primaryText="Edit" />
          <MenuItem className={styles.menuItem} primaryText="Add Location" />
          <MenuItem className={styles.menuItem} primaryText="Remove" />
        </IconMenu>
      </div>
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
