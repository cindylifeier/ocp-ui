/**
 *
 * StyledDialog
 *
 */

import styled from 'styled-components';
import SelectField from 'material-ui/SelectField';

const RoleSelectField = styled(SelectField).attrs({
  style: {
    width: '280px',
  },
})('');

RoleSelectField.propTypes = {};

export default RoleSelectField;
