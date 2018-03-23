/**
 *
 * Asynchronously loads the component for Sticky
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
