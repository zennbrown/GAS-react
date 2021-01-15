import React, { useContext } from 'react';
import RouterContext from './routerContext';

const Page = ({ children, page: path }) => {
  const { page } = useContext(RouterContext);
  if (page === path || !page && !path) return <div>{children}</div>;
  return null;
};

export default Page;
