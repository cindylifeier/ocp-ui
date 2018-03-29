/**
*
* StyledFormikCheckbox
*
*/

import styled from 'styled-components';
import Checkbox from 'components/Checkbox';


const StyledFormikCheckbox = styled(Checkbox).attrs({
  labelStyle: {
    left: '-10px',
  },
})('');

StyledFormikCheckbox.propTypes = {

};

export default StyledFormikCheckbox;
