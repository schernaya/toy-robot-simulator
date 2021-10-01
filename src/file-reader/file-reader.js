import fs from 'fs';
import { ERRORS, ENCODING } from '../constants/constants.js';
import { isCorrectExtension } from '../validations/index.js';

class FileReader {
  readInputFile(fileName, cb) {
    if (!fileName) {
      return cb(new Error(ERRORS.NO_FILE_NAME));
    }

    if (!isCorrectExtension(fileName)) {
      return cb(new Error(ERRORS.UNALLOWED_EXTENSION));
    }

    fs.readFile(fileName, { encoding: ENCODING }, (
      err, dataFromFile
    ) => {
      if (err) {
        return cb(new Error(ERRORS.FILE_DOESNT_EXIST));
      }

      dataFromFile.length ?
        cb(null, dataFromFile) :
        cb(new Error(ERRORS.FILE_IS_EMPTY));
    });
  }
}

export default FileReader;
