/**
*
* SideBar
*
*/

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';

class SideBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Card>
          <CardText>
            <div className={styles.gridContainer}>
              <input
                className={styles.searchBoxGridItem}
                placeholder="Search My Site"
              />
              <div className={styles.searchIconGridItem}>
                <IconButton iconClassName="fa fa-search" />
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
}

SideBar.propTypes = {

};

export default SideBar;
