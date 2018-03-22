/**
 *
 * Practitioners
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import RecordsRange from 'components/RecordsRange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PractitionerSearchResult from 'components/PractitionerSearchResult';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import SearchBar from 'components/SearchBar';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import {
  DEFAULT_START_PAGE_NUMBER, MANAGE_PRACTITIONER_URL,
  PRACTITIONERIDENTIFIERSYSTEM,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPractitionerIdentifierSystems } from 'containers/App/lookupSelectors';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectPractitionerSearchResult,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectTotalPages,
  makeSelectTotalElements,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { initializePractitioners, loadPractitionerSearchResult } from './actions';


export class Practitioners extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.initializePractitioners();
    this.props.getLookUpFormData();
  }

  handleChangePage(newPage) {
    const { searchTerms, searchType, includeInactive } = this.props;
    this.props.onChangePage(searchTerms, searchType, includeInactive, newPage);
  }

  handleSearch(searchTerms, includeInactive, searchType) {
    this.props.onSubmitForm(searchTerms, searchType, includeInactive, DEFAULT_START_PAGE_NUMBER);
  }

  render() {
    const { loading, error, searchResult, identifierSystems } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
      identifierSystems,
    };

    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_PRACTITIONER_URL} />}
          />
        </CardHeader>
        <SearchBar
          onSearch={this.handleSearch}
        />
        <CenterAlign>
          <PractitionerSearchResult {...searchResultProps} />
        </CenterAlign>
        {!isEmpty(searchResult) &&
        <div>
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            onChange={this.handleChangePage}
          />
          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.currentPageSize}
          />
        </div>
        }
      </Card>
    );
  }
}

Practitioners.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchResult: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  onChangePage: PropTypes.func,
  onSubmitForm: PropTypes.func,
  initializePractitioners: PropTypes.func,
  getLookUpFormData: PropTypes.func,
  identifierSystems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  totalElements: makeSelectTotalElements(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  includeInactive: makeSelectQueryIncludeInactive(),
  searchResult: makeSelectPractitionerSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      const currentPage = 1;
      dispatch(loadPractitionerSearchResult(searchTerms, searchType, includeInactive, currentPage));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage) => dispatch(loadPractitionerSearchResult(searchTerms, searchType, includeInactive, currentPage)),
    initializePractitioners: () => dispatch(initializePractitioners()),
    getLookUpFormData: () => dispatch(getLookupsAction([PRACTITIONERIDENTIFIERSYSTEM])),
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
