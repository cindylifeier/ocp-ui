/**
*
* StyledIcon
*
*/

import styled from 'styled-components';
import PropTypes from 'prop-types';
import SvgIcon from 'material-ui-next/SvgIcon';

const StyledIcon = styled(SvgIcon)`
  && {
    max-height: ${({ maxHeight }) => maxHeight};
  }
`;

StyledIcon.propTypes = {
  maxHeight: PropTypes.string,
};

StyledIcon.defaultProps = {
  maxHeight: '18px',
};

export default StyledIcon;
