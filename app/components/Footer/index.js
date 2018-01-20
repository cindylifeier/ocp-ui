/**
 *
 * Footer
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import messages from './messages';
import styles from './styles.css';
function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <AppBar
        title={<FormattedMessage {...messages.header} values={{ year }} />}
        showMenuIconButton={false}
      />
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
