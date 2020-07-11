import updatePackageJson from './updatePackageJson';
import copyProjectDirectory from './copyProjectDirectory';
import openingQuestion from './openingQuestion';
import openingAnswer from './openingAnswer';
import checkReactApp from './checkReactApp';

const init = () => {
  console.log('Hey, are you ready to googlify your react App?');
  checkReactApp()
    .then(openingQuestion)
    .then(openingAnswer)
    .then(copyProjectDirectory)
    .then(updatePackageJson)
    .then(() => console.log('done'))
    .catch(console.error);
  // ask if they wish to add sample hello world app
};
export default init;
