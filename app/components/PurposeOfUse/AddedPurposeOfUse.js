import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from 'material-ui-next/Avatar';
import teal from 'material-ui-next/colors/teal';
import upperFirst from 'lodash/upperFirst';
import MedicalInfoChip from 'components/SelectMedicalInformation/MedicalInfoChip';

function AddedPurposeOfUse(props) {
  const { purposeOfUseCodes } = props;
  return (
    <div>
      {purposeOfUseCodes.map((info) => (
        <MedicalInfoChip
          key={info.code}
          label={upperFirst(info.display)}
          avatar={
            <Avatar>
              <CheckCircleIcon color={teal['500']} />
            </Avatar>
          }
        />
      ))
      }
    </div>
  );
}

AddedPurposeOfUse.propTypes = {
  purposeOfUseCodes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddedPurposeOfUse;
