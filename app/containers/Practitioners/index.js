/**
 *
 * Practitioners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MANAGE_PRACTITIONER_URL } from 'containers/App/constants';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import { PanelToolbar } from 'components/PanelToolbar';
import PractitionerTable from 'components/PractitionerTable';
import { getPractitioners, initializePractitioners, searchPractitioners } from './actions';
import { flattenPractitionerData } from './helpers';
import reducer from './reducer';
import saga from './saga';
import makeSelectPractitioners from './selectors';
import messages from './messages';

export class Practitioners extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: false,
      listPractitioners: {
        currentPage: 1,
      },
      searchPractitioners: {
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handleChangeListPage = this.handleChangeListPage.bind(this);
  }

  componentDidMount() {
    this.props.initializePractitioners();
    const initialCurrentPage = 1;
    this.props.getPractitioners(initialCurrentPage);
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchPractitioners: { searchType, searchValue, includeInactive },
    });
    this.props.searchPractitioners(searchType, searchValue, includeInactive, this.state.searchPractitioners.currentPage);
  }

  handleChangeSearchPage(currentPage) {
    this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage);
  }

  handleChangeListPage(currentPage) {
    this.props.getPractitioners(currentPage);
  }

  render() {
    const { practitioners } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_PRACTITIONER_URL,
    };
    // By initial to show listing practitioners data
    let practitionersData = {
      loading: practitioners.listPractitioners.loading,
      data: flattenPractitionerData(practitioners.listPractitioners.data),
      currentPage: practitioners.listPractitioners.currentPage,
      totalNumberOfPages: practitioners.listPractitioners.totalNumberOfPages,
      handleChangePage: this.handleChangeListPage,
    };
    if (this.state.isShowSearchResult) {
      practitionersData = {
        loading: practitioners.searchPractitioners.loading,
        data: flattenPractitionerData(practitioners.searchPractitioners.result),
        currentPage: practitioners.searchPractitioners.currentPage,
        totalNumberOfPages: practitioners.searchPractitioners.totalNumberOfPages,
        handleChangePage: this.handleChangeSearchPage,
      };
    }

    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} />
        <PractitionerTable practitionersData={practitionersData} />
      </Card>
    );
  }
}

Practitioners.propTypes = {
  practitioners: PropTypes.shape({
    searchPractitioners: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.array,
      error: PropTypes.bool,
    }),
  }),
  getPractitioners: PropTypes.func.isRequired,
  searchPractitioners: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializePractitioners: () => dispatch(initializePractitioners()),
    getPractitioners: (currentPage) => dispatch(getPractitioners(currentPage)),
    searchPractitioners: (searchType, searchValue, includeInactive, currentPage) => dispatch(searchPractitioners(searchType, searchValue, includeInactive, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitioners', reducer });
const withSaga = injectSaga({ key: 'practitioners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Practitioners);
