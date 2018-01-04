/**
 *
 * GoldenLayout
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
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
    this.locationRegistry = [];
    this.initLayout = this.initLayout.bind(this);
    this.destroyLayout = this.destroyLayout.bind(this);
    this.registerLocation = this.registerLocation.bind(this);
  }

  componentDidMount() {
    const initLayout = this.initLayout();
    this.layout = initLayout;
  }

  componentDidUpdate() {
    this.destroyLayout();
    const newLayout = this.initLayout();
    this.layout = newLayout;
  }

  componentWillUnmount() {
    this.destroyLayout();
  }

  initLayout() {
    return initGoldenLayout(document.getElementById(this.props.containerId),
      this.props.componentMetadata,
      this.props.stateMetadata,
      this.registerLocation);
  }

  destroyLayout() {
    // Clean up React Components created by Golden Layout callbacks
    this.locationRegistry.forEach((location) => ReactDOM.unmountComponentAtNode(document.getElementById(location)));
    this.locationRegistry = [];
    if (this.layout) {
      this.layout.destroy();
    }
  }

  registerLocation(location) {
    this.locationRegistry.push(location);
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
