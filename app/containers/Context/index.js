/**
 *
 * Context
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

export class Context extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

Context.propTypes = {
  children: PropTypes.node,
};

const withReducer = injectReducer({ key: 'context', reducer });
const withSaga = injectSaga({ key: 'context', saga });

export default compose(
  withReducer,
  withSaga,
)(Context);
