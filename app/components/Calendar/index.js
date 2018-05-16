/**
 *
 * Calendar
 *
 */

import React from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


BigCalendar.momentLocalizer(moment);
const allViews = ['month', 'day', 'week', 'agenda'];
function Calendar(props) { // eslint-disable-line react/prefer-stateless-function
  console.log(props.elements);
  const appointments = props.elements.map((element) => {
    const appointment = {};
    appointment.id = element.logicalId;
    appointment.title = element.description;
    appointment.description = element.description;
    appointment.start = new Date(element.start[0], element.start[1] - 1, element.start[2], element.start[3], element.start[4]);
    appointment.end = new Date(element.end[0], element.end[1] - 1, element.end[2], element.end[3], element.end[4]);
    return appointment;
  });
  console.log(appointments);
  return (
    <div style={{ height: 800 }}>
      <BigCalendar
        popup
        events={appointments}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={new Date()}
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
};

export default Calendar;
