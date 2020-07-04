import path from 'path';
import copyDirPromise from '../util/copyDirPromise';

const copyProjectDirectory = () => (copyDirPromise(path.join(__dirname, '../copy'), process.cwd(), {
  utimes: true, // keep add time and modify time
  mode: true, // keep file mode
  cover: true // cover file when exists, default is true
}));

export default copyProjectDirectory;
