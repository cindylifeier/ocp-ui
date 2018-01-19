/**
 *
 * Asynchronously loads the component for LocationCreateEdit
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
