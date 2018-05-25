/**
 *
 * C2SLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from 'styled-css-grid';

import { makeSelectUser } from 'containers/App/contextSelectors';
import C2SPrivateHeader from 'components/C2SPrivateHeader';

function C2SLayout(props) {
  return (
    <Grid columns={1}>
      <C2SPrivateHeader user={props.user} />
      <main>{props.children}</main>
    </Grid>
  );
}

C2SLayout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    user_name: PropTypes.string,
  }).isRequired,
};


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(C2SLayout);
