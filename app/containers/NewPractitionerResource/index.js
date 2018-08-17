/**
 *
 * NewPractitionerResource
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { PRACTITIONERIDENTIFIERSYSTEM } from 'containers/App/constants';
import { makeSelectPractitionerIdentifierSystems } from 'containers/App/lookupSelectors';
import AddPractitionerModal from 'components/AddPractitionerModal';
import makeSelectNewPractitionerResource from './selectors';
import reducer from './reducer';
import saga from './saga';

export class NewPractitionerResource extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleCheckExisting = this.handleCheckExisting.bind(this);
  }

  componentDidMount() {
    this.props.getLookUp();
  }

  handleCheckExisting() {
  }

  render() {
    const { modalOpen, onModalClose, identifierSystems } = this.props;
    return (
      <div>
        <AddPractitionerModal
          modalOpen={modalOpen}
          onModalClose={onModalClose}
          identifierSystems={identifierSystems}
          onCheckExisting={this.handleCheckExisting}
        />
      </div>
    );
  }
}

NewPractitionerResource.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  getLookUp: PropTypes.func.isRequired,
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = createStructuredSelector({
  newPractitionerResource: makeSelectNewPractitionerResource(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUp: () => dispatch(getLookupsAction([PRACTITIONERIDENTIFIERSYSTEM])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'newPractitionerResource', reducer });
const withSaga = injectSaga({ key: 'newPractitionerResource', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewPractitionerResource);
