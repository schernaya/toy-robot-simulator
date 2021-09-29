import fs from 'fs';

export default class FileReader {
  readInputFile(fileName, cb) {
      if (!fileName) {
        return cb(new Error('No file name'));
      }
      
      fs.readFile(fileName, { encoding: 'utf-8' }, (err, fileData) => {
        if (err) {
          return cb(new Error('File does not exist'));
        }
        
        const result = !fileData.length ? cb(new Error('File is empty')) : cb(null, fileData);

        return result;
      });
    }
}

// module.exports = FileReader;
