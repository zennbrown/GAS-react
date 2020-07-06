/* eslint-disable no-unused-vars */
/* global HtmlService */

const paths__ = {};

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

async function apiListener(_req) {
  const req = JSON.parse(_req);
  try {
    return { body: await paths__[req.path](req) };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
