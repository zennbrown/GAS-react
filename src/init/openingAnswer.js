const openingAnswer = (answer) => new Promise((resolve, reject) => {
  if (answer.value === 'Yes') resolve();
  else {
    console.log('okay we hope to see you again');
    reject();
  }
});

export default openingAnswer;
