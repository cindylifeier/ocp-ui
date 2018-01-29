/**
 *
 * OrganizationTableRow
 *
 */

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';
import { ENTER_KEY } from '../../containers/App/constants';
import messages from './messages';


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
              <NavigationMenu />
            </IconButton>)
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            className={styles.menuItem}
            primaryText={<FormattedMessage {...messages.edit} />}
            containerElement={<Link to={`/ocp-ui/manage-organization/${id}`} />}
          />
          <MenuItem
            className={styles.menuItem}
            primaryText={<FormattedMessage {...messages.addLocation} />}
            containerElement={<Link to={'/ocp-ui/manage-location'} />}
          />
          <MenuItem className={styles.menuItem} primaryText={<FormattedMessage {...messages.remove} />} />
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
