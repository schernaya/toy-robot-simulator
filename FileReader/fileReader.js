import fs from 'fs';

class FileReader {
  readInputFile(fileName, cb) {
    if (!fileName) {
      return cb(new Error('No file name'));
    }

    fs.readFile(fileName, { encoding: 'utf-8' }, (err, dataFromFile) => {
      if (err) {
        return cb(new Error('File does not exist'));
      }

      dataFromFile.length ? cb(null, dataFromFile) : cb(new Error('File is empty'));
    });
  }
}

export default FileReader;
