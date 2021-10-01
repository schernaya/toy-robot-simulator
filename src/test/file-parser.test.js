import path from 'path';
import FileReader from '../file-reader/file-reader.js';

let reader;

beforeEach(() => {
  reader = new FileReader();
});

describe('command parser - unit tests', () => {
  test('should correctly read text file', () => {
    reader.readInputFile(path.join(__dirname, 'test-data/test.txt'),
      async (err, fileData) => {
        expect(err).toBeNull;
        expect(fileData).toEqual('PLACE 1,1,NORTH\r\nRIGHT\r\nREPORT');
      });
  });

  test('should throw an error if the file does not exist', () => {
    reader.readInputFile(path.join(__dirname, 'test-data/no-such-file.txt'),
      async (err) => {
        expect(err.message).toBe('File does not exist');
      });
  });

  test('should throw an error if the file is empty', () => {
    reader.readInputFile(path.join(__dirname, 'test-data/empty.txt'),
      async (err) => {
        expect(err.message).toBe('File is empty');
      });
  });

  test('should throw an error if the file is not txt', () => {
    reader.readInputFile(path.join(__dirname, 'test-data/not-txt.xml'),
      async (err) => {
        expect(err.message).toBe('File has unallowed extension');
      });
  });
})
