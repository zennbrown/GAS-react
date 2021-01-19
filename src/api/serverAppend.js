/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* global HtmlService */

const paths__ = {};
const mwBefore__ = [];
const mwAfter__ = [];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

async function apiListener(_req) {
  let req = null;
  try {
    req = JSON.parse(_req);
    const res = {
      body: '',
      status: 200,
      headers: []
    };
    if (!paths__[req.path]) throw new Error(`Path "${req.path}" does not exist`);
    const len = mwBefore__.length;
    for (let i = 0; i < len; i++) {
      // eslint-disable-next-line no-await-in-loop
      await mwBefore__[i](req, res);
    }
    const data = await paths__[req.path](req, res);
    res.body = res.body || data;
    for (let i = 0; i < mwAfter__.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await mwAfter__[i](req, res);
    }
    return res;
  } catch (err) {
    console.error(err);
    return { error: err && err.message ? err.message : err, status: 500, body: '' };
  }
}
