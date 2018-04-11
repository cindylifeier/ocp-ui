/**
 *
 * Calendar
 *
 */

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

BigCalendar.momentLocalizer(moment);
const allViews = ['month', 'day', 'week', 'agenda'];

class Calendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      // BigCalendar need explicit height for container
      <div style={{ height: 800 }}>
        <BigCalendar
          popup
          events={events}
          views={allViews}
          step={60}
          showMultiDayTimes
          defaultDate={new Date()}
        />
      </div>
    );
  }
}

Calendar.propTypes = {};

export default Calendar;
