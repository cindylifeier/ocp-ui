import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'components/SearchBar';


function AddPractitionerRole(props) {
  const { onSearch } = props;
  return (
    <div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

AddPractitionerRole.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default AddPractitionerRole;
