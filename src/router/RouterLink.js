import React, { useContext } from 'react';
import RouterContext from './routerContext';

const RouterLink = ({ children, page, params }) => {
  const { updatePage } = useContext(RouterContext);
  return <div onClick={() => updatePage(page, params)}>{children}</div>;
};

export default RouterLink;
