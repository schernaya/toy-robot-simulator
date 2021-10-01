import Robot from './robot/robot.js';
import FileReader from './file-reader/file-reader.js';
import CommandParser from './command-parser/command-parser.js';

const fileReader = new FileReader();
const commandParser = new CommandParser();

const robot = new Robot();

const app = {};

const readParseFile = (fileName, cb) => {
  fileReader.readInputFile(fileName, (err, dataFromFile) => {
    if (err) {
      cb(err);
      return;
    }

    commandParser.parseCommands(dataFromFile, cb);
  });
};

app.runRobotApp = (fileName, cb) => {
  readParseFile(fileName, (err, listOfCommands) => {
    if (err) {
      cb(err);
      return;
    }

    robot.executeCommands(listOfCommands);
  });
};

export default app;
