import styled from 'styled-components';
import PropTypes from 'prop-types';

const GoldenLayoutContainer = styled.div`
  /* Set height considering app bar height */
  & .lm_header {
    background: #fff;
    border: 1px solid #099;
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }

  & .lm_header + .lm_items {
    background: #fff;
    border: 1px solid #099;
    border-radius: 10px;
    padding: 0 10px 10px 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
  }

  & .lm_header + .lm_items,
  .lm_item_container,
  .lm_content {
    width: auto !important;
  }

  & .lm_root {
    height: ${(props) => props.containerHeight};
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
    background: #fff;
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
    color: #099;
    font-size: 18px;
    height: 20px;
  }

  & .lm_title {
    text-transform: uppercase;
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
