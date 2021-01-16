/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* global HtmlService */

const paths__ = {};

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

async function apiListener(_req) {
  let req = null;
  try {
    const res = {
      body: '',
      status: 200,
    };
    req = JSON.parse(_req);
    if (!paths__[req.path]) throw new Error(`Path "${req.path}" does not exist`);
    const data = await paths__[req.path](req, res);
    res.body = res.body || data;
    return res;
  } catch (err) {
    console.log(req && req.path, err);
    return { error: err && err.message ? err.message : err, status: 500, body: '' };
  }
}
