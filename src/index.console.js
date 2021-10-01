import Robot from './robot/robot.js';
import CommandParser from './command-parser/command-parser.js';

const robot = new Robot();
const commandParser = new CommandParser();

const runRobotSimulator = () => {
  const stdin = process.openStdin();

  stdin.addListener('data', (data) => {
    const input = data.toString().trim().toLowerCase();
    const listOfCommands = commandParser.parseCommandWithArguments(input);

    robot.executeCommand(listOfCommands);
  });
};

runRobotSimulator();
