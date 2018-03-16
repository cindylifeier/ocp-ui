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
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import SearchIcon from 'material-ui/svg-icons/action/search';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import { white } from 'material-ui/styles/colors';

import SearchBar from 'components/SearchBar';
import PanelMUToolbar from './PanelMUToolbar';
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
    } = this.props;
    return (
      <div>
        <PanelMUToolbar>
          <ToolbarGroup firstChild>
            {showNewItem &&
            <FlatButton
              label={addNewItem.labelName}
              icon={<AddCircle color={white} />}
              labelStyle={{ color: white }}
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
              tooltip={<FormattedMessage {...messages.search} />}
              onClick={this.handleShowSearchBar}
            >
              <SearchIcon color={white} />
            </IconButton>
            }
          </ToolbarGroup>
        </PanelMUToolbar>
        {this.state.isShowSearchBar &&
        <SearchBar onSearch={onSearch} />
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
  addNewItem: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
  }),
  onSearch: PropTypes.func,
};

PanelToolbar.defaultProps = {
  showNewItem: true,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
};

export default PanelToolbar;
