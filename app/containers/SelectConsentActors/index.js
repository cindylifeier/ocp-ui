/**
 *
 * SelectConsentActors
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InfoSection from 'components/InfoSection';
import ConsentFromActors from 'components/ConsentFromActors';
import ConsentToActors from 'components/ConsentToActors';
import makeSelectSelectConsentActors from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SelectConsentActors extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <InfoSection>
        <Grid columns={2} gap={'20px'}>
          <Cell>
            <ConsentFromActors />
          </Cell>
          <Cell>
            <ConsentToActors />
          </Cell>
        </Grid>
      </InfoSection>
    );
  }
}

SelectConsentActors.propTypes = {};

const mapStateToProps = createStructuredSelector({
  selectconsentactors: makeSelectSelectConsentActors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'selectConsentActors', reducer });
const withSaga = injectSaga({ key: 'selectConsentActors', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectConsentActors);
