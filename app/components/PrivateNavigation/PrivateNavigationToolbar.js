/**
 *
 * PrivateNavigationToolbar
 *
 */

import styled from 'styled-components';
import { Toolbar } from 'material-ui/Toolbar';

const PrivateNavigationToolbar = styled(Toolbar).attrs({
  style: {
    backgroundColor: 'rgba(32, 60, 85, 1)',
    height: '40px',
  },
})('');

PrivateNavigationToolbar.propTypes = {};

export default PrivateNavigationToolbar;
