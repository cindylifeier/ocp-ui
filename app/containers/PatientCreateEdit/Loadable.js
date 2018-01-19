/**
 *
 * Asynchronously loads the component for PatientCreateEdit
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
