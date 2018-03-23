/**
 *
 * InfoSection
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoSection = styled.div`
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
`;

InfoSection.propTypes = {
  margin: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
};

InfoSection.defaultProps = {
  margin: '10px 10px',
  width: 'auto',
  maxWidth: 'none',
};

export default InfoSection;
