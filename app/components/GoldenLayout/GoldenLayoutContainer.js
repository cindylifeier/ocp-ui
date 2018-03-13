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
    background: #f4f4f4;
  }

  & .lm_tab.lm_active {
    background: #f4f4f4;
    color: #33666f;
    font-weight: bold;
    font-size: 16px;
    min-height: 18px;
  }
`;

GoldenLayoutContainer.propTypes = {
  containerHeight: PropTypes.string,
};

export default GoldenLayoutContainer;
