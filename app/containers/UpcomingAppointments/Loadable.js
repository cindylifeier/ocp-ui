/**
 *
 * Asynchronously loads the component for UpcomingAppointments
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
