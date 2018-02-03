/**
 *
 * SearchParticipant
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Formik } from 'formik';
import yup from 'yup';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { IconButton } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';
import reducer from './reducer';
import saga from './saga';

import styles from './styles.css';
import messages from './messages';
import { fieldStyle, floatingLabelStyle, iconButtonStyle } from './constants';
import { makeSelectParticipantTypes } from '../App/selectors';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import { getSearchParticipant } from './actions';


export class SearchParticipant extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(values) {
    const { name, member } = values;
    this.props.searchParticipant(name, member);
  }

  render() {
    const { participantTypes, handleClose, isOpen } = this.props;
    this.state.open = isOpen;
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={handleClose}
      />,
    ];
    return (
      <Dialog
        title={<FormattedMessage {...messages.addParticipantDialogTitle} />}
        actions={actionsButtons}
        modal={false}
        open={this.state.open}
        onRequestClose={handleClose}
        autoScrollBodyContent
      >
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            this.handleSearch(values);
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({})}
          render={(formikProps) => {
            const { isSubmitting, dirty, isValid } = formikProps;
            return (
              <Form>
                <div className={styles.root}>
                  <div className={styles.gridContainer}>
                    <div className={styles.gridItem}>
                      <TextField
                        name="name"
                        style={fieldStyle}
                        floatingLabelStyle={floatingLabelStyle}
                        hintText={<FormattedMessage {...messages.PractitionerNameHintText} />}
                        floatingLabelText={<FormattedMessage {...messages.PractitionerNameFloatingLabelText} />}
                      />
                    </div>
                    <div className={styles.gridItem}>
                      <SelectField
                        name="member"
                        floatingLabelText={<FormattedMessage {...messages.PractitionerMemberFloatingLabel} />}
                      >
                        {participantTypes && participantTypes.map((member) =>
                          <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                        )}
                      </SelectField>
                    </div>
                    <div className={styles.gridItem}>
                      <IconButton
                        style={iconButtonStyle}
                        tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <ActionSearch />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        />
      </Dialog>
    );
  }
}

SearchParticipant.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  searchParticipant: PropTypes.func.isRequired,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  participantTypes: makeSelectParticipantTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchParticipant: (name, member) => dispatch(getSearchParticipant(name, member)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchParticipant', reducer });
const withSaga = injectSaga({ key: 'searchParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchParticipant);
