/**
 *
 * Patients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
makeSelectSearchError, makeSelectSearchLoading, makeSelectSearchResult,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadPatientSearchResult } from './actions';
import PatientSearchResult from '../../components/PatientSearchResult';
import styles from './Patients.css';
import messages from './messages';
import { ENTER_KEY_CODE, SEARCH_TERM_MIN_LENGTH, SEARCH_TYPE } from './constants';

export class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: '',
      searchType: SEARCH_TYPE.NAME,
      includeInactive: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchTerms = this.handleChangeSearchTerms.bind(this);
    this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
    this.handleChangeShowInactive = this.handleChangeShowInactive.bind(this);
  }

  handleSearch() {
    if (this.state.searchTerms && this.state.searchTerms.trim().length > 0) {
      this.props.onSubmitForm(this.state.searchTerms, this.state.searchType, this.state.includeInactive);
    }
  }

  handleChangeSearchTerms(event, newValue) {
    this.setState({ searchTerms: newValue });
  }

  handleChangeSearchType(event, key, value) {
    this.setState({ searchType: value });
  }

  handleChangeShowInactive(event, checked) {
    this.setState({ includeInactive: checked });
  }

  preventEnterSubmission(event) {
    if (event.which === ENTER_KEY_CODE) {
      event.preventDefault();
    }
  }

  render() {
    const { loading, error, searchResult } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
    };

    return (
      <div className={styles.wrapper}>
        <h3><FormattedMessage {...messages.header} /></h3>
        <form>
          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <TextField
                  className={styles.searchField}
                  style={{ width: '45%' }}
                  hintText="Name or ID"
                  underlineShow={false}
                  errorText={this.state.searchTerms.trim().length > 0 && this.state.searchTerms.length < 3 ?
                    <FormattedMessage {...messages.searchTermsInvalid} values={{ SEARCH_TERM_MIN_LENGTH }} /> : ''}
                  value={this.state.searchTerms}
                  onChange={this.handleChangeSearchTerms}
                  onKeyPress={this.preventEnterSubmission}
                />
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <DropDownMenu
                  value={this.state.searchType}
                  onChange={this.handleChangeSearchType}
                >
                  <MenuItem value={SEARCH_TYPE.NAME} primaryText="By Name" />
                  <MenuItem value={SEARCH_TYPE.IDENTIFIER} primaryText="By ID" />
                </DropDownMenu>
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <Checkbox
                  className={styles.checkBox}
                  label={<FormattedMessage {...messages.inactive} />}
                  value={this.state.includeInactive}
                  onCheck={this.handleChangeShowInactive}
                />
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <IconButton
                  iconClassName="fa fa-search"
                  onClick={this.handleSearch}
                />
              </div>
            </div>
          </div>
        </form>
        <br />
        <PatientSearchResult {...searchResultProps} />
      </div>
    );
  }
}

Patients.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchResult: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'patients', reducer });
const withSaga = injectSaga({ key: 'patients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Patients);
