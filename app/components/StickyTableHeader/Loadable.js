/**
 *
 * Asynchronously loads the component for StickyTableHeader
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
