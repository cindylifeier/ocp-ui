import styled from 'styled-components';

const GoldenLayoutContainer = styled.div`
  /* Set height considering app bar height */
  & .lm_root {
    height: calc(100vh - 75px);
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
  }
`;

GoldenLayoutContainer.propTypes = {};

export default GoldenLayoutContainer;
