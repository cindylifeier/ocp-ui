/**
 *
 * Asynchronously loads the component for AddParticipantOrServiceDialog
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
