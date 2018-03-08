/**
 *
 * InfoSection
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoSection = styled.div`
  margin: ${({ margin }) => margin};
`;

InfoSection.propTypes = {
  margin: PropTypes.string,
};

InfoSection.defaultProps = {
  margin: '10px 10px',
};

export default InfoSection;
