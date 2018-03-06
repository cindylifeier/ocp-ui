/**
*
* AddAssociateOrganizationForm
*
*/

import React from 'react';
import SearchBar from 'components/SearchBar';
import { fromBackendToFrontendOrganization } from 'containers/Organizations/mappings';
import { Organizations } from 'containers/Organizations';
import { FormattedMessage } from 'react-intl';
import AssociateOrganizationTable from 'components/AssociateOrganizationTable';
import messages from 'components/AddAssociateOrganizationForm/messages';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import PropTypes from 'prop-types';
import H1 from 'components/H1';
import StyledFlatButton from 'components/StyledFlatButton';


function AddAssociateOrganizationForm({ organizations, currentPage, totalNumberOfPages, onSearch, onPageClick, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType }) {
  return (
    <div>
      <H1>{<FormattedMessage {...messages.header} />}</H1>
      <StyledFlatButton
        type="reset"
        label={<FormattedMessage {...messages.cancelButtonLabel} />}
        onClick={callback}
      />
      <SearchBar
        minimumLength={Organizations.SEARCH_BAR_TEXT_LENGTH}
        onSearch={onSearch}
      />

      {organizations.loading && <RefreshIndicatorLoading />}

      {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
        <div>
          <AssociateOrganizationTable
            organizations={organizations.data.map(fromBackendToFrontendOrganization)}
            onAddAssociateOrganization={onAddAssociateOrganization}
            existingOrganizations={existingOrganizations}
            callback={callback}
            roleType={roleType}
            specialtyType={specialtyType}

          />
          <CenterAlignedUltimatePagination
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onChange={onPageClick}
          />
        </div>
      ) ||
      ((!organizations.loading && organizations.data && organizations.data.length === 0 &&
        <CenterAlign>
          <span>No organizations found</span>
        </CenterAlign>))
      }
    </div>
  );
}

AddAssociateOrganizationForm.propTypes = {
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddAssociateOrganization: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  existingOrganizations: PropTypes.array,
  callback: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default AddAssociateOrganizationForm;
