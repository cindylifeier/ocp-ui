/**
 *
 * PanelToolbar
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterIcon from '@material-ui/icons/FilterList';
import common from 'material-ui-next/colors/common';
import isUndefined from 'lodash/isUndefined';
import sizeMe from 'react-sizeme';

import ShowHideWrapper, { functionalRoles } from 'containers/ShowHideWrapper';
import StyledIcon from 'components/StyledIcon';
import FilterBar from 'components/FilterBar';
import StickyDiv from 'components/StickyDiv';
import SearchBar from 'components/SearchBar';
import StyledToolbar from 'components/StyledToolbar';
import AddNewItemButton from './AddNewItemButton';
import messages from './messages';

const white = common.white;
export class PanelToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: false,
      isShowFilter: false,
    };
    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
    this.handleShowFilter = this.handleShowFilter.bind(this);
  }

  handleShowFilter() {
    this.setState({ isShowFilter: !this.state.isShowFilter });
    this.setState({ isShowSearchBar: false });
  }

  handleShowSearchBar() {
    this.setState({ isShowSearchBar: !this.state.isShowSearchBar });
    this.setState({ isShowFilter: false });
  }

  renderPanelToolBar() {
    const {
      allowedAddNewItemRoles,
      showUploadIcon,
      showSettingIcon,
      showFilterIcon,
      showSearchIcon,
      addNewItem,
      onSearch,
      searchField,
      showToDoSpecificFilters,
      onFilter,
      filterField,
    } = this.props;
    return (
      <div>
        <StyledToolbar
          color="#91AAB3"
          height="20px"
        >
          <ToolbarGroup firstChild>
            {!isUndefined(addNewItem) &&
            <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
              <AddNewItemButton
                label={addNewItem.labelName}
                icon={
                  <StyledIcon>
                    <AddCircle color={white} />
                  </StyledIcon>
                }
                containerElement={<Link to={addNewItem.linkUrl} />}
              />
            </ShowHideWrapper>
            }
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {showUploadIcon &&
            <IconButton tooltip={<FormattedMessage {...messages.uploadFiles} />}>
              <StyledIcon>
                <FileUploadIcon color={white} />
              </StyledIcon>
            </IconButton>
            }
            {showSettingIcon &&
            <IconButton tooltip={<FormattedMessage {...messages.settings} />}>
              <StyledIcon>
                <SettingsIcon color={white} />
              </StyledIcon>
            </IconButton>
            }
            {showFilterIcon &&
            <IconButton
              tooltip={this.state.isShowFilter ?
                <FormattedMessage {...messages.cancelFilter} /> :
                <FormattedMessage {...messages.filter} />}
              onClick={this.handleShowFilter}
            >
              {this.state.isShowFilter ?
                <StyledIcon>
                  <CancelIcon color={white} />
                </StyledIcon> :
                <StyledIcon>
                  <FilterIcon color={white} />
                </StyledIcon>}
            </IconButton>
            }
            {showSearchIcon &&
            <IconButton
              tooltip={this.state.isShowSearchBar ?
                <FormattedMessage {...messages.cancelSearch} /> :
                <FormattedMessage {...messages.search} />
              }
              onClick={this.handleShowSearchBar}
            >
              {this.state.isShowSearchBar ?
                <StyledIcon>
                  <CancelIcon color={white} />
                </StyledIcon> :
                <StyledIcon>
                  <SearchIcon color={white} />
                </StyledIcon>
              }
            </IconButton>
            }
          </ToolbarGroup>
        </StyledToolbar>
        {this.state.isShowSearchBar &&
        <SearchBar
          onSearch={onSearch}
          searchField={searchField}
          showToDoSpecificFilters={showToDoSpecificFilters}
        />
        }
        {this.state.isShowFilter &&
        <FilterBar
          onFilter={onFilter}
          filterField={filterField}
          showFilter={showToDoSpecificFilters}
        />
        }
      </div>
    );
  }

  render() {
    const {
      sticky,
    } = this.props;
    let renderContent = (
      <div>{this.renderPanelToolBar()}</div>
    );
    if (sticky) {
      renderContent = (
        <StickyDiv>{this.renderPanelToolBar()}</StickyDiv>
      );
    }

    return renderContent;
  }
}

PanelToolbar.propTypes = {
  sticky: PropTypes.bool,
  allowedAddNewItemRoles: PropTypes.oneOfType([
    PropTypes.oneOf(functionalRoles).isRequired,
    PropTypes.arrayOf(
      PropTypes.oneOf(functionalRoles).isRequired,
    ),
  ]),
  showToDoSpecificFilters: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showSettingIcon: PropTypes.bool,
  showFilterIcon: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  addNewItem: PropTypes.shape({
    labelName: PropTypes.node.isRequired,
    linkUrl: PropTypes.string.isRequired,
  }),
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  filterField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      dateRangeCode: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    filterValueHintText: PropTypes.node.isRequired,
  }),
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    searchValueHintText: PropTypes.node.isRequired,
  }),
};

PanelToolbar.defaultProps = {
  sticky: true,
  addNewItem: undefined,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
  showFilter: true,
  showToDoSpecificFilters: false,
};


// Create the config for SizeMe
const config = {
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: 250,
};

// Call SizeMe with the config to get back the HOC.
const sizeMeHOC = sizeMe(config);

export default sizeMeHOC(PanelToolbar);
