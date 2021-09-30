import Robot from './robot/robot.js';
import FileReader from './fileReader/fileReader.js';
import CommandParser from './commandParser/commandParser.js';

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

    commandParser.parseArguments(dataFromFile, (err, listOfCommands) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, listOfCommands);
    })
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
