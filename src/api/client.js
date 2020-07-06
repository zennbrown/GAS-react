export default {
  call: (path, body) => new Promise((resolve, reject) => {
    /* global google */
    google.script.run
      .withSuccessHandler((response) => {
        if (response.error) reject(response.error);
        else resolve(response);
      })
    //      .withUserObject(this)
      .apiListener(JSON.stringify({ path, body }));
  })
};
