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
import { MANAGE_PRACTITIONER_URL, PRACTITIONERIDENTIFIERSYSTEM } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CenterAlign from 'components/Align/CenterAlign';
import { PanelToolbar } from 'components/PanelToolbar';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import PractitionerSearchResult from 'components/PractitionerSearchResult';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { initializePractitioners, searchPractitioners } from './actions';
import makeSelectPractitioners from './selectors';

export class Practitioners extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: true,
      searchPractitioners: {
        currentPage: 1,
        searchValue: '',
        includeInactive: false,
        searchType: 'name',
      },
    };
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.initializePractitioners();
    this.props.getLookUpFormData();
  }

  handleChangeSearchPage(currentPage) {
    this.setState({ currentPage });
    this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage);
  }

  handleSearch(searchType, searchValue, includeInactive) {
    this.setState({
      isShowSearchResult: true,
      searchPractitioners: { searchType, searchValue, includeInactive },
    });
    this.props.searchPractitioners(searchType, searchValue, includeInactive, this.state.searchPractitioners.currentPage);
  }

  render() {
    const { practitioners } = this.props;
    const searchResultProps = {
      practitioners,
    };
    let practitionersData;
    if (this.state.isShowSearchResult) {
      practitionersData = {
        loading: practitioners.searchPractitioners.loading,
        data: practitioners.searchPractitioners.result,
        currentPage: practitioners.searchPractitioners.currentPage,
        totalNumberOfPages: practitioners.searchPractitioners.totalNumberOfPages,
        handlePageClick: this.handleChangeSearchPage,
      };
    }
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_PRACTITIONER_URL,
    };

    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} />
        {practitionersData.loading && <RefreshIndicatorLoading />}
        {(!practitionersData.loading && practitionersData.data &&
          practitionersData.data.length > 0 ?
            <div>
              <PractitionerSearchResult {...searchResultProps} />
              <CenterAlignedUltimatePagination
                currentPage={this.props.currentPage}
                totalPages={this.props.totalPages}
                onChange={this.handleChangeSearchPage}
              />
            </div> :
            (<CenterAlign>
              <NoResultsFoundText>No practitioners found</NoResultsFoundText>
            </CenterAlign>)
        )}
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
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  searchPractitioners: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
  getLookUpFormData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializePractitioners: () => dispatch(initializePractitioners()),
    getLookUpFormData: () => dispatch(getLookupsAction([PRACTITIONERIDENTIFIERSYSTEM])),
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
