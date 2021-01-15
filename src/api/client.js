/* global google */export default {
  call: (path, body) => new Promise((resolve, reject) => {
    console.log('client.call() is to be deprecated use client.send()');
    google.script.run
      .withSuccessHandler((response) => {
        if (response.error || response.status === 500) reject(response.error);
        else resolve(response);
      })
      .withFailureHandler(reject)
      .apiListener(JSON.stringify({ path, body }));
  }),

  send: (path, body) => new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .apiListener(JSON.stringify({ path, body }));
  })
};
