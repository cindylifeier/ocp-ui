/**
 *
 * Asynchronously loads the component for TodoCardContent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
