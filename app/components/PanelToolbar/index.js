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
import AddCircle from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterIcon from '@material-ui/icons/FilterList';
import isUndefined from 'lodash/isUndefined';

import sizeMeHOC from 'utils/SizeMeUtils';
import ShowHideWrapper, { functionalRoles } from 'containers/ShowHideWrapper';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import FilterBar from 'components/FilterBar';
import StickyDiv from 'components/StickyDiv';
import SearchBar from 'components/SearchBar';
import StyledToolbar from 'components/StyledToolbar';
import AddNewItemButton from './AddNewItemButton';
import AddNewItemSpan from './AddNewItemSpan';
import messages from './messages';

export class PanelToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: props.showSearchBarByDefault,
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
      showPatientSpecificFilters,
      showAppointmentSpecificFilters,
      onFilter,
      filterField,
      hideToolbar,
    } = this.props;
    return (
      <div>
        {!hideToolbar &&
        <StyledToolbar
          color="#e3e8ea"
          height="30px"
        >

          <ToolbarGroup firstChild>
            {!isUndefined(addNewItem) && addNewItem.linkUrl &&
            <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
              <AddNewItemButton component={Link} to={addNewItem.linkUrl}>
                <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
                  <AddCircle color={'#666'} />
                </StyledIconButton>
                {addNewItem.labelName}
              </AddNewItemButton>
            </ShowHideWrapper>
            }
            {!isUndefined(addNewItem) && addNewItem.onClick &&
            <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
              <AddNewItemSpan onClick={addNewItem.onClick}>
                <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
                  <AddCircle color={'#666'} />
                </StyledIconButton>
                {addNewItem.labelName}
              </AddNewItemSpan>
            </ShowHideWrapper>
            }
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {showUploadIcon &&
            <StyledTooltip title={<FormattedMessage {...messages.uploadFiles} />}>
              <StyledIconButton svgIconSize="small">
                <FileUploadIcon color={'#666'} />
              </StyledIconButton>
            </StyledTooltip>
            }
            {showSettingIcon &&
            <StyledTooltip title={<FormattedMessage {...messages.settings} />}>
              <StyledIconButton svgIconSize="small">
                <SettingsIcon color={'#666'} />
              </StyledIconButton>
            </StyledTooltip>
            }
            {showFilterIcon &&
            <StyledTooltip
              title={this.state.isShowFilter ?
                <FormattedMessage {...messages.cancelFilter} /> :
                <FormattedMessage {...messages.filter} />}
            >
              <StyledIconButton svgIconSize="small" onClick={this.handleShowFilter}>
                {this.state.isShowFilter ?
                  <CancelIcon color={'#666'} /> : <FilterIcon color={'#666'} />
                }
              </StyledIconButton>
            </StyledTooltip>
            }
            {showSearchIcon &&
            <StyledTooltip
              title={this.state.isShowSearchBar ?
                <FormattedMessage {...messages.cancelSearch} /> :
                <FormattedMessage {...messages.search} />}
            >
              <StyledIconButton svgIconSize="small" onClick={this.handleShowSearchBar}>
                {this.state.isShowSearchBar ?
                  <CancelIcon color={'#666'} /> : <SearchIcon color={'#666'} />
                }
              </StyledIconButton>
            </StyledTooltip>
            }
          </ToolbarGroup>
        </StyledToolbar>}
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
          showFilter={showToDoSpecificFilters || showPatientSpecificFilters || showAppointmentSpecificFilters}
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
  showAppointmentSpecificFilters: PropTypes.bool,
  showPatientSpecificFilters: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showSettingIcon: PropTypes.bool,
  showFilterIcon: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showSearchBarByDefault: PropTypes.bool,
  addNewItem: PropTypes.shape({
    labelName: PropTypes.node.isRequired,
    linkUrl: PropTypes.string,
    onClick: PropTypes.func,
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
  hideToolbar: PropTypes.bool,
};

PanelToolbar.defaultProps = {
  sticky: true,
  addNewItem: undefined,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
  showSearchBarByDefault: false,
  showFilter: true,
  showToDoSpecificFilters: false,
  showPatientSpecificFilters: false,
  hideToolbar: false,
};

export default sizeMeHOC(PanelToolbar);
