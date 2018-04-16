/**
 *
 * StyledText
 *
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';


const alignments = ['left', 'center', 'right'];

const StyledText = styled.div`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-variant: ${({ fontVariant }) => fontVariant};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  text-align: ${({ textAlign }) => textAlign};
`;

StyledText.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontStyle: PropTypes.string,
  fontVariant: PropTypes.string,
  fontWeight: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(alignments),
};

StyledText.defaultProps = {
  fontFamily: 'inherit',
  fontSize: 'medium',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  color: 'inherit',
  textAlign: 'left',
};

export default StyledText;
