/**
 *
 * Asynchronously loads the component for CareCoordinatorUpcomingAppointmentTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
