import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

function PurposeOfUseForm(props) {
  const { purposeOfUse, arrayHelpers, values } = props;
  return (
    <div>
      {purposeOfUse && purposeOfUse.map((pou) => (
        <div key={uniqueId()}>
          <input
            name="purposeOfUseCodes"
            type="checkbox"
            value={pou.code}
            checked={values && values.purposeOfUseCodes && values.purposeOfUseCodes.includes(pou.code)}
            onChange={(e) => {
              if (e.target.checked) arrayHelpers.push(pou.code);
              else {
                const idx = values.purposeOfUseCodes.indexOf(pou.code);
                arrayHelpers.remove(idx);
              }
            }}
          />{' '}
          {pou.display}
        </div>
      ))}
    </div>
  );
}

PurposeOfUseForm.propTypes = {
  purposeOfUse: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })).isRequired,
  arrayHelpers: PropTypes.object,
  values: PropTypes.object,
};

export default PurposeOfUseForm;

