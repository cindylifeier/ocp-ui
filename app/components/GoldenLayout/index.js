/**
 *
 * GoldenLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// Import Golden Layout Style sheet
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
import initGoldenLayout from './initGoldenLayout';
import './GoldenLayout.css';

class GoldenLayout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.layout = null;
  }

  componentDidMount() {
    const initLayout = initGoldenLayout(document.getElementById(this.props.containerId), this.props.componentMetadata, this.props.stateMetadata);
    this.layout = initLayout;
  }

  componentDidUpdate() {
    this.destroyLayout();
    const newLayout = initGoldenLayout(document.getElementById(this.props.containerId), this.props.componentMetadata, this.props.stateMetadata);
    this.layout = newLayout;
  }

  componentWillUnmount() {
    this.destroyLayout();
  }

  destroyLayout() {
    if (this.layout) {
      this.layout.destroy();
    }
  }

  render() {
    return (
      <div id={this.props.containerId}>
      </div>
    );
  }
}

GoldenLayout.propTypes = {
  containerId: PropTypes.string.isRequired,
  stateMetadata: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        componentName: PropTypes.string,
      })),
    })),
  }),
  componentMetadata: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    factoryMethod: PropTypes.func.isRequired,
  })),
};

export default GoldenLayout;
