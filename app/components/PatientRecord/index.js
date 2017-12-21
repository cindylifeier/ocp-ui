/**
 *
 * PatientRecord
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, CardText, Drawer, FontIcon, IconButton, Paper, Subheader } from 'material-ui';
import messages from './messages';
import css from './PatientRecord.css';
import FhirUtil from '../../utils/FhirUtil';
import genericAvatar from '../../images/generic-avatar.png';
import { homeUse, mobileUse, tempUse, workUse } from '../../utils/constants';

class PatientRecord extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.viewDetails = this.viewDetails.bind(this);
  }

  viewDetails() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Paper className={css.paper}>
          <div>
            <img src={genericAvatar} className={css.img} alt="avatar" />
            <p>
              <strong>Name: </strong>{FhirUtil.getFhirPatientName(this.props.patient)}
            </p>
            <p>
              <strong>DOB: </strong>{FhirUtil.getFhirPatientBirthDate(this.props.patient)}
            </p>
            <p>
              <strong>SSN: </strong>{FhirUtil.getFhirPatientSsn(this.props.patient)}
            </p>
            <p>
              <strong>Gender: </strong>{FhirUtil.getFhirPatientGender(this.props.patient)}
            </p>
            <IconButton tooltip="View details" onClick={this.viewDetails}>
              <FontIcon className="fa fa-chevron-circle-right" />
            </IconButton>
          </div>
        </Paper>
        <Drawer
          open={this.state.open}
          docked={false}
          width={'30%'}
          swipeAreaWidth={100}
          containerStyle={{
            backgroundColor: '#DCE4EF',
            maxHeight: '80%',
          }}
          onRequestChange={(open) => this.setState({ open })}
        >
          <Subheader style={{ backgroundColor: '#132F50', color: 'white' }}>
            <strong>Patient Information</strong>
          </Subheader>
          <Card style={{ margin: 10 }}>
            <CardText>
              <div>
                <div>
                  <div>
                    <h3>Phone</h3>
                    <strong>Home</strong>
                    <div>{FhirUtil.getPhoneByUse(this.props.patient, homeUse)}</div>
                    <strong>Cell</strong>
                    <div>{FhirUtil.getPhoneByUse(this.props.patient, mobileUse)}</div>
                    <strong>Work</strong>
                    <div>{FhirUtil.getPhoneByUse(this.props.patient, workUse)}</div>
                  </div>
                  <div>
                    <h3>Addresses</h3>
                    <strong>Home </strong>
                    <div>{FhirUtil.getAddressByUse(this.props.patient, homeUse)}</div>
                    <strong>Temporary </strong>
                    <div>{FhirUtil.getAddressByUse(this.props.patient, tempUse)}</div>
                  </div>
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={{ margin: 10 }}>
            <CardText>
              <div>
                <div>
                  <div>
                    <h3>Email</h3>
                    <p style={{ maxWidth: '50%' }}>
                      {FhirUtil.getEmail(this.props.patient)}
                    </p>
                  </div>
                  <div>
                    <h3>Emergency Contact</h3>
                    {!this.props.patient.contact ?
                      <div>No Record Found</div> :
                      this.props.patient.contact && this.props.patient.contact
                        .map((contact) => {
                          const relationship = FhirUtil.getFhirPatientContactRelationship(contact);
                          const name = FhirUtil.getFhirPatientContactName(contact);
                          const gender = FhirUtil.getFhirPatientContactGender(contact);
                          const phone = FhirUtil.getFhirPatientContactPhone(contact);
                          const key = `${relationship}-${name}-${gender}-${phone}`;
                          return (<div key={key}>
                            <strong>Relationship</strong>
                            <div>{relationship}</div>
                            <strong>Name</strong>
                            <div>{name}</div>
                            <strong>Gender</strong>
                            <div>{gender}</div>
                            <strong>Phone</strong>
                            <div>{phone}</div>
                          </div>);
                        })
                    }
                  </div>
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={{ margin: 10 }}>
            <CardText>
              <div>
                <div>
                  <div>
                    <h3>Service And Social History</h3>
                    <strong>Marital Status</strong>
                    <div>{FhirUtil.getFhirPatientMaritalStatus(this.props.patient)}</div>
                  </div>
                </div>
              </div>
            </CardText>
          </Card>
        </Drawer>
      </div>
    );
  }
}

PatientRecord.propTypes = {
  patient: PropTypes.object,
};

export default PatientRecord;
