import { useContext } from 'react';
import RouterContext from './routerContext';

const useRouter = () => {
  const {
    page, routeParams, updateParams, updatePage
  } = useContext(RouterContext);
  return {
    page, params: routeParams, updateParams, updatePage
  };
};

export default useRouter;
