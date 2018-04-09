/**
*
* RadioButton
*
*/

import React from 'react';
import { RadioButton as MUIRadioButton } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';


function RadioButtonBridge(props) {
  const { field: { name, value: fieldValue }, form: { setFieldValue, setFieldTouched }, ...rest } = props;
  return (
    <MUIRadioButton
      value={fieldValue}
      onChange={(event, value) => setFieldValue(name, value)}
      onFocus={() => setFieldTouched(name)}
      {...rest}
    />
  );
}

function RadioButton(props) {
  const { name, value, ...rest } = props;
  return (
    <Field
      name={name}
      value={value}
      render={(p) => (<RadioButtonBridge {...p} {...rest} />)}
      {...rest}
    />);
}

RadioButtonBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

RadioButton.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI RadioButton.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/RadioButton/RadioButton.js
   */
  /**
   * @ignore
   * checked if true
   * Used internally by `RadioButtonGroup`.
   */
  checked: PropTypes.bool,
  /**
   * The icon element to show when the radio button is checked.
   */
  checkedIcon: PropTypes.element,
  /**
   * If true, the radio button is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Override the inline-styles of the icon element.
   */
  iconStyle: PropTypes.object,
  /**
   * Override the inline-styles of the input element.
   */
  inputStyle: PropTypes.object,
  /**
   * @ignore
   * Used internally by `RadioButtonGroup`. Use the `labelPosition` property of `RadioButtonGroup` instead.
   * Where the label will be placed next to the radio button.
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * Override the inline-styles of the label element.
   */
  labelStyle: PropTypes.object,
  /**
   * @ignore
   * Callback function fired when the radio button is checked. Note that this
   * function will not be called if the radio button is part of a
   * radio button group: in this case, use the `onChange` property of
   * `RadioButtonGroup`.
   *
   * @param {object} event `change` event targeting the element.
   * @param {string} value The element's `value`.
   */
  onCheck: PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The icon element to show when the radio button is unchecked.
   */
  uncheckedIcon: PropTypes.element,
  /**
   * The value of the radio button.
   */
  value: PropTypes.any,
  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Additional required 'name' prop-type for Formik Field.
   */
  name: PropTypes.string.isRequired,

};

RadioButton.contextTypes = {
  /**
   * Inherited contextTypes for the wrapped Material UI RadioButton.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/RadioButton/RadioButton.js
   */
  muiTheme: PropTypes.object.isRequired,
};
export default RadioButton;
