/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './OrganizationTable.css';
import Organization from '../../components/OrganizationTableRow/Loadable';
import messages from './messages';


function OrganizationTable(props) {
  return (
    <div className={styles.table}>
      <div className={styles.rowGridContainerOrganization}>
        <div className={styles.cellGridItem} />
        <div className={styles.cellGridItem}><FormattedMessage {...messages.tableColumnHeaderOrganization} /></div>
        <div className={styles.cellGridItem}><FormattedMessage {...messages.tableColumnHeaderAddress} /></div>
        <div className={styles.cellGridItem}><FormattedMessage {...messages.tableColumnHeaderTelephone} /></div>
        <div className={styles.cellGridItem}><FormattedMessage {...messages.tableColumnHeaderId} /></div>
        <div className={styles.cellGridItem}><FormattedMessage {...messages.tableColumnHeaderStatus} /></div>
      </div>
      {React.Children.map(props.children, (child, i) => {
        const striped = !(i % 2);
        return React.cloneElement(child, { striped });
      })}
    </div>
  );
}

OrganizationTable.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== Organization) {
        error = new Error(`\`${componentName}\` children should be of type \`Organization\`.`);
      }
    });
    return error;
  },
};

export default OrganizationTable;
