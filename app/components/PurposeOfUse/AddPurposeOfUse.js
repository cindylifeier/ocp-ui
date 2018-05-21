import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { FormattedMessage } from 'react-intl';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { Cell, Grid } from 'styled-css-grid';
import upperFirst from 'lodash/upperFirst';
import Checkbox from 'material-ui-next/Checkbox';
import { FormControlLabel, FormGroup } from 'material-ui-next/Form';
import messages from './messages';

class AddPurposeOfUse extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, purposeOfUse, pouCodes) {
    if (event.target.checked) {
      this.props.arrayHelpers.push({
        code: purposeOfUse.code,
        display: purposeOfUse.display,
      });
    } else {
      const idx = pouCodes.indexOf(purposeOfUse.code);
      this.props.arrayHelpers.remove(idx);
    }
  }

  render() {
    const { purposeOfUse, purposeOfUseCodes, onCloseDialog } = this.props;
    console.log('purposeOfUseCodes', purposeOfUseCodes);
    const pouCodes = purposeOfUseCodes.map((pou) => pou.code);
    return (
      <Grid columns={1}>
        <Cell>
          {purposeOfUse && purposeOfUse.map((pou) => (
            <FormGroup key={uniqueId()}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={pou.code}
                    checked={pouCodes && pouCodes.includes(pou.code)}
                    onChange={(event) => this.handleChange(event, pou, pouCodes)}
                  />
                }
                label={upperFirst(pou.display)}
              />
            </FormGroup>
          ))}
        </Cell>

        <Cell>
          <HorizontalAlignment position="end">
            <StyledRaisedButton fullWidth onClick={onCloseDialog}>
              <FormattedMessage {...messages.okButton} />
            </StyledRaisedButton>
          </HorizontalAlignment>
        </Cell>
      </Grid>
    );
  }
}

AddPurposeOfUse.propTypes = {
  purposeOfUse: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  purposeOfUseCodes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
  ),
};

export default AddPurposeOfUse;

