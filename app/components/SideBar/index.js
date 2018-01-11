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
import styles from './SideBar.css';

class SideBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Card className={styles.nav}>
          <CardText>
            <div className={styles.container}>
              <input
                className={styles.searchBox}
                placeholder="Search My Site"
              />
              <span>
                <IconButton iconClassName="fa fa-search" />
              </span>
              <RaisedButton
                className={styles.button}
                buttonStyle={{ borderRadius: 25 }}
                label="CURRENT PATIENT"
              />
              <RaisedButton
                className={styles.button}
                buttonStyle={{ borderRadius: 25 }}
                label="RECENT PATIENT"
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
