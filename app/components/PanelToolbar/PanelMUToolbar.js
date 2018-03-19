/**
 *
 * PanelMUToolbar
 *
 */

import styled from 'styled-components';
import { Toolbar } from 'material-ui/Toolbar';

const PanelMUToolbar = styled(Toolbar).attrs({
  style: {
    backgroundColor: '#91AAB3',
    height: '30px',
  },
})('');

PanelMUToolbar.propTypes = {};

export default PanelMUToolbar;
