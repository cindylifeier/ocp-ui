/**
 * SideBar
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import styles from './styles.css';

function SideBar() {
  return (
    <div>
      <Card className={styles.wrapper}>
        <CardText>
          <div className={styles.gridContainer}>
            <input
              className={styles.searchBoxGridItem}
              placeholder="Search My Site"
            />
            <div className={styles.searchIconGridItem}>
              <IconButton>
                <ActionSearch />
              </IconButton>
            </div>
            <RaisedButton
              className={styles.menuGridItem}
              buttonStyle={{ borderRadius: 25 }}
              label="CURRENT PATIENT"
            />
            <RaisedButton
              className={styles.menuGridItem}
              buttonStyle={{ borderRadius: 25 }}
              label="RECENT PATIENTS"
              containerElement={<Link to="/patients" />}
            />
          </div>
        </CardText>
      </Card>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
