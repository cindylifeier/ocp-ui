import React from 'react';
import ReactDOM from 'react-dom';

import GoldenLayout from 'golden-layout';

window.React = React;
window.ReactDOM = ReactDOM;

function initGoldenLayout(root, componentMetadata, stateMetadata) {
  const layout = new GoldenLayout(stateMetadata, root);

  // Register all react components
  componentMetadata.forEach((metadata) => {
    layout.registerComponent(metadata.name, (container) => registerComponentWithCallback(container, metadata.factoryMethod));
  });

  layout.init();
  return layout;
}

const nextId = ((function createNextId() {
  let id = 0;
  return function incrementAndGet() {
    id += 1;
    return id;
  };
})());

function registerComponentWithCallback(container, callback) {
  const itsId = nextId();
  const location = `component_${itsId}`;
  container.getElement().html(`<div id="${location}"></div>`);
  setTimeout(() => callback(location), 1);
}

export default initGoldenLayout;
