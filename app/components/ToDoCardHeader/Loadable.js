/**
 *
 * Asynchronously loads the component for TodoCardHeader
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
