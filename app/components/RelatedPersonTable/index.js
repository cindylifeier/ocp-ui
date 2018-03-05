/**
 *
 * RelatedPersonTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import { MANAGE_RELATED_PERSON_URL } from 'containers/App/constants';
import uniqueId from 'lodash/uniqueId';
import Link from 'react-router-dom/es/Link';
import styles from './styles.css';
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

function RelatedPersonTable({ relatedPersons, selectedPatientId }) {
  return (
    <Table>
      <TableHeader>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRelationship} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn></TableHeaderColumn>
      </TableHeader>
      {relatedPersons && relatedPersons.map((relatedPerson) => (
        <TableRow key={uniqueId()}>
          <TableRowColumn>{relatedPerson.firstName} {relatedPerson.lastName}</TableRowColumn>
          <TableRowColumn>{relatedPerson.relationshipValue}</TableRowColumn>
          <TableRowColumn>{relatedPerson.active ?
            <FormattedMessage {...messages.active} /> :
            <FormattedMessage {...messages.inactive} />}
          </TableRowColumn>
          <TableRowColumn>
            <div className={styles.iconButtonGridContainer}>
              <div className={styles.iconButtonGridItem}>
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
                    primaryText="Edit"
                    containerElement={<Link
                      to={{
                        pathname: `${MANAGE_RELATED_PERSON_URL}/${relatedPerson.relatedPersonId}`,
                        search: `?patientId=${selectedPatientId}`,
                      }}
                    />}
                  />
                </IconMenu>
              </div>
            </div>
          </TableRowColumn>
        </TableRow>
      ))
      }
    </Table>
  );
}

RelatedPersonTable.propTypes = {
  relatedPersons: PropTypes.array.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
};

export default RelatedPersonTable;
