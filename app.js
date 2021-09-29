import Robot from './Robot/robot.js';
import FileReader from './FileReader/fileReader.js';
import CommandParser from './CommandParser/commandParser.js';

const fileReader = new FileReader();
const commandParser = new CommandParser();

const robot = new Robot();

const app = {};

const readParseFile = (fileName, cb) => {
  fileReader.readInputFile(fileName, (err, fileData) => {
    if (err) {
        cb(err);
        return;
    }

    commandParser.parseArguments(fileData, (err, commandsList) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null, commandsList);
    })
  });
};

app.runRobotApp = (fileName, cb) => {
  readParseFile(fileName, (err, commandsList) => {
    if (err) {
      cb(err);
      return;
    }

    robot.executeCommands(commandsList);
    cb(null, robot);
  });
};

export default app;
