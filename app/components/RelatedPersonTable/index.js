/**
*
* RelatedPersonTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import uniqueId from 'lodash/uniqueId';
import Link from 'react-router-dom/es/Link';
import styles from './styles.css';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import { MANAGE_RELATED_PERSON_URL } from '../../containers/App/constants';


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
    <div >
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
            <TableRowColumn>{relatedPerson.active ? 'Active' : 'Inactive'}</TableRowColumn>
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
    </div>
  );
}

RelatedPersonTable.propTypes = {
  relatedPersons: PropTypes.array.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
};

export default RelatedPersonTable;
