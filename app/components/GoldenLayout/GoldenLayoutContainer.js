import styled from 'styled-components';
import PropTypes from 'prop-types';

const GoldenLayoutContainer = styled.div`
  /* Set height considering app bar height */
  & .lm_root {
    height: ${(props) => props.containerHeight};
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
    background: #f2f2f2;
  }

  & .lm_tab {
    font-weight: bold;
  }

  & .lm_tab.lm_active {
    color: ${(props) => props.primaryColor};
    background: ${(props) => props.secondaryColor};
    font-size: 18px;
    font-family: Arial Bold, Arial, sans-serif;
    height: 20px;
  }

  & .lm_tab.lm_active:hover,
  .lm_tab:hover {
    color: ${(props) => props.secondaryColor};
    background: ${(props) => props.primaryColor};
    font-size: 18px;
    height: 20px;
  }
`;

GoldenLayoutContainer.propTypes = {
  containerHeight: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

GoldenLayoutContainer.defaultProps = {
  containerHeight: 'calc(100vh - 75px)',
  primaryColor: '#33666f',
  secondaryColor: '#ffffff',
};

export default GoldenLayoutContainer;
