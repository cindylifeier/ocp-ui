import React from 'react';
import PropTypes from 'prop-types';
import PatientBannerSection from 'components/PatientBannerSection';


function PatientBanner(props) {
  return (
    <PatientBannerSection>
      {props.patient.id}
    </PatientBannerSection>
  );
}

PatientBanner.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }).isRequired,
};

export default PatientBanner;
