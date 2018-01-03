import React from 'react';
import { MuiThemeProvider } from 'material-ui';

export default function materialUiWrapperHOC(Component) {
  let SuperComponent = Component;
  if (typeof Component === 'function') {
    SuperComponent = React.Component;
  }

  class MaterialUiWrapper extends SuperComponent {
    render() {
      return (
        <MuiThemeProvider>
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  const wrappedComponentName = Component.displayName
    || Component.name
    || 'Component';
  MaterialUiWrapper.displayName = `materialUiWrapperHOC(${wrappedComponentName})`;

  return (<MaterialUiWrapper />);
}
