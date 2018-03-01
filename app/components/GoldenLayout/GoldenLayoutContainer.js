import styled from 'styled-components';
import PropTypes from 'prop-types';

const GoldenLayoutContainer = styled.div`
  /* Set height considering app bar height */
  & .lm_root {
    height: ${(props) => props.containerHeight ? props.containerHeight : 'calc(100vh - 75px)'};
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
  }
`;

GoldenLayoutContainer.propTypes = {
  containerHeight: PropTypes.string,
};

export default GoldenLayoutContainer;
