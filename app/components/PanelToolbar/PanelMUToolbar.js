/**
 *
 * PanelMUToolbar
 *
 */

import styled from 'styled-components';
import { Toolbar } from 'material-ui/Toolbar';

const PanelMUToolbar = styled(Toolbar).attrs({
  style: {
    backgroundColor: 'rgba(145, 170, 179, 1)',
    height: '30px',
  },
})('');

PanelMUToolbar.propTypes = {};

export default PanelMUToolbar;
