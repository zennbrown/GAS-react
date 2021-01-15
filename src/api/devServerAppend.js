/* eslint-disable no-unused-vars */
/* global ContentService */

const paths__ = {};

async function doPost(_req) {
  const req = JSON.parse(_req.body);
  try {
    return ContentService.createTextOutput(JSON.stringify({
      body: await paths__[req.path](req), status: 200, ok: true
    }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.log(err);
    return ContentService.createTextOutput(JSON.stringify({
      error: err.message, body: err.message, ok: false, status: err.networkStatus || 500
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
