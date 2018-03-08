/**
 *
 * Section
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Section = styled.div`
  border-radius: 2px;
  border: ${(props) => props.border ? props.border : '1px solid rgb(224, 224, 224)'};
  padding: ${(props) => props.padding ? props.padding : '0 2px'};
`;

Section.propTypes = {
  border: PropTypes.string,
  padding: PropTypes.string,
};

export default Section;
