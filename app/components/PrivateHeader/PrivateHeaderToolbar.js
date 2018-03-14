/**
 *
 * PrivateHeaderToolbar
 *
 */

import styled from 'styled-components';
import { Toolbar } from 'material-ui/Toolbar';

const PrivateHeaderToolbar = styled(Toolbar).attrs({
  style: {
    backgroundColor: '#fafafa',
    marginRight: '10px',
  },
})('');

PrivateHeaderToolbar.propTypes = {};

export default PrivateHeaderToolbar;
