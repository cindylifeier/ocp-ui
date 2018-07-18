/**
 *
 * Asynchronously loads the component for UserAccountsPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
