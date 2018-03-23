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
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import { white } from 'material-ui/styles/colors';

import SearchBar from 'components/SearchBar';
import StyledToolbar from 'components/StyledToolbar';
import AddNewItemButton from './AddNewItemButton';
import messages from './messages';


export class PanelToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: false,
    };

    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
  }

  handleShowSearchBar() {
    this.setState({ isShowSearchBar: !this.state.isShowSearchBar });
  }

  render() {
    const {
      showNewItem,
      showUploadIcon,
      showSettingIcon,
      showFilterIcon,
      showSearchIcon,
      addNewItem,
      onSearch,
      searchField,
      showFilter,
    } = this.props;
    return (
      <div>
        <StyledToolbar
          color="#91AAB3"
          height="30px"
        >
          <ToolbarGroup firstChild>
            {showNewItem &&
            <AddNewItemButton
              label={addNewItem.labelName}
              icon={<AddCircle color={white} />}
              containerElement={<Link to={addNewItem.linkUrl} />}
            />
            }
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {showUploadIcon &&
            <IconButton tooltip={<FormattedMessage {...messages.uploadFiles} />}>
              <FileUploadIcon color={white} />
            </IconButton>
            }
            {showSettingIcon &&
            <IconButton tooltip={<FormattedMessage {...messages.settings} />}>
              <SettingsIcon color={white} />
            </IconButton>
            }
            {showFilterIcon &&
            <IconButton tooltip={<FormattedMessage {...messages.filter} />}>
              <FilterIcon color={white} />
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
                <CancelIcon color={white} /> : <SearchIcon color={white} />
              }
            </IconButton>
            }
          </ToolbarGroup>
        </StyledToolbar>
        {this.state.isShowSearchBar &&
        <SearchBar
          onSearch={onSearch}
          searchField={searchField}
          showFilter={showFilter}
        />
        }
      </div>
    );
  }
}

PanelToolbar.propTypes = {
  showNewItem: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showSettingIcon: PropTypes.bool,
  showFilterIcon: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showFilter: PropTypes.bool,
  addNewItem: PropTypes.shape({
    labelName: PropTypes.node.isRequired,
    linkUrl: PropTypes.string.isRequired,
  }),
  onSearch: PropTypes.func,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    searchValueHintText: PropTypes.node.isRequired,
  }),
};

PanelToolbar.defaultProps = {
  showNewItem: true,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
  showFilter: true,
};

export default PanelToolbar;
