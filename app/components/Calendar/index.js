/**
 *
 * Calendar
 *
 */

import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


BigCalendar.momentLocalizer(moment);
const allViews = ['month', 'day', 'week'];

function Calendar(props) { // eslint-disable-line react/prefer-stateless-function
  const appointments = props.elements.map((element) => {
    const appointment = {};
    appointment.id = element.logicalId;
    appointment.title = element.description;
    // appointment.description = element.description;
    appointment.start = new Date(element.start[0], element.start[1] - 1, element.start[2], element.start[3], element.start[4]);
    appointment.end = new Date(element.end[0], element.end[1] - 1, element.end[2], element.end[3], element.end[4]);
    appointment.isOutlookAppointment = false;
    return appointment;
  });
  if (props.outlookElements !== null) {
    const outlookAppointments = props.outlookElements.map((element) => {
      const outlookAppointment = {};
      outlookAppointment.id = element.calUid;
      outlookAppointment.title = element.subject;
      // outlookAppointment.description = element.subject;
      outlookAppointment.start = new Date(element.start[0], element.start[1] - 1, element.start[2], element.start[3], element.start[4]);
      outlookAppointment.end = new Date(element.end[0], element.end[1] - 1, element.end[2], element.end[3], element.end[4]);
      outlookAppointment.isOutlookAppointment = true;
      return outlookAppointment;
    });
    appointments.push(...outlookAppointments);
  }

  return (
    <div style={{ height: 800 }}>
      <BigCalendar
        popup
        events={appointments}
        defaultView="week"
        views={allViews}
        step={30}
        timeslots={4}
        showMultiDayTimes
        defaultDate={new Date()}
        eventPropGetter={
          (event) => {
            const newStyle = {
              backgroundColor: '#9cc',
              color: 'black',
              borderRadius: '0px',
              border: 'none',
            };

            if (event.isOutlookAppointment) {
              newStyle.backgroundColor = '#115dd8';
              newStyle.color = 'white';
            }

            return {
              className: '',
              style: newStyle,
            };
          }
        }
      />
    </div>
  );
}

Calendar.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
  })),
  outlookElements: PropTypes.array,
};

export default Calendar;
