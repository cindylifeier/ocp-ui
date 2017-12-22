/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Card, CardHeader, CardText, Divider } from 'material-ui';
// import messages from './messages';

import styles from './HomePage.css';
import Header from '../../components/Header/index';
import SideBar from '../../components/SideBar/index';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.box} ${styles.header}`}>
          <Header />
        </div>
        <div className={`${styles.box} ${styles.sidebar}`}>
          <SideBar />
        </div>
        <div className={`${styles.box} ${styles.task}`}>
          <Card style={styles.taskCard}>
            <CardHeader title="TASKS" />
            <Divider />
            <CardText>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form, by injected humour, or
                randomised words which do not look even slightly believable. If you are going
                to use a passage of Lorem Ipsum, you need to be sure there is not anything
                embarrassing hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary, making this the
                first true generator on the Internet. It uses a dictionary of over 200 Latin
                words, combined with a handful of model sentence structures, to generate
                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
                always free from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </CardText>
          </Card>
        </div>
        <div className={`${styles.box} ${styles.consult}`}>
          <Card className={styles.taskCard}>
            <CardHeader title="OPEN CONSULTS" />s
            <Divider />
            <CardText>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form, by injected humour, or
                randomised words which do not look even slightly believable. If you are going
                to use a passage of Lorem Ipsum, you need to be sure there is not anything
                embarrassing hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary, making this the
                first true generator on the Internet. It uses a dictionary of over 200 Latin
                words, combined with a handful of model sentence structures, to generate
                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
                always free from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </CardText>
          </Card>
        </div>
        <div className={`${styles.box} ${styles.request}`}>
          <Card className={styles.requestCard}>
            <CardHeader title="OPEN REQUESTS" />
            <Divider />
            <CardText>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form, by injected humour, or
                randomised words which do not look even slightly believable. If you are going
                to use a passage of Lorem Ipsum, you need to be sure there is not anything
                embarrassing hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary, making this the
                first true generator on the Internet. It uses a dictionary of over 200 Latin
                words, combined with a handful of model sentence structures, to generate
                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
                always free from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}
