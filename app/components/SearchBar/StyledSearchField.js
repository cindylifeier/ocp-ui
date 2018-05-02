import styled from 'styled-components';
import SelectField from 'components/SelectField';

const StyledSearchField = styled(SelectField).attrs({
  // we can define static props
  labelStyle: {
    fontSize: '12px',
    lineHeight: '30px',
    height: '30px',
  },
  menuStyle: {
    backgroundColor: 'light-blue',
  },
  menuItemStyle: {
    height: '12px',
    fontSize: '12px',
  },
  iconStyle: {
    top: '-12px',
  },
  style: {
    height: '30px',
  },
})('');

StyledSearchField.propTypes = {};

export default StyledSearchField;
