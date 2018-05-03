/**
 *
 * PatientAvatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import patientMaleAvatar from 'images/patient-male-avatar.png';
import patientFemaleAvatar from 'images/patient-female-avatar.png';
import patientGenericAvatar from 'images/patient-generic-avatar.png';


const genderCodes = ['male', 'female', 'other', 'unknown'];

function getPatientAvatarByGender(genderCode) {
  switch (genderCode) {
    case 'male':
      return patientMaleAvatar;
    case 'female':
      return patientFemaleAvatar;
    default:
      return patientGenericAvatar;
  }
}

function PatientAvatar(props) {
  const { genderCode, size } = props;
  const avatar = getPatientAvatarByGender(genderCode);
  return (
    <Avatar size={size} src={avatar} />
  );
}

PatientAvatar.propTypes = {
  genderCode: PropTypes.oneOf(genderCodes),
  size: PropTypes.number,
};

PatientAvatar.defaultProps = {
  genderCode: 'unknown',
  size: 40,
};

export default PatientAvatar;
