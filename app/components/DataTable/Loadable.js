/**
 *
 * Asynchronously loads the component for DataTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
