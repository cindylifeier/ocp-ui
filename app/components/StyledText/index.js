/**
 *
 * StyledText
 *
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import teal from 'material-ui-next/colors/teal';
import common from 'material-ui-next/colors/common';

const alignments = ['left', 'center', 'right'];
const colors = ['primary', 'secondary', 'default'];

function defineTextColor(colorPros) {
  switch (colorPros) {
    case 'primary':
      return teal['500'];
    case 'secondary':
      return common.white;
    default:
      return 'default';
  }
}

const StyledText = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => defineTextColor(color)};
  margin: ${({ whiteSpace }) => whiteSpace ? '0 0 0 10px' : '0px'};
  text-align: ${({ textAlign }) => textAlign};
`;

StyledText.propTypes = {
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  color: PropTypes.oneOf(colors),
  whiteSpace: PropTypes.bool,
  textAlign: PropTypes.oneOf(alignments),
};

StyledText.defaultProps = {
  fontSize: 'medium',
  fontWeight: 'normal',
  color: 'default',
  whiteSpace: false,
  textAlign: 'left',
};

export default StyledText;
