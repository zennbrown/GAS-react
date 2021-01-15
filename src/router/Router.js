/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import RouterContext from './routerContext';

/* global google */

export default ({ children, loadScreen }) => {
  const [currentPageParams, setCurrentPageParams] = useState({ page: '', params: {}, ready: false });

  useEffect(() => {
    try {
      google.script.url.getLocation((location) => {
        setCurrentPageParams({ page: location.hash, params: location.parameter, ready: true });
      });
    } catch (err) {
      console.log('error!', err);
    }
  }, [setCurrentPageParams]);

  const updatePage = (page, parameters = {}) => {
    const params = { ...parameters };
    const now = new Date();
    const state = {
      timestamp: now.getTime()
    };
    google.script.history.push(state, params, page);
    setCurrentPageParams({ page, params, ready: true });
  };

  const updateParams = (parameters = {}) => {
    const params = { ...parameters };
    const now = new Date();
    const state = {
      timestamp: now.getTime()
    };
    google.script.history.push(state, params, currentPageParams.page);
    setCurrentPageParams({ page: currentPageParams.page, params, ready: true });
  };

  useEffect(() => {
    try {
      google.script.history.setChangeHandler((e) => {
        console.log('page change', e);
        setCurrentPageParams({ page: e.location.hash, params: e.location.parameter, ready: true });
      });
    } catch (err) {
      console.log('error!', err);
    }
  }, [setCurrentPageParams]);

  if (currentPageParams.ready) {
    return (
      <RouterContext.Provider value={{
        routeParams: currentPageParams.params,
        page: currentPageParams.page,
        updatePage,
        updateParams
      }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
  return loadScreen || (<div>Loading...</div>);
};
