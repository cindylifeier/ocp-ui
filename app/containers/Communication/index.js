/**
 *
 * Communication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import Link from 'react-router-dom/es/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MANAGE_COMMUNICATION_URL } from 'containers/App/constants';
import SearchBar from 'components/SearchBar';
import makeSelectCommunication from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Communication extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static SEARCH_BAR_TEXT_LENGTH = 3;
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {

  }
  render() {
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_COMMUNICATION_URL} />}
          />
        </CardHeader>
        <SearchBar
          minimumLength={Communication.SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />
      </Card>
    );
  }
}

Communication.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  communication: makeSelectCommunication(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'communication', reducer });
const withSaga = injectSaga({ key: 'communication', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Communication);
